import $ from 'jquery';
class Poker{
    constructor(pokerId){
        let pokerIdArr = pokerId.split('-');
        this.pokerId = pokerId;
        this.num = pokerIdArr[1] ? pokerIdArr[1] : -1;
        this.color = pokerIdArr[0];
        this.left = '7';
        this.top = '';
        this.pageX = '';
        this.pageY = '';
        this.mouseToLeft = null;
        this.mouseToTop = null;
        this.canMove = false;
        this.$node = null;
        this.parent = null;
        this.zIndex = 1;
    }
    create$Node() {
        let url = require(`./../assets/img/${this.pokerId}.jpg`);
        this.$node = $("<div></div>")
            .css({ "backgroundImage": `url(${url})`, "top": this.top + "px", "left": this.left + "px" })
            .attr({ "class": "pai", "poker": this.pokerId });
        return this;
    }
    insert() {
        this.$node.css({ "top": this.top + "px", "left": this.left + "px", "zIndex": this.zIndex });
        this.parent.append(this.$node);
        return this;
    }
}

export const createPokers = function (pokerIds) {
    let pokers = pokerIds.map(function (pokerId, index) {
        let poker = new Poker(pokerId);
        poker.zIndex = index;
        return poker;
    });
    return function (parents) {
        return pokers.map(function (poker, i) {
            let parent = parents.eq(i % parents.length);
            let parentLen = parent.children().length;
            poker.parent = parent;
            poker.top = parentLen ? parentLen * 28 + 6 : 6;
            return poker.create$Node().insert();
        })
    }
}
export default Poker ;