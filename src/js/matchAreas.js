import $ from 'jquery'

/***
    // 匹配区域信息
    let matchItems = {
        node: null,     //匹配成功后，移动的牌会插入该dom节点
        pageX: null,    //该区域距离浏览器窗口左侧的距离
        pageY: null,    //该区域距离浏览器窗口顶部的距离
        num: null,      //可匹配牌的数值大小 (范围[1-13])
        color: null,    //可匹配牌的花色  (范围[1-4])
        canMatch: null, //该区域是否可以被匹配
        left: null,     //匹配成功之后插入node节点的牌的left定位
        top: null,      //匹配成功之后插入node节点的牌的top定位
    }
*/

//跟新左上区域的可匹配信息
export const getTopLeftMatchAreas = function (selected) {
    let matchAreas = [];
    selected.each(function () {
        let offset = $(this).offset();
        matchAreas.push({
            $node: $(this),
            pageX: offset.left,
            pageY: offset.top,
            num: -1,
            color1: -1,
            color2: -1,
            canMatch: $(this).children().length > 0 ? false : true,
            left: 7,
            top: 7
        })
    })
    return matchAreas;
}

//获取右上区域的可匹配信息
export const getTopRightMatchAreas = function (selected) {
    let matchAreas = [];
    selected.each(function () {
        let _self = $(this);
        let childrenLen = _self.children().length;
        let color = childrenLen ? getPokerColor(_self.children().last()) : -1;
        let offset = _self.offset();
        matchAreas.push({
            $node: _self,
            pageX: offset.left,
            pageY: offset.top,
            num: childrenLen + 1,
            color1: childrenLen ? color : -1,
            color2: childrenLen ? color : -1,
            canMatch: true,
            left: 7,
            top: 7
        })
    })
    return matchAreas;
}

// 获取底部区域可匹配信息
export const getBottomMatchAreas = function (selected) {
    let matchAreas = [];
    selected.each(function () {
        let _self = $(this);
        let childrenLen = _self.children().length;
        let color = childrenLen ? getPokerColor(_self.children().last()) : -1;
        let offset = childrenLen ? _self.children().last().offset() : _self.offset();
        matchAreas.push({
            $node: _self,
            pageX: offset.left,
            pageY: offset.top,
            num: childrenLen ? getPokerNum(_self.children().last()) - 1 : -1,
            color1: childrenLen ? 5 - color : -1,
            color2: childrenLen ? (5 - color - 2 > 0 ? 5 - color - 2 : 5 - color + 2) : -1,
            canMatch: true,
            left: 7,
            top: childrenLen ? (childrenLen) * 28 + 6 : 6
        })
    })
    return matchAreas;
}

//获取扑克牌的数值
const getPokerNum = function ($node) {
    return $node.attr("poker").slice(0, 4).split("-")[1] - 0;
}

//获取扑克牌的颜色
const getPokerColor = function ($node) {
    return $node.attr("poker").slice(0, 4).split("-")[0] - 0;
}