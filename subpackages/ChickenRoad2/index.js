window.__require = function t(e, n, i) {
function c(a, s) {
if (!n[a]) {
if (!e[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!e[r]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(r, !0);
if (o) return o(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var u = n[a] = {
exports: {}
};
e[a][0].call(u.exports, function(t) {
return c(e[a][1][t] || t);
}, u, u.exports, t, e, n, i);
}
return n[a].exports;
}
for (var o = "function" == typeof __require && __require, a = 0; a < i.length; a++) c(i[a]);
return c;
}({
ChickRoad2_Cfg: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "7bf6cLEcWBGA65THXK4yC/q", "ChickRoad2_Cfg");
e.exports = {
GameScript: "ChickRoad2_Game",
normalBgm: "bgm",
helpItems: [ "ChickenRoad2/%s" ],
bet_records: "games/ChickenRoad2/prefab/record_pannel",
closeEmotion: !0,
NumberTuning_Max_Eff: "click",
NumberTuning_Min_Eff: "click",
help_prefab: "games/ChickenRoad2/prefab/help"
};
cc._RF.pop();
}, {} ],
ChickRoad2_GameData: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "ff786uW6sNFyKLVwA8nSx9s", "ChickRoad2_GameData");
cc.Class({
extends: t("Table_GameData_Base"),
properties: {},
RegisterMsg: function() {
this._super();
cc.vv.NetManager.registerMsg(MsgId.PLACE_BET, this.OnRcvNetPlaceBet, this);
cc.vv.NetManager.registerMsg(MsgId.PLACE_ACTION, this.OnRcvNetGameAction, this);
},
UnregisterMsg: function() {
this._super();
cc.vv.NetManager.unregisterMsg(MsgId.PLACE_BET, this.OnRcvNetPlaceBet, !1, this);
cc.vv.NetManager.unregisterMsg(MsgId.PLACE_ACTION, this.OnRcvNetGameAction, !1, this);
},
getUserRound: function() {
return this._deskInfo.user.round;
},
getServerConfig: function() {
return this._deskInfo.config;
},
getClientSeed: function() {
return this._deskInfo.user.cs;
},
getServerSeed: function() {
return this._deskInfo.user.ss;
},
setServerSeed: function(t) {
this._deskInfo.user.ss = t;
},
getMultsByDifficulty: function(t) {
for (var e = 0; e < this._deskInfo.config.options.length; e++) if (this._deskInfo.config.options[e].difficulty == t) return this._deskInfo.config.options[e].mults;
return [];
},
sendBetReq: function(t, e) {
var n = {
c: MsgId.PLACE_BET,
betcoin: t,
difficulty: e
};
cc.vv.NetManager.send(n);
this.addMyCoin(-t, !0);
},
OnRcvNetPlaceBet: function(t) {
200 == t.code && cc.isValid(this._script_game) && this._script_game.OnRcvNetPlaceBet(t);
},
sendGameActionReq: function(t) {
var e = {
c: 51
};
e.rtype = t;
cc.vv.NetManager.send(e);
},
OnRcvNetGameAction: function(t) {
if (200 == t.code) {
if (2 == t.rtype || 1 == t.over) {
this.addGameRecord(t.round.result);
cc.vv.gameData.addMyCoin(t.round.wincoin);
}
cc.isValid(this._script_game) && this._script_game.OnRcvNetGameAction(t);
}
}
});
cc._RF.pop();
}, {
Table_GameData_Base: void 0
} ],
ChickRoad2_Game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6197adX+SNLxKw5hHaLc/P8", "ChickRoad2_Game");
function i(t, e, n, i, c, o, a) {
try {
var s = t[o](a), r = s.value;
} catch (t) {
n(t);
return;
}
s.done ? e(r) : Promise.resolve(r).then(i, c);
}
function c(t) {
return function() {
var e = this, n = arguments;
return new Promise(function(c, o) {
var a = t.apply(e, n);
function s(t) {
i(a, c, o, s, r, "next", t);
}
function r(t) {
i(a, c, o, s, r, "throw", t);
}
s(void 0);
});
};
}
cc.Class({
extends: t("Table_Game_Base"),
properties: {},
onLoad: function() {
this._map = this.node.getChildByName("node_map").getComponent("ChickRoad2_Map");
this._op = this.node.getChildByName("node_op").getComponent("ChickRoad2_Op");
Global.setLabelString("node_top/unit", this.node, cc.vv.UserManager.getPriceUnitL());
Global.onClick("node_top/btn_menu", this.node, this.onClickMenu, this);
Global.onClick("node_pf/pf_bg/btn_close", this.node, this.onClickPFClose, this);
Global.onClick("node_pf/pf_bg/db_01/btn_copy", this.node, this.onClickPFCopyClientSeed, this);
Global.onClick("node_pf/pf_bg/db_02/btn_copy", this.node, this.onClickPFCopyServerSeed, this);
},
start: function() {},
showGameByStatus: function() {
var t = cc.vv.gameData.deskInfo || cc.vv.gameData.deskinfo;
t && t.online && Global.setLabelString("node_top/lbl_online", this.node, "Online: " + t.online);
},
setDifficulty: function(t) {
this._map.setDifficulty(t);
},
OnRcvNetPlaceBet: function(t) {
var e = this;
return c(regeneratorRuntime.mark(function n() {
return regeneratorRuntime.wrap(function(n) {
for (;;) switch (n.prev = n.next) {
case 0:
if (0 != t.spcode) {
n.next = 16;
break;
}
cc.vv.gameData.setServerSeed(t.ss);
e._map.step(t.round.step);
if (0 != t.over) {
n.next = 10;
break;
}
n.next = 6;
return e._map.chickGo(t.round.step, t.round.mult);

case 6:
e._op.setCanGo(!0);
e._op.setCashOutCoin(t.round.mult * t.round.betcoin);
n.next = 14;
break;

case 10:
n.next = 12;
return e._map.chickDead(t.round.step);

case 12:
e._op.setCanBet(!0);
e._map.reset();

case 14:
n.next = 17;
break;

case 16:
if (519 == t.spcode) e._op.setCanGo(!0); else {
e._op.setCanBet(!0);
e._op.onClickAutoStop();
}

case 17:
case "end":
return n.stop();
}
}, n);
}))();
},
OnRcvNetGameAction: function(t) {
var e = this;
return c(regeneratorRuntime.mark(function n() {
var i;
return regeneratorRuntime.wrap(function(n) {
for (;;) switch (n.prev = n.next) {
case 0:
if (425 != t.spcode) {
n.next = 3;
break;
}
e._op.setCanBet(!0);
return n.abrupt("return");

case 3:
if (1 != t.rtype) {
n.next = 31;
break;
}
if (0 != t.over) {
n.next = 11;
break;
}
n.next = 7;
return e._map.chickGo(t.round.step, t.round.mult);

case 7:
e._op.setCashOutCoin(t.round.mult * t.round.betcoin);
e._op.setCanGo(!0);
n.next = 29;
break;

case 11:
if (1 != t.res) {
n.next = 24;
break;
}
n.next = 14;
return e._map.chickWin(t.round.step, t.round.mult);

case 14:
e._op.setCashOutCoin(t.round.mult * t.round.betcoin);
e.showWinCoin(t.round.mult, t.round.wincoin);
n.next = 18;
return cc.vv.gameData.awaitTime(3);

case 18:
cc.vv.gameData.refushMyCoin();
e.hideWinCoin();
e._op.setCanBet(!0);
e._map.reset();
n.next = 28;
break;

case 24:
n.next = 26;
return e._map.chickDead(t.round.step);

case 26:
e._op.setCanBet(!0);
e._map.reset();

case 28:
e._op.setStep(0);

case 29:
n.next = 43;
break;

case 31:
if (2 != t.rtype) {
n.next = 42;
break;
}
Global.TableSoundMgr.playEffect("cashout");
e.showWinCoin(t.round.mult, t.round.wincoin);
n.next = 36;
return cc.vv.gameData.awaitTime(1.8);

case 36:
cc.vv.gameData.refushMyCoin();
e.hideWinCoin();
e._op.setCanBet(!0);
e._map.reset();
n.next = 43;
break;

case 42:
if (3 == t.rtype) Global.setLabelString("node_top/lbl_online", e.node, "Online: " + t.online); else if (4 == t.rtype) {
i = cc.find("node_top/livewin", e.node);
Global.setLabelString("lbl_coin", i, "+" + cc.vv.UserManager.getPriceUnit() + t.coin.toFixed(2));
Global.setLabelString("lbl_name", i, t.name);
i.active = !0;
cc.tween(i).to(0, {
y: -110,
opacity: 127
}).to(.2, {
y: -178,
opacity: 255
}).delay(2.5).to(.2, {
opacity: 0
}).start();
}

case 43:
case "end":
return n.stop();
}
}, n);
}))();
},
showWinCoin: function(t, e) {
var n = cc.find("node_win", this.node);
Global.setLabelString("lbl_coin", n, "" + e.toFixed(2));
n.active = !0;
cc.tween(n).to(.25, {
scale: 1.2,
opacity: 225
}).to(.25, {
scale: 1,
opacity: 255
}).to(.25, {
scale: 1.1,
opacity: 240
}).to(.25, {
scale: 1,
opacity: 255
}).start();
},
hideWinCoin: function() {
cc.find("node_win", this.node).active = !1;
},
showAutoPlay: function(t, e) {},
setAutoPlay: function(t, e) {
t > 0 && e > 0 && this._op.setAutoPlay(t, e);
},
onClickMenu: function(t) {
Global.TableSoundMgr.playCommonEff("com_click");
var e = t.node;
cc.loader.loadRes("games/ChickenRoad2/prefab/menu_detail", cc.Prefab, function(n, i) {
if (!n && cc.isValid(e)) {
var c = e.parent.getChildByName("menu_detail");
if (!c) {
var o = cc.instantiate(i);
Global.FixDesignScale_V(o, !0);
o.name = "menu_detail";
o.parent = e;
var a = o.scaleY, s = t.target;
if (s) {
var r = s.convertToWorldSpaceAR(cc.Vec2(0, 0)), l = e.convertToNodeSpaceAR(r);
o.position = cc.v2(l.x, l.y + s.height / 2 * a);
}
c = o;
}
}
});
},
showPF: function() {
var t = cc.find("node_pf", this.node);
Global.setLabelString("pf_bg/db_01/lbl_seed", t, cc.vv.gameData.getClientSeed());
Global.setLabelString("pf_bg/db_02/scroll/view/content/lbl_seed", t, cc.vv.gameData.getServerSeed());
t.active = !0;
},
onClickPFClose: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.find("node_pf", this.node).active = !1;
},
onClickPFCopyClientSeed: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(cc.vv.gameData.getClientSeed());
cc.vv.FloatTip.show("Copied");
},
onClickPFCopyServerSeed: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(cc.vv.gameData.getServerSeed());
cc.vv.FloatTip.show("Copied");
},
getStep: function() {
return this._op.getStep();
}
});
cc._RF.pop();
}, {
Table_Game_Base: void 0
} ],
ChickRoad2_History_Detail: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "c4533tnsfRHPICelPK5LUVR", "ChickRoad2_History_Detail");
cc.Class({
extends: t("Table_History_Detail"),
properties: {},
start: function() {},
showGameResult: function(t) {
var e = t.mult, n = cc.find("ui/node_result/val", this.node);
n.getComponent(cc.Label).string = e + "x";
n.color = e > 1.5 ? cc.Color.GREEN : cc.Color.RED;
},
showGameType: function(t) {
var e = t.mult, n = cc.find("ui/node_type/val", this.node);
n.getComponent(cc.Label).string = e + "x";
n.color = e > 1.5 ? cc.Color.GREEN : cc.Color.RED;
}
});
cc._RF.pop();
}, {
Table_History_Detail: void 0
} ],
ChickRoad2_Map: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "01456wtnPROVJhoVJ8ioK4/", "ChickRoad2_Map");
function i(t, e, n, i, c, o, a) {
try {
var s = t[o](a), r = s.value;
} catch (t) {
n(t);
return;
}
s.done ? e(r) : Promise.resolve(r).then(i, c);
}
function c(t) {
return function() {
var e = this, n = arguments;
return new Promise(function(c, o) {
var a = t.apply(e, n);
function s(t) {
i(a, c, o, s, r, "next", t);
}
function r(t) {
i(a, c, o, s, r, "throw", t);
}
s(void 0);
});
};
}
cc.Class({
extends: cc.Component,
properties: {
objects: cc.SpriteAtlas
},
onLoad: function() {
this._scollview = this.node.getComponent(cc.ScrollView);
var t = cc.find("view/content", this.node);
this._item_start = cc.find("item_start", t);
this._item_end = cc.find("item_end", t);
this._mult = cc.find("mult", t);
var e = cc.find("item0", t);
this._items = [];
this._items.push(e);
var n = cc.find("car0", t);
n.zIndex = 20;
this._cars = [];
this._cars.push(n);
this._car_times = [];
this._size = 32;
for (var i = 1; i < 32; i++) {
var c = cc.instantiate(e);
t.addChild(c);
this._items.push(c);
var o = cc.instantiate(n);
o.zIndex = 20;
t.addChild(o);
this._cars.push(o);
this._car_times.push(4 * Math.random() + 4);
}
this._chick = cc.find("chick", t);
this._chick.zIndex = 10;
},
start: function() {
var t = this, e = cc.vv.gameData.getUserRound();
if (e) {
this.setDifficulty(e.difficulty);
for (var n = 0; n < e.step - 1; n++) {
var i = this._items[n], c = cc.find("luke_bg", i);
c.opacity = 255;
Global.setSpriteFrame("luke", c, this.objects.getSpriteFrame("luke_gold"));
cc.find("stopper", i).active = !0;
}
var o = this._items[e.step - 1];
cc.find("luke_bg", o).scaleX = 0;
cc.find("stopper", o).active = !0;
this._mult.active = !0;
this._mult.x = o.x;
Global.setLabelString("lbl_mult", this._mult, e.mult.toFixed(2) + "x");
this._chick.position = cc.v2(190 + 413 * e.step, this._chick.y);
this.scheduleOnce(function() {
t._scollview.scrollToOffset(cc.v2(413 * e.step - 40, 0), 0);
}, .2);
} else this.setDifficulty(1);
},
setDifficulty: function(t) {
var e = cc.vv.gameData.getMultsByDifficulty(t);
this._size = e.length;
for (var n = 0; n < this._items.length; n++) {
var i = this._items[n];
if (n < this._size) {
cc.find("luke_bg", i).opacity = 200;
Global.setLabelString("luke_bg/lbl_mult", i, e[n].toFixed(2) + "x");
i.x = 600 + 413 * n;
i.active = !0;
cc.find("dash", i).active = n != this._size - 1;
} else i.active = !1;
}
this._item_end.x = 600 + 413 * e.length;
cc.find("view/content", this.node).setContentSize(413 * (e.length + 3), 1600);
},
step: function(t) {
Global.TableSoundMgr.playEffect("jump");
this._chick.getComponent(sp.Skeleton).setAnimation(0, "jump", !1);
cc.tween(this._chick).to(.3, {
position: cc.v2(205 + 413 * t, this._chick.y)
}).start();
this._scollview.scrollToOffset(cc.v2(413 * t - 40, 0), .3);
},
chickGo: function(t, e) {
var n = this;
return c(regeneratorRuntime.mark(function i() {
var c, o, a, s, r, l, u, d;
return regeneratorRuntime.wrap(function(i) {
for (;;) switch (i.prev = i.next) {
case 0:
n._mult.active = !1;
n.step(t);
c = n._items[t - 1];
(o = cc.find("stopper", c)).active = !0;
o.getChildByName("stopper").opacity = 0;
o.getChildByName("shadow").opacity = 0;
cc.tween(o.getChildByName("stopper")).to(0, {
y: 120
}).delay(.1).to(.1, {
y: 0,
opacity: 255
}).start();
cc.tween(o.getChildByName("shadow")).to(0, {
y: 52
}).delay(.1).to(.1, {
y: -8,
opacity: 255
}).start();
if ((a = n._cars[t - 1]).opacity > 0) {
if ((s = a.y) > 300) a.opacity = 0; else if (s > -1e3) {
a.stopAllActions();
cc.tween(a).to(.25, {
y: -1500
}).to(0, {
opacity: 0
}).start();
}
} else Math.random() < .25 && n.showCarStop(t - 1);
r = cc.find("luke_bg", c);
cc.tween(r).to(.2, {
scaleX: 0
}).start();
if (!(t < n._size)) {
i.next = 20;
break;
}
i.next = 16;
return cc.vv.gameData.awaitTime(.6);

case 16:
n._chick.getComponent(sp.Skeleton).setAnimation(0, "idle", !0);
i.next = 22;
break;

case 20:
i.next = 22;
return cc.vv.gameData.awaitTime(.5);

case 22:
n._mult.active = !0;
n._mult.x = c.x;
Global.setLabelString("lbl_mult", n._mult, e.toFixed(2) + "x");
if (t > 1) {
l = n._items[t - 2];
u = cc.find("luke_bg", l);
Global.setSpriteFrame("luke_bg/luke", l, n.objects.getSpriteFrame("luke_gold"));
cc.find("luke_bg/lbl_mult", l).active = !1;
cc.tween(u).to(.1, {
scaleX: 1,
opacity: 255
}).start();
}
if (t < n._size) {
d = n._items[t];
cc.find("luke_bg", d).opacity = 255;
}

case 27:
case "end":
return i.stop();
}
}, i);
}))();
},
chickWin: function(t, e) {
var n = this;
return c(regeneratorRuntime.mark(function i() {
var c, o, a, s, r;
return regeneratorRuntime.wrap(function(i) {
for (;;) switch (i.prev = i.next) {
case 0:
i.next = 2;
return n.chickGo(t, e);

case 2:
Global.TableSoundMgr.playEffect("jump");
(c = n._chick.getComponent(sp.Skeleton)).setAnimation(0, "jump", !1);
cc.tween(n._chick).to(.3, {
position: cc.v2(205 + 413 * (t + 1), n._chick.y)
}).start();
i.next = 8;
return cc.vv.gameData.awaitTime(.25);

case 8:
n._mult.active = !1;
o = n._items[t - 1];
a = cc.find("luke_bg", o);
Global.setSpriteFrame("luke_bg/luke", o, n.objects.getSpriteFrame("luke_gold"));
cc.find("luke_bg/lbl_mult", o).active = !1;
cc.tween(a).to(.1, {
scaleX: 1,
opacity: 255
}).start();
s = cc.find("tape1", n._item_end).getComponent(sp.Skeleton);
r = cc.find("tape2", n._item_end).getComponent(sp.Skeleton);
s.setAnimation(0, "finish_back", !1);
r.setAnimation(0, "finish_front", !1);
i.next = 20;
return cc.vv.gameData.awaitTime(.25);

case 20:
c.setAnimation(0, "win", !0);
Global.TableSoundMgr.playEffect("win");

case 22:
case "end":
return i.stop();
}
}, i);
}))();
},
chickDead: function(t) {
var e = this;
return c(regeneratorRuntime.mark(function n() {
var i, c;
return regeneratorRuntime.wrap(function(n) {
for (;;) switch (n.prev = n.next) {
case 0:
e.step(t);
i = e._items[t - 1];
if (t < e._size) {
c = cc.find("luke_bg", i);
cc.tween(c).to(.2, {
scaleX: 0
}).start();
}
e.showCarCrash(t - 1);
n.next = 6;
return cc.vv.gameData.awaitTime(.5);

case 6:
e._chick.getComponent(sp.Skeleton).setAnimation(0, "death", !1);
Global.TableSoundMgr.playEffect("lose");
n.next = 11;
return cc.vv.gameData.awaitTime(1.75);

case 11:
case "end":
return n.stop();
}
}, n);
}))();
},
reset: function() {
this._chick.stopAllActions();
this._chick.position = cc.v2(190, this._chick.y);
this._chick.getComponent(sp.Skeleton).setAnimation(0, "idle", !0);
for (var t = 0; t < this._size; t++) {
var e = cc.find("luke_bg", this._items[t]);
e.opacity = 200;
e.scaleX = 1;
Global.setSpriteFrame("luke", e, this.objects.getSpriteFrame("luke_default"));
cc.find("lbl_mult", e).active = !0;
cc.find("stopper", this._items[t]).active = !1;
this._car_times[t] = 4 * Math.random() + 4;
this._cars[t].opacity = 0;
}
this._mult.active = !1;
var n = cc.find("tape1", this._item_end).getComponent(sp.Skeleton), i = cc.find("tape2", this._item_end).getComponent(sp.Skeleton);
n.setAnimation(0, "idle_back", !0);
i.setAnimation(0, "idle_front", !0);
this._scollview.scrollToOffset(cc.v2(0, 0), .5);
},
randomCar: function(t) {
Math.random() < .25 ? t.getComponent(cc.Sprite).spriteFrame = this.objects.getSpriteFrame("carInOut" + Global.random(1, 2)) : t.getComponent(cc.Sprite).spriteFrame = this.objects.getSpriteFrame("car" + Global.random(1, 6));
},
showCarStop: function(t) {
var e = this._cars[t];
e.stopAllActions();
this.randomCar(e);
e.opacity = 255;
e.x = 600 + 413 * t;
e.y = 800;
var n = .2 * Math.random() + .5;
cc.tween(e).to(n, {
y: -10
}, {
easing: "sineOut"
}).start();
Global.TableSoundMgr.playEffect("crash");
},
showCarCross: function(t, e) {
var n = this._cars[t];
n.stopAllActions();
this.randomCar(n);
n.opacity = 255;
n.x = 600 + 413 * t;
n.y = 800;
cc.tween(n).to(e, {
y: -1500
}).to(0, {
opacity: 0
}).start();
},
showCarCrash: function(t) {
var e = this._cars[t];
if (e.opacity > 0 && e.y < 300 && e.y > -1e3) {
var n = cc.instantiate(e);
n.zIndex = 20;
e.parent.addChild(n);
n.x = e.x;
n.y = e.y;
cc.tween(n).to(.25, {
y: -1500
}).call(function() {
n.destroy();
}).start();
}
this.showCarCross(t, 1);
Global.TableSoundMgr.playEffect("car" + Global.random(1, 2));
},
update: function(t) {
for (var e = cc.vv.gameData.getScriptGame().getStep(), n = e; n < this._size; n++) {
this._car_times[n] -= t;
if (this._car_times[n] <= 0) {
this._car_times[n] = 4 * Math.random() + 4;
var i = Math.random() + .8;
n == e && (i = Math.min(i, 1));
this.showCarCross(n, i);
}
}
}
});
cc._RF.pop();
}, {} ],
ChickRoad2_Menu: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "07400Tu4CZBeb5x5esEaMjw", "ChickRoad2_Menu");
cc.Class({
extends: t("Table_menu_detail"),
properties: {},
onLoad: function() {
this._super();
Global.onClick("btn_history", this.node, this.onClickHistory, this);
Global.onClick("btn_provablyfair", this.node, this.onClickProvablyFair, this);
},
onClickHistory: function() {
Global.TableSoundMgr.playEffect("click");
var t = cc.vv.gameData.getGameCfg().bet_records || "Table_Common/TableRes/prefab/record_bet_pannel";
cc.loader.loadRes(t, cc.Prefab, function(t, e) {
var n = cc.find("Canvas");
if (cc.isValid(n) && !n.getChildByName("record_pannel")) {
var i = cc.instantiate(e);
i.parent = n;
i.name = "record_pannel";
}
});
this.node.destroy();
},
onClickProvablyFair: function() {
Global.TableSoundMgr.playEffect("click");
cc.vv.gameData.getScriptGame().showPF();
this.node.destroy();
}
});
cc._RF.pop();
}, {
Table_menu_detail: void 0
} ],
ChickRoad2_Op: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "36838zz5OhNAama+3vlKzx5", "ChickRoad2_Op");
function i(t, e, n, i, c, o, a) {
try {
var s = t[o](a), r = s.value;
} catch (t) {
n(t);
return;
}
s.done ? e(r) : Promise.resolve(r).then(i, c);
}
function c(t) {
return function() {
var e = this, n = arguments;
return new Promise(function(c, o) {
var a = t.apply(e, n);
function s(t) {
i(a, c, o, s, r, "next", t);
}
function r(t) {
i(a, c, o, s, r, "throw", t);
}
s(void 0);
});
};
}
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this._diffcuty = 1;
this._step = 0;
this._unit = " " + cc.vv.UserManager.getPriceUnitL();
Global.onClick("btn_diffcuty", this.node, this.onClickDiffcuty, this);
Global.onClick("btn_play", this.node, this.onClickPlay, this);
Global.onClick("btn_go", this.node, this.onClickGo, this);
Global.onClick("btn_cashout", this.node, this.onClickCashOut, this);
for (var t = cc.vv.gameData.getServerConfig(), e = 1; e <= 4; e++) {
var n = cc.find("quick_bet/btn_bet" + e, this.node);
n.on("click", this.onClickQuickBet, this);
Global.setLabelString("lbl_val", n, t.quickbet[e - 1]);
var i = cc.find("options/option" + e, this.node);
i._tag = e;
i.on("click", this.onClickOption, this);
}
this._autoSpins = -1;
this._autoStep = 1;
this._autoPause = !1;
this._canBet = !0;
this._canGo = !1;
this._isCheckAutoPlay = !1;
this._isCheckAutoGo = !1;
},
start: function() {
var t = cc.vv.gameData.getUserRound();
if (t) {
this.setDifficulty(t.difficulty, !1);
cc.find("bet_bg", this.node).getComponent("Number_Tuning").setValue(t.betcoin);
this.setCanBet(!1);
this.setCanGo(!0);
this.setCashOutCoin(t.betcoin * t.mult);
this.setStep(t.step);
}
},
setDifficulty: function(t) {
var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
this._diffcuty = t;
Global.setLabelString("btn_diffcuty/lbl_val", this.node, [ "Easy", "Medium", "Hard", "Hardcore" ][this._diffcuty - 1]);
cc.find("options", this.node).active = !1;
e && cc.vv.gameData.getScriptGame().setDifficulty(this._diffcuty);
},
onClickDiffcuty: function() {
Global.TableSoundMgr.playEffect("click");
var t = cc.find("options", this.node);
t.active = !t.active;
cc.find("btn_diffcuty/icon_02", this.node).angle = t.active ? 0 : 180;
for (var e = 1; e <= 4; e++) cc.find("options/option" + e + "/icon", this.node).active = e == this._diffcuty;
},
onClickOption: function(t) {
Global.TableSoundMgr.playEffect("click");
var e = t.node;
e._tag != this._diffcuty && this.setDifficulty(e._tag);
},
onClickQuickBet: function(t) {
Global.TableSoundMgr.playEffect("click");
var e = t.node.getChildByName("lbl_val").getComponent(cc.Label).string;
cc.find("bet_bg", this.node).getComponent("Number_Tuning").setValue(parseInt(e));
},
setCanBet: function(t) {
this._canBet = t;
var e = cc.find("bet_bg", this.node);
e.getComponent(cc.Button).interactable = t;
var n = cc.find("btn_min", e);
n.getComponent(cc.Button).interactable = t;
n.opacity = t ? 255 : 127;
var i = cc.find("btn_max", e);
i.getComponent(cc.Button).interactable = t;
i.opacity = t ? 255 : 127;
for (var c = 1; c <= 4; c++) {
var o = cc.find("quick_bet/btn_bet" + c, this.node);
o.getComponent(cc.Button).interactable = t;
o.opacity = t ? 255 : 127;
}
var a = cc.find("btn_diffcuty", this.node);
a.getComponent(cc.Button).interactable = t;
a.opacity = t ? 255 : 127;
this._autoSpins >= 0 ? a.active = !0 : a.active = t;
cc.find("btn_play", this.node).active = t;
var s = cc.find("btn_cashout", this.node), r = cc.find("btn_go", this.node);
if (t) {
s.active = !1;
r.active = !1;
Global.setLabelString("btn_cashout/Background/lbl_coin", this.node, "—");
this._checkAutoPlay();
} else if (this._autoSpins < 0) {
s.active = !0;
r.active = !0;
}
},
setCanGo: function(t) {
this._canGo = t;
var e = cc.find("btn_go", this.node);
e.getComponent(cc.Button).interactable = t;
var n = cc.find("btn_cashout", this.node);
n.getComponent(cc.Button).interactable = t;
if (t && this._autoSpins < 0) {
n.active = !0;
e.active = !0;
cc.find("btn_diffcuty", this.node).active = !1;
}
t && this._checkAutoGo();
},
onClickPlay: function() {
var t = this;
return c(regeneratorRuntime.mark(function e() {
var n;
return regeneratorRuntime.wrap(function(e) {
for (;;) switch (e.prev = e.next) {
case 0:
Global.TableSoundMgr.playEffect("click");
cc.find("options", t.node).active = !1;
n = cc.find("bet_bg", t.node).getComponent("Number_Tuning").getValue();
if (cc.vv.gameData.isCoinEncough(n)) {
e.next = 8;
break;
}
cc.vv.gameData.showChargeTips();
t.onClickAutoStop();
return e.abrupt("return");

case 8:
t.setCanBet(!1);
cc.vv.gameData.sendBetReq(n, t._diffcuty);
t._step = 1;

case 11:
case "end":
return e.stop();
}
}, e);
}))();
},
setCashOutCoin: function(t) {
Global.setLabelString("btn_cashout/Background/lbl_coin", this.node, t.toFixed(2) + this._unit);
},
onClickGo: function() {
Global.TableSoundMgr.playEffect("click");
this.setCanGo(!1);
cc.vv.gameData.sendGameActionReq(1);
this._step += 1;
},
onClickCashOut: function() {
Global.TableSoundMgr.playEffect("click");
this.setCanGo(!1);
cc.vv.gameData.sendGameActionReq(2);
},
onClickAutoStart: function() {},
setAutoPlay: function(t, e) {},
_checkAutoPlay: function() {
return c(regeneratorRuntime.mark(function t() {
return regeneratorRuntime.wrap(function(t) {
for (;;) switch (t.prev = t.next) {
case 0:
case "end":
return t.stop();
}
}, t);
}))();
},
_checkAutoGo: function() {
return c(regeneratorRuntime.mark(function t() {
return regeneratorRuntime.wrap(function(t) {
for (;;) switch (t.prev = t.next) {
case 0:
case "end":
return t.stop();
}
}, t);
}))();
},
onClickAutoStop: function() {},
onClickPause: function() {},
onClickResume: function() {},
_showAutoMode: function(t) {},
setStep: function(t) {
this._step = t;
},
getStep: function() {
return this._step;
}
});
cc._RF.pop();
}, {} ],
ChickRoad2_Provably_Fiar: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "05464gaiSxAhoWVstz1NJbo", "ChickRoad2_Provably_Fiar");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var t = cc.find("pf_bg", this.node);
Global.onClick("btn_close", t, this.onClickClose, this);
Global.onClick("db_01/btn_copy", t, this.onClickCopyClientSeed, this);
Global.onClick("db_02/btn_copy", t, this.onClickCopyServerSeed, this);
Global.onClick("db_03/btn_copy", t, this.onClickCopyHash, this);
Global.onClick("db_04/btn_copy", t, this.onClickCopyHex, this);
Global.onClick("db_05/btn_copy", t, this.onClickCopyDecimal, this);
Global.onClick("btn_settings", t, this.onClickPfSettings, this);
},
hexToDecimal: function(t) {
var e = BigInt("0x".concat(t)).toString();
if (e.length <= 16) return Number(e);
var n = e.length - 1, i = e.slice(0, 16);
return parseFloat("".concat(i[0], ".").concat(i.slice(1), "e+").concat(n));
},
init: function(t) {
var e = JSON.parse(t.result);
this._result = e;
var n = cc.find("pf_bg", this.node);
Global.setLabelString("lbl_name", n, cc.vv.UserManager.getNickName());
Global.setLabelString("lbl_issue", n, "Bet ID #" + t.i);
Global.setLabelString("lbl_mult", n, "x" + e.mult);
Global.setLabelString("db_01/lbl_seed", n, e.cs);
Global.setLabelString("db_02/scroll/view/content/lbl_seed", n, e.ss);
var i = sha512(e.ss + e.cs + e.nonce);
this._hash = i;
Global.setLabelString("db_03/scroll/view/content/lbl_hash", n, i);
Global.setLabelString("db_04/scroll/view/content/lbl_hash", n, i);
var c = this.hexToDecimal(i);
this._dec = c;
Global.setLabelString("db_05/lbl_decimal", n, c);
Global.setLabelString("db_06/lbl_mult", n, "x" + e.mult);
Global.setLabelString("db_07/lbl_bet", n, t.bet);
Global.setLabelString("db_08/lbl_win", n, t.win);
},
onClickClose: function() {
Global.TableSoundMgr.playCommonEff("com_click");
this.node.destroy();
},
onClickCopyClientSeed: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(this._result.cs);
cc.vv.FloatTip.show("Copied");
},
onClickCopyServerSeed: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(this._result.ss);
cc.vv.FloatTip.show("Copied");
},
onClickCopyHash: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(this._hash);
cc.vv.FloatTip.show("Copied");
},
onClickCopyHex: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(this._hash);
cc.vv.FloatTip.show("Copied");
},
onClickCopyDecimal: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.PlatformApiMgr.Copy(this._dec);
cc.vv.FloatTip.show("Copied");
},
onClickPfSettings: function() {
Global.TableSoundMgr.playCommonEff("com_click");
cc.vv.gameData.getScriptGame().showPF();
Global.dispatchEvent("EVENT_CLOSE_PANNEL");
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
ChickRoad2_Record_Item: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "e3605DraVNCnZNF1/O5GuEy", "ChickRoad2_Record_Item");
cc.Class({
extends: t("Table_Record_Item"),
properties: {},
onLoad: function() {
Global.onClick("btn_pf", this.node, this.onClickPf, this);
},
showGameResult: function(t) {
Global.setLabelString("node_result/lbl", this.node, "x" + t.mult);
},
showGameOption: function(t) {
var e = JSON.parse(this._itemdata.result);
e.cs && e.ss ? cc.find("btn_pf", this.node).active = !0 : cc.find("btn_pf", this.node).active = !1;
},
onClickDetail: function() {},
onClickPf: function() {
var t = this;
cc.loader.loadRes("games/ChickenRoad2/prefab/result_provably_fair", cc.Prefab, function(e, n) {
if (!e) {
var i = cc.instantiate(n);
i.parent = cc.find("Canvas");
i.getComponent("ChickRoad2_Provably_Fiar").init(t._itemdata);
}
});
Global.TableSoundMgr.playCommonEff("com_click");
}
});
cc._RF.pop();
}, {
Table_Record_Item: void 0
} ],
ChickRoad2_Record_Pannel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "1369cRgC1VOPaDiSBk1H35Q", "ChickRoad2_Record_Pannel");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
Global.registerEvent("EVENT_CLOSE_PANNEL", this.onEvtClosePannel, this);
},
onEvtClosePannel: function() {
this.node.destroy();
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "ChickRoad2_Cfg", "ChickRoad2_Game", "ChickRoad2_GameData", "ChickRoad2_History_Detail", "ChickRoad2_Map", "ChickRoad2_Menu", "ChickRoad2_Op", "ChickRoad2_Provably_Fiar", "ChickRoad2_Record_Item", "ChickRoad2_Record_Pannel" ]);