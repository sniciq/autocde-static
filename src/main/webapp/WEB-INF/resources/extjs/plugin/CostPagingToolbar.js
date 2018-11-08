(function() {

var T = Ext.Toolbar;

Ext.CostPagingToolbar = Ext.extend(Ext.Toolbar, {
    
/**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} the paging toolbar should use as its data source (required).
     */
    
/**
     * @cfg {Boolean} displayInfo
     * true to display the displayMsg (defaults to false)
     */
    
/**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to 20)
     */
    pageSize : 20,
    
/**
     * @cfg {Boolean} prependButtons
     * true to insert any configured items before the paging buttons.
     * Defaults to false.
     */
    
/**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to 'Displaying {0} - {1} of {2}').
     * Note that this string is formatted using the braced numbers {0}-{2} as tokens
     * that are replaced by the values for start, end and total respectively. These tokens should
     * be preserved when overriding this string if showing those values is desired.
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    
/**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to 'No data to display')
     */
    emptyMsg : 'No data to display',
    
/**
     * @cfg {String} beforePageText
     * The text displayed before the input item (defaults to 'Page').
     */
    beforePageText : 'Page',
    
/**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text (defaults to 'of {0}'). Note that
     * this string is formatted using {0} as a token that is replaced by the number of
     * total pages. This token should be preserved when overriding this string if showing the
     * total page count is desired.
     */
    afterPageText : 'of {0}',
    
/**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button (defaults to 'First Page').
     * Note: quick tips must be initialized for the quicktip to show.
     */
    firstText : 'First Page',
    
/**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button (defaults to 'Previous Page').
     * Note: quick tips must be initialized for the quicktip to show.
     */
    prevText : 'Previous Page',
    
/**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button (defaults to 'Next Page').
     * Note: quick tips must be initialized for the quicktip to show.
     */
    nextText : 'Next Page',
    
/**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button (defaults to 'Last Page').
     * Note: quick tips must be initialized for the quicktip to show.
     */
    lastText : 'Last Page',
    
/**
     * @cfg {String} refreshText
     * The quicktip text displayed for the Refresh button (defaults to 'Refresh').
     * Note: quick tips must be initialized for the quicktip to show.
     */
    refreshText : 'Refresh',

    
/**
     * 
Deprecated. paramNames should be set in the data store
     * (see {@link Ext.data.Store#paramNames}).


     * 
Object mapping of parameter names used for load calls, initially set to:


     * 
{start: 'start', limit: 'limit'}

     * @type Object
     * @property paramNames
     * @deprecated
     */

    
/**
     * The number of records to display per page.  See also {@link #cursor}.
     * @type Number
     * @property pageSize
     */

    
/**
     * Indicator for the record position.  This property might be used to get the active page
     * number for example:

     * // t is reference to the paging toolbar instance
     * var activePage = Math.ceil((t.cursor + t.pageSize) / t.pageSize);
     * 

     * @type Number
     * @property cursor
     */

    initComponent : function(){
        var pagingItems = [this.first = new T.Button({
            tooltip: this.firstText,
            overflowText: this.firstText,
            iconCls: 'x-tbar-page-first',
            disabled: true,
            handler: this.moveFirst,
            scope: this
        }), this.prev = new T.Button({
            tooltip: this.prevText,
            overflowText: this.prevText,
            iconCls: 'x-tbar-page-prev',
            disabled: true,
            handler: this.movePrevious,
            scope: this
        }), '-', this.beforePageText,
        this.inputItem = new Ext.form.NumberField({
            cls: 'x-tbar-page-number',
            allowDecimals: false,
            allowNegative: false,
            enableKeyEvents: true,
            selectOnFocus: true,
            submitValue: false,
            listeners: {
                scope: this,
                keydown: this.onPagingKeyDown,
                blur: this.onPagingBlur
            }
        }), this.afterTextItem = new T.TextItem({
            text: String.format(this.afterPageText, 1)
        }), '-', this.next = new T.Button({
            tooltip: this.nextText,
            overflowText: this.nextText,
            iconCls: 'x-tbar-page-next',
            disabled: true,
            handler: this.moveNext,
            scope: this
        }), this.last = new T.Button({
            tooltip: this.lastText,
            overflowText: this.lastText,
            iconCls: 'x-tbar-page-last',
            disabled: true,
            handler: this.moveLast,
            scope: this
        }), '-', this.refresh = new T.Button({
            tooltip: this.refreshText,
            overflowText: this.refreshText,
            iconCls: 'x-tbar-loading',
            handler: this.doRefresh,
            scope: this
        })];


        var userItems = this.items || this.buttons || [];
        if (this.prependButtons) {
            this.items = userItems.concat(pagingItems);
        }else{
            this.items = pagingItems.concat(userItems);
        }
        delete this.buttons;
        if(this.displayInfo){
            this.items.push('->');
            this.items.push(this.displayItem = new T.TextItem({}));
        }
        Ext.CostPagingToolbar.superclass.initComponent.call(this);
        this.addEvents(
            
/**
             * @event change
             * Fires after the active page has been changed.
             * @param {Ext.CostPagingToolbar} this
             * @param {Object} pageData An object that has these properties:

             * 
total : Number 
The total number of records in the dataset as
             * returned by the server

             * 
activePage : Number 
The current page number

             * 
pages : Number 
The total number of pages (calculated from
             * the total number of records in the dataset as returned by the server and the current {@link #pageSize})

             * 

             */
            'change',
            
/**
             * @event beforechange
             * Fires just before the active page is changed.
             * Return false to prevent the active page from being changed.
             * @param {Ext.CostPagingToolbar} this
             * @param {Object} params An object hash of the parameters which the CostPagingToolbar will send when
             * loading the required page. This will contain:

             * 
start : Number 
The starting row number for the next page of records to
             * be retrieved from the server

             * 
limit : Number 
The number of records to be retrieved from the server

             * 

             * 
(note: the names of the start and limit properties are determined
             * by the store's {@link Ext.data.Store#paramNames paramNames} property.)


             * 
Parameters may be added as required in the event handler.


             */
            'beforechange'
        );
        this.on('afterlayout', this.onFirstLayout, this, {single: true});
        this.cursor = 0;
        this.bindStore(this.store, true);
    },

    // private
    onFirstLayout : function(){
        if(this.dsLoaded){
            this.onLoad.apply(this, this.dsLoaded);
        }
    },

    // private
    updateInfo : function(){
        if(this.displayItem){
            var count = this.store.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.store.getTotalCount(),this.store.reader.jsonData.costTime
                );
            this.displayItem.setText(msg);
        }
    },

    // private
    onLoad : function(store, r, o){
        if(!this.rendered){
            this.dsLoaded = [store, r, o];
            return;
        }
        var p = this.getParams();
        this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
        var d = this.getPageData(), ap = d.activePage, ps = d.pages;

        this.afterTextItem.setText(String.format(this.afterPageText, d.pages));
        this.inputItem.setValue(ap);
        this.first.setDisabled(ap == 1);
        this.prev.setDisabled(ap == 1);
        this.next.setDisabled(ap == ps);
        this.last.setDisabled(ap == ps);
        this.refresh.enable();
        this.updateInfo();
        this.fireEvent('change', this, d);
    },

    // private
    getPageData : function(){
        var total = this.store.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    
/**
     * Change the active page
     * @param {Integer} page The page to display
     */
    changePage : function(page){
        this.doLoad(((page-1) * this.pageSize).constrain(0, this.store.getTotalCount()));
    },

    // private
    onLoadError : function(){
        if(!this.rendered){
            return;
        }
        this.refresh.enable();
    },

    // private
    readPage : function(d){
        var v = this.inputItem.getValue(), pageNum;
        if (!v || isNaN(pageNum = parseInt(v, 10))) {
            this.inputItem.setValue(d.activePage);
            return false;
        }
        return pageNum;
    },

    onPagingFocus : function(){
        this.inputItem.select();
    },

    //private
    onPagingBlur : function(e){
        this.inputItem.setValue(this.getPageData().activePage);
    },

    // private
    onPagingKeyDown : function(field, e){
        var k = e.getKey(), d = this.getPageData(), pageNum;
        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = this.readPage(d);
            if(pageNum !== false){
                pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
                this.doLoad(pageNum * this.pageSize);
            }
        }else if (k == e.HOME || k == e.END){
            e.stopEvent();
            pageNum = k == e.HOME ? 1 : d.pages;
            field.setValue(pageNum);
        }else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN){
            e.stopEvent();
            if((pageNum = this.readPage(d))){
                var increment = e.shiftKey ? 10 : 1;
                if(k == e.DOWN || k == e.PAGEDOWN){
                    increment *= -1;
                }
                pageNum += increment;
                if(pageNum >= 1 & pageNum <= d.pages){
                    field.setValue(pageNum);
                }
            }
        }
    },

    // private
    getParams : function(){
        //retain backwards compat, allow params on the toolbar itself, if they exist.
        return this.paramNames || this.store.paramNames;
    },

    // private
    beforeLoad : function(){
        if(this.rendered && this.refresh){
            this.refresh.disable();
        }
    },

    // private
    doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.load({params:o});
        }
    },

    
/**
     * Move to the first page, has the same effect as clicking the 'first' button.
     */
    moveFirst : function(){
        this.doLoad(0);
    },

    
/**
     * Move to the previous page, has the same effect as clicking the 'previous' button.
     */
    movePrevious : function(){
        this.doLoad(Math.max(0, this.cursor-this.pageSize));
    },

    
/**
     * Move to the next page, has the same effect as clicking the 'next' button.
     */
    moveNext : function(){
        this.doLoad(this.cursor+this.pageSize);
    },

    
/**
     * Move to the last page, has the same effect as clicking the 'last' button.
     */
    moveLast : function(){
        var total = this.store.getTotalCount(),
            extra = total % this.pageSize;

        this.doLoad(extra ? (total - extra) : total - this.pageSize);
    },

    
/**
     * Refresh the current page, has the same effect as clicking the 'refresh' button.
     */
    doRefresh : function(){
        this.doLoad(this.cursor);
    },

    
/**
     * Binds the paging toolbar to the specified {@link Ext.data.Store}
     * @param {Store} store The store to bind to this toolbar
     * @param {Boolean} initial (Optional) true to not remove listeners
     */
    bindStore : function(store, initial){
        var doLoad;
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un('beforeload', this.beforeLoad, this);
                this.store.un('load', this.onLoad, this);
                this.store.un('exception', this.onLoadError, this);
            }
            if(!store){
                this.store = null;
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                scope: this,
                beforeload: this.beforeLoad,
                load: this.onLoad,
                exception: this.onLoadError
            });
            doLoad = true;
        }
        this.store = store;
        if(doLoad){
            this.onLoad(store, null, {});
        }
    },

    
/**
     * Unbinds the paging toolbar from the specified {@link Ext.data.Store} (deprecated)
     * @param {Ext.data.Store} store The data store to unbind
     */
    unbind : function(store){
        this.bindStore(null);
    },

    
/**
     * Binds the paging toolbar to the specified {@link Ext.data.Store} (deprecated)
     * @param {Ext.data.Store} store The data store to bind
     */
    bind : function(store){
        this.bindStore(store);
    },

    // private
    onDestroy : function(){
        this.bindStore(null);
        Ext.CostPagingToolbar.superclass.onDestroy.call(this);
    }
});

})();
Ext.reg('costpaging', Ext.CostPagingToolbar);