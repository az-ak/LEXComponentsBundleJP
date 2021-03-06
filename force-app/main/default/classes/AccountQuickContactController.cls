/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

public with sharing class AccountQuickContactController {

    /*  Lightningコンポーネントがコールするすべての関数は @AuraEnabled アノテーションが関数シグネチャの前に必要です。
		例:
			@AuraEnabled
			public static void someFunction(Object parameter){}

		さらに:
			- メソッドは static で、かつ public または global とマークされている必要があります。非静的メソッドはサポートされていません。
			- メソッドがオブジェクトを返す場合、オブジェクトのインスタンス項目の値を取得するインスタンスメソッドは public である必要があります。
			- コンポーネント内のクライアント側アクションとサーバ側アクションには別の名前を使用して下さい。JavaScript関数(クライアント側アクション)
			  とApexメソッド(サーバ側アクション)が同じ名前だと、問題が発生したときにデバッグしにくくなるおそれがあります。デバッグモードにおいては
			  フレームワークによって、クライアント側アクション名とサーバ側アクション名の競合に関する警告がブラウザコンソールに記録されます。
	*/

    @AuraEnabled
    public static void newQuickContactForAccount(String accountId, String firstName, String lastName, String phone, String email){
        Contact c = new Contact();
        c.FirstName = firstName;
        c.LastName = lastName;
        c.Phone = phone;
        c.Email = email;
        c.AccountId = accountId;
        insert c;
    }
}
