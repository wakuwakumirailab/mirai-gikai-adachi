import type { NextConfig } from "next";

/**
 * 全ページに付ける基本のセキュリティヘッダー。
 * - 他のサイトへの埋め込み（クリックジャッキング）を防ぐ
 * - ブラウザによる内容の推測（MIMEスニッフィング）を止める
 * - 外部サイトへ送る参照元情報を最小限にする
 * - 使わないブラウザ機能（カメラ・マイク・位置情報など）を無効にする
 * 内容の厳しい制限（CSP）は、外部の分析・ふりがなスクリプトへの影響が大きいため、ここでは入れない。
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: "../",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "127.0.0.1",
        pathname: "/storage/v1/object/public/bill-thumbnails/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/storage/v1/object/public/bill-thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/bill-thumbnails/**",
      },
    ],
  },
};

export default nextConfig;
