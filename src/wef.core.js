/**
 * Created by JetBrains WebStorm.
 * User: diesire
 * Date: 06/12/11
 * Time: 15:47
 * To change this template use File | Settings | File Templates.
 */
(function(global) {
    var wef = {
        VERSION: "0.0.1"
    };

    if(global.wef) {
        throw new Error("wef has already been defined");
    } else {
        global.wef = wef;
    }
})(typeof window === 'undefined' ? this : window);