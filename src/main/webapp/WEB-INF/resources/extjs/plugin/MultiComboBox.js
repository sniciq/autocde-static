/** 
 * 
 * 
 * 功能：
 *   1. 支持：★ 多选|单选 (isSingle:'N|Y')
 *   2. 多选支持: 全选/全不选
 *   3. ★ 多选且分页支持: 全部清除  
 *   4. 支持：本地数据|远程数据 (mode:'local|remote'; store设置url)
 *   5. 远程数据支持：分页(pageSize)
 *   6. ★ 远程数据支持：条件(pa_fids)
 *   7. 通过COMBO的 getValue() 返回所选数据的KEY
 *   8. 通过COMBO的 getRawValue() 返回所选数据的TEXT
 *   9. ★ 支持：将所选数据的更多信息存储到指定控件(col_fids)
 *  10. ★ 通过COMBO的 selectDatas 返回所选数据的全部信息;不受翻页影响
 * 
 * 要求：★ 数据必须有唯一非空KEY，其字段名作为COMBO的valueField属性名称
 */
 
 if ('function' !== typeof RegExp.escape) {  
    RegExp.escape = function(s) {  
        if ('string' !== typeof s) {  
            return s  
        }  
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')  
    }  
}  
/** 转换参数为字符串并去其前后空格;null返回''
 * 
 * @param o
 * @returns
 */
function r_str(o) {
	if(o==null) {
		return '';
	}
	
	o = o+'';
	return o.replace(/(^\s*)|(\s*$)/g, "");
}

Ext.ns('Ext.ux.form');  

Ext.ux.form.MultiComboBox = Ext.extend(Ext.form.ComboBox, {  
	/* 全局所选数据
	 * [
	 *   {
	 *     列名: '字段值', 
	 *     ..
	 *   },
	 *   ..
	 * ]
	 */
	selectDatas: [],
	
	/* 全局所选数据的KEY;与selectDatas必须一一对应
	 * [
	 * 	 '数据KEY',
	 *   ..
	 * ]
	 */
	selectKeys: [],
	
	/* 列-控件 配置（自定义数据存储）
	 * [
	 *   {
	 *     col: '数据中的列名',
	 *     fid: '控件ID',
	 *     isExt: '是否EXT控件; Y|N'
	 *   },
	 *   ..
	 * ]
	 */
	col_fids: [],
	
	/* 查询参数 配置（自定义查询条件）
	 * [
	 *   {
	 *     pa: '参数名;如果不提供，则所有参数值组成 ['', ..] 形式以 params_ja 为参数名传递',
	 *     val: '参数值;如果提供，忽略后续配置项',
	 *     fid: '控件ID;如果为空，忽略后续配置项',
	 *     isExt: '是否EXT控件; Y|N',
	 *     isAry: '控件是否数组; Y|N',
	 *     isNotNull: '参数是否可为空; Y|N',
	 *     nullMsg: '参数为空时报错消息; 当 isNotNull==="Y"可用'
	 *   },
	 *   ..
	 * ]
	 */
	pa_fids: [],
	
	comboText: '',	// COMBO的文本，即：rawValue
	isSingle: 'N',	// 是否单选; Y|N
	showAllBtn :  false,
    checkField: 'checked',  
    separator: ',',  
    
    initComponent: function() {      	
        Ext.ux.form.MultiComboBox.superclass.initComponent.call(this);

    	// 自定义初始化处理 begin -------------------------------------------------
        
        // 几个字段名的初始化
    	//	KEY字段
    	var fid_key = r_str(this.valueField);
    	fid_key = fid_key==''?'value':fid_key;
    	this.valueField = fid_key;
    	//	TEXT字段
    	var fid_text = r_str(this.displayField);
    	fid_text = fid_text==''?'text':fid_text;
    	this.displayField = fid_text;
    	//	CHECKED字段
    	var fid_ck = r_str(this.checkField);
    	fid_ck = fid_ck==''?'checked':fid_ck;
    	this.checkField = fid_ck;
    	// 分隔符
    	var sepa = r_str(this.separator);			
		sepa = sepa==''?',':sepa;
		this.separator = sepa;
		// 是否单选
		var isSingle = r_str(this.isSingle);	
    	
    	// 所选数据、存储控件的初始化
    	//	存储控件初始化
    	var ary_col = [];
    	var ary_fid = [];
    	var ary_isExt = [];
    	var ary_datas = [];
    	var col_fids = this.col_fids;
    	var len_col_fids = col_fids==null?0:col_fids.length;
    	var col,fid,isExt;    	
    	for(var i=0;i<len_col_fids;i++) {
    		json0 = col_fids[i];
    		if(json0==null) {
    			continue;
    		}
    		col = json0.col;
    		if(col==null || col=='') {
    			contiue;
    		}
    		fid = json0.fid;
    		if(fid==null || fid=='') {
    			contiue;
    		}
    		ary_col.push(col);
    		ary_fid.push(fid);
    		ary_isExt.push(json0.isExt);
    		ary_datas.push('');
    	}
    	
    	//	所选数据KEY初始化、计算存储控件的值    	
    	var selectDatas = this.selectDatas;
    	selectDatas = selectDatas==null?[]:selectDatas;
    	var selectDatas2 = [];
    	var selectKeys = [];
    	var text_ja = [];
    	var len_selectDatas = selectDatas.length;
    	var json0,k0;    	
    	for(var i=0;i<len_selectDatas;i++) {
    		json0 = selectDatas[i];
    		k0 = r_str(selectDatas[i][fid_key]);
    		if(k0=='') {
    			continue;
    		}
    		selectDatas2.push(json0);
    		selectKeys.push(k0);
    		text_ja.push(r_str(json0[fid_text]));    		
    		// 自定义数据存储
    		if(len_col_fids>0) {
        		for(k in json0) {
        			ix1 = ary_col.indexOf(k);
        			if(ix1<0) {
        				continue;
        			}
        			s1 = ary_datas[ix1];
        			if(s1=='') {
        				s1 = json0[k];
        			} else {
        				s1 = s1+sepa+json0[k];
        			}
        			ary_datas[ix1] = s1;
        		}
            }
    		
    		if(isSingle=='Y') {	// 单选
    			break;
    		}
    	}
    	
    	// 重置：全局所选数据及其KEY
    	this.selectDatas = selectDatas2;
    	this.selectKeys = selectKeys;    	
    	// 数据存储：COMBO的value、rawVu
    	var sVal = selectKeys.join(sepa);
    	this.value = sVal;
    	this.hiddenValue = sVal;
    	this.comboText = text_ja.join(sepa);     	
    	// 自定义数据存储
    	if(len_col_fids>0) {
            // 处理数据存储
        	for(var i=0;i<len_col_fids;i++) {
        		try {
        			if(ary_isExt[i]=='Y') {
            			Ext.getCmp(ary_fid[i]).setValue(ary_datas[i]);
            		} else {
            			$("#"+ary_fid[i]).val(ary_datas[i]);
            		}
        		} catch(ignore){
        		}
        	}
        }
    	
    	// 自定义初始化处理 end -------------------------------------------------
        
    	if(isSingle!='Y') {
            this.tpl = ['<tpl for=".">',  
                        '<div class="x-combo-list-item">',  
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="ux-MultiComboBox-icon ux-MultiComboBox-icon-',  
                        '{[values.' + fid_ck + '?"checked":"unchecked"]}">',  
                        '<div class="ux-MultiComboBox-item-text">{' + fid_text + '}</div>',  
                        '</div>',  
                        '</tpl>'  
                    ].join("");  
    	}
  
        this.on({  
            scope: this,  
            expand : function(){  
                this.getValue()&&this.setValue(this.getValue()); 
            	this.opeSelectDatas([]);
            }  
        });  
          
        this.onLoad = this.onLoad.createSequence(function() {  
            if (this.el) {  
                var v = this.el.dom.value;  
                this.el.dom.value = v  
            }  
        });   
         this.on({  
            scope: this,  
            expand : function(){  
                this.getValue()&&this.setValue(this.getValue());  
            }  
        });  
        this.store.on("load",function(){  
            this.getValue()&&this.setValue(this.getValue());
            this.setStoreChecked();
        },this);  
        // 加载远程数据前，传入自定义参数
        this.store.on("beforeload",function(){     
//            this.getValue()&&this.setValue(this.getValue());
        	
        	var pa_fids = this.pa_fids;
        	var len_pa_fids = pa_fids==null?0:pa_fids.length;
        	if(len_pa_fids==0) {
        		return;
        	}
        	
        	var baseParams = {};
        	var params_ja = [];
        	var json0,pa,val,fid,isExt,isAry,isNotNull,nullMsg;
        	
        	for(var i=0;i<len_pa_fids;i++) {
        		json0 = pa_fids[i];
        		pa = r_str(json0.pa);
        		val = json0.val;
        		if(val!=null) {
        			// 值类型参数
        			val = r_str(val);
            		if(pa!='') {
            			baseParams[pa] = val;
            		} else {
            			params_ja.push(val);
            		}
            		continue;
        		}
        		
        		fid = r_str(json0.fid);
        		if(fid=='') {
        			// 空参数
            		if(pa!=null && pa!='') {
            			baseParams[pa] = '';
            		} else {
            			params_ja.push('');
            		}
            		continue;
        		}
        		
        		// 控件类型参数
        		isExt = r_str(json0.isExt);
        		isAry = r_str(json0.isAry);
        		isNotNull =  r_str(json0.isNotNull);
        		try {
            		if(isExt=='Y') {
            			val = Ext.getCmp(fid).getValue();
            		} else {
            			if(isAry=='Y') {
            				val = getCheckedVal(fid);
            			} else {
            				val = $("#"+fid).val();
            			}
            		}
        		} catch(ignor) {        			
        		}
    			val = r_str(val);
    			if(isNotNull=='Y' && val=='') {
            		nullMsg = r_str(json0.nullMsg);
            		nullMsg = nullMsg==''?'查询参数为空{位置:"+i+", 名称:"+pa+"}':nullMsg;
//            		alert("错误：\n\t"+nullMsg);
            		Ext.Msg.alert("错误",nullMsg);
            		return false;
    			}
        		if(pa!='') {
        			baseParams[pa] = val;
        		} else {
        			params_ja.push(val);
        		}
        	}
        	if(params_ja.length>0) {
        		baseParams.params_ja = Ext.util.JSON.encode(params_ja);
        	}
        	
    		this.store.baseParams = baseParams;
        },this);
    },
    
    onRender : function(ct, position){
    	Ext.ux.form.MultiComboBox.superclass.onRender.call(this, ct, position);
    	this.setRawValue(this.comboText);
    },
    
    initEvents: function() {  
        Ext.ux.form.MultiComboBox.superclass.initEvents.apply(this, arguments);  
        this.keyNav.tab = false  
    },
    
    bindStore : function(store, initial){
    	Ext.ux.form.MultiComboBox.superclass.bindStore.apply(this, arguments);
    	
    	this.setStoreChecked();
    },
    
    setStoreChecked: function() {
    	var snapshot = null;
    	if(this.store==null){
    	   return;
    	}
    	snapshot =  this.store.snapshot || this.store.data;  
    	if(snapshot==null) {
    		return;
    	}
    	
    	var fid_key = this.valueField;
    	var fid_ck = this.checkField;
    	
    	var selectKeys = this.selectKeys;
    	var len_selectKeys = selectKeys==null?[]:selectKeys.length;
    	if(len_selectKeys==0) {
    		return;
    	}
    	
    	var k0;
    	var flag_no = false;
    	snapshot.each(function(r) { 
    		k0 = r_str(r.get(fid_key));
    		if(k0!='' && selectKeys.indexOf(k0)>=0) {
    			r.set(fid_ck, true);
    			
    		} else {
    			r.set(fid_ck, false);
    			flag_no = true;		// 有未选中的
    		}
        },this);  
    	
    	if(this.selectall){  
            if(!flag_no){  
                this.selectall.replaceClass("ux-combo-selectall-icon-unchecked","ux-combo-selectall-icon-checked");  
            }else{  
                this.selectall.replaceClass("ux-combo-selectall-icon-checked","ux-combo-selectall-icon-unchecked")  
            }  
        }  
    },
    
    setRawValue: function(v) {
    	Ext.ux.form.MultiComboBox.superclass.setRawValue.apply(this, arguments);
    	this.comboText = v;
    },
    
    getRawValue: function() {
    	return this.comboText;
    },
     clearValue: function() {  
        this.value = '';  
        this.setRawValue(this.value);  
        this.store.clearFilter();  
        this.store.each(function(r) {  
            r.set(this.checkField, false)  
        },this);  
        if(this.hiddenField) {  
            this.hiddenField.value = ''  
        }  
        this.applyEmptyText()  
    },  
     setValue: function(v) {  
        if (v) {  
            v = '' + v;  
            if (this.valueField) {  
                this.store.clearFilter();  
                this.store.each(function(r) {  
                    var checked = !(!v.match('(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField)) + '(' + this.separator + '|$)'));  
                    r.set(this.checkField, checked)  
                },this);  
                this.value = this.getCheckedValue() || v;  
                this.setRawValue(this.store.getCount()>0 ? this.getCheckedDisplay() : this.value);  
                if (this.hiddenField) {  
                    this.hiddenField.value = this.value  
                }  
            } else {  
                this.value = v;  
                this.setRawValue(v);  
                if (this.hiddenField) {  
                    this.hiddenField.value = v  
                }  
            }  
            if (this.el) {  
                this.el.removeClass(this.emptyClass)  
            }  
            if(this.selectall){  
                if(this.getCheckedValue().split(",").length == this.store.getCount()){  
                    this.selectall.replaceClass("ux-combo-selectall-icon-unchecked","ux-combo-selectall-icon-checked");  
                }else{  
                    this.selectall.replaceClass("ux-combo-selectall-icon-checked","ux-combo-selectall-icon-unchecked")  
                }  
            }  
        } else {  
            this.clearValue()  
        }  
          
    },  
    getCheckedDisplay: function() {  
        var re = new RegExp(this.separator, "g");  
        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ')  
    },  
    getCheckedValue: function(field) {  
        field = field || this.valueField;  
        var c = [];  
        var snapshot = this.store.snapshot || this.store.data;  
        snapshot.each(function(r) {  
            if (r.get(this.checkField)) {  
                c.push(r.get(field))  
            }  
        },this);  
        return c.join(this.separator)  
    },  
    // 处理数据
    opeSelectDatas: function(record_ary) {
    	var len_record_ary = record_ary==null?0:record_ary.length;
    	if(len_record_ary==0) {
    		return;
    	}
    	
    	// KEY字段名
		var fid_key = r_str(this.valueField);		
		fid_key = fid_key==''?'value':fid_key;
		// CHECKED字段名
		var fid_ck = r_str(this.checkField);		
		fid_ck = fid_ck==''?'checked':fid_ck;
		// TEXT字段名
		var fid_text = this.displayField;			
		fid_text = fid_text==''?fid_key:fid_text;
		// 是否单选
		var isSingle = r_str(this.isSingle);
		
		var sepa = r_str(this.separator);			// 分隔符
		sepa = sepa==''?',':sepa;
		
    	var selectDatas = this.selectDatas;	// 全局所选数据
    	var len_selectDatas = selectDatas.length;
    	
    	var selectKeys = this.selectKeys;	// 全局所选数据KEY
    	selectDatas = selectDatas==null?[]:selectDatas;
		selectKeys = selectKeys==null?[]:selectKeys;
    	var json0, k0, ix0, c0;
    	
    	// 同步 数据集 和 键集
    	if(len_selectDatas!=selectKeys.length) {
    		selectKeys = [];
    		for(var i=0;i<len_selectDatas;i++) {
    			selectKeys.push(r_str(selectDatas[i][fid_key]));
    		}
    	}
		
    	var storeNotKeys = [];		// 当前未选数据的KEY    	
    	for(var i=0;i<len_record_ary;i++) {
    		json0 = record_ary[i].data;
    		k0 = r_str(json0[fid_key]);
    		if(k0=='') {
    			continue;
    		}
    		c0 = json0[fid_ck];			// 是否选中
			ix0 = selectKeys.indexOf(k0);	// 是否已在全局所选数据中
			if(c0) { // 选中	
				if(ix0<0) {	// 尚未在全局所选数据中，则加入
					if(isSingle=='Y') {	// 单选
						selectDatas = [json0];
					} else {
						selectDatas.push(json0);
					}
				}
			} else {
				storeNotKeys.push(k0);	// 记录未被选中的
			} 
    	} 
    	
    	var ary_col = [];
    	var ary_fid = [];
    	var ary_isExt = [];
    	var ary_datas = [];
    	var col_fids = this.col_fids;
    	var len_col_fids = col_fids==null?0:col_fids.length;
    	var col,fid,isExt;
    	
    	for(var i=0;i<len_col_fids;i++) {
    		json0 = col_fids[i];
    		if(json0==null) {
    			continue;
    		}
    		col = json0.col;
    		if(col==null || col=='') {
    			contiue;
    		}
    		fid = json0.fid;
    		if(fid==null || fid=='') {
    			contiue;
    		}
    		ary_col.push(col);
    		ary_fid.push(fid);
    		ary_isExt.push(json0.isExt);
    		ary_datas.push('');
    	}

    	var selectDatas2 = [];	// 新的全局所选数据
    	var selectKeys2 = [];	// 新的全局所选数据KEY
    	len_selectDatas = selectDatas.length;
    	var text_ja = [];
    	for(var i=0;i<len_selectDatas;i++) {
    		json0 = selectDatas[i];
    		k0 = r_str(json0[fid_key]);
    		if(k0=='') {
    			continue;
    		}
    		if(storeNotKeys.indexOf(k0)>=0) {
    			continue;
    		}
    		
    		selectDatas2.push(json0);		// 全局所选数据
    		selectKeys2.push(k0);			// 全局所选数据KEY
    		text_ja.push(json0[fid_text]);	// 全局所选数据TEXT
    		
    		// 自定义数据存储
    		if(len_col_fids>0) {
        		for(k in json0) {
        			ix1 = ary_col.indexOf(k);
        			if(ix1<0) {
        				continue;
        			}
        			s1 = ary_datas[ix1];
        			if(s1=='') {
        				s1 = json0[k];
        			} else {
        				s1 = s1+sepa+json0[k];
        			}
        			ary_datas[ix1] = s1;
        		}
            }
    		
    		if(isSingle=='Y') {
    			break;	// 单选
    		}
    	}
    	
    	this.selectDatas = selectDatas2;
    	this.selectKeys = selectKeys2;
    	
    	// 数据存储：COMBO的value、rawVu
    	this.value = selectKeys2.join(sepa);
    	this.setRawValue(text_ja.join(sepa));
    	if (this.hiddenField) {  
            this.hiddenField.value = this.value;  
        }
    	
    	// 自定义数据存储
    	if(len_col_fids>0) {
            // 处理数据存储
        	for(var i=0;i<len_col_fids;i++) {
        		try {
            		if(ary_isExt[i]=='Y') {
            			Ext.getCmp(ary_fid[i]).setValue(ary_datas[i]);
            		} else {
            			$("#"+ary_fid[i]).val(ary_datas[i]);
            		}
        		} catch(ignore){
        		}
        	}
        }
    	
    	// 全选/全不选 的处理
    	// 	单选不用继续
    	if(isSingle=='Y' || !this.selectall) {	
    		return;
    	}
    	// 	检查记录选中状态
    	var snapshot = this.store.snapshot || this.store.data;  
    	if(snapshot==null) {
    		return;
    	}
    	var flag_no = false;
    	snapshot.each(function(r) { 
    		if(!r.get(fid_ck)) {
    			flag_no = true;		// 有未选中的
    		}
        },this);  
    	//	处理 全选/全不选
    	if(!flag_no){  
            this.selectall.replaceClass("ux-combo-selectall-icon-unchecked","ux-combo-selectall-icon-checked");  
        }else{  
            this.selectall.replaceClass("ux-combo-selectall-icon-checked","ux-combo-selectall-icon-unchecked")  
        }  
    },
  
    onBeforeQuery: function(qe) {  
        qe.query = qe.query.replace(new RegExp(this.comboText + '[ ' + this.separator + ']*'), '')  
    },  
  
    onSelect: function(record, index) {
    	if(this.isSingle=='Y') {
    		record.set(this.checkField, true);  
            if (this.store.isFiltered()) {  
                this.doQuery(this.allQuery)  
            }
            this.collapse();
            this.fireEvent('select', this, record, index);
            this.opeSelectDatas([record]);
    	} else {        	
        	if (this.fireEvent('beforeselect', this, record, index) !== false){  
                record.set(this.checkField, !record.get(this.checkField));  
                if (this.store.isFiltered()) {  
                    this.doQuery(this.allQuery)  
                }
                this.setValue(this.getCheckedValue());  
                this.fireEvent('select', this, record, index)  
            } 
    	}
        //this.opeSelectDatas([record]);
    },  

    initList : function(){  
        if(!this.list){  
            var cls = 'x-combo-list';  
  
            this.list = new Ext.Layer({  
                parentEl: this.getListParent(),  
                shadow: this.shadow,  
                cls: [cls, this.listClass].join(' '),  
                constrain:false  
            });  
  
            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);  
            this.list.setSize(lw, 0);  
            this.list.swallowEvent('mousewheel');  
            this.assetHeight = 0;  
            if(this.syncFont !== false){  
                this.list.setStyle('font-size', this.el.getStyle('font-size'));  
            }  
            if(this.title){  
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});  
                this.assetHeight += this.header.getHeight();  
            }  
              
            if(this.isSingle!='Y'){  
            	if(this.showAllBtn){
            	
                this.selectall = this.list.createChild({  
                    cls:cls + 'item ux-combo-selectall-icon-unchecked ux-combo-selectall-icon',  
                    html: "全选/全不选"  
                });  
                this.selectall.on("click",function(el){  
                    if(this.selectall.hasClass("ux-combo-selectall-icon-checked")){  
                        this.selectall.replaceClass("ux-combo-selectall-icon-checked","ux-combo-selectall-icon-unchecked");  
                        this.deselectAll();  
                    }else{  
                        this.selectall.replaceClass("ux-combo-selectall-icon-unchecked","ux-combo-selectall-icon-checked")  
                        this.selectAll();  
                    }  
                },this);  
                this.assetHeight += this.selectall.getHeight();  
            	}
                
                // 分页：增加“全部清除”功能
                if(this.pageSize) {
                    this.removeall = this.list.createChild({  
                        cls: cls + 'item ux-combo-removeall',  
                        html: "全部清除"  
                    });  
                    this.removeall.on("click",function(el){  
                        this.removeAll(); 
                    },this);  
                    this.assetHeight += this.removeall.getHeight();  
                }
            }
  
            this.innerList = this.list.createChild({cls:cls+'-inner'});  
            this.mon(this.innerList, 'mouseover', this.onViewOver, this);  
            this.mon(this.innerList, 'mousemove', this.onViewMove, this);  
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));  
  
            if(this.pageSize){  
                this.footer = this.list.createChild({cls:cls+'-ft'});  
                this.pageTb = new Ext.PagingToolbar({  
                    store: this.store,  
                    pageSize: this.pageSize,  
                    renderTo:this.footer  
                });  
                this.assetHeight += this.footer.getHeight();
            }  
  
            if(!this.tpl){  
                this.tpl = '<tpl for="."><div class="'+cls+'-item">{' + this.displayField + '}</div></tpl>';  
            }  
  
            this.view = new Ext.DataView({  
                applyTo: this.innerList,  
                tpl: this.tpl,  
                singleSelect: true,  
                selectedClass: this.selectedClass,  
                itemSelector: this.itemSelector || '.' + cls + '-item',  
                emptyText: this.listEmptyText  
            });  
  
            this.mon(this.view, 'click', this.onViewClick, this);  
            
            this.bindStore(this.store, true); 
  
            if(this.resizable){  
                this.resizer = new Ext.Resizable(this.list,  {  
                   pinned:true, handles:'se'  
                });  
                this.mon(this.resizer, 'resize', function(r, w, h){  
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;  
                    this.listWidth = w;  
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));  
                    this.restrictHeight();  
                }, this);  
  
                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');  
            }  
        }  
    },  
    
    expand : function(){  
        if(this.isExpanded() || !this.hasFocus){  
            //return;  
        }  
        this.list.alignTo(this.wrap, this.listAlign);  
        this.list.show();  
        if(Ext.isGecko2){  
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac  
        }  
        Ext.getDoc().on({  
            scope: this,  
            mousewheel: this.collapseIf,  
            mousedown: this.collapseIf  
        });  
        this.fireEvent('expand', this);  
    },  
    
    selectAll: function() { 
    	// 设置所有记录的选中状态
    	var r_ary = [];
        this.store.each(function(record) {  
            record.set(this.checkField, true);  
            r_ary.push(record);
        },this);  
        // 处理数据
        this.opeSelectDatas(r_ary); 
        // 重新查询
        this.doQuery(this.allQuery);  
    },  
    
    deselectAll: function() {  
    	// 取消所有记录的选中状态
    	var r_ary = [];
        this.store.each(function(record) {  
            record.set(this.checkField, false);  
            r_ary.push(record);
        },this);  

        this.opeSelectDatas(r_ary);
        this.doQuery(this.allQuery);  
    },  
    
    removeAll: function() {
    	if(this.isSingle=='Y' || !this.removeall) {
    		return;
    	}
    	
    	// 取消所有记录的选中状态
    	var r_ary = [];
        this.store.each(function(record) {  
            record.set(this.checkField, false);  
            r_ary.push(record);
        },this);   
        
        // 处理数据 begin ----------------------------
        //	全局所选数据
        this.selectDatas = [];
        this.selectKeys = [];
        //	COMBO的VALUE和RAWVALUE
        this.value = '';;
        this.setRawValue('');
        // 	自定义数据存储
    	var col_fids = this.col_fids;
    	var len_col_fids = col_fids==null?0:col_fids.length;
    	if(len_col_fids>0) {
            // 处理数据存储
    		var jo;
        	for(var i=0;i<len_col_fids;i++) {
        		jo = col_fids[i];
        		if(jo==null) {
        			continue;
        		}
        		try {
            		if(jo.isExt=='Y') {
            			Ext.getCmp(jo.fid).setValue('');
            		} else {
            			$("#"+jo.fid).val('');
            		}
        		} catch(ignore){
        		}
        	}
        }    	
    	// 	全选/全不选 的处理
    	this.selectall.replaceClass("ux-combo-selectall-icon-checked","ux-combo-selectall-icon-unchecked")
        // 处理数据 end ----------------------------
        
        this.doQuery(this.allQuery);  
    	this.collapse();
    },
    
    assertValue: Ext.emptyFn,  
    beforeBlur: Ext.emptyFn  
});  

Ext.reg('multiselect', Ext.ux.form.MultiComboBox);  