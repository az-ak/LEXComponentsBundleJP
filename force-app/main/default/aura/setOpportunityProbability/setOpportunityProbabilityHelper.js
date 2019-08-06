/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // これはJavaScriptコントローラのヘルパー関数です。
    // コードを再利用し、同じ内容を複数箇所に記述することを避けるために使います。
	updateProbability : function(value, component) {

        // recordId属性をコンポーネントから得ます。
        var id = component.get("v.recordId");

        // Apexコントローラの関数は以下のように指定します。
        // このコンポーネントがJavaScriptコントローラとApexコントローラの橋渡しをします。
        var action = component.get("c.updateProbability");

        // Apexコントローラの関数に引数を設定します。
        // パラメータ名はApexコントローラの関数の引数名と正確に一致している必要があります。
        action.setParams({
            "id" : id,
            "prob" : value
        });

        // ここでApexコントローラからレスポンスを得た際に何を行うかを定義します。
        action.setCallback(this,
        	// functionの引数にApexコントローラのレスポンスをとりfunction内で実行する内容を定義します。
          	function(response){
                // レスポンスの状態（成功/失敗）を保存します。
            	var state = response.getState();
            	if(state === "SUCCESS"){
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title" : "成功",
                        "message" : "商談は更新されました。",
                        "type" : "success"
                    });
                    resultsToast.fire();
                	// 以下はAura関数をコールしています。これらはユーザインタフェースを制御する事前定義の関数です。
                	// Auraに関してのより詳しい情報は以下を参照してください:
                	//	https://<myDomain>.lightning.force.com/auradocs/reference.app
                	// "<myDomain>" は組織の実際のドメインに変更して下さい。
                	$A.get("e.force:refreshView").fire();
                	$A.get("e.force:closeQuickAction").fire();
            	}else{
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
        // ここでApexコントローラの関数を実行しています。
        $A.enqueueAction(action);
	}
})
