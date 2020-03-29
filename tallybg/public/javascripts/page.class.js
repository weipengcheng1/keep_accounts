class Page {
    constructor(page, everyRow, count) {
        this.nowpage = page ? page : 1;
        this.count = count;
        //总页数
        this.totalPage = Math.ceil(count / everyRow);
        //上一页
        if (this.nowpage == 1) {
            this.lastPage = 1
        } else {
            this.lastPage = this.nowpage - 1;
        }
        //下一页
        if (this.nowpage < this.totalPage) {
            this.nextPage = this.nowpage + 1;
        } else {
            this.nextPage = this.totalPage;
        }
        //起始位置
        this.startRow = (this.nowpage - 1) * everyRow;
    }

    getStartRow() {
        return this.startRow;
    }

    getPageInfo() {
        const arr = [
            {
                'nextPage': this.nextPage,
                'lastPage': this.lastPage,
                "count": this.count,
                "totalPage": this.totalPage,
            }
        ]
        return arr;
    }

}
module.exports=Page;