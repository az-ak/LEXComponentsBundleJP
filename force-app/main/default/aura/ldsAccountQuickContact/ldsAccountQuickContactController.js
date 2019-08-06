/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // すべてのアクション関数は以下の書式で始めます。
    // nameOfFunction : function(component, event, helper)
	doInit : function(component, event, helper) {

        // 取引先責任者の force:recordData を指定し初期化、すなわち空のレコードを作成します。引数は
        // objectApiName ⇢ オブジェクトをContactと指定します。force:recordData ではオブジェクトの指定は行われていません。
        // recordTypeId ⇢ ここでは未指定です
        // skipCache ⇢ ローカルのキャッシュをskipするかどうかを指定できます
        // callback ⇢ 空のレコードが作成されたあと行われる関数。ここではエラーをチェックしています。
        component.find("contactRecordCreator").getNewRecord(
        	"Contact",
            null,
            false,
            $A.getCallback(function(){
                var rec = component.get("v.newContact");
                var error = component.get("v.newContactError");
                if(error || (rec === null)){
                    console.log("Error initializing record template: " + error);
                }else{
                    console.log("Record template initialized" + rec.sobjectType);
                }
            })
        );
	},

    handleSaveContact : function(component, event, helper){
        // 新しく作成された取引先責任者のAccountIdに v.recordId を指定しています。
        component.set("v.simpleNewContact.AccountId", component.get("v.recordId"));
        // 取引先責任者の force:recordData を指定し保存しています。
        // 引数はコールバック関数のみです。
        component.find("contactRecordCreator").saveRecord(function(saveResult){
            if(saveResult.state === "SUCCESS" || saveResult.state === "DRAFT"){
                // 成功時にはトーストで新規取引先が保存されたことを表示します。
                // ローカルキャッシュにのみ保存された場合 DRAFT となりますが、ネットワークが回復するとサーバに保存されます。
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title" : "成功",
                    "message" : "取引先責任者が作成されました",
                    "type" : "success"
                });
                $A.get("e.force:closeQuickAction").fire();
                resultsToast.fire();
                $A.get("e.force:refreshView").fire();
            // 以下はエラー発生時の処理です。
            }else if(saveResult.state === "INCOMPLETE"){
                console.log("User is offline, device doesn't support drafts.");
            }else if(saveResult.state === "ERROR"){
                console.log("Problem saving contact, error" + JSON.stringify(saveResult.error));
            }else{
                console.log("Unknown problem, state: " + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },

    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }


})
