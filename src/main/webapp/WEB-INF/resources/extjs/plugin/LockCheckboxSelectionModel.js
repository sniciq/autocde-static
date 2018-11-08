Ext.grid.LockCheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel, {
	header: "", 
	handleMouseDown: function(g, rowIndex, e) { 
         if (e.button !== 0 || this.isLocked()) { 
             return; 
         } 
         var view = this.grid.getView(); 
         if (e.shiftKey && !this.singleSelect && this.last !== false) { 
             var last = this.last; 
             this.selectRange(last, rowIndex, e.ctrlKey); 
             this.last = last; 
             view.focusRow(rowIndex); 
         } else { 
             var isSelected = this.isSelected(rowIndex); 
             if (isSelected) { 
                 this.deselectRow(rowIndex); 
             } else if (!isSelected || this.getCount() > 1) { 
                 this.selectRow(rowIndex, true); 
                 view.focusRow(rowIndex); 
             } 
         } 
     }, 
     isLocked: Ext.emptyFn, 
     initEvents: function() { 
         Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this); 
         this.grid.on('render', function() { 
             var view = this.grid.getView(); 
             view.mainBody.on('mousedown', this.onMouseDown, this); 
             Ext.fly(view.lockedInnerHd).on('mousedown', this.onHdMouseDown, this); 
         }, this); 
     } 
});