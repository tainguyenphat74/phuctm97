import type { Context } from "grammy";

import { kv } from "@vercel/kv";

export async function activeLicenseSEPay(
  context: Context,
  code: string,
  isActive: boolean | undefined | null,
): Promise<void> {
  if (isActive) {
    await context.reply("This license key has already been used");
    return;
  }

  try {
    const inviteLink = await context.api.createChatInviteLink(
      process.env.TELEGRAM_COMMUNITY_GROUP_ID,
      {
        expire_date: Math.floor(Date.now() / 1000) + 3600,
        member_limit: 1,
      },
    );

    await kv.set(`license:${code}`, { code, activated: true });
    await context.reply(
      `License key valid! Here is the invite link to our group: ${inviteLink.invite_link}`,
    );
  } catch (error) {
    console.error("Error activating license:", error);
    await context.reply(
      "An error occurred while activating your license. Please try again later.",
    );
  }
}
