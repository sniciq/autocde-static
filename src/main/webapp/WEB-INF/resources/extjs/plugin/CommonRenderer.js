/**
 * 人民币格式化
 * @param {} v
 * @param {} cellmeta
 * @param {} record
 * @param {} rowIndex
 * @param {} columnIndex
 * @param {} stor
 * @return {String}
 */
function rmbMoneyRender(v, cellmeta, record, rowIndex, columnIndex, stor){
	if(!v && v != 0)
		return '';
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole;
    if(v.charAt(0) == '-'){
    	return '-' + v.substr(1);
    }
    return v;
};

/**
 * 人民币格式化, 带两位小数点，没有则补齐两位
 * @param {} v
 * @param {} cellmeta
 * @param {} record
 * @param {} rowIndex
 * @param {} columnIndex
 * @param {} stor
 * @return {String}
 */
function rmbMoneyRenderDot(v, cellmeta, record, rowIndex, columnIndex, stor){
    if(!v && v != 0)
		return '';
		
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.'+ ps[1] : '.00';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return '-' + v.substr(1);
    }
    return v;
};
/**
 * 人民币格式化, 带三位小数点，没有则补齐三位
 * @param {} v
 * @param {} cellmeta
 * @param {} record
 * @param {} rowIndex
 * @param {} columnIndex
 * @param {} stor
 * @return {String}
 */
function rmbPriceRenderDot(v, cellmeta, record, rowIndex, columnIndex, stor){
    if(!v && v != 0)
		return '';
		
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + ".000" : ((v*10 == Math.floor(v*10)) ? v + "00" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.'+ ps[1] : '.000';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return '-' + v.substr(1);
    }
    return v;
};

/**
 * 百分比格式化
 * @param {} value
 * @param {} cellmeta
 * @param {} record
 * @param {} rowIndex
 * @param {} columnIndex
 * @param {} stor
 * @return {String}
 */
function renderRatio(value, cellmeta, record, rowIndex, columnIndex, stor) {
	if(!value && value != 0) return '';
	
	//判断value后面的小数，如果只有一位的话补零
	value = '' + value;
	var ps = value.split('.');
	var whole = ps[0];
	var dot = '00';
	if(ps.length > 1) {
		dot = ps[1] + dot;
	}
	dot = dot.substring(0, 2);
	value = whole + '.' + dot;
	return value + '%';
}

function renderDotRatio(value, cellmeta, record, rowIndex, columnIndex, stor) {
	if(!value && value != 0) return '';
	
	value = value * 100;
	//判断value后面的小数，如果只有一位的话补零
	value = '' + value;
	var ps = value.split('.');
	var whole = ps[0];
	var dot = '00';
	if(ps.length > 1) {
		dot = ps[1] + dot;
	}
	dot = dot.substring(0, 2);
	value = whole + '.' + dot;
	return value + '%';
}

function rmbMoneyRenderOld(v, cellmeta, record, rowIndex, columnIndex, stor){
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.'+ ps[1] : '.00';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return '-￥' + v.substr(1);
    }
    return "￥" +  v;
};

/**
 * 单元格点击链接
 * @param {} v
 * @return {}
 */
function renderClickCell(v) {
	if(!v) {
		return '';
	}
	else if(v == '合计')
		return '<font style="color: #DDDDDD;font-weight: bold;">' + v + '</font>';
	else {
		return '<font class="eddy-grid-link" style="cursor: pointer;text-decoration: underline;color: #379337;font-weight: bold;">' + v + '</font>';
	}
}
		
/**
 * Json时间格式化
 * @param {} format
 * @return {}
 */
function renderJSONDate(format) {
	return function(v) {
		var jsonDateValue;
		if(Ext.isEmpty(v)) {
			return '';
		}
		else if(Ext.isEmpty(v.time)) {
			jsonDateValue = new Date(v);
		}
		else {
			jsonDateValue = new Date(v.time);
		}
		return jsonDateValue.format(format);
	}
}