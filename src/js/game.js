import $ from 'jquery' ;
import _ from 'lodash' ;
import Poker from './poker' ;
import { createPokers } from './poker' ;
import { getTopLeftMatchAreas, getTopRightMatchAreas, getBottomMatchAreas} from './matchAreas'

let matchAreas = [] ;
let pokerIds = [
    '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11', '1-12', '1-13',
    '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9', '2-10', '2-11', '2-12', '2-13', 
    '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9', '3-10', '3-11', '3-12', '3-13', 
    '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11', '4-12', '4-13'
];
const isMatch = (a, b, c) => Math.abs(a - b) < c

window.onload = function () {
    let pokers = createPokers(_.shuffle(pokerIds))($(".bottom"));
    pokers = _.keyBy(pokers, 'pokerId') ;
    let matchAreas = getTopLeftMatchAreas($(".top_left"))
        .concat(getTopRightMatchAreas($(".top_right")))
        .concat(getBottomMatchAreas($(".bottom")));
    
    let movePoker = null ;
    let zIndex = 51 ;
    $("#content").on("mousedown", ".top_left .pai, .bottom .pai:last-child", function (e) {
        let pokerId = $(this).attr("poker") ;
        movePoker = pokers[pokerId] ;
        movePoker.mouseToLeft = e.pageX - $(this).offset().left;
        movePoker.mouseToTop = e.pageY - $(this).offset().top;
    });

    $("body").on("mousemove", function (e) {
        if(!movePoker) return false ;
        var left = e.pageX - movePoker.mouseToLeft;
        var top = e.pageY - movePoker.mouseToTop;
        movePoker.$node
            .offset({ "left": left, "top": top})
            .css("z-index", "10000000") ;
        movePoker.pageX = left ;
        movePoker.pageY = top;
    });

    $("body").on("mouseup", function (e) {
        if (!movePoker) return false;
        _.each(matchAreas, function (matchArea) {
            if ( matchArea.canMatch
                 && isMatch(matchArea.pageX, movePoker.pageX, 30) 
                 && isMatch(matchArea.pageY, movePoker.pageY, 45)
                 && (matchArea.num == movePoker.num || matchArea.num == -1)
                 && (matchArea.color1 == movePoker.color || matchArea.color2 == movePoker.color || matchArea.color1 == -1)
             ){
                movePoker.parent = matchArea.$node ;
                movePoker.left = matchArea.left ;
                movePoker.top = matchArea.top;
                movePoker.zIndex = zIndex++ ;
                movePoker.insert() ;
                movePoker = null ;
                matchAreas = getTopLeftMatchAreas($(".top_left"))
                    .concat(getTopRightMatchAreas($(".top_right")))
                    .concat(getBottomMatchAreas($(".bottom")));
                return false ;
            }
        })
        if (movePoker) {
            movePoker.$node.animate({ "left": 7, "top": movePoker.top, "zIndex": movePoker.zIndex }, 100);
            movePoker = null;
        }
    })
}