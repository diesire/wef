/**
 * Created by JetBrains WebStorm.
 * User: diesire
 * Date: 06/12/11
 * Time: 15:49
 * To change this template use File | Settings | File Templates.
 */
TestCase("wef.coreTest", {
    "test wef not null": function() {
        assertNotNull(window.wef);
    },
    "test wef": function() {
        assertEquals("0.0.1", window.wef.VERSION);
    }
});