// ==============================
// src/ui/constants.js（集約・完全版）
// ==============================

// ===== Drawer共通 =====
export const DRAWER_HEIGHT = "calc(66svh - env(safe-area-inset-bottom))";
export const CLUSTER_DRAWER_HEIGHT = "calc(56svh - env(safe-area-inset-bottom))"; // ← ここに統一

export const drawerModalProps = {
  keepMounted: true,
  disablePortal: false, 
  container: typeof window !== "undefined" ? document.body : undefined, // ★#rootは使わない
  // disableScrollLock: true, // （必要なら）スクロールロックを無効化
};

export const paperBaseStyle = {
  width: "100%",
  height: DRAWER_HEIGHT,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  overflow: "hidden",
  pointerEvents: "auto",
};

// TasteMap APIベースURL
export const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

// TasteMap 打点APIのURL（MapPage / SliderPage で共通利用）
export const TASTEMAP_POINTS_URL =
  process.env.REACT_APP_POINTS_JSON_URL ||
  `${API_BASE}/api/app/points`;

// ===== Map共通 =====
export const COMPASS_URL = `${process.env.PUBLIC_URL || ""}/img/compass.png`;
export const CENTER_Y_OFFSET = -3.5;
export const ZOOM_LIMITS = { min: 5.25, max: 8.00 };
export const INITIAL_ZOOM = 5.5;

// ===== Map point radius（打点の大きさ）=====
// ScatterplotLayer の radius（UMAP座標系のワールド単位）
export const MAP_POINT_RADIUS = 0.03;
// クラスタ配色ON時は少し大きく（好みで 0.036〜0.040 に調整）
export const MAP_POINT_RADIUS_CLUSTER = 0.040;

// 打点カラー
export const MAP_POINT_COLOR    = [160, 160, 160, 220];
export const MAP_POINT_HOVER    = [120, 120, 120, 255];
export const MAP_POINT_SELECTED = [ 80,  80,  80, 255];
export const ORANGE = [255, 140, 0];

// ===== wishlist（飲みたい）星 =====
export const WISH_STAR_COLOR = [178, 53, 103, 255]; 
// IconLayer の sizeUnits="meters" 用（MapCanvas の getSize と合わせる）
export const WISH_STAR_SIZE = 0.18; // 0.28〜0.36で好み調整

// ===== ヒート/グリッド =====
export const GRID_CELL_SIZE = 0.2;
export const HEAT_ALPHA_MIN = 24;
export const HEAT_ALPHA_MAX = 255;
export const HEAT_GAMMA = 0.65;
export const HEAT_CLIP_PCT = [0.0, 0.98];
export const HEAT_COLOR_LOW  = [255, 255, 255];
export const HEAT_COLOR_HIGH = [255, 165,   0];

// ===== Panel Header =====
export const PANEL_HEADER_H       = 42;
export const PANEL_HEADER_BG      = "rgb(221, 211, 198)";
export const PANEL_HEADER_BORDER  = "1px solid rgb(201, 201, 176)";
export const PANEL_HEADER_PADDING = "0 8px 0 12px";

// ===== タイプ別カラー（CSS / Array）===== //多分使われていない
export const TYPE_COLOR_CSS = {
  Spa: "rgb(111,151,173)", Sparkling: "rgb(111,151,173)",
  White: "rgb(213,213,102)", Red: "rgb(131,39,72)",
  Rose: "rgb(224,123,143)",  Other: "rgb(180,180,180)",
};
export const TYPE_COLOR_MAP = {
  Spa: [111,151,173], Sparkling: [111,151,173],
  White: [213,213,102], Red: [131,39,72],
  Rose: [224,123,143],  Other: [180,180,180],
};
export const getTypeColorCSS = (type, fallback = "rgb(180,180,180)") => {
  if (!type) return fallback;
  const key = String(type).trim();
  if (TYPE_COLOR_CSS[key]) return TYPE_COLOR_CSS[key];
  const norm = key.toLowerCase().replace(/é/g, "e");
  if (norm.includes("spark")) return TYPE_COLOR_CSS.Spa;
  if (norm.includes("white") || norm.includes("blanc")) return TYPE_COLOR_CSS.White;
  if (norm.includes("red")   || norm.includes("rouge")) return TYPE_COLOR_CSS.Red;
  if (norm.includes("rose")  || norm.includes("ros"))   return TYPE_COLOR_CSS.Rose;
  return fallback;
};

// ===== クラスタ配色・メタ（集約ポイント）=====
export const CLUSTER_COUNT = 10; // ← 運用は10クラスター

// 配色（1..20用意。COUNTが10でも余剰は無視）
export const CLUSTER_COLORS_FIXED = {
  7:  [231, 201, 183, 255],  // 1.甘口フルーティー
  9:  [216, 209, 119, 255],  // 2.スパイシーアロマ
  2:  [235, 220, 80, 255],  // 3.華やかフローラル
  12:  [195, 218, 147, 255],  // 4.辛口フルーティー
  11:  [164, 137, 66, 255],  // 5.スモーキー熟成
  8:  [112, 175, 84, 255],  // 6.フレッシュ爽快
  10:  [148, 218, 199, 255],  // 7.キリッと軽やか
  1:  [196, 73, 75, 255],  // 8.軽やか芳醇
  4:  [183, 73, 128, 255],  // 9.華やかリッチ
  6:  [113, 77, 126, 255],  // 10.滑らか中ボディ
  5:  [41, 23, 47, 255],  // 11.濃厚フルボディ
  3:  [108, 38, 38, 255],  // 12.骨格スモーキー
};
export const getClusterRGBA = (clusterId, fallback = [200,200,200,255]) =>
  CLUSTER_COLORS_FIXED?.[Number(clusterId)] ?? fallback;

// クラスタ名・“買う目安”解説（ここで一元管理）
export const CLUSTER_META = [
  { id: 7,  name: "1.甘口フルーティー",   hint: "低アルで甘味が強く、熟した蜜のような風味を楽しめるタイプ" },
  { id: 9,  name: "2.スパイシーアロマ",     hint: "種子やハーブを思わせる複雑な香りが広がる、香り豊かなタイプ" },
  { id: 2,  name: "3.華やかフローラル",     hint: "白い花や柑橘を思わせる華やかな香りと、酸味が楽しめるタイプ" },
  { id: 12,  name: "4.辛口フルーティー",       hint: "リンゴや洋梨を思わせる華やかな果実香が広がるタイプ" },
  { id: 11, name: "5.スモーキー熟成",    hint: "熟成由来の奥深い香りと独特な風味を楽しめる、個性的なタイプ" },
  { id: 8,  name: "6.フレッシュ爽快",       hint: "若葉や青リンゴを思わせるフレッシュな香りが広がる爽快なタイプ" },
  { id: 10,  name: "7.キリッと軽やか",       hint: "キリッとした酸味と軽快な飲み口、すっきり爽やかなタイプ" },
  { id: 1,  name: "8.軽やか芳醇",       hint: "やわらかな口当たりと程よいコクを持つ、バランスのよいタイプ" },
  { id: 4,  name: "9.華やかリッチ",     hint: "華やかな香りと豊かなコクを持つ、飲みごたえのあるタイプ" },
  { id: 6,  name: "10.滑らか中ボディ",     hint: "滑らかな口当たりと軽やかさを持つ、透明感のあるタイプ" },
  { id: 5,  name: "11.濃厚フルボディ",   hint: "熟した果実と豊かな香り、厚みのある味わいが特徴のタイプ" },
  { id: 3,  name: "12.骨格スモーキー",   hint: "熟成による複雑さとスモーキーな香りが調和した、力強いタイプ" },    
];

// 取得ヘルパ
export const getClusterMeta = (id) =>
  CLUSTER_META.find((m) => m.id === Number(id)) || { id, name: `Cluster_${id}`, hint: "" };


// ==============================
// 基準ワイン（Reference Wine）ロット情報
// ==============================

export const REFERENCE_LOTS = {
  rw1_2025_11: {
    lotId: "rw1_2025_11",
    label: "LnbRW-202511",   // "初回ロット（2025-11）"
    umap_x: -1.2275394,
    umap_y: 0.71609193,
    pc1: -3.51342642765963,
    pc2: -2.56728500895558,
    pc3: -3.98406468969432,
  },
  rw1_2026_08: {
    lotId: "rw1_2026_08",
    label: "LnbRW-202608",  // "2026.06.17.に変更したが変わらない / ここではなく上を変える"
    umap_x: -1.2275394,
    umap_y: 0.71609193,
    pc1: -3.51342642765963,
    pc2: -2.56728500895558,
    pc3: -3.98406468969432,
  },
};

// LOT_ID（例：rw1_2026_08）からロット情報を返す。
// 該当がなければデフォルト（初回ロット）を返す。
export const getReferenceLotById = (lotId) =>
  REFERENCE_LOTS[lotId] || REFERENCE_LOTS["rw1_2025_11"];

export const WINE_TYPE_LABELS = {
  sparkling: "スパークリング",
  spark: "スパークリング",
  spa: "スパークリング",

  white: "白ワイン",
  blanc: "白ワイン",

  red: "赤ワイン",
  rouge: "赤ワイン",

  rose: "ロゼワイン",
  rosé: "ロゼワイン",
  ros: "ロゼワイン",
};

export const toJapaneseWineType = (raw) => {
  if (!raw) return "—";
  const key = String(raw).trim().toLowerCase();
  return WINE_TYPE_LABELS[key] || raw;
};

export const clusterRGBAtoCSS = (rgba) => {
  if (!rgba) return "rgb(200,200,200)";
  const [r, g, b] = rgba;
  return `rgb(${r}, ${g}, ${b})`;
};

/* =============================
 *  EC商品（★表示）用 定数
 * ============================= */

// ★マーカーの基本サイズ（DeckGL world座標系）
export const EC_STAR_BASE_RADIUS = 0.09;      // 本体サイズ
export const EC_STAR_OUTLINE_RADIUS = 0.14;   // 外側の縁取りサイズ

// ★マーカーの色（RGBA）
export const EC_STAR_FILL_COLOR   = [0, 0, 0, 255];       // 中の★の色
export const EC_STAR_OUTLINE_COLOR = [255, 255, 255, 255]; // 外枠のカラー

// ★アイコン画像（IconLayer で使う場合）
export const EC_STAR_ICON_URL = `${process.env.PUBLIC_URL || ""}/img/ec-star.png`;

// ★凡例などで使う説明テキスト
export const EC_STAR_DESCRIPTION =
  "★はTasteMap公式ECで購入できるワインを表します。";

// =====================
// OFFICIAL STORE ID
// =====================
export const OFFICIAL_STORE_ID =
  Number(process.env.REACT_APP_OFFICIAL_STORE_ID || "1");
