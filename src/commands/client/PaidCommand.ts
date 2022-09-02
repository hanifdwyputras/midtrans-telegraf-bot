import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";
import * as config from "../../config";
import StrukPrinter from "../../util/struk";
import type { ITransactionStatus } from "midtrans-node";

export default class PaidCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "paid",
            description: "Confirm that the transaction has been paid or not",
            aliases: ["waspaid"],
            cooldown: 10000
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from!.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't use this command because you're not registered or haven't completed verification.");
        
        const code = args[0];
        if (!code) return await ctx.reply("Please provide transaction code");
        const P = await this.client.transaction.getById(code);
        if (!P || (P && P.customerId != ctx.from?.id)) return await ctx.reply("The ID you provided could not be found");
        if (P.paid) return await ctx.reply("This transaction has been paid in advance");
        const tr = await this.client.midtrans.statusTransaction(code) as ITransactionStatus;

        if (tr.transaction_status == "settlement" || tr.transaction_status === 'capture') {
            await this.client.transaction._transactionModel.update({
                paid: true,
                payment: tr.payment_type
            }, {
                where: {
                    id: code
                }
            });
            const foto = await StrukPrinter.printStructPay(tr.payment_type, P.id, P.item, P.price, P.quantity);
            const m = await ctx.replyWithPhoto({ source: foto }, {
                caption: `${ctx.from!.id} | ${P.id} | CONFIRMED STRUCT`
            });
            config.OWNERS_ID.forEach(owner => {
                ctx.telegram.forwardMessage(owner, ctx.chat!.id, m.message_id);
            });
            return await ctx.reply("Your payment has been confirmed, and the seller has been contacted. Please wait until further notice.");
        } else {
            return await ctx.reply("Your payment seems to have failed, if you already feel like paying it you can contact the seller through " + config.OWNERS_ID.map((x, i) => `[Seller ${i+1}](tg://user?id=${x})`).join(" "));
        }
    }
}