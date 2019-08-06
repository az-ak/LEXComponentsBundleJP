/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */

public with sharing class MassUpdateAccountCasesController {
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
    public static void massUpdateAccountCases(String id){
        List<Case> cases = [SELECT Id, Status FROM Case WHERE AccountId=:id LIMIT 1000];
        for(Case cse : cases){
            cse.Status = 'Closed';
            cse.Priority = 'Low';
            cse.Description = 'Case Closed.';
        }
        update cases;
    }
}
