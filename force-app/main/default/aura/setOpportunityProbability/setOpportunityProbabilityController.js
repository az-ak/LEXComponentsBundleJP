/*
 * Copyright (c) 2018, Salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root
*/

({
    // すべてのアクション関数は以下の書式で始めます。
    // nameOfFunction : function(component, event, helper)
    highProbability : function(component, event, helper){
        // 別の値を使って同様に動作する関数が複数必要になります。
        // 共通の関数はヘルパーに記述し重複を避けることにします。
        // componentと選択された値をを引数として共通のヘルパー関数を呼び出します。
        var p = '3';
        helper.updateProbability(p, component);
    },

    mediumProbability : function(component, event, helper){
        var p = '2';
        helper.updateProbability(p, component);
    },

    lowProbability : function(component, event, helper){
        var p = '1';
        helper.updateProbability(p, component);
    },

    cancel : function(component, event, helper){
        $A.get("e.force:closeQuickAction").fire();
    }
})
