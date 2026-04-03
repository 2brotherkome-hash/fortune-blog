import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "宿曜占い｜誕生日の宿のプライバシーポリシーページです。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-purple-900 mb-8">プライバシーポリシー</h1>

      <div className="space-y-8 text-purple-800/80 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">個人情報の取り扱いについて</h2>
          <p>
            宿曜占い｜誕生日の宿（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
            当サイトでは、お問い合わせなどの際に氏名・メールアドレス等の個人情報をご提供いただく場合がありますが、
            これらの情報は目的外に利用しません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
            このGoogleアナリティクスはデータの収集のためにCookieを使用しています。
            このデータは匿名で収集されており、個人を特定するものではありません。
            この機能はCookieを無効にすることで収集を拒否することができます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービスおよびアフィリエイトプログラムを利用しています。
            広告配信事業者はCookieを使用してユーザーのウェブサイト閲覧情報に基づいた広告を配信することがあります。
            Cookieの使用はブラウザの設定から無効にすることができます。
          </p>
          <p className="mt-2">
            当サイトに掲載されているアフィリエイトリンクを経由してサービスを申し込まれた場合、
            当サイトが報酬を受け取ることがあります。掲載内容はこれにより影響を受けるものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">Cookieについて</h2>
          <p>
            Cookieとは、ウェブサーバーからユーザーのブラウザに送信される小さなデータファイルです。
            当サイトではアクセス解析のためにCookieを使用することがあります。
            ブラウザの設定によりCookieの受け入れを拒否することができますが、
            一部のサービスが利用できなくなる場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-purple-900 mb-3">プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本ポリシーを変更することがあります。
            重要な変更がある場合はサイト上でお知らせします。
          </p>
        </section>

        <p className="text-xs text-purple-400 pt-4 border-t border-purple-100">
          制定日：2026年4月1日
        </p>
      </div>
    </div>
  );
}
