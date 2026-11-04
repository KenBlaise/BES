import type { MyBlazeAccount } from "@/lib/types";

export const jordanAccount: MyBlazeAccount = {
  accountId: "MB-22391",
  firstName: "Jordan",
  email: "jordan@example.com",
  savedFrameIds: [
    "frm-gucci-1420",
    "frm-blaze-ember-02",
    "frm-dita-flight",
    "frm-moscot-lemtosh",
  ],
  recentlyViewedFrameIds: [
    "frm-dita-flight",
    "frm-ahlem-place-blanche",
    "frm-gucci-1420",
    "frm-blaze-ember-02",
    "frm-cutler-and-gross-1394",
    "frm-moscot-lemtosh",
  ],
  tryAtBlazeIds: ["frm-gucci-1420", "frm-blaze-ember-02"],
  styleProfile: {
    style: "bold",
    shapes: ["square", "geometric"],
    colors: ["black", "tortoise"],
    priceRange: "400-600",
    recommendedFrameIds: [
      "frm-gucci-1420",
      "frm-blaze-ember-02",
      "frm-moscot-lemtosh",
      "frm-cutler-and-gross-1394",
    ],
    savedAt: "2026-08-14T16:20:00.000Z",
  },
  favoriteColors: ["black", "tortoise"],
  favoriteShapes: ["square", "geometric"],
  favoriteBrands: ["Casa Lumen", "Blaze", "Apex"],
  preferredPriceRange: "400-600",
  createdAt: "2026-06-02T14:10:00.000Z",
  updatedAt: "2026-09-20T11:04:00.000Z",
};

export const kenAccount: MyBlazeAccount = {
  accountId: "MB-83921",
  firstName: "Ken",
  email: "ken@example.com",
  phoneOptional: "(404) 555-1234",
  savedFrameIds: [
    "frm-tf-1234-black",
    "frm-gucci-1420",
    "frm-rb-clubmaster",
    "frm-blaze-ember-02",
  ],
  recentlyViewedFrameIds: [
    "frm-tf-1234-black",
    "frm-persol-649",
    "frm-oliver-peoples-winnett",
  ],
  tryAtBlazeIds: ["frm-tf-1234-black", "frm-blaze-ember-02"],
  styleProfile: {
    style: "luxury",
    shapes: ["rectangle", "aviator"],
    colors: ["black", "tortoise"],
    priceRange: "400-600",
    recommendedFrameIds: [
      "frm-tf-1234-black",
      "frm-persol-649",
      "frm-oliver-peoples-winnett",
      "frm-blaze-ember-02",
    ],
    savedAt: "2026-07-22T13:00:00.000Z",
  },
  favoriteColors: ["black", "tortoise"],
  favoriteShapes: ["rectangle", "aviator"],
  favoriteBrands: ["Vale & Co.", "Solara", "Blaze"],
  preferredPriceRange: "400-600",
  createdAt: "2026-05-11T18:32:00.000Z",
  updatedAt: "2026-09-18T09:12:00.000Z",
};

export const seedAccounts: MyBlazeAccount[] = [jordanAccount, kenAccount];
