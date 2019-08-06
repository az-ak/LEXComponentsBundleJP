/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
 */
 
 public with sharing class RedirectConditionalUrlController {
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
    public static Account getAccountAddress(String id, String addressType){
        if(addressType == 'Billing'){
            Account acc = [SELECT BillingStreet, BillingCity, BillingState, BillingCountry FROM Account WHERE Id=:id];
        	acc.BillingStreet = acc.BillingStreet.replace(' ', '+');
        	return acc;
        }else if(addressType == 'Shipping'){
            Account acc = [SELECT ShippingStreet, ShippingCity, ShippingState, ShippingCountry FROM Account WHERE Id=:id];
        	acc.ShippingStreet = acc.ShippingStreet.replace(' ', '+');
        	return acc;
        }else return null;
    }
}
