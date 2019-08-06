# Sample Components for Lightning Component Actions
## はじめに
このリポジトリは
https://github.com/developerforce/LEXComponentsBundle の日本語意訳版です。ラベルとコメントを翻訳したほか一部コードの変更を行っています。また、動作確認をしやすくするためオリジナルには存在しないアクションボタン自体のメタデータも含んでいます（オブジェクトに依存しない 4.ldsDeleteRecord を除く）。<br>
LWCは2019年8月現在アクションをサポートしていないため、すべてauraコンポーネントです。ロジック部分をLWCで記述しauraコンポーネントでwrapするという方法がありえますが、このリポジトリでは考慮していません。
***
## リポジトリの内容
このリポジトリはLightning Actionを実装するためのサンプルLightningコンポーネント(auraコンポーネント)を含んでいます。Salesforce ClassicのJavaScriptボタンをLightning Actionに置き換える際の参考にしてください。このサンプルではJavaScriptボタンで一般的な以下のユースケースを取り上げています。
1. ダイアログ
2. 条件付きURL遷移
3. 一括更新

## コンポーネントとクラス
#### auraコンポーネント名を以下にリストしています。それぞれについて、ユースケース、対象オブジェクト、説明、関連するファイルを記載しています。
#### Lightning Data Service を使っているコンポーネント名は“lds”で始まります。

1. accountQuickContact - 取引先責任者簡易作成(Apex)
    * ユースケース: ダイアログ
    * オブジェクト: 取引先(Account)
    * 説明: フォームを開き取引先に紐づく取引先責任者を作成します。ldsAccountQuickContact と似ていますがこちらではApexクラスにデータを送信しています。
    * ファイル:
        * accountQuickContact.cmp
        * accountQuickContactController.js
        * accountQuickContact.css
        * AccountQuickContactController.cls
        * TestAccountQuickContactController.cls
        * Account.accountQuickContact.quickAction-meta.xml
2. ldsAccountQuickContact - 取引先責任者簡易作成(LDS)
    * ユースケース: ダイアログ
    * オブジェクト: 取引先(Account)
    * 説明: Lightning Data Service を使用して取引先に紐づく取引先責任者を作成します。 accountQuickContact と同様の機能をApexクラスなしに実現しています。
    * ファイル:
        * ldsAccountQuickContact.cmp
        * ldsAccountQuickContactController.js
        * ldsAccountQuickContact.css
        * Account.ldsAccountQuickContact.quickAction-meta.xml
3. ldsDisplayRecord - ポップアップで取引先レコードの表示
    * ユースケース: ダイアログ
    * オブジェクト: 取引先(Account)
    * 説明: Lightning Data Service を使用してレコードを表示する例です。ポップアップウィンドウで現行のレコードに関する情報を表示します。この場合はJavaScriptコントローラもApexコントローラも不要です。
    * ファイル:
        * ldsDisplayRecord.cmp
        * ldsDisplayRecordController.js
        * ldsDisplayRecord.css
        * Account.ldsDisplayRecord.quickAction-meta.xml
4. ldsDeleteRecord - レコード削除
    * ユースケース: ダイアログ
    * オブジェクト: オブジェクトの種類に依存せず
    * 説明: Lightning Data Service を使用してレコードを削除する例です。JavaScriptコントローラでLDSを使ってレコードを削除するため、Apexコントローラは不要です。
    * ファイル:
        * ldsDeleteRecord.cmp
        * ldsDeleteRecordController.js
        * ldsDeleteRecord.css
5. ldsSaveRecord - 取引先名変更
    * ユースケース: ダイアログ
    * オブジェクト: 取引先(Account)
    * 説明: Lightning Data Service を使用してレコードを更新する例です。ポップアップウィンドウで編集フォームが表示され、保存するとレコードが更新されます。この場合はJavaScriptコントローラもApexコントローラも不要です。JavaScriptコントローラでLDSを使ってレコードを更新するため、Apexコントローラは不要です。
    * ファイル:
        * ldsSaveRecord.cmp
        * ldsSaveRecordController.js
        * ldsSaveRecord.css
        * Account.ldsSaveRecord.quickAction-meta.xml
6. massUpdateAccountCases - 取引先に紐づくケースの一括更新
    * ユースケース: 一括更新
    * オブジェクト: 取引先(Account)
    * 説明: 取引先に紐づくケースを一括更新します。優先度を“Low”、状況を“Closed”、 説明を“Case Closed.”に更新します。
    * ファイル:
        * massUpdateAccountCases.cmp
        * massUpdateAccountCases.css
        * MassUpdateAccountCasesController.js
        * MassUpdateAccountCasesController.cls
        * TestMassUpdateAccountCasesController.cls
        * Account.massUpdateAccountCases.quickAction-meta.xml
7. probonoOpportunity - 商談をプロボノ商談（無料の商談）に変換
    * ユースケース: ダイアログ
    * オブジェクト: 商談(Opportunity)
    * 説明: 実行すると確認のポップアップウィンドウが開き、続行すると、商談の金額が0になり、説明にプロボノ商談に変換されたことが追記されます。
    * ファイル:
        * probonoOpportunity.cmp
        * probonoOpportunityController.js
        * probonoOpportunity.css
        * ProBonoOpportunityController.cls
        * TestProBonoOpportunityController.cls
        * Opportunity.probonoOpportunity.quickAction-meta
8. redirectConditionalUrl - 取引先の請求先あるいは納入先の地図を表示
    * Use case: 条件付きURL遷移
    * オブジェクト: 取引先(Account)
    * 説明: ポップアップウィンドウで請求先か納入先かを選択すると、その住所をGoogle Mapで開きます。レコードIDをサーバに送り住所情報を得ています。
    * ファイル:
        * redirectConditionalUrl.cmp
        * redirectConditionalUrlController.js
        * recirectConditionalUrlHelper.js
        * redirectConditionalUrl.css
        * RedirectConditionalUrlController.cls
        * TestRedirectConditionalUrlController.cls
        * Account.redirectConditionalUrl.quickAction-meta.xml
9. setOpportunityProbability - 商談の確度をボタンで更新
    * ユースケース: ダイアログ
    * オブジェクト: 商談(Opportunity)
    * 説明: ポップアップウィンドウで３つのボタンを表示します。ボタンを押すと商談の確度がそれぞれ 80%, 50%, 20% に更新されます。JavaScriptコントローラがレコードIDと選ばれた選択肢をApexクラスに送信しています。
    * ファイル:
        * setOpportunityProbability.cmp
        * setOpportunityProbabilityController.js
        * setOpportunityProbabilityHelper.js
        * setOpportunityProbability.css
        * setOpportunityProbabilityController.cls
        * TestSetOpportunityProbabilityController.cls
        * Opportunity.setOpportunityProbability.quickAction-meta.xml

## 利用方法
JavaScriptボタンに対応する機能をLightningで実装したい場合、まずは[Lightning Configuration Converter](https://lightning-configuration.salesforce.com/)で他の仕組みに変換できないかをご確認下さい。使用方法は[こちら](https://success.salesforce.com/0D53A00003tjmxL)を参照してください。
代替手段をLightning Actionで実装する必要があると判断した場合は、このサンプルから実際のユースケースに近いものを選び変更してみてください。
## インストール方法
まずはサンプルをインストールし、それぞれがどのように動作するか確認されることをお勧めします。
### Salesforce CLI を使用:
sfdxコマンドが使用できDevHubと接続している場合、以下のコマンドでScratch組織を作成しLightning Actionをインストールすることができます。
* #### Mac / Linux
```
git clone https://github.com/az-ak/LEXComponentsBundleJP
cd LEXComponentsBundleJP
./install.sh
```
* #### Windows
```
git clone https://github.com/az-ak/LEXComponentsBundleJP
cd LEXComponentsBundleJP
install.cmd
```
### Salesforce CLI を使用しない:
Developer EditionあるいはSandbox組織に非管理パッケージとしてインストールする場合はこのリンクからインストールしてください。
[Click here to install](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t0I000000jDZK)

## インストール後の設定
Salesforce CLIでインストールした場合も、非管理パッケージでインストールした場合も、実際に確認する前にLightning Actionをページレイアウトに載せる必要があります。<br>
ボタンを載せたいオブジェクトのページレイアウトを開き、**Salesforce モバイルおよび Lightning Experience のアクション**のセクションに**モバイルおよび Lightning のアクション**からボタンをドラッグアンドドロップしてください。
（**Salesforce モバイルおよび Lightning Experience のアクション**のエリアに何もない場合、最初に**定義済みアクションを上書き**のリンクをクリックしてください。）

4.ldsDeleteRecord についてはアクションボタンを事前作成していません。これを確認する場合は、以下の手順でアクションボタンの作成から行ってください。
1. ボタンを載せたいオブジェクトの**ボタン、リンク、およびアクション**から**新規アクション**を作成
2. **アクション種別**で**Lightning コンポーネント**を選択
3. **Lightning コンポーネント**で**c.ldsDeleteRecord**を選択
4. 高さ、表示ラベル、名前を入力し保存
5. アクションボタンをページレイアウトに配置
