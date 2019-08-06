/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // これはJavaScriptコントローラのヘルパー関数です。
    // コードを再利用し、同じ内容を複数箇所に記述することを避けるために使います。
	openAddress : function(component, addressType) {

        // recordId属性をコンポーネントから得ます。
        var recordId = component.get("v.recordId");

        // Apexコントローラの関数は以下のように指定します。
        // このコンポーネントがJavaScriptコントローラとApexコントローラの橋渡しをします。
        var action = component.get("c.getAccountAddress");

        // Apexコントローラの関数に引数を設定します。
        // パラメータ名はApexコントローラの関数の引数名と正確に一致している必要があります。
        action.setParams({
            "id" : recordId,
            "addressType" : addressType
        });

        // ここでApexコントローラからレスポンスを得た際に何を行うかを定義します。
        action.setCallback(this,
        	// functionの引数にApexコントローラのレスポンスをとりfunction内で実行する内容を定義します。
            function(response){
                // レスポンスの状態（成功/失敗）を保存します。
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    // コンポーネントにおいて"account"という属性を定義しました。
                    // これがオブジェクトのプレースホルダーとなります。
                    // ここでApexコントローラから戻されたオブジェクトをこのコンポーネントに格納しています。
                	component.set("v.account", response.getReturnValue());

                    // サーバから戻されたオブジェクトはコンポーネントに保存されました。
                    // このコンポーネントからデータを得て使用します。
                	var account = component.get("v.account");

                    // 「請求先」が選択されていた場合
                	if(addressType == "Billing"){
                        // リダイレクトさせるために、URLをパラメータとしてイベントを発火します。
                        // URL用の変数を作成し、Google MapのURLと引数として取引先のアドレスを組み立てます。
                    	var url = "https://www.google.com/maps/search/?api=1&query="+account.BillingStreet+"+"+account.BillingCity
                				+",+"+account.BillingState+",+"+account.BillingCountry;

                        // これがリダイレクトを実行するイベントです。まずは定義します。
                		var urlEvent = $A.get("e.force:navigateToURL");

                        // 次にURLをイベントのパラメータとして設定します。
                		urlEvent.setParams({
                   			"url" : url
                        });
                        // イベントを発火します。
                		urlEvent.fire();
                		$A.get("e.force:closeQuickAction").fire();

                	}else{
                    	var url = "https://www.google.com/maps/search/?api=1&query="+account.ShippingStreet+"+"+account.ShippingCity
                				+",+"+account.ShippingState+",+"+account.ShippingCountry;
                		var urlEvent = $A.get("e.force:navigateToURL");
                		urlEvent.setParams({
                   			"url" : url
                		});
                		urlEvent.fire();
                		$A.get("e.force:closeQuickAction").fire();
                	}
            	}
            	else{
                    // 以下はエラーハンドリングの一般的な方法です。
                	var errors = response.getError();
                    if(errors){
                        if(errors[0] && errors[0].message){
                            console.log("Error Message: " + errors[0].message);
                        }else{
                            console.log("Unknown error");
                        }
                    }
            	}
        	}
        );
		$A.enqueueAction(action);
	}
})
