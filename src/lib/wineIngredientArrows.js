// src/lib/wineIngredientArrows.js
// 商品詳細 データ表示のワインタイプ/成分値に応じた 矢印判定
import { CLUSTER_COLORS_FIXED } from "../ui/constants";

/** =========================
 * 各ワインタイプ・成分の閾値
 * low:
 *   ↓ と → の境界
 * high:
 *   → と ↑ の境界
 * ========================= */
const WINE_INGREDIENT_THRESHOLDS = {
  red: {
    total_sugar: {
      low: 2.9,
      high: 5.0,
    },
    ph: {
      low: 3.56,
      high: 3.64,
    },
    total_polyphenol: {
      low: 1.57,
      high: 1.87,
    },
    tartaric_acid: {
      low: 1.54,
      high: 1.83,
    },
    malic_acid: {
      low: 0.0,
      high: 0.05,
      includeLowInDown: true,
    },
    lactic_acid: {
      low: 1.49,
      high: 1.73,
    },
  },

  white: {
    total_sugar: {
      low: 3.0,
      high: 8.0,
    },
    ph: {
      low: 3.34,
      high: 3.43,
    },
    total_polyphenol: {
      low: 0.31,
      high: 0.52,
    },
    tartaric_acid: {
      low: 1.9,
      high: 2.2,
    },
    malic_acid: {
      low: 0.87,
      high: 1.23,
    },
    lactic_acid: {
      low: 0.43,
      high: 0.7,
    },
  },

  sparkling: {
    total_sugar: {
      low: 9.6,
      high: 14.0,
    },
    ph: {
      low: 3.2,
      high: 3.31,
    },
    total_polyphenol: {
      low: 0.38,
      high: 0.49,
    },
    tartaric_acid: {
      low: 2.3,
      high: 3.01,
    },
    malic_acid: {
      low: 0.32,
      high: 0.86,
    },
    lactic_acid: {
      low: 0.74,
      high: 1.24,
    },
  },

  rose: {
    total_sugar: {
      low: 3.4,
      high: 8.0,
    },
    ph: {
      low: 3.4,
      high: 3.47,
    },
    total_polyphenol: {
      low: 0.57,
      high: 0.88,
    },
    tartaric_acid: {
      low: 1.91,
      high: 2.19,
    },
    malic_acid: {
      low: 0.51,
      high: 1.0,
    },
    lactic_acid: {
      low: 0.52,
      high: 1.03,
    },
  },
};

/** =========================
 * 矢印ごとに使用するクラスター色
 * ↑：クラスター7（赤系）
 * ↓：クラスター8（紫系）
 * →：クラスター3（緑系）
 * ========================= */
const WINE_INGREDIENT_ARROW_CLUSTER_IDS = {
  "↑": 7,
  "↓": 8,
  "→": 3,
};

/** =========================
 * 矢印の共通表示設定
 * 色・大きさ・太さを変更する場合は、
 * このファイル内の値だけを変更する。
 * ========================= */
const WINE_INGREDIENT_ARROW_STYLE = {
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1,
};

/** =========================
 * クラスター色のRGBA配列をCSS文字列へ変換
 * ========================= */
function clusterColorToCss(clusterId) {
  const rgba = CLUSTER_COLORS_FIXED[clusterId];

  if (
    !Array.isArray(rgba) ||
    rgba.length < 3
  ) {
    return undefined;
  }

  const [red, green, blue, alpha = 255] = rgba;

  return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
}

/** =========================
 * tdb_product.wine_type を矢印判定用の4分類へ変換
 * ========================= */
function normalizeWineType(wineType) {
  if (wineType === null || wineType === undefined) {
    return null;
  }

  const normalized = String(wineType)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const wineTypeAliases = {
    red: "red",
    red_wine: "red",
    赤: "red",
    赤ワイン: "red",

    white: "white",
    white_wine: "white",
    白: "white",
    白ワイン: "white",

    sparkling: "sparkling",
    sparkling_wine: "sparkling",
    スパークリング: "sparkling",
    スパークリングワイン: "sparkling",
    泡: "sparkling",

    rose: "rose",
    rosé: "rose",
    rose_wine: "rose",
    ロゼ: "rose",
    ロゼワイン: "rose",
  };

  return wineTypeAliases[normalized] || null;
}

/** =========================
 * ワインタイプと成分値から矢印を返す
 * 戻り値:
 *   ↓ / → / ↑ / null
 * 判定できない場合は null
 * ========================= */
export function getWineIngredientArrow(
  wineType,
  ingredientKey,
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const normalizedWineType = normalizeWineType(wineType);

  if (!normalizedWineType) {
    return null;
  }

  const threshold =
    WINE_INGREDIENT_THRESHOLDS[normalizedWineType]?.[
      ingredientKey
    ];

  if (!threshold) {
    return null;
  }

  /** =========================
   * 赤ワインのリンゴ酸のみ、
   * 0.00以下を「↓」とする。
   * ========================= */
  if (
    threshold.includeLowInDown &&
    numericValue <= threshold.low
  ) {
    return "↓";
  }

  if (numericValue < threshold.low) {
    return "↓";
  }

  if (numericValue < threshold.high) {
    return "→";
  }

  return "↑";
}

/** =========================
 * 矢印の表示スタイルを返す
 * 判定済みの矢印以外が渡された場合は、
 * 共通スタイルだけを返す。
 * ========================= */
export function getWineIngredientArrowStyle(arrow) {
  const clusterId =
    WINE_INGREDIENT_ARROW_CLUSTER_IDS[arrow];

  const color = clusterColorToCss(clusterId);

  return {
    ...WINE_INGREDIENT_ARROW_STYLE,
    ...(color ? { color } : {}),
  };
}
