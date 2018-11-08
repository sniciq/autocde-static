Ext.layout.FloatLayout = Ext.extend(Ext.layout.ContainerLayout, {
    setContainer: function(ct) {
        var ce = ct.getLayoutTarget();
        this.padding = this.parseMargins(this.padding||'0');
        this.padding.top += ce.getPadding('t');
        this.padding.left += ce.getPadding('l');
        Ext.layout.FloatLayout.superclass.setContainer.apply(this, arguments);
        ct.addClass('ux-float-layout-ct');
    },

    renderAll: function(ct) {
        var ce = this.container.getLayoutTarget(), nh;
        this.cw = ce.getWidth(true) + ce.getPadding('r');
        this.top = this.padding.top;
        this.left = this.padding.left;
        this.contentHeight = 0;
        this.rowHeight = 0;
        Ext.layout.FloatLayout.superclass.renderAll.apply(this, arguments);
        this.contentHeight += this.rowHeight;
        if ((nh = this.contentHeight + this.padding.top + this.padding.bottom + ce.getPadding('tb')) != ct.getHeight()) {
            ct.setHeight(nh);
            ct.ownerCt && ct.ownerCt.doLayout();
        }
    },

    renderItem : function(c, position, target){
        var r = c.rendered,
            e, p, pe, w, nextLeft;
        delete c.removeMode;
        Ext.layout.FloatLayout.superclass.renderItem.apply(this, arguments);
        e = c.getPositionEl();
        if (!r) {
            e.setStyle('position', 'absolute');
        }
        w = e.getWidth();

//      Wrap to the next line if necessary
        if (this.left + w > this.cw) {
            this.left = this.padding.left;
            this.top += this.rowHeight;
            this.contentHeight += this.rowHeight;
            this.rowHeight = 0;
        }
        e.setStyle({
            top: this.top + 'px',
            left: this.left + 'px'
        });
        this.rowHeight = Math.max(this.rowHeight, e.getHeight() + e.getMargins('tb'));

//      Move onwards
        this.left = this.left + w;
    },

    isValidParent: function() {
        return false;
    }
});
Ext.Container.LAYOUTS['float'] = Ext.layout.FloatLayout;