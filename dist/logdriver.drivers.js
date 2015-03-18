(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){



},{}],2:[function(require,module,exports){
function replacer(t,e){return util.isUndefined(e)?""+e:util.isNumber(e)&&!isFinite(e)?e.toString():util.isFunction(e)||util.isRegExp(e)?e.toString():e}function truncate(t,e){return util.isString(t)?t.length<e?t:t.slice(0,e):t}function getMessage(t){return truncate(JSON.stringify(t.actual,replacer),128)+" "+t.operator+" "+truncate(JSON.stringify(t.expected,replacer),128)}function fail(t,e,r,i,s){throw new assert.AssertionError({message:r,actual:t,expected:e,operator:i,stackStartFunction:s})}function ok(t,e){t||fail(t,!0,e,"==",assert.ok)}function _deepEqual(t,e){if(t===e)return!0;if(util.isBuffer(t)&&util.isBuffer(e)){if(t.length!=e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}return util.isDate(t)&&util.isDate(e)?t.getTime()===e.getTime():util.isRegExp(t)&&util.isRegExp(e)?t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase:util.isObject(t)||util.isObject(e)?objEquiv(t,e):t==e}function isArguments(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function objEquiv(t,e){if(util.isNullOrUndefined(t)||util.isNullOrUndefined(e))return!1;if(t.prototype!==e.prototype)return!1;if(util.isPrimitive(t)||util.isPrimitive(e))return t===e;var r=isArguments(t),i=isArguments(e);if(r&&!i||!r&&i)return!1;if(r)return t=pSlice.call(t),e=pSlice.call(e),_deepEqual(t,e);var s,n,a=objectKeys(t),u=objectKeys(e);if(a.length!=u.length)return!1;for(a.sort(),u.sort(),n=a.length-1;n>=0;n--)if(a[n]!=u[n])return!1;for(n=a.length-1;n>=0;n--)if(s=a[n],!_deepEqual(t[s],e[s]))return!1;return!0}function expectedException(t,e){return t&&e?"[object RegExp]"==Object.prototype.toString.call(e)?e.test(t):t instanceof e?!0:e.call({},t)===!0?!0:!1:!1}function _throws(t,e,r,i){var s;util.isString(r)&&(i=r,r=null);try{e()}catch(n){s=n}if(i=(r&&r.name?" ("+r.name+").":".")+(i?" "+i:"."),t&&!s&&fail(s,r,"Missing expected exception"+i),!t&&expectedException(s,r)&&fail(s,r,"Got unwanted exception"+i),t&&s&&r&&!expectedException(s,r)||!t&&s)throw s}var util=require("util/"),pSlice=Array.prototype.slice,hasOwn=Object.prototype.hasOwnProperty,assert=module.exports=ok;assert.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var e=t.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var r=new Error;if(r.stack){var i=r.stack,s=e.name,n=i.indexOf("\n"+s);if(n>=0){var a=i.indexOf("\n",n+1);i=i.substring(a+1)}this.stack=i}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(t,e,r){t!=e&&fail(t,e,r,"==",assert.equal)},assert.notEqual=function(t,e,r){t==e&&fail(t,e,r,"!=",assert.notEqual)},assert.deepEqual=function(t,e,r){_deepEqual(t,e)||fail(t,e,r,"deepEqual",assert.deepEqual)},assert.notDeepEqual=function(t,e,r){_deepEqual(t,e)&&fail(t,e,r,"notDeepEqual",assert.notDeepEqual)},assert.strictEqual=function(t,e,r){t!==e&&fail(t,e,r,"===",assert.strictEqual)},assert.notStrictEqual=function(t,e,r){t===e&&fail(t,e,r,"!==",assert.notStrictEqual)},assert["throws"]=function(){_throws.apply(this,[!0].concat(pSlice.call(arguments)))},assert.doesNotThrow=function(){_throws.apply(this,[!1].concat(pSlice.call(arguments)))},assert.ifError=function(t){if(t)throw t};var objectKeys=Object.keys||function(t){var e=[];for(var r in t)hasOwn.call(t,r)&&e.push(r);return e};


},{"util/":184}],3:[function(require,module,exports){



},{}],4:[function(require,module,exports){
"use strict";var TYPED_OK="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;exports.assign=function(r){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var e=t.shift();if(e){if("object"!=typeof e)throw new TypeError(e+"must be non-object");for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n])}}return r},exports.shrinkBuf=function(r,t){return r.length===t?r:r.subarray?r.subarray(0,t):(r.length=t,r)};var fnTyped={arraySet:function(r,t,e,n,a){if(t.subarray&&r.subarray)return void r.set(t.subarray(e,e+n),a);for(var o=0;n>o;o++)r[a+o]=t[e+o]},flattenChunks:function(r){var t,e,n,a,o,s;for(n=0,t=0,e=r.length;e>t;t++)n+=r[t].length;for(s=new Uint8Array(n),a=0,t=0,e=r.length;e>t;t++)o=r[t],s.set(o,a),a+=o.length;return s}},fnUntyped={arraySet:function(r,t,e,n,a){for(var o=0;n>o;o++)r[a+o]=t[e+o]},flattenChunks:function(r){return[].concat.apply([],r)}};exports.setTyped=function(r){r?(exports.Buf8=Uint8Array,exports.Buf16=Uint16Array,exports.Buf32=Int32Array,exports.assign(exports,fnTyped)):(exports.Buf8=Array,exports.Buf16=Array,exports.Buf32=Array,exports.assign(exports,fnUntyped))},exports.setTyped(TYPED_OK);


},{}],5:[function(require,module,exports){
"use strict";function adler32(e,r,o,t){for(var d=65535&e|0,l=e>>>16&65535|0,u=0;0!==o;){u=o>2e3?2e3:o,o-=u;do d=d+r[t++]|0,l=l+d|0;while(--u);d%=65521,l%=65521}return d|l<<16|0}module.exports=adler32;


},{}],6:[function(require,module,exports){
module.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};


},{}],7:[function(require,module,exports){
"use strict";function makeTable(){for(var r,a=[],c=0;256>c;c++){r=c;for(var e=0;8>e;e++)r=1&r?3988292384^r>>>1:r>>>1;a[c]=r}return a}function crc32(r,a,c,e){var o=crcTable,t=e+c;r=-1^r;for(var n=e;t>n;n++)r=r>>>8^o[255&(r^a[n])];return-1^r}var crcTable=makeTable();module.exports=crc32;


},{}],8:[function(require,module,exports){
"use strict";function err(t,e){return t.msg=msg[e],e}function rank(t){return(t<<1)-(t>4?9:0)}function zero(t){for(var e=t.length;--e>=0;)t[e]=0}function flush_pending(t){var e=t.state,_=e.pending;_>t.avail_out&&(_=t.avail_out),0!==_&&(utils.arraySet(t.output,e.pending_buf,e.pending_out,_,t.next_out),t.next_out+=_,e.pending_out+=_,t.total_out+=_,t.avail_out-=_,e.pending-=_,0===e.pending&&(e.pending_out=0))}function flush_block_only(t,e){trees._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,flush_pending(t.strm)}function put_byte(t,e){t.pending_buf[t.pending++]=e}function putShortMSB(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function read_buf(t,e,_,a){var s=t.avail_in;return s>a&&(s=a),0===s?0:(t.avail_in-=s,utils.arraySet(e,t.input,t.next_in,s,_),1===t.state.wrap?t.adler=adler32(t.adler,e,s,_):2===t.state.wrap&&(t.adler=crc32(t.adler,e,s,_)),t.next_in+=s,t.total_in+=s,s)}function longest_match(t,e){var _,a,s=t.max_chain_length,n=t.strstart,i=t.prev_length,r=t.nice_match,l=t.strstart>t.w_size-MIN_LOOKAHEAD?t.strstart-(t.w_size-MIN_LOOKAHEAD):0,h=t.window,o=t.w_mask,d=t.prev,u=t.strstart+MAX_MATCH,f=h[n+i-1],E=h[n+i];t.prev_length>=t.good_match&&(s>>=2),r>t.lookahead&&(r=t.lookahead);do if(_=e,h[_+i]===E&&h[_+i-1]===f&&h[_]===h[n]&&h[++_]===h[n+1]){n+=2,_++;do;while(h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&h[++n]===h[++_]&&u>n);if(a=MAX_MATCH-(u-n),n=u-MAX_MATCH,a>i){if(t.match_start=e,i=a,a>=r)break;f=h[n+i-1],E=h[n+i]}}while((e=d[e&o])>l&&0!==--s);return i<=t.lookahead?i:t.lookahead}function fill_window(t){var e,_,a,s,n,i=t.w_size;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=i+(i-MIN_LOOKAHEAD)){utils.arraySet(t.window,t.window,i,i,0),t.match_start-=i,t.strstart-=i,t.block_start-=i,_=t.hash_size,e=_;do a=t.head[--e],t.head[e]=a>=i?a-i:0;while(--_);_=i,e=_;do a=t.prev[--e],t.prev[e]=a>=i?a-i:0;while(--_);s+=i}if(0===t.strm.avail_in)break;if(_=read_buf(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=_,t.lookahead+t.insert>=MIN_MATCH)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=(t.ins_h<<t.hash_shift^t.window[n+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[n+MIN_MATCH-1])&t.hash_mask,t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<MIN_MATCH)););}while(t.lookahead<MIN_LOOKAHEAD&&0!==t.strm.avail_in)}function deflate_stored(t,e){var _=65535;for(_>t.pending_buf_size-5&&(_=t.pending_buf_size-5);;){if(t.lookahead<=1){if(fill_window(t),0===t.lookahead&&e===Z_NO_FLUSH)return BS_NEED_MORE;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var a=t.block_start+_;if((0===t.strstart||t.strstart>=a)&&(t.lookahead=t.strstart-a,t.strstart=a,flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE;if(t.strstart-t.block_start>=t.w_size-MIN_LOOKAHEAD&&(flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE}return t.insert=0,e===Z_FINISH?(flush_block_only(t,!0),0===t.strm.avail_out?BS_FINISH_STARTED:BS_FINISH_DONE):t.strstart>t.block_start&&(flush_block_only(t,!1),0===t.strm.avail_out)?BS_NEED_MORE:BS_NEED_MORE}function deflate_fast(t,e){for(var _,a;;){if(t.lookahead<MIN_LOOKAHEAD){if(fill_window(t),t.lookahead<MIN_LOOKAHEAD&&e===Z_NO_FLUSH)return BS_NEED_MORE;if(0===t.lookahead)break}if(_=0,t.lookahead>=MIN_MATCH&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+MIN_MATCH-1])&t.hash_mask,_=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==_&&t.strstart-_<=t.w_size-MIN_LOOKAHEAD&&(t.match_length=longest_match(t,_)),t.match_length>=MIN_MATCH)if(a=trees._tr_tally(t,t.strstart-t.match_start,t.match_length-MIN_MATCH),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=MIN_MATCH){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+MIN_MATCH-1])&t.hash_mask,_=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else a=trees._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(a&&(flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE}return t.insert=t.strstart<MIN_MATCH-1?t.strstart:MIN_MATCH-1,e===Z_FINISH?(flush_block_only(t,!0),0===t.strm.avail_out?BS_FINISH_STARTED:BS_FINISH_DONE):t.last_lit&&(flush_block_only(t,!1),0===t.strm.avail_out)?BS_NEED_MORE:BS_BLOCK_DONE}function deflate_slow(t,e){for(var _,a,s;;){if(t.lookahead<MIN_LOOKAHEAD){if(fill_window(t),t.lookahead<MIN_LOOKAHEAD&&e===Z_NO_FLUSH)return BS_NEED_MORE;if(0===t.lookahead)break}if(_=0,t.lookahead>=MIN_MATCH&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+MIN_MATCH-1])&t.hash_mask,_=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=MIN_MATCH-1,0!==_&&t.prev_length<t.max_lazy_match&&t.strstart-_<=t.w_size-MIN_LOOKAHEAD&&(t.match_length=longest_match(t,_),t.match_length<=5&&(t.strategy===Z_FILTERED||t.match_length===MIN_MATCH&&t.strstart-t.match_start>4096)&&(t.match_length=MIN_MATCH-1)),t.prev_length>=MIN_MATCH&&t.match_length<=t.prev_length){s=t.strstart+t.lookahead-MIN_MATCH,a=trees._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-MIN_MATCH),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=s&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+MIN_MATCH-1])&t.hash_mask,_=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=MIN_MATCH-1,t.strstart++,a&&(flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE}else if(t.match_available){if(a=trees._tr_tally(t,0,t.window[t.strstart-1]),a&&flush_block_only(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return BS_NEED_MORE}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(a=trees._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<MIN_MATCH-1?t.strstart:MIN_MATCH-1,e===Z_FINISH?(flush_block_only(t,!0),0===t.strm.avail_out?BS_FINISH_STARTED:BS_FINISH_DONE):t.last_lit&&(flush_block_only(t,!1),0===t.strm.avail_out)?BS_NEED_MORE:BS_BLOCK_DONE}function deflate_rle(t,e){for(var _,a,s,n,i=t.window;;){if(t.lookahead<=MAX_MATCH){if(fill_window(t),t.lookahead<=MAX_MATCH&&e===Z_NO_FLUSH)return BS_NEED_MORE;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=MIN_MATCH&&t.strstart>0&&(s=t.strstart-1,a=i[s],a===i[++s]&&a===i[++s]&&a===i[++s])){n=t.strstart+MAX_MATCH;do;while(a===i[++s]&&a===i[++s]&&a===i[++s]&&a===i[++s]&&a===i[++s]&&a===i[++s]&&a===i[++s]&&a===i[++s]&&n>s);t.match_length=MAX_MATCH-(n-s),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=MIN_MATCH?(_=trees._tr_tally(t,1,t.match_length-MIN_MATCH),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(_=trees._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),_&&(flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE}return t.insert=0,e===Z_FINISH?(flush_block_only(t,!0),0===t.strm.avail_out?BS_FINISH_STARTED:BS_FINISH_DONE):t.last_lit&&(flush_block_only(t,!1),0===t.strm.avail_out)?BS_NEED_MORE:BS_BLOCK_DONE}function deflate_huff(t,e){for(var _;;){if(0===t.lookahead&&(fill_window(t),0===t.lookahead)){if(e===Z_NO_FLUSH)return BS_NEED_MORE;break}if(t.match_length=0,_=trees._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,_&&(flush_block_only(t,!1),0===t.strm.avail_out))return BS_NEED_MORE}return t.insert=0,e===Z_FINISH?(flush_block_only(t,!0),0===t.strm.avail_out?BS_FINISH_STARTED:BS_FINISH_DONE):t.last_lit&&(flush_block_only(t,!1),0===t.strm.avail_out)?BS_NEED_MORE:BS_BLOCK_DONE}function lm_init(t){t.window_size=2*t.w_size,zero(t.head),t.max_lazy_match=configuration_table[t.level].max_lazy,t.good_match=configuration_table[t.level].good_length,t.nice_match=configuration_table[t.level].nice_length,t.max_chain_length=configuration_table[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=MIN_MATCH-1,t.match_available=0,t.ins_h=0}function DeflateState(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=Z_DEFLATED,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new utils.Buf16(2*HEAP_SIZE),this.dyn_dtree=new utils.Buf16(2*(2*D_CODES+1)),this.bl_tree=new utils.Buf16(2*(2*BL_CODES+1)),zero(this.dyn_ltree),zero(this.dyn_dtree),zero(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new utils.Buf16(MAX_BITS+1),this.heap=new utils.Buf16(2*L_CODES+1),zero(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new utils.Buf16(2*L_CODES+1),zero(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function deflateResetKeep(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Z_UNKNOWN,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?INIT_STATE:BUSY_STATE,t.adler=2===e.wrap?0:1,e.last_flush=Z_NO_FLUSH,trees._tr_init(e),Z_OK):err(t,Z_STREAM_ERROR)}function deflateReset(t){var e=deflateResetKeep(t);return e===Z_OK&&lm_init(t.state),e}function deflateSetHeader(t,e){return t&&t.state?2!==t.state.wrap?Z_STREAM_ERROR:(t.state.gzhead=e,Z_OK):Z_STREAM_ERROR}function deflateInit2(t,e,_,a,s,n){if(!t)return Z_STREAM_ERROR;var i=1;if(e===Z_DEFAULT_COMPRESSION&&(e=6),0>a?(i=0,a=-a):a>15&&(i=2,a-=16),1>s||s>MAX_MEM_LEVEL||_!==Z_DEFLATED||8>a||a>15||0>e||e>9||0>n||n>Z_FIXED)return err(t,Z_STREAM_ERROR);8===a&&(a=9);var r=new DeflateState;return t.state=r,r.strm=t,r.wrap=i,r.gzhead=null,r.w_bits=a,r.w_size=1<<r.w_bits,r.w_mask=r.w_size-1,r.hash_bits=s+7,r.hash_size=1<<r.hash_bits,r.hash_mask=r.hash_size-1,r.hash_shift=~~((r.hash_bits+MIN_MATCH-1)/MIN_MATCH),r.window=new utils.Buf8(2*r.w_size),r.head=new utils.Buf16(r.hash_size),r.prev=new utils.Buf16(r.w_size),r.lit_bufsize=1<<s+6,r.pending_buf_size=4*r.lit_bufsize,r.pending_buf=new utils.Buf8(r.pending_buf_size),r.d_buf=r.lit_bufsize>>1,r.l_buf=3*r.lit_bufsize,r.level=e,r.strategy=n,r.method=_,deflateReset(t)}function deflateInit(t,e){return deflateInit2(t,e,Z_DEFLATED,MAX_WBITS,DEF_MEM_LEVEL,Z_DEFAULT_STRATEGY)}function deflate(t,e){var _,a,s,n;if(!t||!t.state||e>Z_BLOCK||0>e)return t?err(t,Z_STREAM_ERROR):Z_STREAM_ERROR;if(a=t.state,!t.output||!t.input&&0!==t.avail_in||a.status===FINISH_STATE&&e!==Z_FINISH)return err(t,0===t.avail_out?Z_BUF_ERROR:Z_STREAM_ERROR);if(a.strm=t,_=a.last_flush,a.last_flush=e,a.status===INIT_STATE)if(2===a.wrap)t.adler=0,put_byte(a,31),put_byte(a,139),put_byte(a,8),a.gzhead?(put_byte(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),put_byte(a,255&a.gzhead.time),put_byte(a,a.gzhead.time>>8&255),put_byte(a,a.gzhead.time>>16&255),put_byte(a,a.gzhead.time>>24&255),put_byte(a,9===a.level?2:a.strategy>=Z_HUFFMAN_ONLY||a.level<2?4:0),put_byte(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(put_byte(a,255&a.gzhead.extra.length),put_byte(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=crc32(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=EXTRA_STATE):(put_byte(a,0),put_byte(a,0),put_byte(a,0),put_byte(a,0),put_byte(a,0),put_byte(a,9===a.level?2:a.strategy>=Z_HUFFMAN_ONLY||a.level<2?4:0),put_byte(a,OS_CODE),a.status=BUSY_STATE);else{var i=Z_DEFLATED+(a.w_bits-8<<4)<<8,r=-1;r=a.strategy>=Z_HUFFMAN_ONLY||a.level<2?0:a.level<6?1:6===a.level?2:3,i|=r<<6,0!==a.strstart&&(i|=PRESET_DICT),i+=31-i%31,a.status=BUSY_STATE,putShortMSB(a,i),0!==a.strstart&&(putShortMSB(a,t.adler>>>16),putShortMSB(a,65535&t.adler)),t.adler=1}if(a.status===EXTRA_STATE)if(a.gzhead.extra){for(s=a.pending;a.gzindex<(65535&a.gzhead.extra.length)&&(a.pending!==a.pending_buf_size||(a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),flush_pending(t),s=a.pending,a.pending!==a.pending_buf_size));)put_byte(a,255&a.gzhead.extra[a.gzindex]),a.gzindex++;a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),a.gzindex===a.gzhead.extra.length&&(a.gzindex=0,a.status=NAME_STATE)}else a.status=NAME_STATE;if(a.status===NAME_STATE)if(a.gzhead.name){s=a.pending;do{if(a.pending===a.pending_buf_size&&(a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),flush_pending(t),s=a.pending,a.pending===a.pending_buf_size)){n=1;break}n=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,put_byte(a,n)}while(0!==n);a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),0===n&&(a.gzindex=0,a.status=COMMENT_STATE)}else a.status=COMMENT_STATE;if(a.status===COMMENT_STATE)if(a.gzhead.comment){s=a.pending;do{if(a.pending===a.pending_buf_size&&(a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),flush_pending(t),s=a.pending,a.pending===a.pending_buf_size)){n=1;break}n=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,put_byte(a,n)}while(0!==n);a.gzhead.hcrc&&a.pending>s&&(t.adler=crc32(t.adler,a.pending_buf,a.pending-s,s)),0===n&&(a.status=HCRC_STATE)}else a.status=HCRC_STATE;if(a.status===HCRC_STATE&&(a.gzhead.hcrc?(a.pending+2>a.pending_buf_size&&flush_pending(t),a.pending+2<=a.pending_buf_size&&(put_byte(a,255&t.adler),put_byte(a,t.adler>>8&255),t.adler=0,a.status=BUSY_STATE)):a.status=BUSY_STATE),0!==a.pending){if(flush_pending(t),0===t.avail_out)return a.last_flush=-1,Z_OK}else if(0===t.avail_in&&rank(e)<=rank(_)&&e!==Z_FINISH)return err(t,Z_BUF_ERROR);if(a.status===FINISH_STATE&&0!==t.avail_in)return err(t,Z_BUF_ERROR);if(0!==t.avail_in||0!==a.lookahead||e!==Z_NO_FLUSH&&a.status!==FINISH_STATE){var l=a.strategy===Z_HUFFMAN_ONLY?deflate_huff(a,e):a.strategy===Z_RLE?deflate_rle(a,e):configuration_table[a.level].func(a,e);if((l===BS_FINISH_STARTED||l===BS_FINISH_DONE)&&(a.status=FINISH_STATE),l===BS_NEED_MORE||l===BS_FINISH_STARTED)return 0===t.avail_out&&(a.last_flush=-1),Z_OK;if(l===BS_BLOCK_DONE&&(e===Z_PARTIAL_FLUSH?trees._tr_align(a):e!==Z_BLOCK&&(trees._tr_stored_block(a,0,0,!1),e===Z_FULL_FLUSH&&(zero(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),flush_pending(t),0===t.avail_out))return a.last_flush=-1,Z_OK}return e!==Z_FINISH?Z_OK:a.wrap<=0?Z_STREAM_END:(2===a.wrap?(put_byte(a,255&t.adler),put_byte(a,t.adler>>8&255),put_byte(a,t.adler>>16&255),put_byte(a,t.adler>>24&255),put_byte(a,255&t.total_in),put_byte(a,t.total_in>>8&255),put_byte(a,t.total_in>>16&255),put_byte(a,t.total_in>>24&255)):(putShortMSB(a,t.adler>>>16),putShortMSB(a,65535&t.adler)),flush_pending(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?Z_OK:Z_STREAM_END)}function deflateEnd(t){var e;return t&&t.state?(e=t.state.status,e!==INIT_STATE&&e!==EXTRA_STATE&&e!==NAME_STATE&&e!==COMMENT_STATE&&e!==HCRC_STATE&&e!==BUSY_STATE&&e!==FINISH_STATE?err(t,Z_STREAM_ERROR):(t.state=null,e===BUSY_STATE?err(t,Z_DATA_ERROR):Z_OK)):Z_STREAM_ERROR}var utils=require("../utils/common"),trees=require("./trees"),adler32=require("./adler32"),crc32=require("./crc32"),msg=require("./messages"),Z_NO_FLUSH=0,Z_PARTIAL_FLUSH=1,Z_FULL_FLUSH=3,Z_FINISH=4,Z_BLOCK=5,Z_OK=0,Z_STREAM_END=1,Z_STREAM_ERROR=-2,Z_DATA_ERROR=-3,Z_BUF_ERROR=-5,Z_DEFAULT_COMPRESSION=-1,Z_FILTERED=1,Z_HUFFMAN_ONLY=2,Z_RLE=3,Z_FIXED=4,Z_DEFAULT_STRATEGY=0,Z_UNKNOWN=2,Z_DEFLATED=8,MAX_MEM_LEVEL=9,MAX_WBITS=15,DEF_MEM_LEVEL=8,LENGTH_CODES=29,LITERALS=256,L_CODES=LITERALS+1+LENGTH_CODES,D_CODES=30,BL_CODES=19,HEAP_SIZE=2*L_CODES+1,MAX_BITS=15,MIN_MATCH=3,MAX_MATCH=258,MIN_LOOKAHEAD=MAX_MATCH+MIN_MATCH+1,PRESET_DICT=32,INIT_STATE=42,EXTRA_STATE=69,NAME_STATE=73,COMMENT_STATE=91,HCRC_STATE=103,BUSY_STATE=113,FINISH_STATE=666,BS_NEED_MORE=1,BS_BLOCK_DONE=2,BS_FINISH_STARTED=3,BS_FINISH_DONE=4,OS_CODE=3,Config=function(t,e,_,a,s){this.good_length=t,this.max_lazy=e,this.nice_length=_,this.max_chain=a,this.func=s},configuration_table;configuration_table=[new Config(0,0,0,0,deflate_stored),new Config(4,4,8,4,deflate_fast),new Config(4,5,16,8,deflate_fast),new Config(4,6,32,32,deflate_fast),new Config(4,4,16,16,deflate_slow),new Config(8,16,32,32,deflate_slow),new Config(8,16,128,128,deflate_slow),new Config(8,32,128,256,deflate_slow),new Config(32,128,258,1024,deflate_slow),new Config(32,258,258,4096,deflate_slow)],exports.deflateInit=deflateInit,exports.deflateInit2=deflateInit2,exports.deflateReset=deflateReset,exports.deflateResetKeep=deflateResetKeep,exports.deflateSetHeader=deflateSetHeader,exports.deflate=deflate,exports.deflateEnd=deflateEnd,exports.deflateInfo="pako deflate (from Nodeca project)";


},{"../utils/common":4,"./adler32":5,"./crc32":7,"./messages":12,"./trees":13}],9:[function(require,module,exports){
"use strict";var BAD=30,TYPE=12;module.exports=function(i,e){var o,a,t,d,n,l,s,f,r,b,c,u,v,m,w,h,k,_,x,g,A,B,D,p,E;o=i.state,a=i.next_in,p=i.input,t=a+(i.avail_in-5),d=i.next_out,E=i.output,n=d-(e-i.avail_out),l=d+(i.avail_out-257),s=o.dmax,f=o.wsize,r=o.whave,b=o.wnext,c=o.window,u=o.hold,v=o.bits,m=o.lencode,w=o.distcode,h=(1<<o.lenbits)-1,k=(1<<o.distbits)-1;i:do{15>v&&(u+=p[a++]<<v,v+=8,u+=p[a++]<<v,v+=8),_=m[u&h];e:for(;;){if(x=_>>>24,u>>>=x,v-=x,x=_>>>16&255,0===x)E[d++]=65535&_;else{if(!(16&x)){if(0===(64&x)){_=m[(65535&_)+(u&(1<<x)-1)];continue e}if(32&x){o.mode=TYPE;break i}i.msg="invalid literal/length code",o.mode=BAD;break i}g=65535&_,x&=15,x&&(x>v&&(u+=p[a++]<<v,v+=8),g+=u&(1<<x)-1,u>>>=x,v-=x),15>v&&(u+=p[a++]<<v,v+=8,u+=p[a++]<<v,v+=8),_=w[u&k];o:for(;;){if(x=_>>>24,u>>>=x,v-=x,x=_>>>16&255,!(16&x)){if(0===(64&x)){_=w[(65535&_)+(u&(1<<x)-1)];continue o}i.msg="invalid distance code",o.mode=BAD;break i}if(A=65535&_,x&=15,x>v&&(u+=p[a++]<<v,v+=8,x>v&&(u+=p[a++]<<v,v+=8)),A+=u&(1<<x)-1,A>s){i.msg="invalid distance too far back",o.mode=BAD;break i}if(u>>>=x,v-=x,x=d-n,A>x){if(x=A-x,x>r&&o.sane){i.msg="invalid distance too far back",o.mode=BAD;break i}if(B=0,D=c,0===b){if(B+=f-x,g>x){g-=x;do E[d++]=c[B++];while(--x);B=d-A,D=E}}else if(x>b){if(B+=f+b-x,x-=b,g>x){g-=x;do E[d++]=c[B++];while(--x);if(B=0,g>b){x=b,g-=x;do E[d++]=c[B++];while(--x);B=d-A,D=E}}}else if(B+=b-x,g>x){g-=x;do E[d++]=c[B++];while(--x);B=d-A,D=E}for(;g>2;)E[d++]=D[B++],E[d++]=D[B++],E[d++]=D[B++],g-=3;g&&(E[d++]=D[B++],g>1&&(E[d++]=D[B++]))}else{B=d-A;do E[d++]=E[B++],E[d++]=E[B++],E[d++]=E[B++],g-=3;while(g>2);g&&(E[d++]=E[B++],g>1&&(E[d++]=E[B++]))}break}}break}}while(t>a&&l>d);g=v>>3,a-=g,v-=g<<3,u&=(1<<v)-1,i.next_in=a,i.next_out=d,i.avail_in=t>a?5+(t-a):5-(a-t),i.avail_out=l>d?257+(l-d):257-(d-l),o.hold=u,o.bits=v};


},{}],10:[function(require,module,exports){
"use strict";function ZSWAP32(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function InflateState(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new utils.Buf16(320),this.work=new utils.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function inflateResetKeep(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=HEAD,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new utils.Buf32(ENOUGH_LENS),t.distcode=t.distdyn=new utils.Buf32(ENOUGH_DISTS),t.sane=1,t.back=-1,Z_OK):Z_STREAM_ERROR}function inflateReset(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,inflateResetKeep(e)):Z_STREAM_ERROR}function inflateReset2(e,t){var a,i;return e&&e.state?(i=e.state,0>t?(a=0,t=-t):(a=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?Z_STREAM_ERROR:(null!==i.window&&i.wbits!==t&&(i.window=null),i.wrap=a,i.wbits=t,inflateReset(e))):Z_STREAM_ERROR}function inflateInit2(e,t){var a,i;return e?(i=new InflateState,e.state=i,i.window=null,a=inflateReset2(e,t),a!==Z_OK&&(e.state=null),a):Z_STREAM_ERROR}function inflateInit(e){return inflateInit2(e,DEF_WBITS)}function fixedtables(e){if(virgin){var t;for(lenfix=new utils.Buf32(512),distfix=new utils.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(inflate_table(LENS,e.lens,0,288,lenfix,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;inflate_table(DISTS,e.lens,0,32,distfix,0,e.work,{bits:5}),virgin=!1}e.lencode=lenfix,e.lenbits=9,e.distcode=distfix,e.distbits=5}function updatewindow(e,t,a,i){var n,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new utils.Buf8(s.wsize)),i>=s.wsize?(utils.arraySet(s.window,t,a-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),utils.arraySet(s.window,t,a-i,n,s.wnext),i-=n,i?(utils.arraySet(s.window,t,a-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}function inflate(e,t){var a,i,n,s,l,r,o,d,f,c,h,E,b,k,_,m,u,w,R,T,g,D,S,x,A=0,v=new utils.Buf8(4),O=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return Z_STREAM_ERROR;a=e.state,a.mode===TYPE&&(a.mode=TYPEDO),l=e.next_out,n=e.output,o=e.avail_out,s=e.next_in,i=e.input,r=e.avail_in,d=a.hold,f=a.bits,c=r,h=o,D=Z_OK;e:for(;;)switch(a.mode){case HEAD:if(0===a.wrap){a.mode=TYPEDO;break}for(;16>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(2&a.wrap&&35615===d){a.check=0,v[0]=255&d,v[1]=d>>>8&255,a.check=crc32(a.check,v,2,0),d=0,f=0,a.mode=FLAGS;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&d)<<8)+(d>>8))%31){e.msg="incorrect header check",a.mode=BAD;break}if((15&d)!==Z_DEFLATED){e.msg="unknown compression method",a.mode=BAD;break}if(d>>>=4,f-=4,g=(15&d)+8,0===a.wbits)a.wbits=g;else if(g>a.wbits){e.msg="invalid window size",a.mode=BAD;break}a.dmax=1<<g,e.adler=a.check=1,a.mode=512&d?DICTID:TYPE,d=0,f=0;break;case FLAGS:for(;16>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(a.flags=d,(255&a.flags)!==Z_DEFLATED){e.msg="unknown compression method",a.mode=BAD;break}if(57344&a.flags){e.msg="unknown header flags set",a.mode=BAD;break}a.head&&(a.head.text=d>>8&1),512&a.flags&&(v[0]=255&d,v[1]=d>>>8&255,a.check=crc32(a.check,v,2,0)),d=0,f=0,a.mode=TIME;case TIME:for(;32>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.head&&(a.head.time=d),512&a.flags&&(v[0]=255&d,v[1]=d>>>8&255,v[2]=d>>>16&255,v[3]=d>>>24&255,a.check=crc32(a.check,v,4,0)),d=0,f=0,a.mode=OS;case OS:for(;16>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.head&&(a.head.xflags=255&d,a.head.os=d>>8),512&a.flags&&(v[0]=255&d,v[1]=d>>>8&255,a.check=crc32(a.check,v,2,0)),d=0,f=0,a.mode=EXLEN;case EXLEN:if(1024&a.flags){for(;16>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.length=d,a.head&&(a.head.extra_len=d),512&a.flags&&(v[0]=255&d,v[1]=d>>>8&255,a.check=crc32(a.check,v,2,0)),d=0,f=0}else a.head&&(a.head.extra=null);a.mode=EXTRA;case EXTRA:if(1024&a.flags&&(E=a.length,E>r&&(E=r),E&&(a.head&&(g=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),utils.arraySet(a.head.extra,i,s,E,g)),512&a.flags&&(a.check=crc32(a.check,i,E,s)),r-=E,s+=E,a.length-=E),a.length))break e;a.length=0,a.mode=NAME;case NAME:if(2048&a.flags){if(0===r)break e;E=0;do g=i[s+E++],a.head&&g&&a.length<65536&&(a.head.name+=String.fromCharCode(g));while(g&&r>E);if(512&a.flags&&(a.check=crc32(a.check,i,E,s)),r-=E,s+=E,g)break e}else a.head&&(a.head.name=null);a.length=0,a.mode=COMMENT;case COMMENT:if(4096&a.flags){if(0===r)break e;E=0;do g=i[s+E++],a.head&&g&&a.length<65536&&(a.head.comment+=String.fromCharCode(g));while(g&&r>E);if(512&a.flags&&(a.check=crc32(a.check,i,E,s)),r-=E,s+=E,g)break e}else a.head&&(a.head.comment=null);a.mode=HCRC;case HCRC:if(512&a.flags){for(;16>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(d!==(65535&a.check)){e.msg="header crc mismatch",a.mode=BAD;break}d=0,f=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),e.adler=a.check=0,a.mode=TYPE;break;case DICTID:for(;32>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}e.adler=a.check=ZSWAP32(d),d=0,f=0,a.mode=DICT;case DICT:if(0===a.havedict)return e.next_out=l,e.avail_out=o,e.next_in=s,e.avail_in=r,a.hold=d,a.bits=f,Z_NEED_DICT;e.adler=a.check=1,a.mode=TYPE;case TYPE:if(t===Z_BLOCK||t===Z_TREES)break e;case TYPEDO:if(a.last){d>>>=7&f,f-=7&f,a.mode=CHECK;break}for(;3>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}switch(a.last=1&d,d>>>=1,f-=1,3&d){case 0:a.mode=STORED;break;case 1:if(fixedtables(a),a.mode=LEN_,t===Z_TREES){d>>>=2,f-=2;break e}break;case 2:a.mode=TABLE;break;case 3:e.msg="invalid block type",a.mode=BAD}d>>>=2,f-=2;break;case STORED:for(d>>>=7&f,f-=7&f;32>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if((65535&d)!==(d>>>16^65535)){e.msg="invalid stored block lengths",a.mode=BAD;break}if(a.length=65535&d,d=0,f=0,a.mode=COPY_,t===Z_TREES)break e;case COPY_:a.mode=COPY;case COPY:if(E=a.length){if(E>r&&(E=r),E>o&&(E=o),0===E)break e;utils.arraySet(n,i,s,E,l),r-=E,s+=E,o-=E,l+=E,a.length-=E;break}a.mode=TYPE;break;case TABLE:for(;14>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(a.nlen=(31&d)+257,d>>>=5,f-=5,a.ndist=(31&d)+1,d>>>=5,f-=5,a.ncode=(15&d)+4,d>>>=4,f-=4,a.nlen>286||a.ndist>30){e.msg="too many length or distance symbols",a.mode=BAD;break}a.have=0,a.mode=LENLENS;case LENLENS:for(;a.have<a.ncode;){for(;3>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.lens[O[a.have++]]=7&d,d>>>=3,f-=3}for(;a.have<19;)a.lens[O[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,S={bits:a.lenbits},D=inflate_table(CODES,a.lens,0,19,a.lencode,0,a.work,S),a.lenbits=S.bits,D){e.msg="invalid code lengths set",a.mode=BAD;break}a.have=0,a.mode=CODELENS;case CODELENS:for(;a.have<a.nlen+a.ndist;){for(;A=a.lencode[d&(1<<a.lenbits)-1],_=A>>>24,m=A>>>16&255,u=65535&A,!(f>=_);){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(16>u)d>>>=_,f-=_,a.lens[a.have++]=u;else{if(16===u){for(x=_+2;x>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(d>>>=_,f-=_,0===a.have){e.msg="invalid bit length repeat",a.mode=BAD;break}g=a.lens[a.have-1],E=3+(3&d),d>>>=2,f-=2}else if(17===u){for(x=_+3;x>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}d>>>=_,f-=_,g=0,E=3+(7&d),d>>>=3,f-=3}else{for(x=_+7;x>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}d>>>=_,f-=_,g=0,E=11+(127&d),d>>>=7,f-=7}if(a.have+E>a.nlen+a.ndist){e.msg="invalid bit length repeat",a.mode=BAD;break}for(;E--;)a.lens[a.have++]=g}}if(a.mode===BAD)break;if(0===a.lens[256]){e.msg="invalid code -- missing end-of-block",a.mode=BAD;break}if(a.lenbits=9,S={bits:a.lenbits},D=inflate_table(LENS,a.lens,0,a.nlen,a.lencode,0,a.work,S),a.lenbits=S.bits,D){e.msg="invalid literal/lengths set",a.mode=BAD;break}if(a.distbits=6,a.distcode=a.distdyn,S={bits:a.distbits},D=inflate_table(DISTS,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,S),a.distbits=S.bits,D){e.msg="invalid distances set",a.mode=BAD;break}if(a.mode=LEN_,t===Z_TREES)break e;case LEN_:a.mode=LEN;case LEN:if(r>=6&&o>=258){e.next_out=l,e.avail_out=o,e.next_in=s,e.avail_in=r,a.hold=d,a.bits=f,inflate_fast(e,h),l=e.next_out,n=e.output,o=e.avail_out,s=e.next_in,i=e.input,r=e.avail_in,d=a.hold,f=a.bits,a.mode===TYPE&&(a.back=-1);break}for(a.back=0;A=a.lencode[d&(1<<a.lenbits)-1],_=A>>>24,m=A>>>16&255,u=65535&A,!(f>=_);){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(m&&0===(240&m)){for(w=_,R=m,T=u;A=a.lencode[T+((d&(1<<w+R)-1)>>w)],_=A>>>24,m=A>>>16&255,u=65535&A,!(f>=w+_);){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}d>>>=w,f-=w,a.back+=w}if(d>>>=_,f-=_,a.back+=_,a.length=u,0===m){a.mode=LIT;break}if(32&m){a.back=-1,a.mode=TYPE;break}if(64&m){e.msg="invalid literal/length code",a.mode=BAD;break}a.extra=15&m,a.mode=LENEXT;case LENEXT:if(a.extra){for(x=a.extra;x>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.length+=d&(1<<a.extra)-1,d>>>=a.extra,f-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=DIST;case DIST:for(;A=a.distcode[d&(1<<a.distbits)-1],_=A>>>24,m=A>>>16&255,u=65535&A,!(f>=_);){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(0===(240&m)){for(w=_,R=m,T=u;A=a.distcode[T+((d&(1<<w+R)-1)>>w)],_=A>>>24,m=A>>>16&255,u=65535&A,!(f>=w+_);){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}d>>>=w,f-=w,a.back+=w}if(d>>>=_,f-=_,a.back+=_,64&m){e.msg="invalid distance code",a.mode=BAD;break}a.offset=u,a.extra=15&m,a.mode=DISTEXT;case DISTEXT:if(a.extra){for(x=a.extra;x>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}a.offset+=d&(1<<a.extra)-1,d>>>=a.extra,f-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){e.msg="invalid distance too far back",a.mode=BAD;break}a.mode=MATCH;case MATCH:if(0===o)break e;if(E=h-o,a.offset>E){if(E=a.offset-E,E>a.whave&&a.sane){e.msg="invalid distance too far back",a.mode=BAD;break}E>a.wnext?(E-=a.wnext,b=a.wsize-E):b=a.wnext-E,E>a.length&&(E=a.length),k=a.window}else k=n,b=l-a.offset,E=a.length;E>o&&(E=o),o-=E,a.length-=E;do n[l++]=k[b++];while(--E);0===a.length&&(a.mode=LEN);break;case LIT:if(0===o)break e;n[l++]=a.length,o--,a.mode=LEN;break;case CHECK:if(a.wrap){for(;32>f;){if(0===r)break e;r--,d|=i[s++]<<f,f+=8}if(h-=o,e.total_out+=h,a.total+=h,h&&(e.adler=a.check=a.flags?crc32(a.check,n,h,l-h):adler32(a.check,n,h,l-h)),h=o,(a.flags?d:ZSWAP32(d))!==a.check){e.msg="incorrect data check",a.mode=BAD;break}d=0,f=0}a.mode=LENGTH;case LENGTH:if(a.wrap&&a.flags){for(;32>f;){if(0===r)break e;r--,d+=i[s++]<<f,f+=8}if(d!==(4294967295&a.total)){e.msg="incorrect length check",a.mode=BAD;break}d=0,f=0}a.mode=DONE;case DONE:D=Z_STREAM_END;break e;case BAD:D=Z_DATA_ERROR;break e;case MEM:return Z_MEM_ERROR;case SYNC:default:return Z_STREAM_ERROR}return e.next_out=l,e.avail_out=o,e.next_in=s,e.avail_in=r,a.hold=d,a.bits=f,(a.wsize||h!==e.avail_out&&a.mode<BAD&&(a.mode<CHECK||t!==Z_FINISH))&&updatewindow(e,e.output,e.next_out,h-e.avail_out)?(a.mode=MEM,Z_MEM_ERROR):(c-=e.avail_in,h-=e.avail_out,e.total_in+=c,e.total_out+=h,a.total+=h,a.wrap&&h&&(e.adler=a.check=a.flags?crc32(a.check,n,h,e.next_out-h):adler32(a.check,n,h,e.next_out-h)),e.data_type=a.bits+(a.last?64:0)+(a.mode===TYPE?128:0)+(a.mode===LEN_||a.mode===COPY_?256:0),(0===c&&0===h||t===Z_FINISH)&&D===Z_OK&&(D=Z_BUF_ERROR),D)}function inflateEnd(e){if(!e||!e.state)return Z_STREAM_ERROR;var t=e.state;return t.window&&(t.window=null),e.state=null,Z_OK}function inflateGetHeader(e,t){var a;return e&&e.state?(a=e.state,0===(2&a.wrap)?Z_STREAM_ERROR:(a.head=t,t.done=!1,Z_OK)):Z_STREAM_ERROR}var utils=require("../utils/common"),adler32=require("./adler32"),crc32=require("./crc32"),inflate_fast=require("./inffast"),inflate_table=require("./inftrees"),CODES=0,LENS=1,DISTS=2,Z_FINISH=4,Z_BLOCK=5,Z_TREES=6,Z_OK=0,Z_STREAM_END=1,Z_NEED_DICT=2,Z_STREAM_ERROR=-2,Z_DATA_ERROR=-3,Z_MEM_ERROR=-4,Z_BUF_ERROR=-5,Z_DEFLATED=8,HEAD=1,FLAGS=2,TIME=3,OS=4,EXLEN=5,EXTRA=6,NAME=7,COMMENT=8,HCRC=9,DICTID=10,DICT=11,TYPE=12,TYPEDO=13,STORED=14,COPY_=15,COPY=16,TABLE=17,LENLENS=18,CODELENS=19,LEN_=20,LEN=21,LENEXT=22,DIST=23,DISTEXT=24,MATCH=25,LIT=26,CHECK=27,LENGTH=28,DONE=29,BAD=30,MEM=31,SYNC=32,ENOUGH_LENS=852,ENOUGH_DISTS=592,MAX_WBITS=15,DEF_WBITS=MAX_WBITS,virgin=!0,lenfix,distfix;exports.inflateReset=inflateReset,exports.inflateReset2=inflateReset2,exports.inflateResetKeep=inflateResetKeep,exports.inflateInit=inflateInit,exports.inflateInit2=inflateInit2,exports.inflate=inflate,exports.inflateEnd=inflateEnd,exports.inflateGetHeader=inflateGetHeader,exports.inflateInfo="pako inflate (from Nodeca project)";


},{"../utils/common":4,"./adler32":5,"./crc32":7,"./inffast":9,"./inftrees":11}],11:[function(require,module,exports){
"use strict";var utils=require("../utils/common"),MAXBITS=15,ENOUGH_LENS=852,ENOUGH_DISTS=592,CODES=0,LENS=1,DISTS=2,lbase=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],lext=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],dbase=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],dext=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];module.exports=function(r,S,e,f,t,i,u,o){var E,l,s,n,I,N,T,B,D,O=o.bits,a=0,b=0,A=0,L=0,M=0,X=0,d=0,G=0,H=0,U=0,_=null,x=0,c=new utils.Buf16(MAXBITS+1),m=new utils.Buf16(MAXBITS+1),v=null,w=0;for(a=0;MAXBITS>=a;a++)c[a]=0;for(b=0;f>b;b++)c[S[e+b]]++;for(M=O,L=MAXBITS;L>=1&&0===c[L];L--);if(M>L&&(M=L),0===L)return t[i++]=20971520,t[i++]=20971520,o.bits=1,0;for(A=1;L>A&&0===c[A];A++);for(A>M&&(M=A),G=1,a=1;MAXBITS>=a;a++)if(G<<=1,G-=c[a],0>G)return-1;if(G>0&&(r===CODES||1!==L))return-1;for(m[1]=0,a=1;MAXBITS>a;a++)m[a+1]=m[a]+c[a];for(b=0;f>b;b++)0!==S[e+b]&&(u[m[S[e+b]]++]=b);if(r===CODES?(_=v=u,N=19):r===LENS?(_=lbase,x-=257,v=lext,w-=257,N=256):(_=dbase,v=dext,N=-1),U=0,b=0,a=A,I=i,X=M,d=0,s=-1,H=1<<M,n=H-1,r===LENS&&H>ENOUGH_LENS||r===DISTS&&H>ENOUGH_DISTS)return 1;for(var C=0;;){C++,T=a-d,u[b]<N?(B=0,D=u[b]):u[b]>N?(B=v[w+u[b]],D=_[x+u[b]]):(B=96,D=0),E=1<<a-d,l=1<<X,A=l;do l-=E,t[I+(U>>d)+l]=T<<24|B<<16|D|0;while(0!==l);for(E=1<<a-1;U&E;)E>>=1;if(0!==E?(U&=E-1,U+=E):U=0,b++,0===--c[a]){if(a===L)break;a=S[e+u[b]]}if(a>M&&(U&n)!==s){for(0===d&&(d=M),I+=A,X=a-d,G=1<<X;L>X+d&&(G-=c[X+d],!(0>=G));)X++,G<<=1;if(H+=1<<X,r===LENS&&H>ENOUGH_LENS||r===DISTS&&H>ENOUGH_DISTS)return 1;s=U&n,t[s]=M<<24|X<<16|I-i|0}}return 0!==U&&(t[I+U]=a-d<<24|64<<16|0),o.bits=M,0};


},{"../utils/common":4}],12:[function(require,module,exports){
"use strict";module.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};


},{}],13:[function(require,module,exports){
"use strict";function zero(e){for(var _=e.length;--_>=0;)e[_]=0}function d_code(e){return 256>e?_dist_code[e]:_dist_code[256+(e>>>7)]}function put_short(e,_){e.pending_buf[e.pending++]=255&_,e.pending_buf[e.pending++]=_>>>8&255}function send_bits(e,_,t){e.bi_valid>Buf_size-t?(e.bi_buf|=_<<e.bi_valid&65535,put_short(e,e.bi_buf),e.bi_buf=_>>Buf_size-e.bi_valid,e.bi_valid+=t-Buf_size):(e.bi_buf|=_<<e.bi_valid&65535,e.bi_valid+=t)}function send_code(e,_,t){send_bits(e,t[2*_],t[2*_+1])}function bi_reverse(e,_){var t=0;do t|=1&e,e>>>=1,t<<=1;while(--_>0);return t>>>1}function bi_flush(e){16===e.bi_valid?(put_short(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}function gen_bitlen(e,_){var t,r,i,n,s,d,a=_.dyn_tree,l=_.max_code,c=_.stat_desc.static_tree,o=_.stat_desc.has_stree,b=_.stat_desc.extra_bits,f=_.stat_desc.extra_base,u=_.stat_desc.max_length,p=0;for(n=0;MAX_BITS>=n;n++)e.bl_count[n]=0;for(a[2*e.heap[e.heap_max]+1]=0,t=e.heap_max+1;HEAP_SIZE>t;t++)r=e.heap[t],n=a[2*a[2*r+1]+1]+1,n>u&&(n=u,p++),a[2*r+1]=n,r>l||(e.bl_count[n]++,s=0,r>=f&&(s=b[r-f]),d=a[2*r],e.opt_len+=d*(n+s),o&&(e.static_len+=d*(c[2*r+1]+s)));if(0!==p){do{for(n=u-1;0===e.bl_count[n];)n--;e.bl_count[n]--,e.bl_count[n+1]+=2,e.bl_count[u]--,p-=2}while(p>0);for(n=u;0!==n;n--)for(r=e.bl_count[n];0!==r;)i=e.heap[--t],i>l||(a[2*i+1]!==n&&(e.opt_len+=(n-a[2*i+1])*a[2*i],a[2*i+1]=n),r--)}}function gen_codes(e,_,t){var r,i,n=new Array(MAX_BITS+1),s=0;for(r=1;MAX_BITS>=r;r++)n[r]=s=s+t[r-1]<<1;for(i=0;_>=i;i++){var d=e[2*i+1];0!==d&&(e[2*i]=bi_reverse(n[d]++,d))}}function tr_static_init(){var e,_,t,r,i,n=new Array(MAX_BITS+1);for(t=0,r=0;LENGTH_CODES-1>r;r++)for(base_length[r]=t,e=0;e<1<<extra_lbits[r];e++)_length_code[t++]=r;for(_length_code[t-1]=r,i=0,r=0;16>r;r++)for(base_dist[r]=i,e=0;e<1<<extra_dbits[r];e++)_dist_code[i++]=r;for(i>>=7;D_CODES>r;r++)for(base_dist[r]=i<<7,e=0;e<1<<extra_dbits[r]-7;e++)_dist_code[256+i++]=r;for(_=0;MAX_BITS>=_;_++)n[_]=0;for(e=0;143>=e;)static_ltree[2*e+1]=8,e++,n[8]++;for(;255>=e;)static_ltree[2*e+1]=9,e++,n[9]++;for(;279>=e;)static_ltree[2*e+1]=7,e++,n[7]++;for(;287>=e;)static_ltree[2*e+1]=8,e++,n[8]++;for(gen_codes(static_ltree,L_CODES+1,n),e=0;D_CODES>e;e++)static_dtree[2*e+1]=5,static_dtree[2*e]=bi_reverse(e,5);static_l_desc=new StaticTreeDesc(static_ltree,extra_lbits,LITERALS+1,L_CODES,MAX_BITS),static_d_desc=new StaticTreeDesc(static_dtree,extra_dbits,0,D_CODES,MAX_BITS),static_bl_desc=new StaticTreeDesc(new Array(0),extra_blbits,0,BL_CODES,MAX_BL_BITS)}function init_block(e){var _;for(_=0;L_CODES>_;_++)e.dyn_ltree[2*_]=0;for(_=0;D_CODES>_;_++)e.dyn_dtree[2*_]=0;for(_=0;BL_CODES>_;_++)e.bl_tree[2*_]=0;e.dyn_ltree[2*END_BLOCK]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function bi_windup(e){e.bi_valid>8?put_short(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function copy_block(e,_,t,r){bi_windup(e),r&&(put_short(e,t),put_short(e,~t)),utils.arraySet(e.pending_buf,e.window,_,t,e.pending),e.pending+=t}function smaller(e,_,t,r){var i=2*_,n=2*t;return e[i]<e[n]||e[i]===e[n]&&r[_]<=r[t]}function pqdownheap(e,_,t){for(var r=e.heap[t],i=t<<1;i<=e.heap_len&&(i<e.heap_len&&smaller(_,e.heap[i+1],e.heap[i],e.depth)&&i++,!smaller(_,r,e.heap[i],e.depth));)e.heap[t]=e.heap[i],t=i,i<<=1;e.heap[t]=r}function compress_block(e,_,t){var r,i,n,s,d=0;if(0!==e.last_lit)do r=e.pending_buf[e.d_buf+2*d]<<8|e.pending_buf[e.d_buf+2*d+1],i=e.pending_buf[e.l_buf+d],d++,0===r?send_code(e,i,_):(n=_length_code[i],send_code(e,n+LITERALS+1,_),s=extra_lbits[n],0!==s&&(i-=base_length[n],send_bits(e,i,s)),r--,n=d_code(r),send_code(e,n,t),s=extra_dbits[n],0!==s&&(r-=base_dist[n],send_bits(e,r,s)));while(d<e.last_lit);send_code(e,END_BLOCK,_)}function build_tree(e,_){var t,r,i,n=_.dyn_tree,s=_.stat_desc.static_tree,d=_.stat_desc.has_stree,a=_.stat_desc.elems,l=-1;for(e.heap_len=0,e.heap_max=HEAP_SIZE,t=0;a>t;t++)0!==n[2*t]?(e.heap[++e.heap_len]=l=t,e.depth[t]=0):n[2*t+1]=0;for(;e.heap_len<2;)i=e.heap[++e.heap_len]=2>l?++l:0,n[2*i]=1,e.depth[i]=0,e.opt_len--,d&&(e.static_len-=s[2*i+1]);for(_.max_code=l,t=e.heap_len>>1;t>=1;t--)pqdownheap(e,n,t);i=a;do t=e.heap[1],e.heap[1]=e.heap[e.heap_len--],pqdownheap(e,n,1),r=e.heap[1],e.heap[--e.heap_max]=t,e.heap[--e.heap_max]=r,n[2*i]=n[2*t]+n[2*r],e.depth[i]=(e.depth[t]>=e.depth[r]?e.depth[t]:e.depth[r])+1,n[2*t+1]=n[2*r+1]=i,e.heap[1]=i++,pqdownheap(e,n,1);while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],gen_bitlen(e,_),gen_codes(n,l,e.bl_count)}function scan_tree(e,_,t){var r,i,n=-1,s=_[1],d=0,a=7,l=4;for(0===s&&(a=138,l=3),_[2*(t+1)+1]=65535,r=0;t>=r;r++)i=s,s=_[2*(r+1)+1],++d<a&&i===s||(l>d?e.bl_tree[2*i]+=d:0!==i?(i!==n&&e.bl_tree[2*i]++,e.bl_tree[2*REP_3_6]++):10>=d?e.bl_tree[2*REPZ_3_10]++:e.bl_tree[2*REPZ_11_138]++,d=0,n=i,0===s?(a=138,l=3):i===s?(a=6,l=3):(a=7,l=4))}function send_tree(e,_,t){var r,i,n=-1,s=_[1],d=0,a=7,l=4;for(0===s&&(a=138,l=3),r=0;t>=r;r++)if(i=s,s=_[2*(r+1)+1],!(++d<a&&i===s)){if(l>d){do send_code(e,i,e.bl_tree);while(0!==--d)}else 0!==i?(i!==n&&(send_code(e,i,e.bl_tree),d--),send_code(e,REP_3_6,e.bl_tree),send_bits(e,d-3,2)):10>=d?(send_code(e,REPZ_3_10,e.bl_tree),send_bits(e,d-3,3)):(send_code(e,REPZ_11_138,e.bl_tree),send_bits(e,d-11,7));d=0,n=i,0===s?(a=138,l=3):i===s?(a=6,l=3):(a=7,l=4)}}function build_bl_tree(e){var _;for(scan_tree(e,e.dyn_ltree,e.l_desc.max_code),scan_tree(e,e.dyn_dtree,e.d_desc.max_code),build_tree(e,e.bl_desc),_=BL_CODES-1;_>=3&&0===e.bl_tree[2*bl_order[_]+1];_--);return e.opt_len+=3*(_+1)+5+5+4,_}function send_all_trees(e,_,t,r){var i;for(send_bits(e,_-257,5),send_bits(e,t-1,5),send_bits(e,r-4,4),i=0;r>i;i++)send_bits(e,e.bl_tree[2*bl_order[i]+1],3);send_tree(e,e.dyn_ltree,_-1),send_tree(e,e.dyn_dtree,t-1)}function detect_data_type(e){var _,t=4093624447;for(_=0;31>=_;_++,t>>>=1)if(1&t&&0!==e.dyn_ltree[2*_])return Z_BINARY;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return Z_TEXT;for(_=32;LITERALS>_;_++)if(0!==e.dyn_ltree[2*_])return Z_TEXT;return Z_BINARY}function _tr_init(e){static_init_done||(tr_static_init(),static_init_done=!0),e.l_desc=new TreeDesc(e.dyn_ltree,static_l_desc),e.d_desc=new TreeDesc(e.dyn_dtree,static_d_desc),e.bl_desc=new TreeDesc(e.bl_tree,static_bl_desc),e.bi_buf=0,e.bi_valid=0,init_block(e)}function _tr_stored_block(e,_,t,r){send_bits(e,(STORED_BLOCK<<1)+(r?1:0),3),copy_block(e,_,t,!0)}function _tr_align(e){send_bits(e,STATIC_TREES<<1,3),send_code(e,END_BLOCK,static_ltree),bi_flush(e)}function _tr_flush_block(e,_,t,r){var i,n,s=0;e.level>0?(e.strm.data_type===Z_UNKNOWN&&(e.strm.data_type=detect_data_type(e)),build_tree(e,e.l_desc),build_tree(e,e.d_desc),s=build_bl_tree(e),i=e.opt_len+3+7>>>3,n=e.static_len+3+7>>>3,i>=n&&(i=n)):i=n=t+5,i>=t+4&&-1!==_?_tr_stored_block(e,_,t,r):e.strategy===Z_FIXED||n===i?(send_bits(e,(STATIC_TREES<<1)+(r?1:0),3),compress_block(e,static_ltree,static_dtree)):(send_bits(e,(DYN_TREES<<1)+(r?1:0),3),send_all_trees(e,e.l_desc.max_code+1,e.d_desc.max_code+1,s+1),compress_block(e,e.dyn_ltree,e.dyn_dtree)),init_block(e),r&&bi_windup(e)}function _tr_tally(e,_,t){return e.pending_buf[e.d_buf+2*e.last_lit]=_>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&_,e.pending_buf[e.l_buf+e.last_lit]=255&t,e.last_lit++,0===_?e.dyn_ltree[2*t]++:(e.matches++,_--,e.dyn_ltree[2*(_length_code[t]+LITERALS+1)]++,e.dyn_dtree[2*d_code(_)]++),e.last_lit===e.lit_bufsize-1}var utils=require("../utils/common"),Z_FIXED=4,Z_BINARY=0,Z_TEXT=1,Z_UNKNOWN=2,STORED_BLOCK=0,STATIC_TREES=1,DYN_TREES=2,MIN_MATCH=3,MAX_MATCH=258,LENGTH_CODES=29,LITERALS=256,L_CODES=LITERALS+1+LENGTH_CODES,D_CODES=30,BL_CODES=19,HEAP_SIZE=2*L_CODES+1,MAX_BITS=15,Buf_size=16,MAX_BL_BITS=7,END_BLOCK=256,REP_3_6=16,REPZ_3_10=17,REPZ_11_138=18,extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],DIST_CODE_LEN=512,static_ltree=new Array(2*(L_CODES+2));zero(static_ltree);var static_dtree=new Array(2*D_CODES);zero(static_dtree);var _dist_code=new Array(DIST_CODE_LEN);zero(_dist_code);var _length_code=new Array(MAX_MATCH-MIN_MATCH+1);zero(_length_code);var base_length=new Array(LENGTH_CODES);zero(base_length);var base_dist=new Array(D_CODES);zero(base_dist);var StaticTreeDesc=function(e,_,t,r,i){this.static_tree=e,this.extra_bits=_,this.extra_base=t,this.elems=r,this.max_length=i,this.has_stree=e&&e.length},static_l_desc,static_d_desc,static_bl_desc,TreeDesc=function(e,_){this.dyn_tree=e,this.max_code=0,this.stat_desc=_},static_init_done=!1;exports._tr_init=_tr_init,exports._tr_stored_block=_tr_stored_block,exports._tr_flush_block=_tr_flush_block,exports._tr_tally=_tr_tally,exports._tr_align=_tr_align;


},{"../utils/common":4}],14:[function(require,module,exports){
"use strict";function ZStream(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}module.exports=ZStream;


},{}],15:[function(require,module,exports){
(function (process,Buffer){
function Zlib(t){if(t<exports.DEFLATE||t>exports.UNZIP)throw new TypeError("Bad argument");this.mode=t,this.init_done=!1,this.write_in_progress=!1,this.pending_close=!1,this.windowBits=0,this.level=0,this.memLevel=0,this.strategy=0,this.dictionary=null}function bufferSet(t,e){for(var s=0;s<t.length;s++)this[e+s]=t[s]}var msg=require("pako/lib/zlib/messages"),zstream=require("pako/lib/zlib/zstream"),zlib_deflate=require("pako/lib/zlib/deflate.js"),zlib_inflate=require("pako/lib/zlib/inflate.js"),constants=require("pako/lib/zlib/constants");for(var key in constants)exports[key]=constants[key];exports.NONE=0,exports.DEFLATE=1,exports.INFLATE=2,exports.GZIP=3,exports.GUNZIP=4,exports.DEFLATERAW=5,exports.INFLATERAW=6,exports.UNZIP=7,Zlib.prototype.init=function(t,e,s,i){switch(this.windowBits=t,this.level=e,this.memLevel=s,this.strategy=i,(this.mode===exports.GZIP||this.mode===exports.GUNZIP)&&(this.windowBits+=16),this.mode===exports.UNZIP&&(this.windowBits+=32),(this.mode===exports.DEFLATERAW||this.mode===exports.INFLATERAW)&&(this.windowBits=-this.windowBits),this.strm=new zstream,this.mode){case exports.DEFLATE:case exports.GZIP:case exports.DEFLATERAW:var r=zlib_deflate.deflateInit2(this.strm,this.level,exports.Z_DEFLATED,this.windowBits,this.memLevel,this.strategy);break;case exports.INFLATE:case exports.GUNZIP:case exports.INFLATERAW:case exports.UNZIP:var r=zlib_inflate.inflateInit2(this.strm,this.windowBits);break;default:throw new Error("Unknown mode "+this.mode)}return r!==exports.Z_OK?void this._error(r):(this.write_in_progress=!1,void(this.init_done=!0))},Zlib.prototype.params=function(){throw new Error("deflateParams Not supported")},Zlib.prototype._writeCheck=function(){if(!this.init_done)throw new Error("write before init");if(this.mode===exports.NONE)throw new Error("already finalized");if(this.write_in_progress)throw new Error("write already in progress");if(this.pending_close)throw new Error("close is pending")},Zlib.prototype.write=function(t,e,s,i,r,o,n){this._writeCheck(),this.write_in_progress=!0;var a=this;return process.nextTick(function(){a.write_in_progress=!1;var p=a._write(t,e,s,i,r,o,n);a.callback(p[0],p[1]),a.pending_close&&a.close()}),this},Zlib.prototype.writeSync=function(t,e,s,i,r,o,n){return this._writeCheck(),this._write(t,e,s,i,r,o,n)},Zlib.prototype._write=function(t,e,s,i,r,o,n){if(this.write_in_progress=!0,t!==exports.Z_NO_FLUSH&&t!==exports.Z_PARTIAL_FLUSH&&t!==exports.Z_SYNC_FLUSH&&t!==exports.Z_FULL_FLUSH&&t!==exports.Z_FINISH&&t!==exports.Z_BLOCK)throw new Error("Invalid flush value");null==e&&(e=new Buffer(0),i=0,s=0),r.set=r._set?r._set:bufferSet;var a=this.strm;switch(a.avail_in=i,a.input=e,a.next_in=s,a.avail_out=n,a.output=r,a.next_out=o,this.mode){case exports.DEFLATE:case exports.GZIP:case exports.DEFLATERAW:var p=zlib_deflate.deflate(a,t);break;case exports.UNZIP:case exports.INFLATE:case exports.GUNZIP:case exports.INFLATERAW:var p=zlib_inflate.inflate(a,t);break;default:throw new Error("Unknown mode "+this.mode)}return p!==exports.Z_STREAM_END&&p!==exports.Z_OK&&this._error(p),this.write_in_progress=!1,[a.avail_in,a.avail_out]},Zlib.prototype.close=function(){return this.write_in_progress?void(this.pending_close=!0):(this.pending_close=!1,this.mode===exports.DEFLATE||this.mode===exports.GZIP||this.mode===exports.DEFLATERAW?zlib_deflate.deflateEnd(this.strm):zlib_inflate.inflateEnd(this.strm),void(this.mode=exports.NONE))},Zlib.prototype.reset=function(){switch(this.mode){case exports.DEFLATE:case exports.DEFLATERAW:var t=zlib_deflate.deflateReset(this.strm);break;case exports.INFLATE:case exports.INFLATERAW:var t=zlib_inflate.inflateReset(this.strm)}t!==exports.Z_OK&&this._error(t)},Zlib.prototype._error=function(t){this.onerror(msg[t]+": "+this.strm.msg,t),this.write_in_progress=!1,this.pending_close&&this.close()},exports.Zlib=Zlib;


}).call(this,require('_process'),require("buffer").Buffer)

},{"_process":164,"buffer":17,"pako/lib/zlib/constants":6,"pako/lib/zlib/deflate.js":8,"pako/lib/zlib/inflate.js":10,"pako/lib/zlib/messages":12,"pako/lib/zlib/zstream":14}],16:[function(require,module,exports){
(function (process,Buffer){
function zlibBuffer(e,n,i){function t(){for(var n;null!==(n=e.read());)o.push(n),s+=n.length;e.once("readable",t)}function r(n){e.removeListener("end",f),e.removeListener("readable",t),i(n)}function f(){var n=Buffer.concat(o,s);o=[],i(null,n),e.close()}var o=[],s=0;e.on("error",r),e.on("end",f),e.end(n),t()}function zlibBufferSync(e,n){if("string"==typeof n&&(n=new Buffer(n)),!Buffer.isBuffer(n))throw new TypeError("Not a string or buffer");var i=binding.Z_FINISH;return e._processChunk(n,i)}function Deflate(e){return this instanceof Deflate?void Zlib.call(this,e,binding.DEFLATE):new Deflate(e)}function Inflate(e){return this instanceof Inflate?void Zlib.call(this,e,binding.INFLATE):new Inflate(e)}function Gzip(e){return this instanceof Gzip?void Zlib.call(this,e,binding.GZIP):new Gzip(e)}function Gunzip(e){return this instanceof Gunzip?void Zlib.call(this,e,binding.GUNZIP):new Gunzip(e)}function DeflateRaw(e){return this instanceof DeflateRaw?void Zlib.call(this,e,binding.DEFLATERAW):new DeflateRaw(e)}function InflateRaw(e){return this instanceof InflateRaw?void Zlib.call(this,e,binding.INFLATERAW):new InflateRaw(e)}function Unzip(e){return this instanceof Unzip?void Zlib.call(this,e,binding.UNZIP):new Unzip(e)}function Zlib(e,n){if(this._opts=e=e||{},this._chunkSize=e.chunkSize||exports.Z_DEFAULT_CHUNK,Transform.call(this,e),e.flush&&e.flush!==binding.Z_NO_FLUSH&&e.flush!==binding.Z_PARTIAL_FLUSH&&e.flush!==binding.Z_SYNC_FLUSH&&e.flush!==binding.Z_FULL_FLUSH&&e.flush!==binding.Z_FINISH&&e.flush!==binding.Z_BLOCK)throw new Error("Invalid flush flag: "+e.flush);if(this._flushFlag=e.flush||binding.Z_NO_FLUSH,e.chunkSize&&(e.chunkSize<exports.Z_MIN_CHUNK||e.chunkSize>exports.Z_MAX_CHUNK))throw new Error("Invalid chunk size: "+e.chunkSize);if(e.windowBits&&(e.windowBits<exports.Z_MIN_WINDOWBITS||e.windowBits>exports.Z_MAX_WINDOWBITS))throw new Error("Invalid windowBits: "+e.windowBits);if(e.level&&(e.level<exports.Z_MIN_LEVEL||e.level>exports.Z_MAX_LEVEL))throw new Error("Invalid compression level: "+e.level);if(e.memLevel&&(e.memLevel<exports.Z_MIN_MEMLEVEL||e.memLevel>exports.Z_MAX_MEMLEVEL))throw new Error("Invalid memLevel: "+e.memLevel);if(e.strategy&&e.strategy!=exports.Z_FILTERED&&e.strategy!=exports.Z_HUFFMAN_ONLY&&e.strategy!=exports.Z_RLE&&e.strategy!=exports.Z_FIXED&&e.strategy!=exports.Z_DEFAULT_STRATEGY)throw new Error("Invalid strategy: "+e.strategy);if(e.dictionary&&!Buffer.isBuffer(e.dictionary))throw new Error("Invalid dictionary: it should be a Buffer instance");this._binding=new binding.Zlib(n);var i=this;this._hadError=!1,this._binding.onerror=function(e,n){i._binding=null,i._hadError=!0;var t=new Error(e);t.errno=n,t.code=exports.codes[n],i.emit("error",t)};var t=exports.Z_DEFAULT_COMPRESSION;"number"==typeof e.level&&(t=e.level);var r=exports.Z_DEFAULT_STRATEGY;"number"==typeof e.strategy&&(r=e.strategy),this._binding.init(e.windowBits||exports.Z_DEFAULT_WINDOWBITS,t,e.memLevel||exports.Z_DEFAULT_MEMLEVEL,r,e.dictionary),this._buffer=new Buffer(this._chunkSize),this._offset=0,this._closed=!1,this._level=t,this._strategy=r,this.once("end",this.close)}var Transform=require("_stream_transform"),binding=require("./binding"),util=require("util"),assert=require("assert").ok;binding.Z_MIN_WINDOWBITS=8,binding.Z_MAX_WINDOWBITS=15,binding.Z_DEFAULT_WINDOWBITS=15,binding.Z_MIN_CHUNK=64,binding.Z_MAX_CHUNK=1/0,binding.Z_DEFAULT_CHUNK=16384,binding.Z_MIN_MEMLEVEL=1,binding.Z_MAX_MEMLEVEL=9,binding.Z_DEFAULT_MEMLEVEL=8,binding.Z_MIN_LEVEL=-1,binding.Z_MAX_LEVEL=9,binding.Z_DEFAULT_LEVEL=binding.Z_DEFAULT_COMPRESSION,Object.keys(binding).forEach(function(e){e.match(/^Z/)&&(exports[e]=binding[e])}),exports.codes={Z_OK:binding.Z_OK,Z_STREAM_END:binding.Z_STREAM_END,Z_NEED_DICT:binding.Z_NEED_DICT,Z_ERRNO:binding.Z_ERRNO,Z_STREAM_ERROR:binding.Z_STREAM_ERROR,Z_DATA_ERROR:binding.Z_DATA_ERROR,Z_MEM_ERROR:binding.Z_MEM_ERROR,Z_BUF_ERROR:binding.Z_BUF_ERROR,Z_VERSION_ERROR:binding.Z_VERSION_ERROR},Object.keys(exports.codes).forEach(function(e){exports.codes[exports.codes[e]]=e}),exports.Deflate=Deflate,exports.Inflate=Inflate,exports.Gzip=Gzip,exports.Gunzip=Gunzip,exports.DeflateRaw=DeflateRaw,exports.InflateRaw=InflateRaw,exports.Unzip=Unzip,exports.createDeflate=function(e){return new Deflate(e)},exports.createInflate=function(e){return new Inflate(e)},exports.createDeflateRaw=function(e){return new DeflateRaw(e)},exports.createInflateRaw=function(e){return new InflateRaw(e)},exports.createGzip=function(e){return new Gzip(e)},exports.createGunzip=function(e){return new Gunzip(e)},exports.createUnzip=function(e){return new Unzip(e)},exports.deflate=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new Deflate(n),e,i)},exports.deflateSync=function(e,n){return zlibBufferSync(new Deflate(n),e)},exports.gzip=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new Gzip(n),e,i)},exports.gzipSync=function(e,n){return zlibBufferSync(new Gzip(n),e)},exports.deflateRaw=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new DeflateRaw(n),e,i)},exports.deflateRawSync=function(e,n){return zlibBufferSync(new DeflateRaw(n),e)},exports.unzip=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new Unzip(n),e,i)},exports.unzipSync=function(e,n){return zlibBufferSync(new Unzip(n),e)},exports.inflate=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new Inflate(n),e,i)},exports.inflateSync=function(e,n){return zlibBufferSync(new Inflate(n),e)},exports.gunzip=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new Gunzip(n),e,i)},exports.gunzipSync=function(e,n){return zlibBufferSync(new Gunzip(n),e)},exports.inflateRaw=function(e,n,i){return"function"==typeof n&&(i=n,n={}),zlibBuffer(new InflateRaw(n),e,i)},exports.inflateRawSync=function(e,n){return zlibBufferSync(new InflateRaw(n),e)},util.inherits(Zlib,Transform),Zlib.prototype.params=function(e,n,i){if(e<exports.Z_MIN_LEVEL||e>exports.Z_MAX_LEVEL)throw new RangeError("Invalid compression level: "+e);if(n!=exports.Z_FILTERED&&n!=exports.Z_HUFFMAN_ONLY&&n!=exports.Z_RLE&&n!=exports.Z_FIXED&&n!=exports.Z_DEFAULT_STRATEGY)throw new TypeError("Invalid strategy: "+n);if(this._level!==e||this._strategy!==n){var t=this;this.flush(binding.Z_SYNC_FLUSH,function(){t._binding.params(e,n),t._hadError||(t._level=e,t._strategy=n,i&&i())})}else process.nextTick(i)},Zlib.prototype.reset=function(){return this._binding.reset()},Zlib.prototype._flush=function(e){this._transform(new Buffer(0),"",e)},Zlib.prototype.flush=function(e,n){var i=this._writableState;if(("function"==typeof e||void 0===e&&!n)&&(n=e,e=binding.Z_FULL_FLUSH),i.ended)n&&process.nextTick(n);else if(i.ending)n&&this.once("end",n);else if(i.needDrain){var t=this;this.once("drain",function(){t.flush(n)})}else this._flushFlag=e,this.write(new Buffer(0),"",n)},Zlib.prototype.close=function(e){if(e&&process.nextTick(e),!this._closed){this._closed=!0,this._binding.close();var n=this;process.nextTick(function(){n.emit("close")})}},Zlib.prototype._transform=function(e,n,i){var t,r=this._writableState,f=r.ending||r.ended,o=f&&(!e||r.length===e.length);if(null===!e&&!Buffer.isBuffer(e))return i(new Error("invalid input"));o?t=binding.Z_FINISH:(t=this._flushFlag,e.length>=r.length&&(this._flushFlag=this._opts.flush||binding.Z_NO_FLUSH));this._processChunk(e,t,i)},Zlib.prototype._processChunk=function(e,n,i){function t(u,c){if(!s._hadError){var h=f-c;if(assert(h>=0,"have should not go down"),h>0){var p=s._buffer.slice(s._offset,s._offset+h);s._offset+=h,l?s.push(p):(a.push(p),_+=p.length)}if((0===c||s._offset>=s._chunkSize)&&(f=s._chunkSize,s._offset=0,s._buffer=new Buffer(s._chunkSize)),0===c){if(o+=r-u,r=u,!l)return!0;var d=s._binding.write(n,e,o,r,s._buffer,s._offset,s._chunkSize);return d.callback=t,void(d.buffer=e)}return l?void i():!1}}var r=e&&e.length,f=this._chunkSize-this._offset,o=0,s=this,l="function"==typeof i;if(!l){var u,a=[],_=0;this.on("error",function(e){u=e});do var c=this._binding.writeSync(n,e,o,r,this._buffer,this._offset,f);while(!this._hadError&&t(c[0],c[1]));if(this._hadError)throw u;var h=Buffer.concat(a,_);return this.close(),h}var p=this._binding.write(n,e,o,r,this._buffer,this._offset,f);p.buffer=e,p.callback=t},util.inherits(Deflate,Zlib),util.inherits(Inflate,Zlib),util.inherits(Gzip,Zlib),util.inherits(Gunzip,Zlib),util.inherits(DeflateRaw,Zlib),util.inherits(InflateRaw,Zlib),util.inherits(Unzip,Zlib);


}).call(this,require('_process'),require("buffer").Buffer)

},{"./binding":15,"_process":164,"_stream_transform":178,"assert":2,"buffer":17,"util":184}],17:[function(require,module,exports){
function Buffer(t,e){var r=this;if(!(r instanceof Buffer))return new Buffer(t,e);var n,i=typeof t;if("number"===i)n=+t;else if("string"===i)n=Buffer.byteLength(t,e);else{if("object"!==i||null===t)throw new TypeError("must start with number, buffer, array or string");"Buffer"===t.type&&isArray(t.data)&&(t=t.data),n=+t.length}if(n>kMaxLength)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength.toString(16)+" bytes");0>n?n=0:n>>>=0,Buffer.TYPED_ARRAY_SUPPORT?r=Buffer._augment(new Uint8Array(n)):(r.length=n,r._isBuffer=!0);var f;if(Buffer.TYPED_ARRAY_SUPPORT&&"number"==typeof t.byteLength)r._set(t);else if(isArrayish(t))if(Buffer.isBuffer(t))for(f=0;n>f;f++)r[f]=t.readUInt8(f);else for(f=0;n>f;f++)r[f]=(t[f]%256+256)%256;else if("string"===i)r.write(t,0,e);else if("number"===i&&!Buffer.TYPED_ARRAY_SUPPORT)for(f=0;n>f;f++)r[f]=0;return n>0&&n<=Buffer.poolSize&&(r.parent=rootParent),r}function SlowBuffer(t,e){if(!(this instanceof SlowBuffer))return new SlowBuffer(t,e);var r=new Buffer(t,e);return delete r.parent,r}function hexWrite(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n),n>i&&(n=i)):n=i;var f=e.length;if(f%2!==0)throw new Error("Invalid hex string");n>f/2&&(n=f/2);for(var o=0;n>o;o++){var u=parseInt(e.substr(2*o,2),16);if(isNaN(u))throw new Error("Invalid hex string");t[r+o]=u}return o}function utf8Write(t,e,r,n){var i=blitBuffer(utf8ToBytes(e,t.length-r),t,r,n);return i}function asciiWrite(t,e,r,n){var i=blitBuffer(asciiToBytes(e),t,r,n);return i}function binaryWrite(t,e,r,n){return asciiWrite(t,e,r,n)}function base64Write(t,e,r,n){var i=blitBuffer(base64ToBytes(e),t,r,n);return i}function utf16leWrite(t,e,r,n){var i=blitBuffer(utf16leToBytes(e,t.length-r),t,r,n);return i}function base64Slice(t,e,r){return base64.fromByteArray(0===e&&r===t.length?t:t.slice(e,r))}function utf8Slice(t,e,r){var n="",i="";r=Math.min(t.length,r);for(var f=e;r>f;f++)t[f]<=127?(n+=decodeUtf8Char(i)+String.fromCharCode(t[f]),i=""):i+="%"+t[f].toString(16);return n+decodeUtf8Char(i)}function asciiSlice(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;r>i;i++)n+=String.fromCharCode(127&t[i]);return n}function binarySlice(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;r>i;i++)n+=String.fromCharCode(t[i]);return n}function hexSlice(t,e,r){var n=t.length;(!e||0>e)&&(e=0),(!r||0>r||r>n)&&(r=n);for(var i="",f=e;r>f;f++)i+=toHex(t[f]);return i}function utf16leSlice(t,e,r){for(var n=t.slice(e,r),i="",f=0;f<n.length;f+=2)i+=String.fromCharCode(n[f]+256*n[f+1]);return i}function checkOffset(t,e,r){if(t%1!==0||0>t)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(t,e,r,n,i,f){if(!Buffer.isBuffer(t))throw new TypeError("buffer must be a Buffer instance");if(e>i||f>e)throw new RangeError("value is out of bounds");if(r+n>t.length)throw new RangeError("index out of range")}function objectWriteUInt16(t,e,r,n){0>e&&(e=65535+e+1);for(var i=0,f=Math.min(t.length-r,2);f>i;i++)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function objectWriteUInt32(t,e,r,n){0>e&&(e=4294967295+e+1);for(var i=0,f=Math.min(t.length-r,4);f>i;i++)t[r+i]=e>>>8*(n?i:3-i)&255}function checkIEEE754(t,e,r,n,i,f){if(e>i||f>e)throw new RangeError("value is out of bounds");if(r+n>t.length)throw new RangeError("index out of range");if(0>r)throw new RangeError("index out of range")}function writeFloat(t,e,r,n,i){return i||checkIEEE754(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(t,e,r,n,23,4),r+4}function writeDouble(t,e,r,n,i){return i||checkIEEE754(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(t,e,r,n,52,8),r+8}function base64clean(t){if(t=stringtrim(t).replace(INVALID_BASE64_RE,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function stringtrim(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function isArrayish(t){return isArray(t)||Buffer.isBuffer(t)||t&&"object"==typeof t&&"number"==typeof t.length}function toHex(t){return 16>t?"0"+t.toString(16):t.toString(16)}function utf8ToBytes(t,e){e=e||1/0;for(var r,n=t.length,i=null,f=[],o=0;n>o;o++){if(r=t.charCodeAt(o),r>55295&&57344>r){if(!i){if(r>56319){(e-=3)>-1&&f.push(239,191,189);continue}if(o+1===n){(e-=3)>-1&&f.push(239,191,189);continue}i=r;continue}if(56320>r){(e-=3)>-1&&f.push(239,191,189),i=r;continue}r=i-55296<<10|r-56320|65536,i=null}else i&&((e-=3)>-1&&f.push(239,191,189),i=null);if(128>r){if((e-=1)<0)break;f.push(r)}else if(2048>r){if((e-=2)<0)break;f.push(r>>6|192,63&r|128)}else if(65536>r){if((e-=3)<0)break;f.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(2097152>r))throw new Error("Invalid code point");if((e-=4)<0)break;f.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return f}function asciiToBytes(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e}function utf16leToBytes(t,e){for(var r,n,i,f=[],o=0;o<t.length&&!((e-=2)<0);o++)r=t.charCodeAt(o),n=r>>8,i=r%256,f.push(i),f.push(n);return f}function base64ToBytes(t){return base64.toByteArray(base64clean(t))}function blitBuffer(t,e,r,n){for(var i=0;n>i&&!(i+r>=e.length||i>=t.length);i++)e[i+r]=t[i];return i}function decodeUtf8Char(t){try{return decodeURIComponent(t)}catch(e){return String.fromCharCode(65533)}}var base64=require("base64-js"),ieee754=require("ieee754"),isArray=require("is-array");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50,Buffer.poolSize=8192;var kMaxLength=1073741823,rootParent={};Buffer.TYPED_ARRAY_SUPPORT=function(){try{var t=new ArrayBuffer(0),e=new Uint8Array(t);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray&&0===new Uint8Array(1).subarray(1,1).byteLength}catch(r){return!1}}(),Buffer.isBuffer=function(t){return!(null==t||!t._isBuffer)},Buffer.compare=function(t,e){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,i=0,f=Math.min(r,n);f>i&&t[i]===e[i];i++);return i!==f&&(r=t[i],n=e[i]),n>r?-1:r>n?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(t,e){if(!isArray(t))throw new TypeError("list argument must be an Array of Buffers.");if(0===t.length)return new Buffer(0);if(1===t.length)return t[0];var r;if(void 0===e)for(e=0,r=0;r<t.length;r++)e+=t[r].length;var n=new Buffer(e),i=0;for(r=0;r<t.length;r++){var f=t[r];f.copy(n,i),i+=f.length}return n},Buffer.byteLength=function(t,e){var r;switch(t+="",e||"utf8"){case"ascii":case"binary":case"raw":r=t.length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=2*t.length;break;case"hex":r=t.length>>>1;break;case"utf8":case"utf-8":r=utf8ToBytes(t).length;break;case"base64":r=base64ToBytes(t).length;break;default:r=t.length}return r},Buffer.prototype.length=void 0,Buffer.prototype.parent=void 0,Buffer.prototype.toString=function(t,e,r){var n=!1;if(e>>>=0,r=void 0===r||r===1/0?this.length:r>>>0,t||(t="utf8"),0>e&&(e=0),r>this.length&&(r=this.length),e>=r)return"";for(;;)switch(t){case"hex":return hexSlice(this,e,r);case"utf8":case"utf-8":return utf8Slice(this,e,r);case"ascii":return asciiSlice(this,e,r);case"binary":return binarySlice(this,e,r);case"base64":return base64Slice(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",e=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?0:Buffer.compare(this,t)},Buffer.prototype.indexOf=function(t,e){function r(t,e,r){for(var n=-1,i=0;r+i<t.length;i++)if(t[r+i]===e[-1===n?0:i-n]){if(-1===n&&(n=i),i-n+1===e.length)return r+n}else n=-1;return-1}if(e>2147483647?e=2147483647:-2147483648>e&&(e=-2147483648),e>>=0,0===this.length)return-1;if(e>=this.length)return-1;if(0>e&&(e=Math.max(this.length+e,0)),"string"==typeof t)return 0===t.length?-1:String.prototype.indexOf.call(this,t,e);if(Buffer.isBuffer(t))return r(this,t,e);if("number"==typeof t)return Buffer.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,t,e):r(this,[t],e);throw new TypeError("val must be string, number or Buffer")},Buffer.prototype.get=function(t){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(t)},Buffer.prototype.set=function(t,e){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(t,e)},Buffer.prototype.write=function(t,e,r,n){if(isFinite(e))isFinite(r)||(n=r,r=void 0);else{var i=n;n=e,e=r,r=i}if(e=Number(e)||0,0>r||0>e||e>this.length)throw new RangeError("attempt to write outside buffer bounds");var f=this.length-e;r?(r=Number(r),r>f&&(r=f)):r=f,n=String(n||"utf8").toLowerCase();var o;switch(n){case"hex":o=hexWrite(this,t,e,r);break;case"utf8":case"utf-8":o=utf8Write(this,t,e,r);break;case"ascii":o=asciiWrite(this,t,e,r);break;case"binary":o=binaryWrite(this,t,e,r);break;case"base64":o=base64Write(this,t,e,r);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=utf16leWrite(this,t,e,r);break;default:throw new TypeError("Unknown encoding: "+n)}return o},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},Buffer.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,0>t?(t+=r,0>t&&(t=0)):t>r&&(t=r),0>e?(e+=r,0>e&&(e=0)):e>r&&(e=r),t>e&&(e=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=Buffer._augment(this.subarray(t,e));else{var i=e-t;n=new Buffer(i,void 0);for(var f=0;i>f;f++)n[f]=this[f+t]}return n.length&&(n.parent=this.parent||this),n},Buffer.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||checkOffset(t,e,this.length);for(var n=this[t],i=1,f=0;++f<e&&(i*=256);)n+=this[t+f]*i;return n},Buffer.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||checkOffset(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},Buffer.prototype.readUInt8=function(t,e){return e||checkOffset(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,e){return e||checkOffset(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,e){return e||checkOffset(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,e){return e||checkOffset(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,e){return e||checkOffset(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||checkOffset(t,e,this.length);for(var n=this[t],i=1,f=0;++f<e&&(i*=256);)n+=this[t+f]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},Buffer.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||checkOffset(t,e,this.length);for(var n=e,i=1,f=this[t+--n];n>0&&(i*=256);)f+=this[t+--n]*i;return i*=128,f>=i&&(f-=Math.pow(2,8*e)),f},Buffer.prototype.readInt8=function(t,e){return e||checkOffset(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},Buffer.prototype.readInt16LE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(t,e){return e||checkOffset(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,e){return e||checkOffset(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||checkInt(this,t,e,r,Math.pow(2,8*r),0);var i=1,f=0;for(this[e]=255&t;++f<r&&(i*=256);)this[e+f]=t/i>>>0&255;return e+r},Buffer.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||checkInt(this,t,e,r,Math.pow(2,8*r),0);var i=r-1,f=1;for(this[e+i]=255&t;--i>=0&&(f*=256);)this[e+i]=t/f>>>0&255;return e+r},Buffer.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=t,e+1},Buffer.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=t):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeIntLE=function(t,e,r,n){t=+t,e>>>=0,n||checkInt(this,t,e,r,Math.pow(2,8*r-1)-1,-Math.pow(2,8*r-1));var i=0,f=1,o=0>t?1:0;for(this[e]=255&t;++i<r&&(f*=256);)this[e+i]=(t/f>>0)-o&255;return e+r},Buffer.prototype.writeIntBE=function(t,e,r,n){t=+t,e>>>=0,n||checkInt(this,t,e,r,Math.pow(2,8*r-1)-1,-Math.pow(2,8*r-1));var i=r-1,f=1,o=0>t?1:0;for(this[e+i]=255&t;--i>=0&&(f*=256);)this[e+i]=(t/f>>0)-o&255;return e+r},Buffer.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),0>t&&(t=255+t+1),this[e]=t,e+1},Buffer.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||checkInt(this,t,e,4,2147483647,-2147483648),0>t&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeFloatLE=function(t,e,r){return writeFloat(this,t,e,!0,r)},Buffer.prototype.writeFloatBE=function(t,e,r){return writeFloat(this,t,e,!1,r)},Buffer.prototype.writeDoubleLE=function(t,e,r){return writeDouble(this,t,e,!0,r)},Buffer.prototype.writeDoubleBE=function(t,e,r){return writeDouble(this,t,e,!1,r)},Buffer.prototype.copy=function(t,e,r,n){var i=this;if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&r>n&&(n=r),n===r)return 0;if(0===t.length||0===i.length)return 0;if(0>e)throw new RangeError("targetStart out of bounds");if(0>r||r>=i.length)throw new RangeError("sourceStart out of bounds");if(0>n)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var f=n-r;if(1e3>f||!Buffer.TYPED_ARRAY_SUPPORT)for(var o=0;f>o;o++)t[o+e]=this[o+r];else t._set(this.subarray(r,r+f),e);return f},Buffer.prototype.fill=function(t,e,r){if(t||(t=0),e||(e=0),r||(r=this.length),e>r)throw new RangeError("end < start");if(r!==e&&0!==this.length){if(0>e||e>=this.length)throw new RangeError("start out of bounds");if(0>r||r>this.length)throw new RangeError("end out of bounds");var n;if("number"==typeof t)for(n=e;r>n;n++)this[n]=t;else{var i=utf8ToBytes(t.toString()),f=i.length;for(n=e;r>n;n++)this[n]=i[n%f]}return this}},Buffer.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(Buffer.TYPED_ARRAY_SUPPORT)return new Buffer(this).buffer;for(var t=new Uint8Array(this.length),e=0,r=t.length;r>e;e+=1)t[e]=this[e];return t.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var BP=Buffer.prototype;Buffer._augment=function(t){return t.constructor=Buffer,t._isBuffer=!0,t._get=t.get,t._set=t.set,t.get=BP.get,t.set=BP.set,t.write=BP.write,t.toString=BP.toString,t.toLocaleString=BP.toString,t.toJSON=BP.toJSON,t.equals=BP.equals,t.compare=BP.compare,t.indexOf=BP.indexOf,t.copy=BP.copy,t.slice=BP.slice,t.readUIntLE=BP.readUIntLE,t.readUIntBE=BP.readUIntBE,t.readUInt8=BP.readUInt8,t.readUInt16LE=BP.readUInt16LE,t.readUInt16BE=BP.readUInt16BE,t.readUInt32LE=BP.readUInt32LE,t.readUInt32BE=BP.readUInt32BE,t.readIntLE=BP.readIntLE,t.readIntBE=BP.readIntBE,t.readInt8=BP.readInt8,t.readInt16LE=BP.readInt16LE,t.readInt16BE=BP.readInt16BE,t.readInt32LE=BP.readInt32LE,t.readInt32BE=BP.readInt32BE,t.readFloatLE=BP.readFloatLE,t.readFloatBE=BP.readFloatBE,t.readDoubleLE=BP.readDoubleLE,t.readDoubleBE=BP.readDoubleBE,t.writeUInt8=BP.writeUInt8,t.writeUIntLE=BP.writeUIntLE,t.writeUIntBE=BP.writeUIntBE,t.writeUInt16LE=BP.writeUInt16LE,t.writeUInt16BE=BP.writeUInt16BE,t.writeUInt32LE=BP.writeUInt32LE,t.writeUInt32BE=BP.writeUInt32BE,t.writeIntLE=BP.writeIntLE,t.writeIntBE=BP.writeIntBE,t.writeInt8=BP.writeInt8,t.writeInt16LE=BP.writeInt16LE,t.writeInt16BE=BP.writeInt16BE,t.writeInt32LE=BP.writeInt32LE,t.writeInt32BE=BP.writeInt32BE,t.writeFloatLE=BP.writeFloatLE,t.writeFloatBE=BP.writeFloatBE,t.writeDoubleLE=BP.writeDoubleLE,t.writeDoubleBE=BP.writeDoubleBE,t.fill=BP.fill,t.inspect=BP.inspect,t.toArrayBuffer=BP.toArrayBuffer,t};var INVALID_BASE64_RE=/[^+\/0-9A-z\-]/g;


},{"base64-js":18,"ieee754":19,"is-array":20}],18:[function(require,module,exports){
var lookup="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(t){"use strict";function r(t){var r=t.charCodeAt(0);return r===h||r===u?62:r===c||r===f?63:o>r?-1:o+10>r?r-o+26+26:i+26>r?r-i:A+26>r?r-A+26:void 0}function e(t){function e(t){i[f++]=t}var n,h,c,o,A,i;if(t.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var u=t.length;A="="===t.charAt(u-2)?2:"="===t.charAt(u-1)?1:0,i=new a(3*t.length/4-A),c=A>0?t.length-4:t.length;var f=0;for(n=0,h=0;c>n;n+=4,h+=3)o=r(t.charAt(n))<<18|r(t.charAt(n+1))<<12|r(t.charAt(n+2))<<6|r(t.charAt(n+3)),e((16711680&o)>>16),e((65280&o)>>8),e(255&o);return 2===A?(o=r(t.charAt(n))<<2|r(t.charAt(n+1))>>4,e(255&o)):1===A&&(o=r(t.charAt(n))<<10|r(t.charAt(n+1))<<4|r(t.charAt(n+2))>>2,e(o>>8&255),e(255&o)),i}function n(t){function r(t){return lookup.charAt(t)}function e(t){return r(t>>18&63)+r(t>>12&63)+r(t>>6&63)+r(63&t)}var n,a,h,c=t.length%3,o="";for(n=0,h=t.length-c;h>n;n+=3)a=(t[n]<<16)+(t[n+1]<<8)+t[n+2],o+=e(a);switch(c){case 1:a=t[t.length-1],o+=r(a>>2),o+=r(a<<4&63),o+="==";break;case 2:a=(t[t.length-2]<<8)+t[t.length-1],o+=r(a>>10),o+=r(a>>4&63),o+=r(a<<2&63),o+="="}return o}var a="undefined"!=typeof Uint8Array?Uint8Array:Array,h="+".charCodeAt(0),c="/".charCodeAt(0),o="0".charCodeAt(0),A="a".charCodeAt(0),i="A".charCodeAt(0),u="-".charCodeAt(0),f="_".charCodeAt(0);t.toByteArray=e,t.fromByteArray=n}("undefined"==typeof exports?this.base64js={}:exports);


},{}],19:[function(require,module,exports){
exports.read=function(o,t,a,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,n=a?h-1:0,s=a?-1:1,N=o[t+n];for(n+=s,M=N&(1<<-i)-1,N>>=-i,i+=w;i>0;M=256*M+o[t+n],n+=s,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+o[t+n],n+=s,i-=8);if(0===M)M=1-e;else{if(M===f)return p?0/0:(N?-1:1)*(1/0);p+=Math.pow(2,r),M-=e}return(N?-1:1)*p*Math.pow(2,M-r)},exports.write=function(o,t,a,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,n=i>>1,s=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,N=r?0:M-1,u=r?1:-1,l=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(w=isNaN(t)?1:0,p=i):(p=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-p))<1&&(p--,f*=2),t+=p+n>=1?s/f:s*Math.pow(2,1-n),t*f>=2&&(p++,f/=2),p+n>=i?(w=0,p=i):p+n>=1?(w=(t*f-1)*Math.pow(2,h),p+=n):(w=t*Math.pow(2,n-1)*Math.pow(2,h),p=0));h>=8;o[a+N]=255&w,N+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;o[a+N]=255&p,N+=u,p/=256,e-=8);o[a+N-u]|=128*l};


},{}],20:[function(require,module,exports){
var isArray=Array.isArray,str=Object.prototype.toString;module.exports=isArray||function(r){return!!r&&"[object Array]"==str.call(r)};


},{}],21:[function(require,module,exports){
"use strict";exports.randomBytes=exports.rng=exports.pseudoRandomBytes=exports.prng=require("randombytes"),exports.createHash=exports.Hash=require("create-hash"),exports.createHmac=exports.Hmac=require("create-hmac");var hashes=["sha1","sha224","sha256","sha384","sha512","md5","rmd160"].concat(Object.keys(require("browserify-sign/algos")));exports.getHashes=function(){return hashes};var p=require("pbkdf2-compat");exports.pbkdf2=p.pbkdf2,exports.pbkdf2Sync=p.pbkdf2Sync;var aes=require("browserify-aes");["Cipher","createCipher","Cipheriv","createCipheriv","Decipher","createDecipher","Decipheriv","createDecipheriv","getCiphers","listCiphers"].forEach(function(e){exports[e]=aes[e]});var dh=require("diffie-hellman");["DiffieHellmanGroup","createDiffieHellmanGroup","getDiffieHellman","createDiffieHellman","DiffieHellman"].forEach(function(e){exports[e]=dh[e]}),require("browserify-sign/inject")(module.exports,exports),exports.createECDH=require("create-ecdh");var publicEncrypt=require("public-encrypt");["publicEncrypt","privateEncrypt","publicDecrypt","privateDecrypt"].forEach(function(e){exports[e]=publicEncrypt[e]}),["createCredentials"].forEach(function(e){exports[e]=function(){throw new Error(["sorry, "+e+" is not implemented yet","we accept pull requests","https://github.com/crypto-browserify/crypto-browserify"].join("\n"))}});


},{"browserify-aes":25,"browserify-sign/algos":40,"browserify-sign/inject":41,"create-ecdh":87,"create-hash":109,"create-hmac":120,"diffie-hellman":121,"pbkdf2-compat":128,"public-encrypt":129,"randombytes":155}],22:[function(require,module,exports){
(function (Buffer){
function EVP_BytesToKey(e,f,r){Buffer.isBuffer(e)||(e=new Buffer(e,"binary")),f/=8,r=r||0;for(var i,n,u=0,a=0,t=new Buffer(f),o=new Buffer(r),h=0,B=[];;){if(h++>0&&B.push(i),B.push(e),i=md5(Buffer.concat(B)),B=[],n=0,f>0)for(;;){if(0===f)break;if(n===i.length)break;t[u++]=i[n],f--,n++}if(r>0&&n!==i.length)for(;;){if(0===r)break;if(n===i.length)break;o[a++]=i[n],r--,n++}if(0===f&&0===r)break}for(n=0;n<i.length;n++)i[n]=0;return{key:t,iv:o}}var md5=require("create-hash/md5");module.exports=EVP_BytesToKey;


}).call(this,require("buffer").Buffer)

},{"buffer":17,"create-hash/md5":111}],23:[function(require,module,exports){
(function (Buffer){
function fixup_uint32(t){var e,r;return e=t>uint_max||0>t?(r=Math.abs(t)%uint_max,0>t?uint_max-r:r):t}function scrub_vec(t){var e,r,i;for(e=r=0,i=t.length;i>=0?i>r:r>i;e=i>=0?++r:--r)t[e]=0;return!1}function Global(){var t;this.SBOX=[],this.INV_SBOX=[],this.SUB_MIX=function(){var e,r;for(r=[],t=e=0;4>e;t=++e)r.push([]);return r}(),this.INV_SUB_MIX=function(){var e,r;for(r=[],t=e=0;4>e;t=++e)r.push([]);return r}(),this.init(),this.RCON=[0,1,2,4,8,16,32,64,128,27,54]}function bufferToArray(t){for(var e=t.length/4,r=new Array(e),i=-1;++i<e;)r[i]=t.readUInt32BE(4*i);return r}function AES(t){this._key=bufferToArray(t),this._doReset()}var uint_max=Math.pow(2,32);Global.prototype.init=function(){var t,e,r,i,n,u,o,S,_,h;for(t=function(){var t,r;for(r=[],e=t=0;256>t;e=++t)r.push(128>e?e<<1:e<<1^283);return r}(),n=0,_=0,e=h=0;256>h;e=++h)r=_^_<<1^_<<2^_<<3^_<<4,r=r>>>8^255&r^99,this.SBOX[n]=r,this.INV_SBOX[r]=n,u=t[n],o=t[u],S=t[o],i=257*t[r]^16843008*r,this.SUB_MIX[0][n]=i<<24|i>>>8,this.SUB_MIX[1][n]=i<<16|i>>>16,this.SUB_MIX[2][n]=i<<8|i>>>24,this.SUB_MIX[3][n]=i,i=16843009*S^65537*o^257*u^16843008*n,this.INV_SUB_MIX[0][r]=i<<24|i>>>8,this.INV_SUB_MIX[1][r]=i<<16|i>>>16,this.INV_SUB_MIX[2][r]=i<<8|i>>>24,this.INV_SUB_MIX[3][r]=i,0===n?n=_=1:(n=u^t[t[t[S^u]]],_^=t[t[_]]);return!0};var G=new Global;AES.blockSize=16,AES.prototype.blockSize=AES.blockSize,AES.keySize=32,AES.prototype.keySize=AES.keySize,AES.prototype._doReset=function(){var t,e,r,i,n,u,o,S;for(r=this._key,e=r.length,this._nRounds=e+6,n=4*(this._nRounds+1),this._keySchedule=[],i=o=0;n>=0?n>o:o>n;i=n>=0?++o:--o)this._keySchedule[i]=e>i?r[i]:(u=this._keySchedule[i-1],i%e===0?(u=u<<8|u>>>24,u=G.SBOX[u>>>24]<<24|G.SBOX[u>>>16&255]<<16|G.SBOX[u>>>8&255]<<8|G.SBOX[255&u],u^=G.RCON[i/e|0]<<24):e>6&&i%e===4?u=G.SBOX[u>>>24]<<24|G.SBOX[u>>>16&255]<<16|G.SBOX[u>>>8&255]<<8|G.SBOX[255&u]:void 0,this._keySchedule[i-e]^u);for(this._invKeySchedule=[],t=S=0;n>=0?n>S:S>n;t=n>=0?++S:--S)i=n-t,u=this._keySchedule[i-(t%4?0:4)],this._invKeySchedule[t]=4>t||4>=i?u:G.INV_SUB_MIX[0][G.SBOX[u>>>24]]^G.INV_SUB_MIX[1][G.SBOX[u>>>16&255]]^G.INV_SUB_MIX[2][G.SBOX[u>>>8&255]]^G.INV_SUB_MIX[3][G.SBOX[255&u]];return!0},AES.prototype.encryptBlock=function(t){t=bufferToArray(new Buffer(t));var e=this._doCryptBlock(t,this._keySchedule,G.SUB_MIX,G.SBOX),r=new Buffer(16);return r.writeUInt32BE(e[0],0),r.writeUInt32BE(e[1],4),r.writeUInt32BE(e[2],8),r.writeUInt32BE(e[3],12),r},AES.prototype.decryptBlock=function(t){t=bufferToArray(new Buffer(t));var e=[t[3],t[1]];t[1]=e[0],t[3]=e[1];var r=this._doCryptBlock(t,this._invKeySchedule,G.INV_SUB_MIX,G.INV_SBOX),i=new Buffer(16);return i.writeUInt32BE(r[0],0),i.writeUInt32BE(r[3],4),i.writeUInt32BE(r[2],8),i.writeUInt32BE(r[1],12),i},AES.prototype.scrub=function(){scrub_vec(this._keySchedule),scrub_vec(this._invKeySchedule),scrub_vec(this._key)},AES.prototype._doCryptBlock=function(t,e,r,i){var n,u,o,S,_,h,B,s,c,f,I,y;for(o=t[0]^e[0],S=t[1]^e[1],_=t[2]^e[2],h=t[3]^e[3],n=4,u=I=1,y=this._nRounds;y>=1?y>I:I>y;u=y>=1?++I:--I)B=r[0][o>>>24]^r[1][S>>>16&255]^r[2][_>>>8&255]^r[3][255&h]^e[n++],s=r[0][S>>>24]^r[1][_>>>16&255]^r[2][h>>>8&255]^r[3][255&o]^e[n++],c=r[0][_>>>24]^r[1][h>>>16&255]^r[2][o>>>8&255]^r[3][255&S]^e[n++],f=r[0][h>>>24]^r[1][o>>>16&255]^r[2][S>>>8&255]^r[3][255&_]^e[n++],o=B,S=s,_=c,h=f;return B=(i[o>>>24]<<24|i[S>>>16&255]<<16|i[_>>>8&255]<<8|i[255&h])^e[n++],s=(i[S>>>24]<<24|i[_>>>16&255]<<16|i[h>>>8&255]<<8|i[255&o])^e[n++],c=(i[_>>>24]<<24|i[h>>>16&255]<<16|i[o>>>8&255]<<8|i[255&S])^e[n++],f=(i[h>>>24]<<24|i[o>>>16&255]<<16|i[S>>>8&255]<<8|i[255&_])^e[n++],[fixup_uint32(B),fixup_uint32(s),fixup_uint32(c),fixup_uint32(f)]},exports.AES=AES;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],24:[function(require,module,exports){
(function (Buffer){
function StreamCipher(t,e,r,h){if(!(this instanceof StreamCipher))return new StreamCipher(t,e,r);Transform.call(this),this._finID=Buffer.concat([r,new Buffer([0,0,0,1])]),r=Buffer.concat([r,new Buffer([0,0,0,2])]),this._cipher=new aes.AES(e),this._prev=new Buffer(r.length),this._cache=new Buffer(""),this._secCache=new Buffer(""),this._decrypt=h,this._alen=0,this._len=0,r.copy(this._prev),this._mode=t;var i=new Buffer(4);i.fill(0),this._ghash=new GHASH(this._cipher.encryptBlock(i)),this._authTag=null,this._called=!1}function xorTest(t,e){var r=0;t.length!==e.length&&r++;for(var h=Math.min(t.length,e.length),i=-1;++i<h;)r+=t[i]^e[i];return r}var aes=require("./aes"),Transform=require("./cipherBase"),inherits=require("inherits"),GHASH=require("./ghash"),xor=require("./xor");inherits(StreamCipher,Transform),module.exports=StreamCipher,StreamCipher.prototype._update=function(t){if(!this._called&&this._alen){var e=16-this._alen%16;16>e&&(e=new Buffer(e),e.fill(0),this._ghash.update(e))}this._called=!0;var r=this._mode.encrypt(this,t);return this._ghash.update(this._decrypt?t:r),this._len+=t.length,r},StreamCipher.prototype._final=function(){if(this._decrypt&&!this._authTag)throw new Error("Unsupported state or unable to authenticate data");var t=xor(this._ghash["final"](8*this._alen,8*this._len),this._cipher.encryptBlock(this._finID));if(this._decrypt){if(xorTest(t,this._authTag))throw new Error("Unsupported state or unable to authenticate data")}else this._authTag=t;this._cipher.scrub()},StreamCipher.prototype.getAuthTag=function(){if(!this._decrypt&&Buffer.isBuffer(this._authTag))return this._authTag;throw new Error("Attempting to get auth tag in unsupported state")},StreamCipher.prototype.setAuthTag=function(t){if(!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");this._authTag=t},StreamCipher.prototype.setAAD=function(t){if(this._called)throw new Error("Attempting to set AAD in unsupported state");this._ghash.update(t),this._alen+=t.length};


}).call(this,require("buffer").Buffer)

},{"./aes":23,"./cipherBase":26,"./ghash":29,"./xor":39,"buffer":17,"inherits":162}],25:[function(require,module,exports){
function getCiphers(){return Object.keys(modes)}var ciphers=require("./encrypter");exports.createCipher=exports.Cipher=ciphers.createCipher,exports.createCipheriv=exports.Cipheriv=ciphers.createCipheriv;var deciphers=require("./decrypter");exports.createDecipher=exports.Decipher=deciphers.createDecipher,exports.createDecipheriv=exports.Decipheriv=deciphers.createDecipheriv;var modes=require("./modes");exports.listCiphers=exports.getCiphers=getCiphers;


},{"./decrypter":27,"./encrypter":28,"./modes":30}],26:[function(require,module,exports){
(function (Buffer){
function CipherBase(){Transform.call(this)}var Transform=require("stream").Transform,inherits=require("inherits");module.exports=CipherBase,inherits(CipherBase,Transform),CipherBase.prototype.update=function(r,t,e){"string"==typeof r&&(r=new Buffer(r,t));var i=this._update(r);return e&&(i=i.toString(e)),i},CipherBase.prototype._transform=function(r,t,e){this.push(this._update(r)),e()},CipherBase.prototype._flush=function(r){try{this.push(this._final())}catch(t){return r(t)}r()},CipherBase.prototype["final"]=function(r){var t=this._final()||new Buffer("");return r&&(t=t.toString(r)),t};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"inherits":162,"stream":180}],27:[function(require,module,exports){
(function (Buffer){
function Decipher(e,r,t){return this instanceof Decipher?(Transform.call(this),this._cache=new Splitter,this._last=void 0,this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),t.copy(this._prev),this._mode=e,void(this._autopadding=!0)):new Decipher(e,r,t)}function Splitter(){return this instanceof Splitter?void(this.cache=new Buffer("")):new Splitter}function unpad(e){for(var r=e[15],t=-1;++t<r;)if(e[t+(16-r)]!==r)throw new Error("unable to decrypt data");return 16!==r?e.slice(0,16-r):void 0}function createDecipheriv(e,r,t){var i=modes[e.toLowerCase()];if(!i)throw new TypeError("invalid suite type");if("string"==typeof t&&(t=new Buffer(t)),"string"==typeof r&&(r=new Buffer(r)),r.length!==i.key/8)throw new TypeError("invalid key length "+r.length);if(t.length!==i.iv)throw new TypeError("invalid iv length "+t.length);return"stream"===i.type?new StreamCipher(modelist[i.mode],r,t,!0):"auth"===i.type?new AuthCipher(modelist[i.mode],r,t,!0):new Decipher(modelist[i.mode],r,t)}function createDecipher(e,r){var t=modes[e.toLowerCase()];if(!t)throw new TypeError("invalid suite type");var i=ebtk(r,t.key,t.iv);return createDecipheriv(e,i.key,i.iv)}var aes=require("./aes"),Transform=require("./cipherBase"),inherits=require("inherits"),modes=require("./modes"),StreamCipher=require("./streamCipher"),AuthCipher=require("./authCipher"),ebtk=require("./EVP_BytesToKey");inherits(Decipher,Transform),Decipher.prototype._update=function(e){this._cache.add(e);for(var r,t,i=[];r=this._cache.get(this._autopadding);)t=this._mode.decrypt(this,r),i.push(t);return Buffer.concat(i)},Decipher.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return unpad(this._mode.decrypt(this,e));if(e)throw new Error("data not multiple of block length")},Decipher.prototype.setAutoPadding=function(e){this._autopadding=!!e},Splitter.prototype.add=function(e){this.cache=Buffer.concat([this.cache,e])},Splitter.prototype.get=function(e){var r;if(e){if(this.cache.length>16)return r=this.cache.slice(0,16),this.cache=this.cache.slice(16),r}else if(this.cache.length>=16)return r=this.cache.slice(0,16),this.cache=this.cache.slice(16),r;return null},Splitter.prototype.flush=function(){return this.cache.length?this.cache:void 0};var modelist={ECB:require("./modes/ecb"),CBC:require("./modes/cbc"),CFB:require("./modes/cfb"),CFB8:require("./modes/cfb8"),CFB1:require("./modes/cfb1"),OFB:require("./modes/ofb"),CTR:require("./modes/ctr"),GCM:require("./modes/ctr")};exports.createDecipher=createDecipher,exports.createDecipheriv=createDecipheriv;


}).call(this,require("buffer").Buffer)

},{"./EVP_BytesToKey":22,"./aes":23,"./authCipher":24,"./cipherBase":26,"./modes":30,"./modes/cbc":31,"./modes/cfb":32,"./modes/cfb1":33,"./modes/cfb8":34,"./modes/ctr":35,"./modes/ecb":36,"./modes/ofb":37,"./streamCipher":38,"buffer":17,"inherits":162}],28:[function(require,module,exports){
(function (Buffer){
function Cipher(e,r,t){return this instanceof Cipher?(Transform.call(this),this._cache=new Splitter,this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),t.copy(this._prev),this._mode=e,void(this._autopadding=!0)):new Cipher(e,r,t)}function Splitter(){return this instanceof Splitter?void(this.cache=new Buffer("")):new Splitter}function createCipheriv(e,r,t){var i=modes[e.toLowerCase()];if(!i)throw new TypeError("invalid suite type");if("string"==typeof t&&(t=new Buffer(t)),"string"==typeof r&&(r=new Buffer(r)),r.length!==i.key/8)throw new TypeError("invalid key length "+r.length);if(t.length!==i.iv)throw new TypeError("invalid iv length "+t.length);return"stream"===i.type?new StreamCipher(modelist[i.mode],r,t):"auth"===i.type?new AuthCipher(modelist[i.mode],r,t):new Cipher(modelist[i.mode],r,t)}function createCipher(e,r){var t=modes[e.toLowerCase()];if(!t)throw new TypeError("invalid suite type");var i=ebtk(r,t.key,t.iv);return createCipheriv(e,i.key,i.iv)}var aes=require("./aes"),Transform=require("./cipherBase"),inherits=require("inherits"),modes=require("./modes"),ebtk=require("./EVP_BytesToKey"),StreamCipher=require("./streamCipher"),AuthCipher=require("./authCipher");inherits(Cipher,Transform),Cipher.prototype._update=function(e){this._cache.add(e);for(var r,t,i=[];r=this._cache.get();)t=this._mode.encrypt(this,r),i.push(t);return Buffer.concat(i)},Cipher.prototype._final=function(){var e=this._cache.flush();if(this._autopadding)return e=this._mode.encrypt(this,e),this._cipher.scrub(),e;if("10101010101010101010101010101010"!==e.toString("hex"))throw this._cipher.scrub(),new Error("data not multiple of block length")},Cipher.prototype.setAutoPadding=function(e){this._autopadding=!!e},Splitter.prototype.add=function(e){this.cache=Buffer.concat([this.cache,e])},Splitter.prototype.get=function(){if(this.cache.length>15){var e=this.cache.slice(0,16);return this.cache=this.cache.slice(16),e}return null},Splitter.prototype.flush=function(){for(var e=16-this.cache.length,r=new Buffer(e),t=-1;++t<e;)r.writeUInt8(e,t);var i=Buffer.concat([this.cache,r]);return i};var modelist={ECB:require("./modes/ecb"),CBC:require("./modes/cbc"),CFB:require("./modes/cfb"),CFB8:require("./modes/cfb8"),CFB1:require("./modes/cfb1"),OFB:require("./modes/ofb"),CTR:require("./modes/ctr"),GCM:require("./modes/ctr")};exports.createCipheriv=createCipheriv,exports.createCipher=createCipher;


}).call(this,require("buffer").Buffer)

},{"./EVP_BytesToKey":22,"./aes":23,"./authCipher":24,"./cipherBase":26,"./modes":30,"./modes/cbc":31,"./modes/cfb":32,"./modes/cfb1":33,"./modes/cfb8":34,"./modes/ctr":35,"./modes/ecb":36,"./modes/ofb":37,"./streamCipher":38,"buffer":17,"inherits":162}],29:[function(require,module,exports){
(function (Buffer){
function GHASH(t){this.h=t,this.state=new Buffer(16),this.state.fill(0),this.cache=new Buffer("")}function toArray(t){return[t.readUInt32BE(0),t.readUInt32BE(4),t.readUInt32BE(8),t.readUInt32BE(12)]}function fromArray(t){t=t.map(fixup_uint32);var r=new Buffer(16);return r.writeUInt32BE(t[0],0),r.writeUInt32BE(t[1],4),r.writeUInt32BE(t[2],8),r.writeUInt32BE(t[3],12),r}function fixup_uint32(t){var r,e;return r=t>uint_max||0>t?(e=Math.abs(t)%uint_max,0>t?uint_max-e:e):t}function xor(t,r){return[t[0]^r[0],t[1]^r[1],t[2]^r[2],t[3]^r[3]]}var zeros=new Buffer(16);zeros.fill(0),module.exports=GHASH,GHASH.prototype.ghash=function(t){for(var r=-1;++r<t.length;)this.state[r]^=t[r];this._multiply()},GHASH.prototype._multiply=function(){for(var t,r,e,i=toArray(this.h),a=[0,0,0,0],n=-1;++n<128;){for(r=0!==(this.state[~~(n/8)]&1<<7-n%8),r&&(a=xor(a,i)),e=0!==(1&i[3]),t=3;t>0;t--)i[t]=i[t]>>>1|(1&i[t-1])<<31;i[0]=i[0]>>>1,e&&(i[0]=i[0]^225<<24)}this.state=fromArray(a)},GHASH.prototype.update=function(t){this.cache=Buffer.concat([this.cache,t]);for(var r;this.cache.length>=16;)r=this.cache.slice(0,16),this.cache=this.cache.slice(16),this.ghash(r)},GHASH.prototype["final"]=function(t,r){return this.cache.length&&this.ghash(Buffer.concat([this.cache,zeros],16)),this.ghash(fromArray([0,t,0,r])),this.state};var uint_max=Math.pow(2,32);


}).call(this,require("buffer").Buffer)

},{"buffer":17}],30:[function(require,module,exports){
exports["aes-128-ecb"]={cipher:"AES",key:128,iv:0,mode:"ECB",type:"block"},exports["aes-192-ecb"]={cipher:"AES",key:192,iv:0,mode:"ECB",type:"block"},exports["aes-256-ecb"]={cipher:"AES",key:256,iv:0,mode:"ECB",type:"block"},exports["aes-128-cbc"]={cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},exports["aes-192-cbc"]={cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},exports["aes-256-cbc"]={cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},exports.aes128=exports["aes-128-cbc"],exports.aes192=exports["aes-192-cbc"],exports.aes256=exports["aes-256-cbc"],exports["aes-128-cfb"]={cipher:"AES",key:128,iv:16,mode:"CFB",type:"stream"},exports["aes-192-cfb"]={cipher:"AES",key:192,iv:16,mode:"CFB",type:"stream"},exports["aes-256-cfb"]={cipher:"AES",key:256,iv:16,mode:"CFB",type:"stream"},exports["aes-128-cfb8"]={cipher:"AES",key:128,iv:16,mode:"CFB8",type:"stream"},exports["aes-192-cfb8"]={cipher:"AES",key:192,iv:16,mode:"CFB8",type:"stream"},exports["aes-256-cfb8"]={cipher:"AES",key:256,iv:16,mode:"CFB8",type:"stream"},exports["aes-128-cfb1"]={cipher:"AES",key:128,iv:16,mode:"CFB1",type:"stream"},exports["aes-192-cfb1"]={cipher:"AES",key:192,iv:16,mode:"CFB1",type:"stream"},exports["aes-256-cfb1"]={cipher:"AES",key:256,iv:16,mode:"CFB1",type:"stream"},exports["aes-128-ofb"]={cipher:"AES",key:128,iv:16,mode:"OFB",type:"stream"},exports["aes-192-ofb"]={cipher:"AES",key:192,iv:16,mode:"OFB",type:"stream"},exports["aes-256-ofb"]={cipher:"AES",key:256,iv:16,mode:"OFB",type:"stream"},exports["aes-128-ctr"]={cipher:"AES",key:128,iv:16,mode:"CTR",type:"stream"},exports["aes-192-ctr"]={cipher:"AES",key:192,iv:16,mode:"CTR",type:"stream"},exports["aes-256-ctr"]={cipher:"AES",key:256,iv:16,mode:"CTR",type:"stream"},exports["aes-128-gcm"]={cipher:"AES",key:128,iv:12,mode:"GCM",type:"auth"},exports["aes-192-gcm"]={cipher:"AES",key:192,iv:12,mode:"GCM",type:"auth"},exports["aes-256-gcm"]={cipher:"AES",key:256,iv:12,mode:"GCM",type:"auth"};


},{}],31:[function(require,module,exports){
var xor=require("../xor");exports.encrypt=function(r,e){var p=xor(e,r._prev);return r._prev=r._cipher.encryptBlock(p),r._prev},exports.decrypt=function(r,e){var p=r._prev;r._prev=e;var c=r._cipher.decryptBlock(e);return xor(c,p)};


},{"../xor":39}],32:[function(require,module,exports){
(function (Buffer){
function encryptStart(e,r,c){var t=r.length,n=xor(r,e._cache);return e._cache=e._cache.slice(t),e._prev=Buffer.concat([e._prev,c?r:n]),n}var xor=require("../xor");exports.encrypt=function(e,r,c){for(var t,n=new Buffer("");r.length;){if(0===e._cache.length&&(e._cache=e._cipher.encryptBlock(e._prev),e._prev=new Buffer("")),!(e._cache.length<=r.length)){n=Buffer.concat([n,encryptStart(e,r,c)]);break}t=e._cache.length,n=Buffer.concat([n,encryptStart(e,r.slice(0,t),c)]),r=r.slice(t)}return n};


}).call(this,require("buffer").Buffer)

},{"../xor":39,"buffer":17}],33:[function(require,module,exports){
(function (Buffer){
function encryptByte(r,e,n){for(var t,f,c,u=-1,o=8,p=0;++u<o;)t=r._cipher.encryptBlock(r._prev),f=e&1<<7-u?128:0,c=t[0]^f,p+=(128&c)>>u%8,r._prev=shiftIn(r._prev,n?f:c);return p}function shiftIn(r,e){var n=r.length,t=-1,f=new Buffer(r.length);for(r=Buffer.concat([r,new Buffer([e])]);++t<n;)f[t]=r[t]<<1|r[t+1]>>7;return f}exports.encrypt=function(r,e,n){for(var t=e.length,f=new Buffer(t),c=-1;++c<t;)f[c]=encryptByte(r,e[c],n);return f};


}).call(this,require("buffer").Buffer)

},{"buffer":17}],34:[function(require,module,exports){
(function (Buffer){
function encryptByte(e,r,n){var t=e._cipher.encryptBlock(e._prev),c=t[0]^r;return e._prev=Buffer.concat([e._prev.slice(1),new Buffer([n?r:c])]),c}exports.encrypt=function(e,r,n){for(var t=r.length,c=new Buffer(t),f=-1;++f<t;)c[f]=encryptByte(e,r[f],n);return c};


}).call(this,require("buffer").Buffer)

},{"buffer":17}],35:[function(require,module,exports){
(function (Buffer){
function getBlock(e){var r=e._cipher.encryptBlock(e._prev);return incr32(e._prev),r}function incr32(e){for(var r,c=e.length;c--;){if(r=e.readUInt8(c),255!==r){r++,e.writeUInt8(r,c);break}e.writeUInt8(0,c)}}var xor=require("../xor");exports.encrypt=function(e,r){for(;e._cache.length<r.length;)e._cache=Buffer.concat([e._cache,getBlock(e)]);var c=e._cache.slice(0,r.length);return e._cache=e._cache.slice(r.length),xor(r,c)};


}).call(this,require("buffer").Buffer)

},{"../xor":39,"buffer":17}],36:[function(require,module,exports){
exports.encrypt=function(r,c){return r._cipher.encryptBlock(c)},exports.decrypt=function(r,c){return r._cipher.decryptBlock(c)};


},{}],37:[function(require,module,exports){
(function (Buffer){
function getBlock(e){return e._prev=e._cipher.encryptBlock(e._prev),e._prev}var xor=require("../xor");exports.encrypt=function(e,c){for(;e._cache.length<c.length;)e._cache=Buffer.concat([e._cache,getBlock(e)]);var r=e._cache.slice(0,c.length);return e._cache=e._cache.slice(c.length),xor(c,r)};


}).call(this,require("buffer").Buffer)

},{"../xor":39,"buffer":17}],38:[function(require,module,exports){
(function (Buffer){
function StreamCipher(e,r,t,i){return this instanceof StreamCipher?(Transform.call(this),this._cipher=new aes.AES(r),this._prev=new Buffer(t.length),this._cache=new Buffer(""),this._secCache=new Buffer(""),this._decrypt=i,t.copy(this._prev),void(this._mode=e)):new StreamCipher(e,r,t)}var aes=require("./aes"),Transform=require("./cipherBase"),inherits=require("inherits");inherits(StreamCipher,Transform),module.exports=StreamCipher,StreamCipher.prototype._update=function(e){return this._mode.encrypt(this,e,this._decrypt)},StreamCipher.prototype._final=function(){this._cipher.scrub()};


}).call(this,require("buffer").Buffer)

},{"./aes":23,"./cipherBase":26,"buffer":17,"inherits":162}],39:[function(require,module,exports){
(function (Buffer){
function xor(r,e){for(var n=Math.min(r.length,e.length),t=new Buffer(n),o=-1;++o<n;)t.writeUInt8(r[o]^e[o],o);return t}module.exports=xor;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],40:[function(require,module,exports){
(function (Buffer){
exports["RSA-SHA224"]=exports.sha224WithRSAEncryption={sign:"rsa",hash:"sha224",id:new Buffer("302d300d06096086480165030402040500041c","hex")},exports["RSA-SHA256"]=exports.sha256WithRSAEncryption={sign:"rsa",hash:"sha256",id:new Buffer("3031300d060960864801650304020105000420","hex")},exports["RSA-SHA384"]=exports.sha384WithRSAEncryption={sign:"rsa",hash:"sha384",id:new Buffer("3041300d060960864801650304020205000430","hex")},exports["RSA-SHA512"]=exports.sha512WithRSAEncryption={sign:"rsa",hash:"sha512",id:new Buffer("3051300d060960864801650304020305000440","hex")},exports["RSA-SHA1"]={sign:"rsa",hash:"sha1",id:new Buffer("3021300906052b0e03021a05000414","hex")},exports["ecdsa-with-SHA1"]={sign:"ecdsa",hash:"sha1",id:new Buffer("","hex")},exports.DSA=exports["DSA-SHA1"]=exports["DSA-SHA"]={sign:"dsa",hash:"sha1",id:new Buffer("","hex")},exports["DSA-SHA224"]=exports["DSA-WITH-SHA224"]={sign:"dsa",hash:"sha224",id:new Buffer("","hex")},exports["DSA-SHA256"]=exports["DSA-WITH-SHA256"]={sign:"dsa",hash:"sha256",id:new Buffer("","hex")},exports["DSA-SHA384"]=exports["DSA-WITH-SHA384"]={sign:"dsa",hash:"sha384",id:new Buffer("","hex")},exports["DSA-SHA512"]=exports["DSA-WITH-SHA512"]={sign:"dsa",hash:"sha512",id:new Buffer("","hex")},exports["DSA-RIPEMD160"]={sign:"dsa",hash:"rmd160",id:new Buffer("","hex")},exports["RSA-RIPEMD160"]=exports.ripemd160WithRSA={sign:"rsa",hash:"rmd160",id:new Buffer("3021300906052b2403020105000414","hex")},exports["RSA-MD5"]=exports.md5WithRSAEncryption={sign:"rsa",hash:"md5",id:new Buffer("3020300c06082a864886f70d020505000410","hex")};


}).call(this,require("buffer").Buffer)

},{"buffer":17}],41:[function(require,module,exports){
(function (Buffer){
function Sign(t,e){stream.Writable.call(this);var i=algos[t];if(!i)throw new Error("Unknown message digest");this._hashType=i.hash,this._hash=e.createHash(i.hash),this._tag=i.id,this._crypto=e}function Verify(t,e){stream.Writable.call(this);var i=algos[t];if(!i)throw new Error("Unknown message digest");this._hash=e.createHash(i.hash),this._tag=i.id}var sign=require("./sign"),verify=require("./verify"),stream=require("stream"),inherits=require("inherits"),_algos=require("./algos"),algos={};Object.keys(_algos).forEach(function(t){algos[t]=algos[t.toLowerCase()]=_algos[t]}),module.exports=function(t,e){function i(t){return new Sign(t,e)}function r(t){return new Verify(t,e)}t.createSign=t.Sign=i,t.createVerify=t.Verify=r},inherits(Sign,stream.Writable),Sign.prototype._write=function(t,e,i){this._hash.update(t),i()},Sign.prototype.update=function(t){return this.write(t),this},Sign.prototype.sign=function(t,e){this.end();var i=this._hash.digest(),r=sign(Buffer.concat([this._tag,i]),t,this._hashType,this._crypto);return e&&(r=r.toString(e)),r},inherits(Verify,stream.Writable),Verify.prototype._write=function(t,e,i){this._hash.update(t),i()},Verify.prototype.update=function(t){return this.write(t),this},Verify.prototype.verify=function(t,e,i){this.end();var r=this._hash.digest();return Buffer.isBuffer(e)||(e=new Buffer(e,i)),verify(e,Buffer.concat([this._tag,r]),t)};


}).call(this,require("buffer").Buffer)

},{"./algos":40,"./sign":84,"./verify":85,"buffer":17,"inherits":162,"stream":180}],42:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function n(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function s(t,i,r){return null!==t&&"object"==typeof t&&Array.isArray(t.words)?t:(this.sign=!1,this.words=null,this.length=0,this.red=null,("le"===i||"be"===i)&&(r=i,i=10),void(null!==t&&this._init(t||0,i||10,r||"be")))}function h(t,i,r){for(var n=0,s=Math.min(t.length,r),h=i;s>h;h++){var e=t.charCodeAt(h)-48;n<<=4,n|=e>=49&&54>=e?e-49+10:e>=17&&22>=e?e-17+10:15&e}return n}function e(t,i,r,n){for(var s=0,h=Math.min(t.length,r),e=i;h>e;e++){var o=t.charCodeAt(e)-48;s*=n,s+=o>=49?o-49+10:o>=17?o-17+10:o}return s}function o(t,i){this.name=t,this.p=new s(i,16),this.n=this.p.bitLength(),this.k=new s(1).ishln(this.n).isub(this.p),this.tmp=this._tmp()}function f(){o.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function d(){o.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function u(){o.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function l(){o.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function p(t){if("string"==typeof t){var i=s._prime(t);this.m=i.p,this.prime=i}else this.m=t,this.prime=null}function g(t){p.call(this,t),this.shift=this.m.bitLength(),this.shift%26!==0&&(this.shift+=26-this.shift%26),this.r=new s(1).ishln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r.invm(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv.sign=!0,this.minv=this.minv.mod(this.r)}"object"==typeof t?t.exports=s:i.BN=s,s.BN=s,s.wordSize=26,s.prototype._init=function(t,i,n){if("number"==typeof t)return 0>t&&(this.sign=!0,t=-t),void(67108864>t?(this.words=[67108863&t],this.length=1):(this.words=[67108863&t,t/67108864&67108863],this.length=2));if("object"==typeof t)return this._initArray(t,i,n);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&36>=i),t=t.toString().replace(/\s+/g,"");var s=0;"-"===t[0]&&s++,16===i?this._parseHex(t,s):this._parseBase(t,i,s),"-"===t[0]&&(this.sign=!0),this.strip()},s.prototype._initArray=function(t,i,n){r("number"==typeof t.length),this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var s=0;s<this.length;s++)this.words[s]=0;var h=0;if("be"===n)for(var s=t.length-1,e=0;s>=0;s-=3){var o=t[s]|t[s-1]<<8|t[s-2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}else if("le"===n)for(var s=0,e=0;s<t.length;s+=3){var o=t[s]|t[s+1]<<8|t[s+2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}return this.strip()},s.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;for(var n=0,r=t.length-6,s=0;r>=i;r-=6){var e=h(t,r,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303,n+=24,n>=26&&(n-=26,s++)}if(r+6!==i){var e=h(t,i,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303}this.strip()},s.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var n=0,s=1;67108863>=s;s*=i)n++;n--,s=s/i|0;for(var h=t.length-r,o=h%n,f=Math.min(h,h-o)+r,d=0,u=r;f>u;u+=n)d=e(t,u,u+n,i),this.imuln(s),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d);if(0!==o){for(var l=1,d=e(t,u,t.length,i),u=0;o>u;u++)l*=i;this.imuln(l),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d)}},s.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.sign=this.sign,t.red=this.red},s.prototype.clone=function(){var t=new s(null);return this.copy(t),t},s.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},s.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.sign=!1),this},s.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var a=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],c=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],m=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];s.prototype.toString=function(t,i){if(t=t||10,16===t||"hex"===t){for(var n="",s=0,i=0|i||1,h=0,e=0;e<this.length;e++){var o=this.words[e],f=(16777215&(o<<s|h)).toString(16);h=o>>>24-s&16777215,n=0!==h||e!==this.length-1?a[6-f.length]+f+n:f+n,s+=2,s>=26&&(s-=26,e--)}for(0!==h&&(n=h.toString(16)+n);n.length%i!==0;)n="0"+n;return this.sign&&(n="-"+n),n}if(t===(0|t)&&t>=2&&36>=t){var d=c[t],u=m[t],n="",l=this.clone();for(l.sign=!1;0!==l.cmpn(0);){var p=l.modn(u).toString(t);l=l.idivn(u),n=0!==l.cmpn(0)?a[d-p.length]+p+n:p+n}return 0===this.cmpn(0)&&(n="0"+n),this.sign&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},s.prototype.toJSON=function(){return this.toString(16)},s.prototype.toArray=function(){this.strip();var t=new Array(this.byteLength());t[0]=0;for(var i=this.clone(),r=0;0!==i.cmpn(0);r++){var n=i.andln(255);i.ishrn(8),t[t.length-r-1]=n}return t},s.prototype._countBits=function(t){return t>=33554432?26:t>=16777216?25:t>=8388608?24:t>=4194304?23:t>=2097152?22:t>=1048576?21:t>=524288?20:t>=262144?19:t>=131072?18:t>=65536?17:t>=32768?16:t>=16384?15:t>=8192?14:t>=4096?13:t>=2048?12:t>=1024?11:t>=512?10:t>=256?9:t>=128?8:t>=64?7:t>=32?6:t>=16?5:t>=8?4:t>=4?3:t>=2?2:t>=1?1:0},s.prototype.bitLength=function(){var t=0,i=this.words[this.length-1],t=this._countBits(i);return 26*(this.length-1)+t},s.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},s.prototype.neg=function(){if(0===this.cmpn(0))return this.clone();var t=this.clone();return t.sign=!this.sign,t},s.prototype.ior=function(t){for(this.sign=this.sign||t.sign;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},s.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},s.prototype.iand=function(t){this.sign=this.sign&&t.sign;var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},s.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},s.prototype.ixor=function(t){this.sign=this.sign||t.sign;var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var n=0;n<r.length;n++)this.words[n]=i.words[n]^r.words[n];if(this!==i)for(;n<i.length;n++)this.words[n]=i.words[n];return this.length=i.length,this.strip()},s.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},s.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);for(var n=t/26|0,s=t%26;this.length<=n;)this.words[this.length++]=0;return this.words[n]=i?this.words[n]|1<<s:this.words[n]&~(1<<s),this.strip()},s.prototype.iadd=function(t){if(this.sign&&!t.sign){this.sign=!1;var i=this.isub(t);return this.sign=!this.sign,this._normSign()}if(!this.sign&&t.sign){t.sign=!1;var i=this.isub(t);return t.sign=!0,i._normSign()}var r,n;this.length>t.length?(r=this,n=t):(r=t,n=this);for(var s=0,h=0;h<n.length;h++){var i=r.words[h]+n.words[h]+s;this.words[h]=67108863&i,s=i>>>26}for(;0!==s&&h<r.length;h++){var i=r.words[h]+s;this.words[h]=67108863&i,s=i>>>26}if(this.length=r.length,0!==s)this.words[this.length]=s,this.length++;else if(r!==this)for(;h<r.length;h++)this.words[h]=r.words[h];return this},s.prototype.add=function(t){if(t.sign&&!this.sign){t.sign=!1;var i=this.sub(t);return t.sign=!0,i}if(!t.sign&&this.sign){this.sign=!1;var i=t.sub(this);return this.sign=!0,i}return this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},s.prototype.isub=function(t){if(t.sign){t.sign=!1;var i=this.iadd(t);return t.sign=!0,i._normSign()}if(this.sign)return this.sign=!1,this.iadd(t),this.sign=!0,this._normSign();var r=this.cmp(t);if(0===r)return this.sign=!1,this.length=1,this.words[0]=0,this;var n,s;r>0?(n=this,s=t):(n=t,s=this);for(var h=0,e=0;e<s.length;e++){var i=n.words[e]-s.words[e]+h;h=i>>26,this.words[e]=67108863&i}for(;0!==h&&e<n.length;e++){var i=n.words[e]+h;h=i>>26,this.words[e]=67108863&i}if(0===h&&e<n.length&&n!==this)for(;e<n.length;e++)this.words[e]=n.words[e];return this.length=Math.max(this.length,e),n!==this&&(this.sign=!0),this.strip()},s.prototype.sub=function(t){return this.clone().isub(t)},s.prototype._smallMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0;n<i.length-1;n++){for(var s=r>>>26,h=67108863&r,e=Math.min(n,t.length-1),o=Math.max(0,n-this.length+1);e>=o;o++){var f=n-o,d=0|this.words[f],u=0|t.words[o],l=d*u,p=67108863&l;s=s+(l/67108864|0)|0,p=p+h|0,h=67108863&p,s=s+(p>>>26)|0}i.words[n]=h,r=s}return 0!==r?i.words[n]=r:i.length--,i.strip()},s.prototype._bigMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0,s=0;s<i.length-1;s++){var h=n;n=0;for(var e=67108863&r,o=Math.min(s,t.length-1),f=Math.max(0,s-this.length+1);o>=f;f++){var d=s-f,u=0|this.words[d],l=0|t.words[f],p=u*l,g=67108863&p;h=h+(p/67108864|0)|0,g=g+e|0,e=67108863&g,h=h+(g>>>26)|0,n+=h>>>26,h&=67108863}i.words[s]=e,r=h,h=n}return 0!==r?i.words[s]=r:i.length--,i.strip()},s.prototype.mulTo=function(t,i){var r;return r=this.length+t.length<63?this._smallMulTo(t,i):this._bigMulTo(t,i)},s.prototype.mul=function(t){var i=new s(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},s.prototype.imul=function(t){if(0===this.cmpn(0)||0===t.cmpn(0))return this.words[0]=0,this.length=1,this;var i=this.length,r=t.length;this.sign=t.sign!==this.sign,this.length=this.length+t.length,this.words[this.length-1]=0;for(var n=this.length-2;n>=0;n--){for(var s=0,h=0,e=Math.min(n,r-1),o=Math.max(0,n-i+1);e>=o;o++){var f=n-o,d=this.words[f],u=t.words[o],l=d*u,p=67108863&l;s+=l/67108864|0,p+=h,h=67108863&p,s+=p>>>26}this.words[n]=h,this.words[n+1]+=s,s=0}for(var s=0,f=1;f<this.length;f++){var g=this.words[f]+s;this.words[f]=67108863&g,s=g>>>26}return this.strip()},s.prototype.imuln=function(t){r("number"==typeof t);for(var i=0,n=0;n<this.length;n++){var s=this.words[n]*t,h=(67108863&s)+(67108863&i);i>>=26,i+=s/67108864|0,i+=h>>>26,this.words[n]=67108863&h}return 0!==i&&(this.words[n]=i,this.length++),this},s.prototype.sqr=function(){return this.mul(this)},s.prototype.isqr=function(){return this.mul(this)},s.prototype.ishln=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=67108863>>>26-i<<26-i;if(0!==i){for(var h=0,e=0;e<this.length;e++){var o=this.words[e]&s,f=this.words[e]-o<<i;this.words[e]=f|h,h=o>>>26-i}h&&(this.words[e]=h,this.length++)}if(0!==n){for(var e=this.length-1;e>=0;e--)this.words[e+n]=this.words[e];for(var e=0;n>e;e++)this.words[e]=0;this.length+=n}return this.strip()},s.prototype.ishrn=function(t,i,n){r("number"==typeof t&&t>=0),i=i?(i-i%26)/26:0;var s=t%26,h=Math.min((t-s)/26,this.length),e=67108863^67108863>>>s<<s,o=n;if(i-=h,i=Math.max(0,i),o){for(var f=0;h>f;f++)o.words[f]=this.words[f];o.length=h}if(0===h);else if(this.length>h){this.length-=h;for(var f=0;f<this.length;f++)this.words[f]=this.words[f+h]}else this.words[0]=0,this.length=1;for(var d=0,f=this.length-1;f>=0&&(0!==d||f>=i);f--){var u=this.words[f];this.words[f]=d<<26-s|u>>>s,d=u&e}return o&&0!==d&&(o.words[o.length++]=d),0===this.length&&(this.words[0]=0,this.length=1),this.strip(),n?{hi:this,lo:o}:this},s.prototype.shln=function(t){return this.clone().ishln(t)},s.prototype.shrn=function(t){return this.clone().ishrn(t)},s.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n)return!1;var h=this.words[n];return!!(h&s)},s.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26;if(r(!this.sign,"imaskn works only with positive numbers"),0!==i&&n++,this.length=Math.min(n,this.length),0!==i){var s=67108863^67108863>>>i<<i;this.words[this.length-1]&=s}return this.strip()},s.prototype.maskn=function(t){return this.clone().imaskn(t)},s.prototype.iaddn=function(t){return r("number"==typeof t),0>t?this.isubn(-t):this.sign?1===this.length&&this.words[0]<t?(this.words[0]=t-this.words[0],this.sign=!1,this):(this.sign=!1,this.isubn(t),this.sign=!0,this):this._iaddn(t)},s.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},s.prototype.isubn=function(t){if(r("number"==typeof t),0>t)return this.iaddn(-t);if(this.sign)return this.sign=!1,this.iaddn(t),this.sign=!0,this;this.words[0]-=t;for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},s.prototype.addn=function(t){return this.clone().iaddn(t)},s.prototype.subn=function(t){return this.clone().isubn(t)},s.prototype.iabs=function(){return this.sign=!1,this},s.prototype.abs=function(){return this.clone().iabs()},s.prototype._ishlnsubmul=function(t,i,n){var s,h=t.length+n;if(this.words.length<h){for(var e=new Array(h),s=0;s<this.length;s++)e[s]=this.words[s];this.words=e}else s=this.length;for(this.length=Math.max(this.length,h);s<this.length;s++)this.words[s]=0;for(var o=0,s=0;s<t.length;s++){var f=this.words[s+n]+o,d=t.words[s]*i;f-=67108863&d,o=(f>>26)-(d/67108864|0),this.words[s+n]=67108863&f}for(;s<this.length-n;s++){var f=this.words[s+n]+o;o=f>>26,this.words[s+n]=67108863&f}if(0===o)return this.strip();r(-1===o),o=0;for(var s=0;s<this.length;s++){var f=-this.words[s]+o;o=f>>26,this.words[s]=67108863&f}return this.sign=!0,this.strip()},s.prototype._wordDiv=function(t,i){for(var r=this.length-t.length,n=this.clone(),h=t,e=h.words[h.length-1],r=0;33554432>e;r++)e<<=1;0!==r&&(h=h.shln(r),n.ishln(r),e=h.words[h.length-1]);var o,f=n.length-h.length;if("mod"!==i){o=new s(null),o.length=f+1,o.words=new Array(o.length);for(var d=0;d<o.length;d++)o.words[d]=0}var u=n.clone()._ishlnsubmul(h,1,f);u.sign||(n=u,o&&(o.words[f]=1));for(var l=f-1;l>=0;l--){var p=67108864*n.words[h.length+l]+n.words[h.length+l-1];for(p=Math.min(p/e|0,67108863),n._ishlnsubmul(h,p,l);n.sign;)p--,n.sign=!1,n._ishlnsubmul(h,1,l),n.sign=!n.sign;o&&(o.words[l]=p)}return o&&o.strip(),n.strip(),"div"!==i&&0!==r&&n.ishrn(r),{div:o?o:null,mod:n}},s.prototype.divmod=function(t,i){if(r(0!==t.cmpn(0)),this.sign&&!t.sign){var n,h,e=this.neg().divmod(t,i);return"mod"!==i&&(n=e.div.neg()),"div"!==i&&(h=0===e.mod.cmpn(0)?e.mod:t.sub(e.mod)),{div:n,mod:h}}if(!this.sign&&t.sign){var n,e=this.divmod(t.neg(),i);return"mod"!==i&&(n=e.div.neg()),{div:n,mod:e.mod}}return this.sign&&t.sign?this.neg().divmod(t.neg(),i):t.length>this.length||this.cmp(t)<0?{div:new s(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new s(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new s(this.modn(t.words[0]))}:this._wordDiv(t,i)},s.prototype.div=function(t){return this.divmod(t,"div").div},s.prototype.mod=function(t){return this.divmod(t,"mod").mod},s.prototype.divRound=function(t){var i=this.divmod(t);if(0===i.mod.cmpn(0))return i.div;var r=i.div.sign?i.mod.isub(t):i.mod,n=t.shrn(1),s=t.andln(1),h=r.cmp(n);return 0>h||1===s&&0===h?i.div:i.div.sign?i.div.isubn(1):i.div.iaddn(1)},s.prototype.modn=function(t){r(67108863>=t);for(var i=(1<<26)%t,n=0,s=this.length-1;s>=0;s--)n=(i*n+this.words[s])%t;return n},s.prototype.idivn=function(t){r(67108863>=t);for(var i=0,n=this.length-1;n>=0;n--){var s=this.words[n]+67108864*i;this.words[n]=s/t|0,i=s%t}return this.strip()},s.prototype.divn=function(t){return this.clone().idivn(t)},s.prototype._egcd=function(t,i){r(!i.sign),r(0!==i.cmpn(0));var n=this,h=i.clone();n=n.sign?n.mod(i):n.clone();for(var e=new s(0);h.isEven();)h.ishrn(1);for(var o=h.clone();n.cmpn(1)>0&&h.cmpn(1)>0;){for(;n.isEven();)n.ishrn(1),t.isEven()?t.ishrn(1):t.iadd(o).ishrn(1);for(;h.isEven();)h.ishrn(1),e.isEven()?e.ishrn(1):e.iadd(o).ishrn(1);n.cmp(h)>=0?(n.isub(h),t.isub(e)):(h.isub(n),e.isub(t))}return 0===n.cmpn(1)?t:e},s.prototype.gcd=function(t){if(0===this.cmpn(0))return t.clone();if(0===t.cmpn(0))return this.clone();var i=this.clone(),r=t.clone();i.sign=!1,r.sign=!1;for(var n=0;i.isEven()&&r.isEven();n++)i.ishrn(1),r.ishrn(1);for(;i.isEven();)i.ishrn(1);do{for(;r.isEven();)r.ishrn(1);if(i.cmp(r)<0){var s=i;i=r,r=s}i.isub(i.div(r).mul(r))}while(0!==i.cmpn(0)&&0!==r.cmpn(0));return 0===i.cmpn(0)?r.ishln(n):i.ishln(n)},s.prototype.invm=function(t){return this._egcd(new s(1),t).mod(t)},s.prototype.isEven=function(){return 0===(1&this.words[0])},s.prototype.isOdd=function(){return 1===(1&this.words[0])},s.prototype.andln=function(t){return this.words[0]&t},s.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n){for(var h=this.length;n+1>h;h++)this.words[h]=0;return this.words[n]|=s,this.length=n+1,this}for(var e=s,h=n;0!==e&&h<this.length;h++){var o=this.words[h];o+=e,e=o>>>26,o&=67108863,this.words[h]=o}return 0!==e&&(this.words[h]=e,this.length++),this},s.prototype.cmpn=function(t){var i=0>t;if(i&&(t=-t),this.sign&&!i)return-1;if(!this.sign&&i)return 1;t&=67108863,this.strip();var r;if(this.length>1)r=1;else{var n=this.words[0];r=n===t?0:t>n?-1:1}return this.sign&&(r=-r),r},s.prototype.cmp=function(t){if(this.sign&&!t.sign)return-1;if(!this.sign&&t.sign)return 1;var i=this.ucmp(t);return this.sign?-i:i},s.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var n=this.words[r],s=t.words[r];if(n!==s){s>n?i=-1:n>s&&(i=1);break}}return i},s.red=function(t){return new p(t)},s.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(!this.sign,"red works only with positives"),t.convertTo(this)._forceRed(t)},s.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},s.prototype._forceRed=function(t){return this.red=t,this},s.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},s.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},s.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},s.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},s.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},s.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},s.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},s.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},s.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},s.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},s.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},s.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},s.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},s.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var w={k256:null,p224:null,p192:null,p25519:null};o.prototype._tmp=function(){var t=new s(null);return t.words=new Array(Math.ceil(this.n/13)),t},o.prototype.ireduce=function(t){var i,r=t;do{var n=r.ishrn(this.n,0,this.tmp);r=this.imulK(n.hi),r=r.iadd(n.lo),i=r.bitLength()}while(i>this.n);var s=i<this.n?-1:r.cmp(this.p);return 0===s?(r.words[0]=0,r.length=1):s>0?r.isub(this.p):r.strip(),r},o.prototype.imulK=function(t){return t.imul(this.k)},n(f,o),f.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i,r=0,n=0;n<t.length;n++){var s=t.words[n];i=64*s,r+=977*s,i+=r/67108864|0,r&=67108863,t.words[n]=r,r=i}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},n(d,o),n(u,o),n(l,o),l.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var n=19*t.words[r]+i,s=67108863&n;n>>>=26,t.words[r]=s,i=n}return 0!==i&&(t.words[t.length++]=i),t},s._prime=function v(t){if(w[t])return w[t];var v;if("k256"===t)v=new f;else if("p224"===t)v=new d;else if("p192"===t)v=new u;else{if("p25519"!==t)throw new Error("Unknown prime "+t);v=new l}return w[t]=v,v},p.prototype._verify1=function(t){r(!t.sign,"red works only with positives"),r(t.red,"red works only with red numbers")},p.prototype._verify2=function(t,i){r(!t.sign&&!i.sign,"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},p.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.mod(this.m)._forceRed(this)},p.prototype.neg=function(t){var i=t.clone();return i.sign=!i.sign,i.iadd(this.m)._forceRed(this)},p.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},p.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},p.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},p.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},p.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.shln(i))},p.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},p.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},p.prototype.isqr=function(t){return this.imul(t,t)},p.prototype.sqr=function(t){return this.mul(t,t)},p.prototype.sqrt=function(t){if(0===t.cmpn(0))return t.clone();var i=this.m.andln(3);if(r(i%2===1),3===i){var n=this.m.add(new s(1)).ishrn(2),h=this.pow(t,n);return h}for(var e=this.m.subn(1),o=0;0!==e.cmpn(0)&&0===e.andln(1);)o++,e.ishrn(1);r(0!==e.cmpn(0));var f=new s(1).toRed(this),d=f.redNeg(),u=this.m.subn(1).ishrn(1),l=this.m.bitLength();for(l=new s(2*l*l).toRed(this);0!==this.pow(l,u).cmp(d);)l.redIAdd(d);for(var p=this.pow(l,e),h=this.pow(t,e.addn(1).ishrn(1)),g=this.pow(t,e),a=o;0!==g.cmp(f);){for(var c=g,m=0;0!==c.cmp(f);m++)c=c.redSqr();r(a>m);var w=this.pow(p,new s(1).ishln(a-m-1));h=h.redMul(w),p=w.redSqr(),g=g.redMul(p),a=m}return h},p.prototype.invm=function(t){var i=t._egcd(new s(1),this.m);return i.sign?(i.sign=!1,this.imod(i).redNeg()):this.imod(i)},p.prototype.pow=function(t,i){for(var r=[],n=i.clone();0!==n.cmpn(0);)r.push(n.andln(1)),n.ishrn(1);for(var s=t,h=0;h<r.length&&0===r[h];h++,s=this.sqr(s));if(++h<r.length)for(var n=this.sqr(s);h<r.length;h++,n=this.sqr(n))0!==r[h]&&(s=this.mul(s,n));return s},p.prototype.convertTo=function(t){return t.clone()},p.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},s.mont=function(t){return new g(t)},n(g,p),g.prototype.convertTo=function(t){return this.imod(t.shln(this.shift))},g.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},g.prototype.imul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return t.words[0]=0,t.length=1,t;var r=t.imul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),s=r.isub(n).ishrn(this.shift),h=s;return s.cmp(this.m)>=0?h=s.isub(this.m):s.cmpn(0)<0&&(h=s.iadd(this.m)),h._forceRed(this)},g.prototype.mul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return new s(0)._forceRed(this);var r=t.mul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),h=r.isub(n).ishrn(this.shift),e=h;return h.cmp(this.m)>=0?e=h.isub(this.m):h.cmpn(0)<0&&(e=h.iadd(this.m)),e._forceRed(this)},g.prototype.invm=function(t){var i=this.imod(t.invm(this.m).mul(this.r2));return i._forceRed(this)}}("undefined"==typeof module||module,this);


},{}],43:[function(require,module,exports){
(function (Buffer){
function blind(e,n){var r=getr(e,n),o=r.toRed(bn.mont(e.modulus)).redPow(new bn(e.publicExponent)).fromRed();return{blinder:o,unblinder:r.invm(e.modulus)}}function crt(e,n,r){var o=blind(n,r),m=n.modulus.byteLength(),t=(bn.mont(n.modulus),new bn(e).mul(o.blinder).mod(n.modulus)),u=t.toRed(bn.mont(n.prime1)),d=t.toRed(bn.mont(n.prime2)),i=n.coefficient,l=n.prime1,b=n.prime2,f=u.redPow(n.exponent1),s=d.redPow(n.exponent2);f=f.fromRed(),s=s.fromRed();var a=f.isub(s).imul(i).mod(l);a.imul(b),s.iadd(a);var c=new Buffer(s.imul(o.unblinder).mod(n.modulus).toArray());if(c.length<m){var p=new Buffer(m-c.length);p.fill(0),c=Buffer.concat([p,c],m)}return c}function getr(e,n){for(var r=e.modulus.byteLength(),o=new bn(n.randomBytes(r));o.cmp(e.modulus)>=0||!o.mod(e.prime1)||!o.mod(e.prime2);)o=new bn(n.randomBytes(r));return o}var bn=require("bn.js");module.exports=crt,crt.getr=getr;


}).call(this,require("buffer").Buffer)

},{"bn.js":42,"buffer":17}],44:[function(require,module,exports){
var elliptic=exports;elliptic.version=require("../package.json").version,elliptic.utils=require("./elliptic/utils"),elliptic.rand=require("brorand"),elliptic.hmacDRBG=require("./elliptic/hmac-drbg"),elliptic.curve=require("./elliptic/curve"),elliptic.curves=require("./elliptic/curves"),elliptic.ec=require("./elliptic/ec");


},{"../package.json":63,"./elliptic/curve":47,"./elliptic/curves":50,"./elliptic/ec":51,"./elliptic/hmac-drbg":54,"./elliptic/utils":55,"brorand":56}],45:[function(require,module,exports){
function BaseCurve(t,e){this.type=t,this.p=new bn(e.p,16),this.red=e.prime?bn.red(e.prime):bn.mont(this.p),this.zero=new bn(0).toRed(this.red),this.one=new bn(1).toRed(this.red),this.two=new bn(2).toRed(this.red),this.n=e.n&&new bn(e.n,16),this.g=e.g&&this.pointFromJSON(e.g,e.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4)}function BasePoint(t,e){this.curve=t,this.type=e,this.precomputed=null}var bn=require("bn.js"),elliptic=require("../../elliptic"),getNAF=elliptic.utils.getNAF,getJSF=elliptic.utils.getJSF,assert=elliptic.utils.assert;module.exports=BaseCurve,BaseCurve.prototype.point=function(){throw new Error("Not implemented")},BaseCurve.prototype.validate=function(){throw new Error("Not implemented")},BaseCurve.prototype._fixedNafMul=function(t,e){var n=t._getDoubles(),r=getNAF(e,1),i=(1<<n.step+1)-(n.step%2===0?2:1);i/=3;for(var o=[],s=0;s<r.length;s+=n.step){for(var a=0,e=s+n.step-1;e>=s;e--)a=(a<<1)+r[e];o.push(a)}for(var l=this.jpoint(null,null,null),p=this.jpoint(null,null,null),u=i;u>0;u--){for(var s=0;s<o.length;s++){var a=o[s];a===u?p=p.mixedAdd(n.points[s]):a===-u&&(p=p.mixedAdd(n.points[s].neg()))}l=l.add(p)}return l.toP()},BaseCurve.prototype._wnafMul=function(t,e){var n=4,r=t._getNAFPoints(n);n=r.wnd;for(var i=r.points,o=getNAF(e,n),s=this.jpoint(null,null,null),a=o.length-1;a>=0;a--){for(var e=0;a>=0&&0===o[a];a--)e++;if(a>=0&&e++,s=s.dblp(e),0>a)break;var l=o[a];assert(0!==l),s="affine"===t.type?s.mixedAdd(l>0?i[l-1>>1]:i[-l-1>>1].neg()):s.add(l>0?i[l-1>>1]:i[-l-1>>1].neg())}return"affine"===t.type?s.toP():s},BaseCurve.prototype._wnafMulAdd=function(t,e,n,r){for(var i=this._wnafT1,o=this._wnafT2,s=this._wnafT3,a=0,l=0;r>l;l++){var p=e[l],u=p._getNAFPoints(t);i[l]=u.wnd,o[l]=u.points}for(var l=r-1;l>=1;l-=2){var d=l-1,h=l;if(1===i[d]&&1===i[h]){var f=[e[d],null,null,e[h]];0===e[d].y.cmp(e[h].y)?(f[1]=e[d].add(e[h]),f[2]=e[d].toJ().mixedAdd(e[h].neg())):0===e[d].y.cmp(e[h].y.redNeg())?(f[1]=e[d].toJ().mixedAdd(e[h]),f[2]=e[d].add(e[h].neg())):(f[1]=e[d].toJ().mixedAdd(e[h]),f[2]=e[d].toJ().mixedAdd(e[h].neg()));var v=[-3,-1,-5,-7,0,7,5,1,3],g=getJSF(n[d],n[h]);a=Math.max(g[0].length,a),s[d]=new Array(a),s[h]=new Array(a);for(var c=0;a>c;c++){var m=0|g[0][c],w=0|g[1][c];s[d][c]=v[3*(m+1)+(w+1)],s[h][c]=0,o[d]=f}}else s[d]=getNAF(n[d],i[d]),s[h]=getNAF(n[h],i[h]),a=Math.max(s[d].length,a),a=Math.max(s[h].length,a)}for(var b=this.jpoint(null,null,null),y=this._wnafT4,l=a;l>=0;l--){for(var A=0;l>=0;){for(var _=!0,c=0;r>c;c++)y[c]=0|s[c][l],0!==y[c]&&(_=!1);if(!_)break;A++,l--}if(l>=0&&A++,b=b.dblp(A),0>l)break;for(var c=0;r>c;c++){var p,B=y[c];0!==B&&(B>0?p=o[c][B-1>>1]:0>B&&(p=o[c][-B-1>>1].neg()),b="affine"===p.type?b.mixedAdd(p):b.add(p))}}for(var l=0;r>l;l++)o[l]=null;return b.toP()},BaseCurve.BasePoint=BasePoint,BasePoint.prototype.validate=function(){return this.curve.validate(this)},BasePoint.prototype.precompute=function(t){if(this.precomputed)return this;var e={doubles:null,naf:null,beta:null};return e.naf=this._getNAFPoints(8),e.doubles=this._getDoubles(4,t),e.beta=this._getBeta(),this.precomputed=e,this},BasePoint.prototype._getDoubles=function(t,e){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var n=[this],r=this,i=0;e>i;i+=t){for(var o=0;t>o;o++)r=r.dbl();n.push(r)}return{step:t,points:n}},BasePoint.prototype._getNAFPoints=function(t){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var e=[this],n=(1<<t)-1,r=1===n?null:this.dbl(),i=1;n>i;i++)e[i]=e[i-1].add(r);return{wnd:t,points:e}},BasePoint.prototype._getBeta=function(){return null},BasePoint.prototype.dblp=function(t){for(var e=this,n=0;t>n;n++)e=e.dbl();return e};


},{"../../elliptic":44,"bn.js":42}],46:[function(require,module,exports){
function EdwardsCurve(t){this.twisted=1!=t.a,this.mOneA=this.twisted&&-1==t.a,this.extended=this.mOneA,Base.call(this,"mont",t),this.a=new bn(t.a,16).mod(this.red.m).toRed(this.red),this.c=new bn(t.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new bn(t.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),assert(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==t.c}function Point(t,e,r,i,d){Base.BasePoint.call(this,t,"projective"),null===e&&null===r&&null===i?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new bn(e,16),this.y=new bn(r,16),this.z=i?new bn(i,16):this.curve.one,this.t=d&&new bn(d,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(EdwardsCurve,Base),module.exports=EdwardsCurve,EdwardsCurve.prototype._mulA=function(t){return this.mOneA?t.redNeg():this.a.redMul(t)},EdwardsCurve.prototype._mulC=function(t){return this.oneC?t:this.c.redMul(t)},EdwardsCurve.prototype.point=function(t,e,r,i){return new Point(this,t,e,r,i)},EdwardsCurve.prototype.jpoint=function(t,e,r,i){return this.point(t,e,r,i)},EdwardsCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},EdwardsCurve.prototype.pointFromX=function(t,e){e=new bn(e,16),e.red||(e=e.toRed(this.red));var r=e.redSqr(),i=this.c2.redSub(this.a.redMul(r)),d=this.one.redSub(this.c2.redMul(this.d).redMul(r)),s=i.redMul(d.redInvm()).redSqrt(),u=s.fromRed().isOdd();return(t&&!u||!t&&u)&&(s=s.redNeg()),this.point(e,s,curve.one)},EdwardsCurve.prototype.validate=function(t){if(t.isInfinity())return!0;t.normalize();var e=t.x.redSqr(),r=t.y.redSqr(),i=e.redMul(this.a).redAdd(r),d=this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));return 0===i.cmp(d)},inherits(Point,Base.BasePoint),Point.fromJSON=function(t,e){return new Point(t,e[0],e[1],e[2])},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},Point.prototype._extDbl=function(){var t=this.x.redSqr(),e=this.y.redSqr(),r=this.z.redSqr();r=r.redIAdd(r);var i=this.curve._mulA(t),d=this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),s=i.redAdd(e),u=s.redSub(r),n=i.redSub(e),h=d.redMul(u),o=s.redMul(n),l=d.redMul(n),c=u.redMul(s);return this.curve.point(h,o,c,l)},Point.prototype._projDbl=function(){var t=this.x.redAdd(this.y).redSqr(),e=this.x.redSqr(),r=this.y.redSqr();if(this.curve.twisted){var i=this.curve._mulA(e),d=i.redAdd(r);if(this.zOne)var s=t.redSub(e).redSub(r).redMul(d.redSub(this.curve.two)),u=d.redMul(i.redSub(r)),n=d.redSqr().redSub(d).redSub(d);else var h=this.z.redSqr(),o=d.redSub(h).redISub(h),s=t.redSub(e).redISub(r).redMul(o),u=d.redMul(i.redSub(r)),n=d.redMul(o)}else var i=e.redAdd(r),h=this.curve._mulC(redMul(this.z)).redSqr(),o=i.redSub(h).redSub(h),s=this.curve._mulC(t.redISub(i)).redMul(o),u=this.curve._mulC(i).redMul(e.redISub(r)),n=i.redMul(o);return this.curve.point(s,u,n)},Point.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},Point.prototype._extAdd=function(t){var e=this.y.redSub(this.x).redMul(t.y.redSub(t.x)),r=this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),i=this.t.redMul(this.curve.dd).redMul(t.t),d=this.z.redMul(t.z.redAdd(t.z)),s=r.redSub(e),u=d.redSub(i),n=d.redAdd(i),h=r.redAdd(e),o=s.redMul(u),l=n.redMul(h),c=s.redMul(h),p=u.redMul(n);return this.curve.point(o,l,p,c)},Point.prototype._projAdd=function(t){var e=this.z.redMul(t.z),r=e.redSqr(),i=this.x.redMul(t.x),d=this.y.redMul(t.y),s=this.curve.d.redMul(i).redMul(d),u=r.redSub(s),n=r.redAdd(s),h=this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(i).redISub(d),o=e.redMul(u).redMul(h);if(this.curve.twisted)var l=e.redMul(n).redMul(d.redSub(this.curve._mulA(i))),c=u.redMul(n);else var l=e.redMul(n).redMul(d.redSub(i)),c=this.curve._mulC(u).redMul(n);return this.curve.point(o,l,c)},Point.prototype.add=function(t){return this.isInfinity()?t:t.isInfinity()?this:this.curve.extended?this._extAdd(t):this._projAdd(t)},Point.prototype.mul=function(t){return this.precomputed&&this.precomputed.doubles?this.curve._fixedNafMul(this,t):this.curve._wnafMul(this,t)},Point.prototype.mulAdd=function(t,e,r){return this.curve._wnafMulAdd(1,[this,e],[t,r],2)},Point.prototype.normalize=function(){if(this.zOne)return this;var t=this.z.redInvm();return this.x=this.x.redMul(t),this.y=this.y.redMul(t),this.t&&(this.t=this.t.redMul(t)),this.z=this.curve.one,this.zOne=!0,this},Point.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()},Point.prototype.getY=function(){return this.normalize(),this.y.fromRed()},Point.prototype.toP=Point.prototype.normalize,Point.prototype.mixedAdd=Point.prototype.add;


},{"../../elliptic":44,"../curve":47,"bn.js":42,"inherits":162}],47:[function(require,module,exports){
var curve=exports;curve.base=require("./base"),curve["short"]=require("./short"),curve.mont=require("./mont"),curve.edwards=require("./edwards");


},{"./base":45,"./edwards":46,"./mont":48,"./short":49}],48:[function(require,module,exports){
function MontCurve(t){Base.call(this,"mont",t),this.a=new bn(t.a,16).toRed(this.red),this.b=new bn(t.b,16).toRed(this.red),this.i4=new bn(4).toRed(this.red).redInvm(),this.two=new bn(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function Point(t,e,r){Base.BasePoint.call(this,t,"projective"),null===e&&null===r?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new bn(e,16),this.z=new bn(r,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(MontCurve,Base),module.exports=MontCurve,MontCurve.prototype.point=function(t,e){return new Point(this,t,e)},MontCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},MontCurve.prototype.validate=function(t){var e=t.normalize().x,r=e.redSqr(),i=r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e),n=i.redSqrt();return 0===n.redSqr().cmp(i)},inherits(Point,Base.BasePoint),Point.prototype.precompute=function(){},Point.fromJSON=function(t,e){return new Point(t,e[0],e[1]||t.one)},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},Point.prototype.dbl=function(){var t=this.x.redAdd(this.z),e=t.redSqr(),r=this.x.redSub(this.z),i=r.redSqr(),n=e.redSub(i),o=e.redMul(i),d=n.redMul(i.redAdd(this.curve.a24.redMul(n)));return this.curve.point(o,d)},Point.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.diffAdd=function(t,e){var r=this.x.redAdd(this.z),i=this.x.redSub(this.z),n=t.x.redAdd(t.z),o=t.x.redSub(t.z),d=o.redMul(r),s=n.redMul(i),u=e.z.redMul(d.redAdd(s).redSqr()),h=e.x.redMul(d.redISub(s).redSqr());return this.curve.point(u,h)},Point.prototype.mul=function(t){for(var e=t.clone(),r=this,i=this.curve.point(null,null),n=this,o=[];0!==e.cmpn(0);e.ishrn(1))o.push(e.andln(1));for(var d=o.length-1;d>=0;d--)0===o[d]?(r=r.diffAdd(i,n),i=i.dbl()):(i=r.diffAdd(i,n),r=r.dbl());return i},Point.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()};


},{"../../elliptic":44,"../curve":47,"bn.js":42,"inherits":162}],49:[function(require,module,exports){
function ShortCurve(r){Base.call(this,"short",r),this.a=new bn(r.a,16).toRed(this.red),this.b=new bn(r.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(r),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function Point(r,e,t,d){Base.BasePoint.call(this,r,"affine"),null===e&&null===t?(this.x=null,this.y=null,this.inf=!0):(this.x=new bn(e,16),this.y=new bn(t,16),d&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function JPoint(r,e,t,d){Base.BasePoint.call(this,r,"jacobian"),null===e&&null===t&&null===d?(this.x=this.curve.one,this.y=this.curve.one,this.z=new bn(0)):(this.x=new bn(e,16),this.y=new bn(t,16),this.z=new bn(d,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(ShortCurve,Base),module.exports=ShortCurve,ShortCurve.prototype._getEndomorphism=function(r){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var e,t;if(r.beta)e=new bn(r.beta,16).toRed(this.red);else{var d=this._getEndoRoots(this.p);e=d[0].cmp(d[1])<0?d[0]:d[1],e=e.toRed(this.red)}if(r.lambda)t=new bn(r.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))?t=i[0]:(t=i[1],assert(0===this.g.mul(t).x.cmp(this.g.x.redMul(e))))}var n;return n=r.basis?r.basis.map(function(r){return{a:new bn(r.a,16),b:new bn(r.b,16)}}):this._getEndoBasis(t),{beta:e,lambda:t,basis:n}}},ShortCurve.prototype._getEndoRoots=function(r){var e=r===this.p?this.red:bn.mont(r),t=new bn(2).toRed(e).redInvm(),d=t.redNeg(),i=(new bn(1).toRed(e),new bn(3).toRed(e).redNeg().redSqrt().redMul(t)),n=d.redAdd(i).fromRed(),s=d.redSub(i).fromRed();return[n,s]},ShortCurve.prototype._getEndoBasis=function(r){for(var e,t,d,i,n,s,u,o=this.n.shrn(Math.floor(this.n.bitLength()/2)),h=r,l=this.n.clone(),p=new bn(1),a=new bn(0),b=new bn(0),f=new bn(1),c=0;0!==h.cmpn(0);){var S=l.div(h),v=l.sub(S.mul(h)),I=b.sub(S.mul(p)),y=f.sub(S.mul(a));if(!d&&v.cmp(o)<0)e=u.neg(),t=p,d=v.neg(),i=I;else if(d&&2===++c)break;u=v,l=h,h=v,b=p,p=I,f=a,a=y}n=v.neg(),s=I;var A=d.sqr().add(i.sqr()),m=n.sqr().add(s.sqr());return m.cmp(A)>=0&&(n=e,s=t),d.sign&&(d=d.neg(),i=i.neg()),n.sign&&(n=n.neg(),s=s.neg()),[{a:d,b:i},{a:n,b:s}]},ShortCurve.prototype._endoSplit=function(r){var e=this.endo.basis,t=e[0],d=e[1],i=d.b.mul(r).divRound(this.n),n=t.b.neg().mul(r).divRound(this.n),s=i.mul(t.a),u=n.mul(d.a),o=i.mul(t.b),h=n.mul(d.b),l=r.sub(s).sub(u),p=o.add(h).neg();return{k1:l,k2:p}},ShortCurve.prototype.point=function(r,e,t){return new Point(this,r,e,t)},ShortCurve.prototype.pointFromX=function(r,e){e=new bn(e,16),e.red||(e=e.toRed(this.red));var t=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),d=t.redSqrt(),i=d.fromRed().isOdd();return(r&&!i||!r&&i)&&(d=d.redNeg()),this.point(e,d)},ShortCurve.prototype.jpoint=function(r,e,t){return new JPoint(this,r,e,t)},ShortCurve.prototype.pointFromJSON=function(r,e){return Point.fromJSON(this,r,e)},ShortCurve.prototype.validate=function(r){if(r.inf)return!0;var e=r.x,t=r.y,d=this.a.redMul(e),i=e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);return 0===t.redSqr().redISub(i).cmpn(0)},ShortCurve.prototype._endoWnafMulAdd=function(r,e){for(var t=this._endoWnafT1,d=this._endoWnafT2,i=0;i<r.length;i++){var n=this._endoSplit(e[i]),s=r[i],u=s._getBeta();n.k1.sign&&(n.k1.sign=!n.k1.sign,s=s.neg(!0)),n.k2.sign&&(n.k2.sign=!n.k2.sign,u=u.neg(!0)),t[2*i]=s,t[2*i+1]=u,d[2*i]=n.k1,d[2*i+1]=n.k2}for(var o=this._wnafMulAdd(1,t,d,2*i),h=0;2*i>h;h++)t[h]=null,d[h]=null;return o},inherits(Point,Base.BasePoint),Point.prototype._getBeta=function(){function r(r){return d.point(r.x.redMul(d.endo.beta),r.y)}if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var d=this.curve;e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(r)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(r)}}}return t}},Point.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Point.fromJSON=function(r,e,t){function d(e){return r.point(e[0],e[1],t)}"string"==typeof e&&(e=JSON.parse(e));var i=r.point(e[0],e[1],t);if(!e[2])return i;var n=e[2];return i.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[i].concat(n.doubles.points.map(d))},naf:n.naf&&{wnd:n.naf.wnd,points:[i].concat(n.naf.points.map(d))}},i},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return this.inf},Point.prototype.add=function(r){if(this.inf)return r;if(r.inf)return this;if(this.eq(r))return this.dbl();if(this.neg().eq(r))return this.curve.point(null,null);if(0===this.x.cmp(r.x))return this.curve.point(null,null);var e=this.y.redSub(r.y);0!==e.cmpn(0)&&(e=e.redMul(this.x.redSub(r.x).redInvm()));var t=e.redSqr().redISub(this.x).redISub(r.x),d=e.redMul(this.x.redSub(t)).redISub(this.y);return this.curve.point(t,d)},Point.prototype.dbl=function(){if(this.inf)return this;var r=this.y.redAdd(this.y);if(0===r.cmpn(0))return this.curve.point(null,null);var e=this.curve.a,t=this.x.redSqr(),d=r.redInvm(),i=t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),n=i.redSqr().redISub(this.x.redAdd(this.x)),s=i.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,s)},Point.prototype.getX=function(){return this.x.fromRed()},Point.prototype.getY=function(){return this.y.fromRed()},Point.prototype.mul=function(r){return r=new bn(r,16),this.precomputed&&this.precomputed.doubles?this.curve._fixedNafMul(this,r):this.curve.endo?this.curve._endoWnafMulAdd([this],[r]):this.curve._wnafMul(this,r)},Point.prototype.mulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i):this.curve._wnafMulAdd(1,d,i,2)},Point.prototype.eq=function(r){return this===r||this.inf===r.inf&&(this.inf||0===this.x.cmp(r.x)&&0===this.y.cmp(r.y))},Point.prototype.neg=function(r){function e(r){return r.neg()}if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(r&&this.precomputed){var d=this.precomputed;t.precomputed={naf:d.naf&&{wnd:d.naf.wnd,points:d.naf.points.map(e)},doubles:d.doubles&&{step:d.doubles.step,points:d.doubles.points.map(e)}}}return t},Point.prototype.toJ=function(){if(this.inf)return this.curve.jpoint(null,null,null);var r=this.curve.jpoint(this.x,this.y,this.curve.one);return r},inherits(JPoint,Base.BasePoint),JPoint.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var r=this.z.redInvm(),e=r.redSqr(),t=this.x.redMul(e),d=this.y.redMul(e).redMul(r);return this.curve.point(t,d)},JPoint.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},JPoint.prototype.add=function(r){if(this.isInfinity())return r;if(r.isInfinity())return this;var e=r.z.redSqr(),t=this.z.redSqr(),d=this.x.redMul(e),i=r.x.redMul(t),n=this.y.redMul(e.redMul(r.z)),s=r.y.redMul(t.redMul(this.z)),u=d.redSub(i),o=n.redSub(s);if(0===u.cmpn(0))return 0!==o.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=u.redSqr(),l=h.redMul(u),p=d.redMul(h),a=o.redSqr().redIAdd(l).redISub(p).redISub(p),b=o.redMul(p.redISub(a)).redISub(n.redMul(l)),f=this.z.redMul(r.z).redMul(u);return this.curve.jpoint(a,b,f)},JPoint.prototype.mixedAdd=function(r){if(this.isInfinity())return r.toJ();if(r.isInfinity())return this;var e=this.z.redSqr(),t=this.x,d=r.x.redMul(e),i=this.y,n=r.y.redMul(e).redMul(this.z),s=t.redSub(d),u=i.redSub(n);if(0===s.cmpn(0))return 0!==u.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var o=s.redSqr(),h=o.redMul(s),l=t.redMul(o),p=u.redSqr().redIAdd(h).redISub(l).redISub(l),a=u.redMul(l.redISub(p)).redISub(i.redMul(h)),b=this.z.redMul(s);return this.curve.jpoint(p,a,b)},JPoint.prototype.dblp=function(r){if(0===r)return this;if(this.isInfinity())return this;if(!r)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var e=this,t=0;r>t;t++)e=e.dbl();return e}for(var d=this.curve.a,i=this.curve.tinv,n=this.x,s=this.y,u=this.z,o=u.redSqr().redSqr(),h=s.redAdd(s),t=0;r>t;t++){var l=n.redSqr(),p=h.redSqr(),a=p.redSqr(),b=l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),f=n.redMul(p),c=b.redSqr().redISub(f.redAdd(f)),S=f.redISub(c),v=b.redMul(S);v=v.redIAdd(v).redISub(a);var I=h.redMul(u);r>t+1&&(o=o.redMul(a)),n=c,u=I,h=v}return this.curve.jpoint(n,h.redMul(i),u)},JPoint.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},JPoint.prototype._zeroDbl=function(){if(this.zOne){var r=this.x.redSqr(),e=this.y.redSqr(),t=e.redSqr(),d=this.x.redAdd(e).redSqr().redISub(r).redISub(t);d=d.redIAdd(d);var i=r.redAdd(r).redIAdd(r),n=i.redSqr().redISub(d).redISub(d),s=t.redIAdd(t);s=s.redIAdd(s),s=s.redIAdd(s);var u=n,o=i.redMul(d.redISub(n)).redISub(s),h=this.y.redAdd(this.y)}else{var l=this.x.redSqr(),p=this.y.redSqr(),a=p.redSqr(),b=this.x.redAdd(p).redSqr().redISub(l).redISub(a);b=b.redIAdd(b);var f=l.redAdd(l).redIAdd(l),c=f.redSqr(),S=a.redIAdd(a);S=S.redIAdd(S),S=S.redIAdd(S);var u=c.redISub(b).redISub(b),o=f.redMul(b.redISub(u)).redISub(S),h=this.y.redMul(this.z);h=h.redIAdd(h)}return this.curve.jpoint(u,o,h)},JPoint.prototype._threeDbl=function(){if(this.zOne){var r=this.x.redSqr(),e=this.y.redSqr(),t=e.redSqr(),d=this.x.redAdd(e).redSqr().redISub(r).redISub(t);d=d.redIAdd(d);var i=r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),n=i.redSqr().redISub(d).redISub(d),s=n,u=t.redIAdd(t);u=u.redIAdd(u),u=u.redIAdd(u);var o=i.redMul(d.redISub(n)).redISub(u),h=this.y.redAdd(this.y)}else{var l=this.z.redSqr(),p=this.y.redSqr(),a=this.x.redMul(p),b=this.x.redSub(l).redMul(this.x.redAdd(l));b=b.redAdd(b).redIAdd(b);var f=a.redIAdd(a);f=f.redIAdd(f);var c=f.redAdd(f),s=b.redSqr().redISub(c),h=this.y.redAdd(this.z).redSqr().redISub(p).redISub(l),S=p.redSqr();S=S.redIAdd(S),S=S.redIAdd(S),S=S.redIAdd(S);var o=b.redMul(f.redISub(s)).redISub(S)}return this.curve.jpoint(s,o,h)},JPoint.prototype._dbl=function(){var r=this.curve.a,e=(this.curve.tinv,this.x),t=this.y,d=this.z,i=d.redSqr().redSqr(),n=e.redSqr(),s=t.redSqr(),u=n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),o=e.redAdd(e);o=o.redIAdd(o);var h=o.redMul(s),l=u.redSqr().redISub(h.redAdd(h)),p=h.redISub(l),a=s.redSqr();a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var b=u.redMul(p).redISub(a),f=t.redAdd(t).redMul(d);return this.curve.jpoint(l,b,f)},JPoint.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var r=this.x.redSqr(),e=this.y.redSqr(),t=this.z.redSqr(),d=e.redSqr(),i=r.redAdd(r).redIAdd(r),n=i.redSqr(),s=this.x.redAdd(e).redSqr().redISub(r).redISub(d);s=s.redIAdd(s),s=s.redAdd(s).redIAdd(s),s=s.redISub(n);var u=s.redSqr(),o=d.redIAdd(d);o=o.redIAdd(o),o=o.redIAdd(o),o=o.redIAdd(o);var h=i.redIAdd(s).redSqr().redISub(n).redISub(u).redISub(o),l=e.redMul(h);l=l.redIAdd(l),l=l.redIAdd(l);var p=this.x.redMul(u).redISub(l);p=p.redIAdd(p),p=p.redIAdd(p);var a=this.y.redMul(h.redMul(o.redISub(h)).redISub(s.redMul(u)));a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var b=this.z.redAdd(s).redSqr().redISub(t).redISub(u);return this.curve.jpoint(p,a,b)},JPoint.prototype.mul=function(r,e){return r=new bn(r,e),this.curve._wnafMul(this,r)},JPoint.prototype.eq=function(r){if("affine"===r.type)return this.eq(r.toJ());if(this===r)return!0;var e=this.z.redSqr(),t=r.z.redSqr();if(0!==this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return!1;var d=e.redMul(this.z),i=t.redMul(r.z);return 0===this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)},JPoint.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},JPoint.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};


},{"../../elliptic":44,"../curve":47,"bn.js":42,"inherits":162}],50:[function(require,module,exports){
function PresetCurve(f){this.curve="short"===f.type?new elliptic.curve["short"](f):"edwards"===f.type?new elliptic.curve.edwards(f):new elliptic.curve.mont(f),this.g=this.curve.g,this.n=this.curve.n,this.hash=f.hash,assert(this.g.validate(),"Invalid curve"),assert(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function defineCurve(f,e){Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,get:function(){var d=new PresetCurve(e);return Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,value:d}),d}})}var curves=exports,hash=require("hash.js"),bn=require("bn.js"),elliptic=require("../elliptic"),assert=elliptic.utils.assert;curves.PresetCurve=PresetCurve,defineCurve("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:hash.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),defineCurve("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:hash.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),defineCurve("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:hash.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),defineCurve("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"0",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["9"]}),defineCurve("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]}),defineCurve("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:hash.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",{doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}]});


},{"../elliptic":44,"bn.js":42,"hash.js":57}],51:[function(require,module,exports){
function EC(t){return this instanceof EC?("string"==typeof t&&(assert(elliptic.curves.hasOwnProperty(t),"Unknown curve "+t),t=elliptic.curves[t]),t instanceof elliptic.curves.PresetCurve&&(t={curve:t}),this.curve=t.curve.curve,this.n=this.curve.n,this.nh=this.n.shrn(1),this.g=this.curve.g,this.g=t.curve.g,this.g.precompute(t.curve.n.bitLength()+1),void(this.hash=t.hash||t.curve.hash)):new EC(t)}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,KeyPair=require("./key"),Signature=require("./signature");module.exports=EC,EC.prototype.keyPair=function(t,e){return new KeyPair(this,t,e)},EC.prototype.genKeyPair=function(t){t||(t={});for(var e=new elliptic.hmacDRBG({hash:this.hash,pers:t.pers,entropy:t.entropy||elliptic.rand(this.hash.hmacStrength),nonce:this.n.toArray()}),n=this.n.byteLength(),i=this.n.sub(new bn(2));;){var r=new bn(e.generate(n));if(!(r.cmp(i)>0))return r.iaddn(1),this.keyPair(r)}},EC.prototype._truncateToN=function(t,e){var n=8*t.byteLength()-this.n.bitLength();return n>0&&(t=t.shrn(n)),!e&&t.cmp(this.n)>=0?t.sub(this.n):t},EC.prototype.sign=function(t,e,n){e=this.keyPair(e,"hex"),t=this._truncateToN(new bn(t,16)),n||(n={});for(var i=this.n.byteLength(),r=e.getPrivate().toArray(),s=r.length;21>s;s++)r.unshift(0);for(var h=t.toArray(),s=h.length;i>s;s++)h.unshift(0);for(var u=new elliptic.hmacDRBG({hash:this.hash,entropy:r,nonce:h}),a=this.n.sub(new bn(1));;){var c=new bn(u.generate(this.n.byteLength()));if(c=this._truncateToN(c,!0),!(c.cmpn(1)<=0||c.cmp(a)>=0)){var o=this.g.mul(c);if(!o.isInfinity()){var p=o.getX().mod(this.n);if(0!==p.cmpn(0)){var v=c.invm(this.n).mul(p.mul(e.getPrivate()).iadd(t)).mod(this.n);if(0!==v.cmpn(0))return n.canonical&&v.cmp(this.nh)>0&&(v=this.n.sub(v)),new Signature(p,v)}}}}},EC.prototype.verify=function(t,e,n){t=this._truncateToN(new bn(t,16)),n=this.keyPair(n,"hex"),e=new Signature(e,"hex");var i=e.r,r=e.s;if(i.cmpn(1)<0||i.cmp(this.n)>=0)return!1;if(r.cmpn(1)<0||r.cmp(this.n)>=0)return!1;var s=r.invm(this.n),h=s.mul(t).mod(this.n),u=s.mul(i).mod(this.n),a=this.g.mulAdd(h,n.getPublic(),u);return a.isInfinity()?!1:0===a.getX().mod(this.n).cmp(i)};


},{"../../elliptic":44,"./key":52,"./signature":53,"bn.js":42}],52:[function(require,module,exports){
function KeyPair(t,i,e){return i instanceof KeyPair?i:e instanceof KeyPair?e:(i||(i=e,e=null),null!==i&&"object"==typeof i&&(i.x?(e=i,i=null):(i.priv||i.pub)&&(e=i.pub,i=i.priv)),this.ec=t,this.priv=null,this.pub=null,void(this._importPublicHex(i,e)||("hex"===e&&(e=null),i&&this._importPrivate(i),e&&this._importPublic(e))))}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=KeyPair,KeyPair.prototype.validate=function(){var t=this.getPublic();return t.isInfinity()?{result:!1,reason:"Invalid public key"}:t.validate()?t.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},KeyPair.prototype.getPublic=function(t,i){if(this.pub||(this.pub=this.ec.g.mul(this.priv)),"string"==typeof t&&(i=t,t=null),!i)return this.pub;for(var e=this.ec.curve.p.byteLength(),r=this.pub.getX().toArray(),n=r.length;e>n;n++)r.unshift(0);if(t)var u=[this.pub.getY().isEven()?2:3].concat(r);else{for(var s=this.pub.getY().toArray(),n=s.length;e>n;n++)s.unshift(0);var u=[4].concat(r,s)}return utils.encode(u,i)},KeyPair.prototype.getPrivate=function(t){return"hex"===t?this.priv.toString(16,2):this.priv},KeyPair.prototype._importPrivate=function(t){this.priv=new bn(t,16),this.priv=this.priv.mod(this.ec.curve.n)},KeyPair.prototype._importPublic=function(t){this.pub=this.ec.curve.point(t.x,t.y)},KeyPair.prototype._importPublicHex=function(t,i){t=utils.toArray(t,i);var e=this.ec.curve.p.byteLength();if(4===t[0]&&t.length-1===2*e)this.pub=this.ec.curve.point(t.slice(1,1+e),t.slice(1+e,1+2*e));else{if(2!==t[0]&&3!==t[0]||t.length-1!==e)return!1;this.pub=this.ec.curve.pointFromX(3===t[0],t.slice(1,1+e))}return!0},KeyPair.prototype.derive=function(t){return t.mul(this.priv).getX()},KeyPair.prototype.sign=function(t){return this.ec.sign(t,this)},KeyPair.prototype.verify=function(t,i){return this.ec.verify(t,i,this)},KeyPair.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};


},{"../../elliptic":44,"bn.js":42}],53:[function(require,module,exports){
function Signature(t,r){return t instanceof Signature?t:void(this._importDER(t,r)||(assert(t&&r,"Signature without r or s"),this.r=new bn(t,16),this.s=new bn(r,16)))}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=Signature,Signature.prototype._importDER=function(t,r){if(t=utils.toArray(t,r),t.length<6||48!==t[0]||2!==t[2])return!1;var e=t[1];if(1+e>t.length)return!1;var n=t[3];if(n>=128)return!1;if(4+n+2>=t.length)return!1;if(2!==t[4+n])return!1;var i=t[5+n];return i>=128?!1:4+n+2+i>t.length?!1:(this.r=new bn(t.slice(4,4+n)),this.s=new bn(t.slice(4+n+2,4+n+2+i)),!0)},Signature.prototype.toDER=function(t){var r=this.r.toArray(),e=this.s.toArray();128&r[0]&&(r=[0].concat(r)),128&e[0]&&(e=[0].concat(e));var n=r.length+e.length+4,i=[48,n,2,r.length];return i=i.concat(r,[2,e.length],e),utils.encode(i,t)};


},{"../../elliptic":44,"bn.js":42}],54:[function(require,module,exports){
function HmacDRBG(t){if(!(this instanceof HmacDRBG))return new HmacDRBG(t);this.hash=t.hash,this.predResist=!!t.predResist,this.outLen=this.hash.outSize,this.minEntropy=t.minEntropy||this.hash.hmacStrength,this.reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var e=utils.toArray(t.entropy,t.entropyEnc),i=utils.toArray(t.nonce,t.nonceEnc),s=utils.toArray(t.pers,t.persEnc);assert(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(e,i,s)}var hash=require("hash.js"),elliptic=require("../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=HmacDRBG,HmacDRBG.prototype._init=function(t,e,i){var s=t.concat(e).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var h=0;h<this.V.length;h++)this.K[h]=0,this.V[h]=1;this._update(s),this.reseed=1,this.reseedInterval=281474976710656},HmacDRBG.prototype._hmac=function(){return new hash.hmac(this.hash,this.K)},HmacDRBG.prototype._update=function(t){var e=this._hmac().update(this.V).update([0]);t&&(e=e.update(t)),this.K=e.digest(),this.V=this._hmac().update(this.V).digest(),t&&(this.K=this._hmac().update(this.V).update([1]).update(t).digest(),this.V=this._hmac().update(this.V).digest())},HmacDRBG.prototype.reseed=function(t,e,i,s){"string"!=typeof e&&(s=i,i=e,e=null),t=utils.toBuffer(t,e),i=utils.toBuffer(i,s),assert(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(t.concat(i||[])),this.reseed=1},HmacDRBG.prototype.generate=function(t,e,i,s){if(this.reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof e&&(s=i,i=e,e=null),i&&(i=utils.toArray(i,s),this._update(i));for(var h=[];h.length<t;)this.V=this._hmac().update(this.V).digest(),h=h.concat(this.V);var r=h.slice(0,t);return this._update(i),this.reseed++,utils.encode(r,e)};


},{"../elliptic":44,"hash.js":57}],55:[function(require,module,exports){
function toArray(r,n){if(Array.isArray(r))return r.slice();if(!r)return[];var e=[];if("string"==typeof r)if(n){if("hex"===n){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var t=0;t<r.length;t+=2)e.push(parseInt(r[t]+r[t+1],16))}}else for(var t=0;t<r.length;t++){var i=r.charCodeAt(t),o=i>>8,a=255&i;o?e.push(o,a):e.push(a)}else for(var t=0;t<r.length;t++)e[t]=0|r[t];return e}function toHex(r){for(var n="",e=0;e<r.length;e++)n+=zero2(r[e].toString(16));return n}function zero2(r){return 1===r.length?"0"+r:r}function getNAF(r,n){for(var e=[],t=1<<n+1,i=r.clone();i.cmpn(1)>=0;){var o;if(i.isOdd()){var a=i.andln(t-1);o=a>(t>>1)-1?(t>>1)-a:a,i.isubn(o)}else o=0;e.push(o);for(var s=0!==i.cmpn(0)&&0===i.andln(t-1)?n+1:1,u=1;s>u;u++)e.push(0);i.ishrn(s)}return e}function getJSF(r,n){var e=[[],[]];r=r.clone(),n=n.clone();for(var t=0,i=0;r.cmpn(-t)>0||n.cmpn(-i)>0;){var o=r.andln(3)+t&3,a=n.andln(3)+i&3;3===o&&(o=-1),3===a&&(a=-1);var s;if(0===(1&o))s=0;else{var u=r.andln(7)+t&7;s=3!==u&&5!==u||2!==a?o:-o}e[0].push(s);var l;if(0===(1&a))l=0;else{var u=n.andln(7)+i&7;l=3!==u&&5!==u||2!==o?a:-a}e[1].push(l),2*t===s+1&&(t=1-t),2*i===l+1&&(i=1-i),r.ishrn(1),n.ishrn(1)}return e}var bn=require("bn.js"),utils=exports;utils.assert=function(r,n){if(!r)throw new Error(n||"Assertion failed")},utils.toArray=toArray,utils.toHex=toHex,utils.encode=function(r,n){return"hex"===n?toHex(r):r},utils.zero2=zero2,utils.getNAF=getNAF,utils.getJSF=getJSF;


},{"bn.js":42}],56:[function(require,module,exports){
function Rand(n){this.rand=n}var r;if(module.exports=function(n){return r||(r=new Rand(null)),r.generate(n)},module.exports.Rand=Rand,Rand.prototype.generate=function(n){return this._rand(n)},"object"==typeof window)Rand.prototype._rand=window.crypto&&window.crypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.crypto.getRandomValues(r),r}:window.msCrypto&&window.msCrypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.msCrypto.getRandomValues(r),r}:function(){throw new Error("Not implemented yet")};else try{var crypto=require("crypto");Rand.prototype._rand=function(n){return crypto.randomBytes(n)}}catch(e){Rand.prototype._rand=function(n){for(var r=new Uint8Array(n),t=0;t<r.length;t++)r[t]=this.rand.getByte();return r}}


},{"crypto":21}],57:[function(require,module,exports){
var hash=exports;hash.utils=require("./hash/utils"),hash.common=require("./hash/common"),hash.sha=require("./hash/sha"),hash.ripemd=require("./hash/ripemd"),hash.hmac=require("./hash/hmac"),hash.sha1=hash.sha.sha1,hash.sha256=hash.sha.sha256,hash.sha224=hash.sha.sha224,hash.sha384=hash.sha.sha384,hash.sha512=hash.sha.sha512,hash.ripemd160=hash.ripemd.ripemd160;


},{"./hash/common":58,"./hash/hmac":59,"./hash/ripemd":60,"./hash/sha":61,"./hash/utils":62}],58:[function(require,module,exports){
function BlockHash(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var hash=require("../hash"),utils=hash.utils,assert=utils.assert;exports.BlockHash=BlockHash,BlockHash.prototype.update=function(t,i){if(t=utils.toArray(t,i),this.pending=this.pending?this.pending.concat(t):t,this.pendingTotal+=t.length,this.pending.length>=this._delta8){t=this.pending;var h=t.length%this._delta8;this.pending=t.slice(t.length-h,t.length),0===this.pending.length&&(this.pending=null),t=utils.join32(t,0,t.length-h,this.endian);for(var s=0;s<t.length;s+=this._delta32)this._update(t,s,s+this._delta32)}return this},BlockHash.prototype.digest=function(t){return this.update(this._pad()),assert(null===this.pending),this._digest(t)},BlockHash.prototype._pad=function(){var t=this.pendingTotal,i=this._delta8,h=i-(t+this.padLength)%i,s=new Array(h+this.padLength);s[0]=128;for(var n=1;h>n;n++)s[n]=0;if(t<<=3,"big"===this.endian){for(var e=8;e<this.padLength;e++)s[n++]=0;s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=t>>>24&255,s[n++]=t>>>16&255,s[n++]=t>>>8&255,s[n++]=255&t}else{s[n++]=255&t,s[n++]=t>>>8&255,s[n++]=t>>>16&255,s[n++]=t>>>24&255,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0;for(var e=8;e<this.padLength;e++)s[n++]=0}return s};


},{"../hash":57}],59:[function(require,module,exports){
function Hmac(t,i,e){return this instanceof Hmac?(this.Hash=t,this.blockSize=t.blockSize/8,this.outSize=t.outSize/8,this.inner=null,this.outer=null,void this._init(utils.toArray(i,e))):new Hmac(t,i,e)}var hmac=exports,hash=require("../hash"),utils=hash.utils,assert=utils.assert;module.exports=Hmac,Hmac.prototype._init=function(t){t.length>this.blockSize&&(t=(new this.Hash).update(t).digest()),assert(t.length<=this.blockSize);for(var i=t.length;i<this.blockSize;i++)t.push(0);for(var i=0;i<t.length;i++)t[i]^=54;this.inner=(new this.Hash).update(t);for(var i=0;i<t.length;i++)t[i]^=106;this.outer=(new this.Hash).update(t)},Hmac.prototype.update=function(t,i){return this.inner.update(t,i),this},Hmac.prototype.digest=function(t){return this.outer.update(this.inner.digest()),this.outer.digest(t)};


},{"../hash":57}],60:[function(require,module,exports){
function RIPEMD160(){return this instanceof RIPEMD160?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.endian="little")):new RIPEMD160}function f(t,h,s,i){return 15>=t?h^s^i:31>=t?h&s|~h&i:47>=t?(h|~s)^i:63>=t?h&i|s&~i:h^(s|~i)}function K(t){return 15>=t?0:31>=t?1518500249:47>=t?1859775393:63>=t?2400959708:2840853838}function Kh(t){return 15>=t?1352829926:31>=t?1548603684:47>=t?1836072691:63>=t?2053994217:0}var hash=require("../hash"),utils=hash.utils,rotl32=utils.rotl32,sum32=utils.sum32,sum32_3=utils.sum32_3,sum32_4=utils.sum32_4,BlockHash=hash.common.BlockHash;utils.inherits(RIPEMD160,BlockHash),exports.ripemd160=RIPEMD160,RIPEMD160.blockSize=512,RIPEMD160.outSize=160,RIPEMD160.hmacStrength=192,RIPEMD160.padLength=64,RIPEMD160.prototype._update=function(t,h){for(var i=this.h[0],u=this.h[1],l=this.h[2],o=this.h[3],e=this.h[4],n=i,m=u,a=l,c=o,_=e,D=0;80>D;D++){var E=sum32(rotl32(sum32_4(i,f(D,u,l,o),t[r[D]+h],K(D)),s[D]),e);i=e,e=o,o=rotl32(l,10),l=u,u=E,E=sum32(rotl32(sum32_4(n,f(79-D,m,a,c),t[rh[D]+h],Kh(D)),sh[D]),_),n=_,_=c,c=rotl32(a,10),a=m,m=E}E=sum32_3(this.h[1],l,c),this.h[1]=sum32_3(this.h[2],o,_),this.h[2]=sum32_3(this.h[3],e,n),this.h[3]=sum32_3(this.h[4],i,m),this.h[4]=sum32_3(this.h[0],u,a),this.h[0]=E},RIPEMD160.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"little"):utils.split32(this.h,"little")};var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];


},{"../hash":57}],61:[function(require,module,exports){
function SHA256(){return this instanceof SHA256?(BlockHash.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=sha256_K,void(this.W=new Array(64))):new SHA256}function SHA224(){return this instanceof SHA224?(SHA256.call(this),void(this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])):new SHA224}function SHA512(){return this instanceof SHA512?(BlockHash.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=sha512_K,void(this.W=new Array(160))):new SHA512}function SHA384(){return this instanceof SHA384?(SHA512.call(this),void(this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428])):new SHA384}function SHA1(){return this instanceof SHA1?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.W=new Array(80))):new SHA1}function ch32(t,h,s){return t&h^~t&s}function maj32(t,h,s){return t&h^t&s^h&s}function p32(t,h,s){return t^h^s}function s0_256(t){return rotr32(t,2)^rotr32(t,13)^rotr32(t,22)}function s1_256(t){return rotr32(t,6)^rotr32(t,11)^rotr32(t,25)}function g0_256(t){return rotr32(t,7)^rotr32(t,18)^t>>>3}function g1_256(t){return rotr32(t,17)^rotr32(t,19)^t>>>10}function ft_1(t,h,s,i){return 0===t?ch32(h,s,i):1===t||3===t?p32(h,s,i):2===t?maj32(h,s,i):void 0}function ch64_hi(t,h,s,i,r){var o=t&s^~t&r;return 0>o&&(o+=4294967296),o}function ch64_lo(t,h,s,i,r,o){var u=h&i^~h&o;return 0>u&&(u+=4294967296),u}function maj64_hi(t,h,s,i,r){var o=t&s^t&r^s&r;return 0>o&&(o+=4294967296),o}function maj64_lo(t,h,s,i,r,o){var u=h&i^h&o^i&o;return 0>u&&(u+=4294967296),u}function s0_512_hi(t,h){var s=rotr64_hi(t,h,28),i=rotr64_hi(h,t,2),r=rotr64_hi(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s0_512_lo(t,h){var s=rotr64_lo(t,h,28),i=rotr64_lo(h,t,2),r=rotr64_lo(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_hi(t,h){var s=rotr64_hi(t,h,14),i=rotr64_hi(t,h,18),r=rotr64_hi(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_lo(t,h){var s=rotr64_lo(t,h,14),i=rotr64_lo(t,h,18),r=rotr64_lo(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_hi(t,h){var s=rotr64_hi(t,h,1),i=rotr64_hi(t,h,8),r=shr64_hi(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_lo(t,h){var s=rotr64_lo(t,h,1),i=rotr64_lo(t,h,8),r=shr64_lo(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_hi(t,h){var s=rotr64_hi(t,h,19),i=rotr64_hi(h,t,29),r=shr64_hi(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_lo(t,h){var s=rotr64_lo(t,h,19),i=rotr64_lo(h,t,29),r=shr64_lo(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}var hash=require("../hash"),utils=hash.utils,assert=utils.assert,rotr32=utils.rotr32,rotl32=utils.rotl32,sum32=utils.sum32,sum32_4=utils.sum32_4,sum32_5=utils.sum32_5,rotr64_hi=utils.rotr64_hi,rotr64_lo=utils.rotr64_lo,shr64_hi=utils.shr64_hi,shr64_lo=utils.shr64_lo,sum64=utils.sum64,sum64_hi=utils.sum64_hi,sum64_lo=utils.sum64_lo,sum64_4_hi=utils.sum64_4_hi,sum64_4_lo=utils.sum64_4_lo,sum64_5_hi=utils.sum64_5_hi,sum64_5_lo=utils.sum64_5_lo,BlockHash=hash.common.BlockHash,sha256_K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],sha1_K=[1518500249,1859775393,2400959708,3395469782];utils.inherits(SHA256,BlockHash),exports.sha256=SHA256,SHA256.blockSize=512,SHA256.outSize=256,SHA256.hmacStrength=192,SHA256.padLength=64,SHA256.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=sum32_4(g1_256(s[i-2]),s[i-7],g0_256(s[i-15]),s[i-16]);var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],e=this.h[5],l=this.h[6],a=this.h[7];assert(this.k.length===s.length);for(var i=0;i<s.length;i++){var c=sum32_5(a,s1_256(_),ch32(_,e,l),this.k[i],s[i]),S=sum32(s0_256(r),maj32(r,o,u));a=l,l=e,e=_,_=sum32(n,c),n=u,u=o,o=r,r=sum32(c,S)}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_),this.h[5]=sum32(this.h[5],e),this.h[6]=sum32(this.h[6],l),this.h[7]=sum32(this.h[7],a)},SHA256.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA224,SHA256),exports.sha224=SHA224,SHA224.blockSize=512,SHA224.outSize=224,SHA224.hmacStrength=192,SHA224.padLength=64,SHA224.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,7),"big"):utils.split32(this.h.slice(0,7),"big")},utils.inherits(SHA512,BlockHash),exports.sha512=SHA512,SHA512.blockSize=1024,SHA512.outSize=512,SHA512.hmacStrength=192,SHA512.padLength=128,SHA512.prototype._prepareBlock=function(t,h){for(var s=this.W,i=0;32>i;i++)s[i]=t[h+i];for(;i<s.length;i+=2){var r=g1_512_hi(s[i-4],s[i-3]),o=g1_512_lo(s[i-4],s[i-3]),u=s[i-14],n=s[i-13],_=g0_512_hi(s[i-30],s[i-29]),e=g0_512_lo(s[i-30],s[i-29]),l=s[i-32],a=s[i-31];s[i]=sum64_4_hi(r,o,u,n,_,e,l,a),s[i+1]=sum64_4_lo(r,o,u,n,_,e,l,a)}},SHA512.prototype._update=function(t,h){this._prepareBlock(t,h);var s=this.W,i=this.h[0],r=this.h[1],o=this.h[2],u=this.h[3],n=this.h[4],_=this.h[5],e=this.h[6],l=this.h[7],a=this.h[8],c=this.h[9],S=this.h[10],m=this.h[11],H=this.h[12],A=this.h[13],f=this.h[14],g=this.h[15];assert(this.k.length===s.length);for(var p=0;p<s.length;p+=2){var v=f,k=g,d=s1_512_hi(a,c),b=s1_512_lo(a,c),x=ch64_hi(a,c,S,m,H,A),y=ch64_lo(a,c,S,m,H,A),z=this.k[p],B=this.k[p+1],w=s[p],j=s[p+1],W=sum64_5_hi(v,k,d,b,x,y,z,B,w,j),K=sum64_5_lo(v,k,d,b,x,y,z,B,w,j),v=s0_512_hi(i,r),k=s0_512_lo(i,r),d=maj64_hi(i,r,o,u,n,_),b=maj64_lo(i,r,o,u,n,_),L=sum64_hi(v,k,d,b),q=sum64_lo(v,k,d,b);f=H,g=A,H=S,A=m,S=a,m=c,a=sum64_hi(e,l,W,K),c=sum64_lo(l,l,W,K),e=n,l=_,n=o,_=u,o=i,u=r,i=sum64_hi(W,K,L,q),r=sum64_lo(W,K,L,q)}sum64(this.h,0,i,r),sum64(this.h,2,o,u),sum64(this.h,4,n,_),sum64(this.h,6,e,l),sum64(this.h,8,a,c),sum64(this.h,10,S,m),sum64(this.h,12,H,A),sum64(this.h,14,f,g)},SHA512.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA384,SHA512),exports.sha384=SHA384,SHA384.blockSize=1024,SHA384.outSize=384,SHA384.hmacStrength=192,SHA384.padLength=128,SHA384.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,12),"big"):utils.split32(this.h.slice(0,12),"big")},utils.inherits(SHA1,BlockHash),exports.sha1=SHA1,SHA1.blockSize=512,SHA1.outSize=160,SHA1.hmacStrength=80,SHA1.padLength=64,SHA1.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=rotl32(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);for(var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],i=0;i<s.length;i++){var e=~~(i/20),l=sum32_5(rotl32(r,5),ft_1(e,o,u,n),_,s[i],sha1_K[e]);_=n,n=u,u=rotl32(o,30),o=r,r=l}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_)},SHA1.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};


},{"../hash":57}],62:[function(require,module,exports){
function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var n=[];if("string"==typeof r)if(t){if("hex"===t){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var u=0;u<r.length;u+=2)n.push(parseInt(r[u]+r[u+1],16))}}else for(var u=0;u<r.length;u++){var o=r.charCodeAt(u),e=o>>8,s=255&o;e?n.push(e,s):n.push(s)}else for(var u=0;u<r.length;u++)n[u]=0|r[u];return n}function toHex(r){for(var t="",n=0;n<r.length;n++)t+=zero2(r[n].toString(16));return t}function htonl(r){var t=r>>>24|r>>>8&65280|r<<8&16711680|(255&r)<<24;return t>>>0}function toHex32(r,t){for(var n="",u=0;u<r.length;u++){var o=r[u];"little"===t&&(o=htonl(o)),n+=zero8(o.toString(16))}return n}function zero2(r){return 1===r.length?"0"+r:r}function zero8(r){return 7===r.length?"0"+r:6===r.length?"00"+r:5===r.length?"000"+r:4===r.length?"0000"+r:3===r.length?"00000"+r:2===r.length?"000000"+r:1===r.length?"0000000"+r:r}function join32(r,t,n,u){var o=n-t;assert(o%4===0);for(var e=new Array(o/4),s=0,i=t;s<e.length;s++,i+=4){var l;l="big"===u?r[i]<<24|r[i+1]<<16|r[i+2]<<8|r[i+3]:r[i+3]<<24|r[i+2]<<16|r[i+1]<<8|r[i],e[s]=l>>>0}return e}function split32(r,t){for(var n=new Array(4*r.length),u=0,o=0;u<r.length;u++,o+=4){var e=r[u];"big"===t?(n[o]=e>>>24,n[o+1]=e>>>16&255,n[o+2]=e>>>8&255,n[o+3]=255&e):(n[o+3]=e>>>24,n[o+2]=e>>>16&255,n[o+1]=e>>>8&255,n[o]=255&e)}return n}function rotr32(r,t){return r>>>t|r<<32-t}function rotl32(r,t){return r<<t|r>>>32-t}function sum32(r,t){return r+t>>>0}function sum32_3(r,t,n){return r+t+n>>>0}function sum32_4(r,t,n,u){return r+t+n+u>>>0}function sum32_5(r,t,n,u,o){return r+t+n+u+o>>>0}function assert(r,t){if(!r)throw new Error(t||"Assertion failed")}function sum64(r,t,n,u){var o=r[t],e=r[t+1],s=u+e>>>0,i=(u>s?1:0)+n+o;r[t]=i>>>0,r[t+1]=s}function sum64_hi(r,t,n,u){var o=t+u>>>0,e=(t>o?1:0)+r+n;return e>>>0}function sum64_lo(r,t,n,u){var o=t+u;return o>>>0}function sum64_4_hi(r,t,n,u,o,e,s,i){var l=0,h=t;h=h+u>>>0,l+=t>h?1:0,h=h+e>>>0,l+=e>h?1:0,h=h+i>>>0,l+=i>h?1:0;var _=r+n+o+s+l;return _>>>0}function sum64_4_lo(r,t,n,u,o,e,s,i){var l=t+u+e+i;return l>>>0}function sum64_5_hi(r,t,n,u,o,e,s,i,l,h){var _=0,a=t;a=a+u>>>0,_+=t>a?1:0,a=a+e>>>0,_+=e>a?1:0,a=a+i>>>0,_+=i>a?1:0,a=a+h>>>0,_+=h>a?1:0;var f=r+n+o+s+l+_;return f>>>0}function sum64_5_lo(r,t,n,u,o,e,s,i,l,h){var _=t+u+e+i+h;return _>>>0}function rotr64_hi(r,t,n){var u=t<<32-n|r>>>n;return u>>>0}function rotr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}function shr64_hi(r,t,n){return r>>>n}function shr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}var utils=exports,inherits=require("inherits");utils.toArray=toArray,utils.toHex=toHex,utils.htonl=htonl,utils.toHex32=toHex32,utils.zero2=zero2,utils.zero8=zero8,utils.join32=join32,utils.split32=split32,utils.rotr32=rotr32,utils.rotl32=rotl32,utils.sum32=sum32,utils.sum32_3=sum32_3,utils.sum32_4=sum32_4,utils.sum32_5=sum32_5,utils.assert=assert,utils.inherits=inherits,exports.sum64=sum64,exports.sum64_hi=sum64_hi,exports.sum64_lo=sum64_lo,exports.sum64_4_hi=sum64_4_hi,exports.sum64_4_lo=sum64_4_lo,exports.sum64_5_hi=sum64_5_hi,exports.sum64_5_lo=sum64_5_lo,exports.rotr64_hi=rotr64_hi,exports.rotr64_lo=rotr64_lo,exports.shr64_hi=shr64_hi,exports.shr64_lo=shr64_lo;


},{"inherits":162}],63:[function(require,module,exports){
module.exports={
  "name": "elliptic",
  "version": "1.0.1",
  "description": "EC cryptography",
  "main": "lib/elliptic.js",
  "scripts": {
    "test": "mocha --reporter=spec test/*-test.js"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:indutny/elliptic"
  },
  "keywords": [
    "EC",
    "Elliptic",
    "curve",
    "Cryptography"
  ],
  "author": {
    "name": "Fedor Indutny",
    "email": "fedor@indutny.com"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/indutny/elliptic/issues"
  },
  "homepage": "https://github.com/indutny/elliptic",
  "devDependencies": {
    "browserify": "^3.44.2",
    "mocha": "^1.18.2",
    "uglify-js": "^2.4.13"
  },
  "dependencies": {
    "bn.js": "^1.0.0",
    "brorand": "^1.0.1",
    "hash.js": "^1.0.0",
    "inherits": "^2.0.1"
  },
  "gitHead": "17dc013761dd1efcfb868e2b06b0b897627b40be",
  "_id": "elliptic@1.0.1",
  "_shasum": "d180376b66a17d74995c837796362ac4d22aefe3",
  "_from": "elliptic@^1.0.0",
  "_npmVersion": "1.4.28",
  "_npmUser": {
    "name": "indutny",
    "email": "fedor@indutny.com"
  },
  "maintainers": [
    {
      "name": "indutny",
      "email": "fedor@indutny.com"
    }
  ],
  "dist": {
    "shasum": "d180376b66a17d74995c837796362ac4d22aefe3",
    "tarball": "http://registry.npmjs.org/elliptic/-/elliptic-1.0.1.tgz"
  },
  "directories": {},
  "_resolved": "https://registry.npmjs.org/elliptic/-/elliptic-1.0.1.tgz",
  "readme": "ERROR: No README data found!"
}

},{}],64:[function(require,module,exports){
(function (Buffer){
module.exports=function(e,r,f,t){t/=8;for(var a,u,d,i=0,n=new Buffer(t),o=0;;){if(a=e.createHash("md5"),o++>0&&a.update(u),a.update(r),a.update(f),u=a.digest(),d=0,t>0)for(;;){if(0===t)break;if(d===u.length)break;n[i++]=u[d++],t--}if(0===t)break}for(d=0;d<u.length;d++)u[d]=0;return n};


}).call(this,require("buffer").Buffer)

},{"buffer":17}],65:[function(require,module,exports){
module.exports={"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
}
},{}],66:[function(require,module,exports){
var asn1=require("asn1.js"),rfc3280=require("asn1.js-rfc3280"),RSAPrivateKey=asn1.define("RSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("modulus")["int"](),this.key("publicExponent")["int"](),this.key("privateExponent")["int"](),this.key("prime1")["int"](),this.key("prime2")["int"](),this.key("exponent1")["int"](),this.key("exponent2")["int"](),this.key("coefficient")["int"]())});exports.RSAPrivateKey=RSAPrivateKey;var RSAPublicKey=asn1.define("RSAPublicKey",function(){this.seq().obj(this.key("modulus")["int"](),this.key("publicExponent")["int"]())});exports.RSAPublicKey=RSAPublicKey;var PublicKey=rfc3280.SubjectPublicKeyInfo;exports.PublicKey=PublicKey;var ECPublicKey=asn1.define("ECPublicKey",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("curve").objid()),this.key("subjectPrivateKey").bitstr())});exports.ECPublicKey=ECPublicKey;var ECPrivateWrap=asn1.define("ECPrivateWrap",function(){this.seq().obj(this.key("version")["int"](),this.key("algorithm").seq().obj(this.key("id").objid(),this.key("curve").objid()),this.key("subjectPrivateKey").octstr())});exports.ECPrivateWrap=ECPrivateWrap;var PrivateKeyInfo=asn1.define("PrivateKeyInfo",function(){this.seq().obj(this.key("version")["int"](),this.key("algorithm").use(rfc3280.AlgorithmIdentifier),this.key("subjectPrivateKey").octstr())});exports.PrivateKey=PrivateKeyInfo;var EncryptedPrivateKeyInfo=asn1.define("EncryptedPrivateKeyInfo",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters")["int"]())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())}),dsaParams=asn1.define("dsaParams",function(){this.seq().obj(this.key("algorithm").objid(),this.key("parameters").seq().obj(this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"]()))});exports.EncryptedPrivateKey=EncryptedPrivateKeyInfo;var DSAPublicKey=asn1.define("DSAPublicKey",function(){this.seq().obj(this.key("algorithm").use(dsaParams),this.key("subjectPublicKey").bitstr())});exports.DSAPublicKey=DSAPublicKey;var DSAPrivateWrap=asn1.define("DSAPrivateWrap",function(){this.seq().obj(this.key("version")["int"](),this.key("algorithm").seq().obj(this.key("id").objid(),this.key("parameters").seq().obj(this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"]())),this.key("subjectPrivateKey").octstr())});exports.DSAPrivateWrap=DSAPrivateWrap;var DSAPrivateKey=asn1.define("DSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"](),this.key("pub_key")["int"](),this.key("priv_key")["int"]())});exports.DSAPrivateKey=DSAPrivateKey,exports.DSAparam=asn1.define("DSAparam",function(){this["int"]()});var ECPrivateKey=asn1.define("ECPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(ECParameters),this.key("publicKey").optional().explicit(1).bitstr())});exports.ECPrivateKey=ECPrivateKey;var ECParameters=asn1.define("ECParameters",function(){this.choice({namedCurve:this.objid()})}),ECPrivateKey2=asn1.define("ECPrivateKey2",function(){this.seq().obj(this.key("version")["int"](),this.key("privateKey").octstr(),this.key("publicKey").seq().obj(this.key("key").bitstr()))});exports.ECPrivateKey2=ECPrivateKey2,exports.signature=asn1.define("signature",function(){this.seq().obj(this.key("r")["int"](),this.key("s")["int"]())});


},{"asn1.js":70,"asn1.js-rfc3280":69}],67:[function(require,module,exports){
(function (Buffer){
function wrap(e){for(var r=[];e;){if(e.length<64){r.push(e);break}r.push(e.slice(0,64)),e=e.slice(64)}return r.join("\n")}var findProc=/Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m,startRegex=/^-----BEGIN (.*)-----\n/,evp=require("./EVP_BytesToKey");module.exports=function(e,r,n){var t=e.toString(),a=t.match(findProc);if(!a)return e;var i="aes"+a[1],c=new Buffer(a[2],"hex"),f=new Buffer(a[3].replace(/\n\r?/g,""),"base64"),s=evp(n,r,c.slice(0,8),parseInt(a[1])),u=[],o=n.createDecipheriv(i,s,c);u.push(o.update(f)),u.push(o["final"]());var p=Buffer.concat(u).toString("base64"),h=t.match(startRegex)[1];return"-----BEGIN "+h+"-----\n"+wrap(p)+"\n-----END "+h+"-----\n"};


}).call(this,require("buffer").Buffer)

},{"./EVP_BytesToKey":64,"buffer":17}],68:[function(require,module,exports){
(function (Buffer){
function parseKeys(e,r){var a;"object"!=typeof e||Buffer.isBuffer(e)||(a=e.passphrase,e=e.key),"string"==typeof e&&(e=new Buffer(e)),a&&(e=fixProc(e,a,r));var t,s,d=pemstrip.strip(e),i=d.tag,c=new Buffer(d.base64,"base64");switch(i){case"PUBLIC KEY":switch(s=asn1.PublicKey.decode(c,"der"),t=s.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPublicKey.decode(s.subjectPublicKey.data,"der");case"1.2.840.10045.2.1":return{type:"ec",data:asn1.ECPublicKey.decode(c,"der")};case"1.2.840.10040.4.1":return s=asn1.DSAPublicKey.decode(c,"der"),s.algorithm.parameters.pub_key=asn1.DSAparam.decode(s.subjectPublicKey.data,"der"),{type:"dsa",data:s.algorithm.parameters};default:throw new Error("unknown key id "+t)}throw new Error("unknown key type "+i);case"ENCRYPTED PRIVATE KEY":c=asn1.EncryptedPrivateKey.decode(c,"der"),c=decrypt(r,c,a);case"PRIVATE KEY":switch(s=asn1.PrivateKey.decode(c,"der"),t=s.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPrivateKey.decode(s.subjectPrivateKey,"der");case"1.2.840.10045.2.1":return s=asn1.ECPrivateWrap.decode(c,"der"),{curve:s.algorithm.curve,privateKey:asn1.ECPrivateKey.decode(s.subjectPrivateKey,"der").privateKey};case"1.2.840.10040.4.1":return s=asn1.DSAPrivateWrap.decode(c,"der"),s.algorithm.parameters.priv_key=asn1.DSAparam.decode(s.subjectPrivateKey,"der"),{type:"dsa",params:s.algorithm.parameters};default:throw new Error("unknown key id "+t)}throw new Error("unknown key type "+i);case"RSA PUBLIC KEY":return asn1.RSAPublicKey.decode(c,"der");case"RSA PRIVATE KEY":return asn1.RSAPrivateKey.decode(c,"der");case"DSA PRIVATE KEY":return{type:"dsa",params:asn1.DSAPrivateKey.decode(c,"der")};case"EC PRIVATE KEY":return c=asn1.ECPrivateKey.decode(c,"der"),{curve:c.parameters.value,privateKey:c.privateKey};default:throw new Error("unknown key type "+i)}}function decrypt(e,r,a){var t=r.algorithm.decrypt.kde.kdeparams.salt,s=r.algorithm.decrypt.kde.kdeparams.iters,d=aesid[r.algorithm.decrypt.cipher.algo.join(".")],i=r.algorithm.decrypt.cipher.iv,c=r.subjectPrivateKey,n=parseInt(d.split("-")[1],10)/8,o=e.pbkdf2Sync(a,t,s,n),p=e.createDecipheriv(d,o,i),u=[];return u.push(p.update(c)),u.push(p["final"]()),Buffer.concat(u)}var pemstrip=require("pemstrip"),asn1=require("./asn1"),aesid=require("./aesid.json"),fixProc=require("./fixProc");module.exports=parseKeys,parseKeys.signature=asn1.signature;


}).call(this,require("buffer").Buffer)

},{"./aesid.json":65,"./asn1":66,"./fixProc":67,"buffer":17,"pemstrip":83}],69:[function(require,module,exports){
try{var asn1=require("asn1.js")}catch(e){var asn1=require("../..")}var CRLReason=asn1.define("CRLReason",function(){this["enum"]({0:"unspecified",1:"keyCompromise",2:"CACompromise",3:"affiliationChanged",4:"superseded",5:"cessationOfOperation",6:"certificateHold",8:"removeFromCRL",9:"privilegeWithdrawn",10:"AACompromise"})});exports.CRLReason=CRLReason;var AlgorithmIdentifier=asn1.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("parameters").optional().any())});exports.AlgorithmIdentifier=AlgorithmIdentifier;var Certificate=asn1.define("Certificate",function(){this.seq().obj(this.key("tbsCertificate").use(TBSCertificate),this.key("signatureAlgorithm").use(AlgorithmIdentifier),this.key("signature").bitstr())});exports.Certificate=Certificate;var TBSCertificate=asn1.define("TBSCertificate",function(){this.seq().obj(this.key("version").def("v1").explicit(0).use(Version),this.key("serialNumber").use(CertificateSerialNumber),this.key("signature").use(AlgorithmIdentifier),this.key("issuer").use(Name),this.key("validity").use(Validity),this.key("subject").use(Name),this.key("subjectPublicKeyInfo").use(SubjectPublicKeyInfo),this.key("issuerUniqueID").optional().explicit(1).use(UniqueIdentifier),this.key("subjectUniqueID").optional().explicit(2).use(UniqueIdentifier),this.key("extensions").optional().explicit(3).use(Extensions))});exports.TBSCertificate=TBSCertificate;var Version=asn1.define("Version",function(){this["int"]({0:"v1",1:"v2",2:"v3"})});exports.Version=Version;var CertificateSerialNumber=asn1.define("CertificateSerialNumber",function(){this["int"]()});exports.CertificateSerialNumber=CertificateSerialNumber;var Validity=asn1.define("Validity",function(){this.seq().obj(this.key("notBefore").use(Time),this.key("notAfter").use(Time))});exports.Validity=Validity;var Time=asn1.define("Time",function(){this.choice({utcTime:this.utctime(),genTime:this.gentime()})});exports.Time=Time;var UniqueIdentifier=asn1.define("UniqueIdentifier",function(){this.bitstr()});exports.UniqueIdentifier=UniqueIdentifier;var SubjectPublicKeyInfo=asn1.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPublicKey").bitstr())});exports.SubjectPublicKeyInfo=SubjectPublicKeyInfo;var Extensions=asn1.define("Extensions",function(){this.seqof(Extension)});exports.Extensions=Extensions;var Extension=asn1.define("Extension",function(){this.seq().obj(this.key("extnID").objid(),this.key("critical").bool().def(!1),this.key("extnValue").octstr())});exports.Extension=Extension;var Name=asn1.define("Name",function(){this.choice({rdn:this.use(RDNSequence)})});exports.Name=Name;var RDNSequence=asn1.define("RDNSequence",function(){this.seqof(RelativeDistinguishedName)});exports.RDNSequence=RDNSequence;var RelativeDistinguishedName=asn1.define("RelativeDistinguishedName",function(){this.setof(AttributeTypeAndValue)});exports.RelativeDistinguishedName=RelativeDistinguishedName;var AttributeTypeAndValue=asn1.define("AttributeTypeAndValue",function(){this.seq().obj(this.key("type").use(AttributeType),this.key("value").use(AttributeValue))});exports.AttributeTypeAndValue=AttributeTypeAndValue;var AttributeType=asn1.define("AttributeType",function(){this.objid()});exports.AttributeType=AttributeType;var AttributeValue=asn1.define("AttributeValue",function(){this.any()});exports.AttributeValue=AttributeValue;


},{"../..":68,"asn1.js":70}],70:[function(require,module,exports){
var asn1=exports;asn1.bignum=require("bn.js"),asn1.define=require("./asn1/api").define,asn1.base=require("./asn1/base"),asn1.constants=require("./asn1/constants"),asn1.decoders=require("./asn1/decoders"),asn1.encoders=require("./asn1/encoders");


},{"./asn1/api":71,"./asn1/base":73,"./asn1/constants":77,"./asn1/decoders":79,"./asn1/encoders":81,"bn.js":42}],71:[function(require,module,exports){
function Entity(e,t){this.name=e,this.body=t,this.decoders={},this.encoders={}}var asn1=require("../asn1"),inherits=require("inherits"),vm=require("vm"),api=exports;api.define=function(e,t){return new Entity(e,t)},Entity.prototype._createNamed=function(e){var t=vm.runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})");return inherits(t,e),t.prototype._initNamed=function(t){e.call(this,t)},new t(this)},Entity.prototype._getDecoder=function(e){return this.decoders.hasOwnProperty(e)||(this.decoders[e]=this._createNamed(asn1.decoders[e])),this.decoders[e]},Entity.prototype.decode=function(e,t,n){return this._getDecoder(t).decode(e,n)},Entity.prototype._getEncoder=function(e){return this.encoders.hasOwnProperty(e)||(this.encoders[e]=this._createNamed(asn1.encoders[e])),this.encoders[e]},Entity.prototype.encode=function(e,t,n){return this._getEncoder(t).encode(e,n)};


},{"../asn1":70,"inherits":162,"vm":185}],72:[function(require,module,exports){
function DecoderBuffer(e,t){return Reporter.call(this,t),Buffer.isBuffer(e)?(this.base=e,this.offset=0,void(this.length=e.length)):void this.error("Input not Buffer")}function EncoderBuffer(e,t){if(Array.isArray(e))this.length=0,this.value=e.map(function(e){return e instanceof EncoderBuffer||(e=new EncoderBuffer(e,t)),this.length+=e.length,e},this);else if("number"==typeof e){if(!(e>=0&&255>=e))return t.error("non-byte EncoderBuffer value");this.value=e,this.length=1}else if("string"==typeof e)this.value=e,this.length=Buffer.byteLength(e);else{if(!Buffer.isBuffer(e))return t.error("Unsupported type: "+typeof e);this.value=e,this.length=e.length}}var inherits=require("inherits"),Reporter=require("../base").Reporter,Buffer=require("buffer").Buffer;inherits(DecoderBuffer,Reporter),exports.DecoderBuffer=DecoderBuffer,DecoderBuffer.prototype.save=function(){return{offset:this.offset}},DecoderBuffer.prototype.restore=function(e){var t=new DecoderBuffer(this.base);return t.offset=e.offset,t.length=this.offset,this.offset=e.offset,t},DecoderBuffer.prototype.isEmpty=function(){return this.offset===this.length},DecoderBuffer.prototype.readUInt8=function(e){return this.offset+1<=this.length?this.base.readUInt8(this.offset++,!0):this.error(e||"DecoderBuffer overrun")},DecoderBuffer.prototype.skip=function(e,t){if(!(this.offset+e<=this.length))return this.error(t||"DecoderBuffer overrun");var r=new DecoderBuffer(this.base);return r._reporterState=this._reporterState,r.offset=this.offset,r.length=this.offset+e,this.offset+=e,r},DecoderBuffer.prototype.raw=function(e){return this.base.slice(e?e.offset:this.offset,this.length)},exports.EncoderBuffer=EncoderBuffer,EncoderBuffer.prototype.join=function(e,t){return e||(e=new Buffer(this.length)),t||(t=0),0===this.length?e:(Array.isArray(this.value)?this.value.forEach(function(r){r.join(e,t),t+=r.length}):("number"==typeof this.value?e[t]=this.value:"string"==typeof this.value?e.write(this.value,t):Buffer.isBuffer(this.value)&&this.value.copy(e,t),t+=this.length),e)};


},{"../base":73,"buffer":17,"inherits":162}],73:[function(require,module,exports){
var base=exports;base.Reporter=require("./reporter").Reporter,base.DecoderBuffer=require("./buffer").DecoderBuffer,base.EncoderBuffer=require("./buffer").EncoderBuffer,base.Node=require("./node");


},{"./buffer":72,"./node":74,"./reporter":75}],74:[function(require,module,exports){
function Node(e,t){var r={};this._baseState=r,r.enc=e,r.parent=t||null,r.children=null,r.tag=null,r.args=null,r.reverseArgs=null,r.choice=null,r.optional=!1,r.any=!1,r.obj=!1,r.use=null,r.useDecoder=null,r.key=null,r["default"]=null,r.explicit=null,r.implicit=null,r.parent||(r.children=[],this._wrap())}var Reporter=require("../base").Reporter,EncoderBuffer=require("../base").EncoderBuffer,assert=require("minimalistic-assert"),tags=["seq","seqof","set","setof","octstr","bitstr","objid","bool","gentime","utctime","null_","enum","int","ia5str"],methods=["key","obj","use","optional","explicit","implicit","def","choice","any"].concat(tags),overrided=["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"];module.exports=Node;var stateProps=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit"];Node.prototype.clone=function(){var e=this._baseState,t={};stateProps.forEach(function(r){t[r]=e[r]});var r=new this.constructor(t.parent);return r._baseState=t,r},Node.prototype._wrap=function(){var e=this._baseState;methods.forEach(function(t){this[t]=function(){var r=new this.constructor(this);return e.children.push(r),r[t].apply(r,arguments)}},this)},Node.prototype._init=function(e){var t=this._baseState;assert(null===t.parent),e.call(this),t.children=t.children.filter(function(e){return e._baseState.parent===this},this),assert.equal(t.children.length,1,"Root node can have only one child")},Node.prototype._useArgs=function(e){var t=this._baseState,r=e.filter(function(e){return e instanceof this.constructor},this);e=e.filter(function(e){return!(e instanceof this.constructor)},this),0!==r.length&&(assert(null===t.children),t.children=r,r.forEach(function(e){e._baseState.parent=this},this)),0!==e.length&&(assert(null===t.args),t.args=e,t.reverseArgs=e.map(function(e){if("object"!=typeof e||e.constructor!==Object)return e;var t={};return Object.keys(e).forEach(function(r){r==(0|r)&&(r|=0);var i=e[r];t[i]=r}),t}))},overrided.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState;throw new Error(e+" not implemented for encoding: "+t.enc)}}),tags.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState,r=Array.prototype.slice.call(arguments);return assert(null===t.tag),t.tag=e,this._useArgs(r),this}}),Node.prototype.use=function(e){var t=this._baseState;return assert(null===t.use),t.use=e,this},Node.prototype.optional=function(){var e=this._baseState;return e.optional=!0,this},Node.prototype.def=function(e){var t=this._baseState;return assert(null===t["default"]),t["default"]=e,t.optional=!0,this},Node.prototype.explicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.explicit=e,this},Node.prototype.implicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.implicit=e,this},Node.prototype.obj=function(){var e=this._baseState,t=Array.prototype.slice.call(arguments);return e.obj=!0,0!==t.length&&this._useArgs(t),this},Node.prototype.key=function(e){var t=this._baseState;return assert(null===t.key),t.key=e,this},Node.prototype.any=function(){var e=this._baseState;return e.any=!0,this},Node.prototype.choice=function(e){var t=this._baseState;return assert(null===t.choice),t.choice=e,this._useArgs(Object.keys(e).map(function(t){return e[t]})),this},Node.prototype._decode=function(e){var t=this._baseState;if(null===t.parent)return e.wrapResult(t.children[0]._decode(e));var r,i=t["default"],o=!0;if(null!==t.key&&(r=e.enterKey(t.key)),t.optional&&(o=this._peekTag(e,null!==t.explicit?t.explicit:null!==t.implicit?t.implicit:t.tag||0),e.isError(o)))return o;var n;if(t.obj&&o&&(n=e.enterObject()),o){if(null!==t.explicit){var s=this._decodeTag(e,t.explicit);if(e.isError(s))return s;e=s}if(null===t.use&&null===t.choice){if(t.any)var a=e.save();var c=this._decodeTag(e,null!==t.implicit?t.implicit:t.tag,t.any);if(e.isError(c))return c;t.any?i=e.raw(a):e=c}if(i=t.any?i:null===t.choice?this._decodeGeneric(t.tag,e):this._decodeChoice(e),e.isError(i))return i;if(!t.any&&null===t.choice&&null!==t.children){var l=t.children.some(function(t){t._decode(e)});if(l)return err}}return t.obj&&o&&(i=e.leaveObject(n)),null===t.key||null===i&&o!==!0||e.leaveKey(r,t.key,i),i},Node.prototype._decodeGeneric=function(e,t){var r=this._baseState;return"seq"===e||"set"===e?null:"seqof"===e||"setof"===e?this._decodeList(t,e,r.args[0]):"octstr"===e||"bitstr"===e||"ia5str"===e?this._decodeStr(t,e):"objid"===e&&r.args?this._decodeObjid(t,r.args[0],r.args[1]):"objid"===e?this._decodeObjid(t,null,null):"gentime"===e||"utctime"===e?this._decodeTime(t,e):"null_"===e?this._decodeNull(t):"bool"===e?this._decodeBool(t):"int"===e||"enum"===e?this._decodeInt(t,r.args&&r.args[0]):null!==r.use?this._getUse(r.use,t._reporterState.obj)._decode(t):t.error("unknown tag: "+e)},Node.prototype._getUse=function(e,t){var r=this._baseState;return r.useDecoder=this._use(e,t),assert(null===r.useDecoder._baseState.parent),r.useDecoder=r.useDecoder._baseState.children[0],r.implicit!==r.useDecoder._baseState.implicit&&(r.useDecoder=r.useDecoder.clone(),r.useDecoder._baseState.implicit=r.implicit),r.useDecoder},Node.prototype._decodeChoice=function(e){var t=this._baseState,r=null,i=!1;return Object.keys(t.choice).some(function(o){var n=e.save(),s=t.choice[o];try{var a=s._decode(e);if(e.isError(a))return!1;r={type:o,value:a},i=!0}catch(c){return e.restore(n),!1}return!0},this),i?r:e.error("Choice not matched")},Node.prototype._createEncoderBuffer=function(e){return new EncoderBuffer(e,this.reporter)},Node.prototype._encode=function(e,t,r){var i=this._baseState;if(null===i["default"]||i["default"]!==e){var o=this._encodeValue(e,t,r);if(void 0!==o&&!this._skipDefault(o,t,r))return o}},Node.prototype._encodeValue=function(e,t,r){var i=this._baseState;if(null===i.parent)return i.children[0]._encode(e,t||new Reporter);var o=null;if(this.reporter=t,i.optional&&void 0===e){if(null===i["default"])return;e=i["default"]}var n=null,s=!1;if(i.any)o=this._createEncoderBuffer(e);else if(i.choice)o=this._encodeChoice(e,t);else if(i.children)n=i.children.map(function(r){if("null_"===r._baseState.tag)return r._encode(null,t,e);if(null===r._baseState.key)return t.error("Child should have a key");var i=t.enterKey(r._baseState.key);if("object"!=typeof e)return t.error("Child expected, but input is not object");var o=r._encode(e[r._baseState.key],t,e);return t.leaveKey(i),o},this).filter(function(e){return e}),n=this._createEncoderBuffer(n);else if("seqof"===i.tag||"setof"===i.tag){if(!i.args||1!==i.args.length)return t.error("Too many args for : "+i.tag);if(!Array.isArray(e))return t.error("seqof/setof, but data is not Array");var a=this.clone();a._baseState.implicit=null,n=this._createEncoderBuffer(e.map(function(r){var i=this._baseState;return this._getUse(i.args[0],e)._encode(r,t)},a))}else null!==i.use?o=this._getUse(i.use,r)._encode(e,t):(n=this._encodePrimitive(i.tag,e),s=!0);var o;if(!i.any&&null===i.choice){var c=null!==i.implicit?i.implicit:i.tag,l=null===i.implicit?"universal":"context";null===c?null===i.use&&t.error("Tag could be ommited only for .use()"):null===i.use&&(o=this._encodeComposite(c,s,l,n))}return null!==i.explicit&&(o=this._encodeComposite(i.explicit,!1,"context",o)),o},Node.prototype._encodeChoice=function(e,t){var r=this._baseState,i=r.choice[e.type];return i||assert(!1,e.type+" not found in "+JSON.stringify(Object.keys(r.choice))),i._encode(e.value,t)},Node.prototype._encodePrimitive=function(e,t){var r=this._baseState;if("octstr"===e||"bitstr"===e||"ia5str"===e)return this._encodeStr(t,e);if("objid"===e&&r.args)return this._encodeObjid(t,r.reverseArgs[0],r.args[1]);if("objid"===e)return this._encodeObjid(t,null,null);if("gentime"===e||"utctime"===e)return this._encodeTime(t,e);if("null_"===e)return this._encodeNull();if("int"===e||"enum"===e)return this._encodeInt(t,r.args&&r.reverseArgs[0]);if("bool"===e)return this._encodeBool(t);throw new Error("Unsupported tag: "+e)};


},{"../base":73,"minimalistic-assert":82}],75:[function(require,module,exports){
function Reporter(r){this._reporterState={obj:null,path:[],options:r||{},errors:[]}}function ReporterError(r,t){this.path=r,this.rethrow(t)}var inherits=require("inherits");exports.Reporter=Reporter,Reporter.prototype.isError=function(r){return r instanceof ReporterError},Reporter.prototype.enterKey=function(r){return this._reporterState.path.push(r)},Reporter.prototype.leaveKey=function(r,t,e){var o=this._reporterState;o.path=o.path.slice(0,r-1),null!==o.obj&&(o.obj[t]=e)},Reporter.prototype.enterObject=function(){var r=this._reporterState,t=r.obj;return r.obj={},t},Reporter.prototype.leaveObject=function(r){var t=this._reporterState,e=t.obj;return t.obj=r,e},Reporter.prototype.error=function(r){var t,e=this._reporterState,o=r instanceof ReporterError;if(t=o?r:new ReporterError(e.path.map(function(r){return"["+JSON.stringify(r)+"]"}).join(""),r.message||r,r.stack),!e.options.partial)throw t;return o||e.errors.push(t),t},Reporter.prototype.wrapResult=function(r){var t=this._reporterState;return t.options.partial?{result:this.isError(r)?null:r,errors:t.errors}:r},inherits(ReporterError,Error),ReporterError.prototype.rethrow=function(r){return this.message=r+" at: "+(this.path||"(shallow)"),Error.captureStackTrace(this,ReporterError),this};


},{"inherits":162}],76:[function(require,module,exports){
var constants=require("../constants");exports.tagClass={0:"universal",1:"application",2:"context",3:"private"},exports.tagClassByName=constants._reverse(exports.tagClass),exports.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},exports.tagByName=constants._reverse(exports.tag);


},{"../constants":77}],77:[function(require,module,exports){
var constants=exports;constants._reverse=function(r){var e={};return Object.keys(r).forEach(function(n){(0|n)==n&&(n=0|n);var t=r[n];e[t]=n}),e},constants.der=require("./der");


},{"./der":76}],78:[function(require,module,exports){
function DERDecoder(r){this.enc="der",this.name=r.name,this.entity=r,this.tree=new DERNode,this.tree._init(r.body)}function DERNode(r){base.Node.call(this,"der",r)}function derDecodeTag(r,e){var t=r.readUInt8(e);if(r.isError(t))return t;var i=der.tagClass[t>>6],o=0===(32&t);if(31===(31&t)){var n=t;for(t=0;128===(128&n);){if(n=r.readUInt8(e),r.isError(n))return n;t<<=7,t|=127&n}}else t&=31;var d=der.tag[t];return{cls:i,primitive:o,tag:t,tagStr:d}}function derDecodeLen(r,e,t){var i=r.readUInt8(t);if(r.isError(i))return i;if(!e&&128===i)return null;if(0===(128&i))return i;var o=127&i;if(o>=4)return r.error("length octect is too long");i=0;for(var n=0;o>n;n++){i<<=8;var d=r.readUInt8(t);if(r.isError(d))return d;i|=d}return i}var inherits=require("inherits"),asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DERDecoder,DERDecoder.prototype.decode=function(r,e){return r instanceof base.DecoderBuffer||(r=new base.DecoderBuffer(r,e)),this.tree._decode(r,e)},inherits(DERNode,base.Node),DERNode.prototype._peekTag=function(r,e){if(r.isEmpty())return!1;var t=r.save(),i=derDecodeTag(r,'Failed to peek tag: "'+e+'"');return r.isError(i)?i:(r.restore(t),i.tag===e||i.tagStr===e)},DERNode.prototype._decodeTag=function(r,e,t){var i=derDecodeTag(r,'Failed to decode tag of "'+e+'"');if(r.isError(i))return i;var o=derDecodeLen(r,i.primitive,'Failed to get length of "'+e+'"');if(r.isError(o))return o;if(!t&&i.tag!==e&&i.tagStr!==e&&i.tagStr+"of"!==e)return r.error('Failed to match tag: "'+e+'"');if(i.primitive||null!==o)return r.skip(o,'Failed to match body of: "'+e+'"');var n=r.start(),d=this._skipUntilEnd(r,'Failed to skip indefinite length body: "'+this.tag+'"');return r.isError(d)?d:r.cut(n)},DERNode.prototype._skipUntilEnd=function(r,e){for(;;){var t=derDecodeTag(r,e);if(r.isError(t))return t;var i=derDecodeLen(r,t.primitive,e);if(r.isError(i))return i;var o;if(o=t.primitive||null!==i?r.skip(i):this._skipUntilEnd(r,e),r.isError(o))return o;if("end"===t.tagStr)break}},DERNode.prototype._decodeList=function(r,e,t){for(var i=[];!r.isEmpty();){var o=this._peekTag(r,"end");if(r.isError(o))return o;var n=t.decode(r,"der");if(r.isError(n)&&o)break;i.push(n)}return i},DERNode.prototype._decodeStr=function(r,e){if("octstr"===e)return r.raw();if("bitstr"===e){var t=r.readUInt8();return r.isError(t)?t:{unused:t,data:r.raw()}}return"ia5str"===e?r.raw().toString():this.error("Decoding of string type: "+e+" unsupported")},DERNode.prototype._decodeObjid=function(r,e,t){for(var i=[],o=0;!r.isEmpty();){var n=r.readUInt8();o<<=7,o|=127&n,0===(128&n)&&(i.push(o),o=0)}128&n&&i.push(o);var d=i[0]/40|0,a=i[0]%40;return result=t?i:[d,a].concat(i.slice(1)),e&&(result=e[result.join(" ")]),result},DERNode.prototype._decodeTime=function(r,e){var t=r.raw().toString();if("gentime"===e)var i=0|t.slice(0,4),o=0|t.slice(4,6),n=0|t.slice(6,8),d=0|t.slice(8,10),a=0|t.slice(10,12),s=0|t.slice(12,14);else{if("utctime"!==e)return this.error("Decoding "+e+" time is not supported yet");var i=0|t.slice(0,2),o=0|t.slice(2,4),n=0|t.slice(4,6),d=0|t.slice(6,8),a=0|t.slice(8,10),s=0|t.slice(10,12);i=70>i?2e3+i:1900+i}return Date.UTC(i,o-1,n,d,a,s,0)},DERNode.prototype._decodeNull=function(){return null},DERNode.prototype._decodeBool=function(r){var e=r.readUInt8();return r.isError(e)?e:0!==e},DERNode.prototype._decodeInt=function(r,e){var t=0,i=r.raw();if(i.length>3)return new bignum(i);for(;!r.isEmpty();){t<<=8;var o=r.readUInt8();if(r.isError(o))return o;t|=o}return e&&(t=e[t]||t),t},DERNode.prototype._use=function(r,e){return"function"==typeof r&&(r=r(e)),r._getDecoder("der").tree};


},{"../../asn1":70,"inherits":162}],79:[function(require,module,exports){
var decoders=exports;decoders.der=require("./der");


},{"./der":78}],80:[function(require,module,exports){
function DEREncoder(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new DERNode,this.tree._init(e.body)}function DERNode(e){base.Node.call(this,"der",e)}function two(e){return 10>=e?"0"+e:e}function encodeTag(e,r,t,n){var o;if("seqof"===e?e="seq":"setof"===e&&(e="set"),der.tagByName.hasOwnProperty(e))o=der.tagByName[e];else{if("number"!=typeof e||(0|e)!==e)return n.error("Unknown tag: "+e);o=e}return o>=31?n.error("Multi-octet tag encoding unsupported"):(r||(o|=32),o|=der.tagClassByName[t||"universal"]<<6)}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DEREncoder,DEREncoder.prototype.encode=function(e,r){return this.tree._encode(e,r).join()},inherits(DERNode,base.Node),DERNode.prototype._encodeComposite=function(e,r,t,n){var o=encodeTag(e,r,t,this.reporter);if(n.length<128){var i=new Buffer(2);return i[0]=o,i[1]=n.length,this._createEncoderBuffer([i,n])}for(var f=1,u=n.length;u>=256;u>>=8)f++;var i=new Buffer(2+f);i[0]=o,i[1]=128|f;for(var u=1+f,s=n.length;s>0;u--,s>>=8)i[u]=255&s;return this._createEncoderBuffer([i,n])},DERNode.prototype._encodeStr=function(e,r){return"octstr"===r?this._createEncoderBuffer(e):"bitstr"===r?this._createEncoderBuffer([0|e.unused,e.data]):"ia5str"===r?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: "+r+" unsupported")},DERNode.prototype._encodeObjid=function(e,r,t){if("string"==typeof e){if(!r)return this.reporter.error("string objid given, but no values map found");if(!r.hasOwnProperty(e))return this.reporter.error("objid not found in values map");e=r[e].split(/\s+/g);for(var n=0;n<e.length;n++)e[n]|=0}else Array.isArray(e)&&(e=e.slice());if(!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: "+JSON.stringify(e));if(!t){if(e[1]>=40)return this.reporter.error("Second objid identifier OOB");e.splice(0,2,40*e[0]+e[1])}for(var o=0,n=0;n<e.length;n++){var i=e[n];for(o++;i>=128;i>>=7)o++}for(var f=new Buffer(o),u=f.length-1,n=e.length-1;n>=0;n--){var i=e[n];for(f[u--]=127&i;(i>>=7)>0;)f[u--]=128|127&i}return this._createEncoderBuffer(f)},DERNode.prototype._encodeTime=function(e,r){var t,n=new Date(e);return"gentime"===r?t=[n.getFullYear(),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):"utctime"===r?t=[n.getFullYear()%100,two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):this.reporter.error("Encoding "+r+" time is not supported yet"),this._encodeStr(t,"octstr")},DERNode.prototype._encodeNull=function(){return this._createEncoderBuffer("")},DERNode.prototype._encodeInt=function(e,r){if("string"==typeof e){if(!r)return this.reporter.error("String int or enum given, but no values map");if(!r.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: "+JSON.stringify(e));e=r[e]}if(null!==bignum&&e instanceof bignum){var t=e.toArray();e.sign===!1&&128&t[0]&&t.unshift(0),e=new Buffer(t)}if(Buffer.isBuffer(e)){var n=e.length;0===e.length&&n++;var o=new Buffer(n);return e.copy(o),0===e.length&&(o[0]=0),this._createEncoderBuffer(o)}if(128>e)return this._createEncoderBuffer(e);if(256>e)return this._createEncoderBuffer([0,e]);for(var n=1,i=e;i>=256;i>>=8)n++;for(var o=new Array(n),i=o.length-1;i>=0;i--)o[i]=255&e,e>>=8;return 128&o[0]&&o.unshift(0),this._createEncoderBuffer(new Buffer(o))},DERNode.prototype._encodeBool=function(e){return this._createEncoderBuffer(e?255:0)},DERNode.prototype._use=function(e,r){return"function"==typeof e&&(e=e(r)),e._getEncoder("der").tree},DERNode.prototype._skipDefault=function(e,r,t){var n,o=this._baseState;if(null===o["default"])return!1;var i=e.join();if(void 0===o.defaultBuffer&&(o.defaultBuffer=this._encodeValue(o["default"],r,t).join()),i.length!==o.defaultBuffer.length)return!1;for(n=0;n<i.length;n++)if(i[n]!==o.defaultBuffer[n])return!1;return!0};


},{"../../asn1":70,"buffer":17,"inherits":162}],81:[function(require,module,exports){
var encoders=exports;encoders.der=require("./der");


},{"./der":80}],82:[function(require,module,exports){
function assert(r,e){if(!r)throw new Error(e||"Assertion failed")}module.exports=assert,assert.equal=function(r,e,s){if(r!=e)throw new Error(s||"Assertion failed: "+r+" != "+e)};


},{}],83:[function(require,module,exports){
exports.strip=function(n){n=n.toString();var r=/^-----BEGIN (.*)-----\n/,e=r.exec(n),t=e[1],a=new RegExp("\n-----END "+t+"-----(\n*)$"),s=n.slice(e[0].length).replace(a,"").replace(/\n/g,"");return{tag:t,base64:s}};var wrap=function(n,r){for(var e=[];n;){if(n.length<r){e.push(n);break}e.push(n.substr(0,r)),n=n.substr(r)}return e.join("\n")};exports.assemble=function(n){var r=n.tag,e=n.base64,t="-----BEGIN "+r+"-----",a="-----END "+r+"-----";return t+"\n"+wrap(e,64)+"\n"+a+"\n"};


},{}],84:[function(require,module,exports){
(function (Buffer){
function sign(e,t,r,n){var a=parseKeys(t,n);if(a.curve)return ecSign(e,a,n);if("dsa"===a.type)return dsaSign(e,a,r,n);for(var i=a.modulus.byteLength(),u=[0,1];e.length+u.length+1<i;)u.push(255);u.push(0);for(var f=-1;++f<e.length;)u.push(e[f]);var c=crt(u,a,n);return c}function ecSign(e,t,r){elliptic.rand=r.randomBytes;var n;"1.3.132.0.10"===t.curve.join(".")&&(n=new elliptic.ec("secp256k1"));var a=n.genKeyPair();a._importPrivate(t.privateKey);var i=a.sign(e);return new Buffer(i.toDER())}function dsaSign(e,t,r,n){for(var a,i=t.params.priv_key,u=t.params.p,f=t.params.q,c=(bn.mont(f),t.params.g),o=new bn(0),s=bits2int(e,f).mod(f),g=!1,d=getKay(i,f,e,r,n);g===!1;)a=makeKey(f,d,r,n),o=makeR(c,a,u,f),g=a.invm(f).imul(s.add(i.mul(o))).mod(f),g.cmpn(0)||(g=!1,o=new bn(0));return toDER(o,g)}function toDER(e,t){e=e.toArray(),t=t.toArray(),128&e[0]&&(e=[0].concat(e)),128&t[0]&&(t=[0].concat(t));var r=e.length+t.length+4,n=[48,r,2,e.length];return n=n.concat(e,[2,t.length],t),new Buffer(n)}function getKay(e,t,r,n,a){if(e=new Buffer(e.toArray()),e.length<t.byteLength()){var i=new Buffer(t.byteLength()-e.length);i.fill(0),e=Buffer.concat([i,e])}var u=r.length,f=bits2octets(r,t),c=new Buffer(u);c.fill(1);var o=new Buffer(u);return o.fill(0),o=a.createHmac(n,o).update(c).update(new Buffer([0])).update(e).update(f).digest(),c=a.createHmac(n,o).update(c).digest(),o=a.createHmac(n,o).update(c).update(new Buffer([1])).update(e).update(f).digest(),c=a.createHmac(n,o).update(c).digest(),{k:o,v:c}}function bits2int(e,t){bits=new bn(e);var r=8*e.length-t.bitLength();return r>0&&bits.ishrn(r),bits}function bits2octets(e,t){e=bits2int(e,t),e=e.mod(t);var r=new Buffer(e.toArray());if(r.length<t.byteLength()){var n=new Buffer(t.byteLength()-r.length);n.fill(0),r=Buffer.concat([n,r])}return r}function makeKey(e,t,r,n){for(var a,i;;){for(a=new Buffer("");8*a.length<e.bitLength();)t.v=n.createHmac(r,t.k).update(t.v).digest(),a=Buffer.concat([a,t.v]);if(i=bits2int(a,e),t.k=n.createHmac(r,t.k).update(t.v).update(new Buffer([0])).digest(),t.v=n.createHmac(r,t.k).update(t.v).digest(),-1===i.cmp(e))return i}}function makeR(e,t,r,n){return e.toRed(bn.mont(r)).redPow(t).fromRed().mod(n)}var parseKeys=require("parse-asn1"),bn=require("bn.js"),elliptic=require("elliptic"),crt=require("browserify-rsa");module.exports=sign,module.exports.getKay=getKay,module.exports.makeKey=makeKey;


}).call(this,require("buffer").Buffer)

},{"bn.js":42,"browserify-rsa":43,"buffer":17,"elliptic":44,"parse-asn1":68}],85:[function(require,module,exports){
(function (Buffer){
function verify(e,r,n){var t=parseKeys(n);if("ec"===t.type)return ecVerify(e,r,t);if("dsa"===t.type)return dsaVerify(e,r,t);for(var a=t.modulus.byteLength(),i=[0,1];r.length+i.length+1<a;)i.push(255);i.push(0);for(var o=-1;++o<r.length;)i.push(r[o]);i=r;var u=bn.mont(t.modulus);e=new bn(e).toRed(u),e=e.redPow(new bn(t.publicExponent)),e=new Buffer(e.fromRed().toArray()),e=e.slice(e.length-r.length);var d=0;for(a=e.length,o=-1;++o<a;)d+=e[o]^r[o];return!d}function ecVerify(e,r,n){var t;"1.3.132.0.10"===n.data.algorithm.curve.join(".")&&(t=new elliptic.ec("secp256k1"));var a=n.data.subjectPrivateKey.data;return t.verify(r.toString("hex"),e.toString("hex"),a.toString("hex"))}function dsaVerify(e,r,n){var t=n.data.p,a=n.data.q,i=n.data.g,o=n.data.pub_key,u=parseKeys.signature.decode(e,"der"),d=u.s,c=u.r;checkValue(d,a),checkValue(c,a);var l=(bn.mont(a),bn.mont(t)),s=d.invm(a),f=i.toRed(l).redPow(new bn(r).mul(s).mod(a)).fromRed().mul(o.toRed(l).redPow(c.mul(s).mod(a)).fromRed()).mod(t).mod(a);return!f.cmp(c)}function checkValue(e,r){if(e.cmpn(0)<=0)throw new Error("invalid sig");if(e.cmp(r)>=r)throw new Error("invalid sig")}var parseKeys=require("parse-asn1"),elliptic=require("elliptic"),bn=require("bn.js");module.exports=verify;


}).call(this,require("buffer").Buffer)

},{"bn.js":42,"buffer":17,"elliptic":44,"parse-asn1":68}],86:[function(require,module,exports){
(function (Buffer){
function ECDH(e){this.curveType=aliases[e],this.curveType||(this.curveType={name:e}),this.curve=new elliptic.ec(this.curveType.name),this.keys=void 0}function formatReturnValue(e,t,r){Array.isArray(e)||(e=e.toArray());var i=new Buffer(e);if(r&&i.length<r){var n=new Buffer(r-i.length);n.fill(0),i=Buffer.concat([n,i])}return t?i.toString(t):i}var elliptic=require("elliptic"),BN=require("bn.js");module.exports=function(e){return new ECDH(e)};var aliases={secp256k1:{name:"secp256k1",byteLength:32},secp224r1:{name:"p224",byteLength:28},prime256v1:{name:"p256",byteLength:32},prime192v1:{name:"p192",byteLength:24},ed25519:{name:"ed25519",byteLength:32}};aliases.p224=aliases.secp224r1,aliases.p256=aliases.secp256r1=aliases.prime256v1,aliases.p192=aliases.secp192r1=aliases.prime192v1,ECDH.prototype.generateKeys=function(e,t){return this.keys=this.curve.genKeyPair(),this.getPublicKey(e,t)},ECDH.prototype.computeSecret=function(e,t,r){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t)),e=new BN(e),e=e.toString(16);var i=this.curve.keyPair(e,"hex").getPublic(),n=i.mul(this.keys.getPrivate()).getX();return formatReturnValue(n,r,this.curveType.byteLength)},ECDH.prototype.getPublicKey=function(e,t){var r=this.keys.getPublic("compressed"===t,!0);return"hybrid"===t&&(r[0]=r[r.length-1]%2?7:6),formatReturnValue(r,e)},ECDH.prototype.getPrivateKey=function(e){return formatReturnValue(this.keys.getPrivate(),e)},ECDH.prototype.setPublicKey=function(e,t){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));var r=new BN(e);return r=r.toArray(),this.keys._importPublicHex(r),this},ECDH.prototype.setPrivateKey=function(e,t){t=t||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,t));var r=new BN(e);return r=r.toString(16),this.keys._importPrivate(r),this};


}).call(this,require("buffer").Buffer)

},{"bn.js":88,"buffer":17,"elliptic":89}],87:[function(require,module,exports){
var createECDH=require("crypto").createECDH;module.exports=createECDH||require("./browser");


},{"./browser":86,"crypto":21}],88:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function n(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function s(t,i,r){return null!==t&&"object"==typeof t&&Array.isArray(t.words)?t:(this.sign=!1,this.words=null,this.length=0,this.red=null,("le"===i||"be"===i)&&(r=i,i=10),void(null!==t&&this._init(t||0,i||10,r||"be")))}function h(t,i,r){for(var n=0,s=Math.min(t.length,r),h=i;s>h;h++){var e=t.charCodeAt(h)-48;n<<=4,n|=e>=49&&54>=e?e-49+10:e>=17&&22>=e?e-17+10:15&e}return n}function e(t,i,r,n){for(var s=0,h=Math.min(t.length,r),e=i;h>e;e++){var o=t.charCodeAt(e)-48;s*=n,s+=o>=49?o-49+10:o>=17?o-17+10:o}return s}function o(t,i){this.name=t,this.p=new s(i,16),this.n=this.p.bitLength(),this.k=new s(1).ishln(this.n).isub(this.p),this.tmp=this._tmp()}function f(){o.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function d(){o.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function u(){o.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function l(){o.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function p(t){if("string"==typeof t){var i=s._prime(t);this.m=i.p,this.prime=i}else this.m=t,this.prime=null}function g(t){p.call(this,t),this.shift=this.m.bitLength(),this.shift%26!==0&&(this.shift+=26-this.shift%26),this.r=new s(1).ishln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r.invm(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv.sign=!0,this.minv=this.minv.mod(this.r)}"object"==typeof t?t.exports=s:i.BN=s,s.BN=s,s.wordSize=26,s.prototype._init=function(t,i,n){if("number"==typeof t)return 0>t&&(this.sign=!0,t=-t),void(67108864>t?(this.words=[67108863&t],this.length=1):(this.words=[67108863&t,t/67108864&67108863],this.length=2));if("object"==typeof t)return this._initArray(t,i,n);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&36>=i),t=t.toString().replace(/\s+/g,"");var s=0;"-"===t[0]&&s++,16===i?this._parseHex(t,s):this._parseBase(t,i,s),"-"===t[0]&&(this.sign=!0),this.strip()},s.prototype._initArray=function(t,i,n){r("number"==typeof t.length),this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var s=0;s<this.length;s++)this.words[s]=0;var h=0;if("be"===n)for(var s=t.length-1,e=0;s>=0;s-=3){var o=t[s]|t[s-1]<<8|t[s-2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}else if("le"===n)for(var s=0,e=0;s<t.length;s+=3){var o=t[s]|t[s+1]<<8|t[s+2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}return this.strip()},s.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;for(var n=0,r=t.length-6,s=0;r>=i;r-=6){var e=h(t,r,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303,n+=24,n>=26&&(n-=26,s++)}if(r+6!==i){var e=h(t,i,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303}this.strip()},s.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var n=0,s=1;67108863>=s;s*=i)n++;n--,s=s/i|0;for(var h=t.length-r,o=h%n,f=Math.min(h,h-o)+r,d=0,u=r;f>u;u+=n)d=e(t,u,u+n,i),this.imuln(s),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d);if(0!==o){for(var l=1,d=e(t,u,t.length,i),u=0;o>u;u++)l*=i;this.imuln(l),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d)}},s.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.sign=this.sign,t.red=this.red},s.prototype.clone=function(){var t=new s(null);return this.copy(t),t},s.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},s.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.sign=!1),this},s.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var a=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],c=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],m=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];s.prototype.toString=function(t,i){if(t=t||10,16===t||"hex"===t){for(var n="",s=0,i=0|i||1,h=0,e=0;e<this.length;e++){var o=this.words[e],f=(16777215&(o<<s|h)).toString(16);h=o>>>24-s&16777215,n=0!==h||e!==this.length-1?a[6-f.length]+f+n:f+n,s+=2,s>=26&&(s-=26,e--)}for(0!==h&&(n=h.toString(16)+n);n.length%i!==0;)n="0"+n;return this.sign&&(n="-"+n),n}if(t===(0|t)&&t>=2&&36>=t){var d=c[t],u=m[t],n="",l=this.clone();for(l.sign=!1;0!==l.cmpn(0);){var p=l.modn(u).toString(t);l=l.idivn(u),n=0!==l.cmpn(0)?a[d-p.length]+p+n:p+n}return 0===this.cmpn(0)&&(n="0"+n),this.sign&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},s.prototype.toJSON=function(){return this.toString(16)},s.prototype.toArray=function(){this.strip();var t=new Array(this.byteLength());t[0]=0;for(var i=this.clone(),r=0;0!==i.cmpn(0);r++){var n=i.andln(255);i.ishrn(8),t[t.length-r-1]=n}return t},s.prototype._countBits=function(t){return t>=33554432?26:t>=16777216?25:t>=8388608?24:t>=4194304?23:t>=2097152?22:t>=1048576?21:t>=524288?20:t>=262144?19:t>=131072?18:t>=65536?17:t>=32768?16:t>=16384?15:t>=8192?14:t>=4096?13:t>=2048?12:t>=1024?11:t>=512?10:t>=256?9:t>=128?8:t>=64?7:t>=32?6:t>=16?5:t>=8?4:t>=4?3:t>=2?2:t>=1?1:0},s.prototype.bitLength=function(){var t=0,i=this.words[this.length-1],t=this._countBits(i);return 26*(this.length-1)+t},s.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},s.prototype.neg=function(){if(0===this.cmpn(0))return this.clone();var t=this.clone();return t.sign=!this.sign,t},s.prototype.ior=function(t){for(this.sign=this.sign||t.sign;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},s.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},s.prototype.iand=function(t){this.sign=this.sign&&t.sign;var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},s.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},s.prototype.ixor=function(t){this.sign=this.sign||t.sign;var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var n=0;n<r.length;n++)this.words[n]=i.words[n]^r.words[n];if(this!==i)for(;n<i.length;n++)this.words[n]=i.words[n];return this.length=i.length,this.strip()},s.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},s.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);for(var n=t/26|0,s=t%26;this.length<=n;)this.words[this.length++]=0;return this.words[n]=i?this.words[n]|1<<s:this.words[n]&~(1<<s),this.strip()},s.prototype.iadd=function(t){if(this.sign&&!t.sign){this.sign=!1;var i=this.isub(t);return this.sign=!this.sign,this._normSign()}if(!this.sign&&t.sign){t.sign=!1;var i=this.isub(t);return t.sign=!0,i._normSign()}var r,n;this.length>t.length?(r=this,n=t):(r=t,n=this);for(var s=0,h=0;h<n.length;h++){var i=r.words[h]+n.words[h]+s;this.words[h]=67108863&i,s=i>>>26}for(;0!==s&&h<r.length;h++){var i=r.words[h]+s;this.words[h]=67108863&i,s=i>>>26}if(this.length=r.length,0!==s)this.words[this.length]=s,this.length++;else if(r!==this)for(;h<r.length;h++)this.words[h]=r.words[h];return this},s.prototype.add=function(t){if(t.sign&&!this.sign){t.sign=!1;var i=this.sub(t);return t.sign=!0,i}if(!t.sign&&this.sign){this.sign=!1;var i=t.sub(this);return this.sign=!0,i}return this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},s.prototype.isub=function(t){if(t.sign){t.sign=!1;var i=this.iadd(t);return t.sign=!0,i._normSign()}if(this.sign)return this.sign=!1,this.iadd(t),this.sign=!0,this._normSign();var r=this.cmp(t);if(0===r)return this.sign=!1,this.length=1,this.words[0]=0,this;var n,s;r>0?(n=this,s=t):(n=t,s=this);for(var h=0,e=0;e<s.length;e++){var i=n.words[e]-s.words[e]+h;h=i>>26,this.words[e]=67108863&i}for(;0!==h&&e<n.length;e++){var i=n.words[e]+h;h=i>>26,this.words[e]=67108863&i}if(0===h&&e<n.length&&n!==this)for(;e<n.length;e++)this.words[e]=n.words[e];return this.length=Math.max(this.length,e),n!==this&&(this.sign=!0),this.strip()},s.prototype.sub=function(t){return this.clone().isub(t)},s.prototype._smallMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0;n<i.length-1;n++){for(var s=r>>>26,h=67108863&r,e=Math.min(n,t.length-1),o=Math.max(0,n-this.length+1);e>=o;o++){var f=n-o,d=0|this.words[f],u=0|t.words[o],l=d*u,p=67108863&l;s=s+(l/67108864|0)|0,p=p+h|0,h=67108863&p,s=s+(p>>>26)|0}i.words[n]=h,r=s}return 0!==r?i.words[n]=r:i.length--,i.strip()},s.prototype._bigMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0,s=0;s<i.length-1;s++){var h=n;n=0;for(var e=67108863&r,o=Math.min(s,t.length-1),f=Math.max(0,s-this.length+1);o>=f;f++){var d=s-f,u=0|this.words[d],l=0|t.words[f],p=u*l,g=67108863&p;h=h+(p/67108864|0)|0,g=g+e|0,e=67108863&g,h=h+(g>>>26)|0,n+=h>>>26,h&=67108863}i.words[s]=e,r=h,h=n}return 0!==r?i.words[s]=r:i.length--,i.strip()},s.prototype.mulTo=function(t,i){var r;return r=this.length+t.length<63?this._smallMulTo(t,i):this._bigMulTo(t,i)},s.prototype.mul=function(t){var i=new s(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},s.prototype.imul=function(t){if(0===this.cmpn(0)||0===t.cmpn(0))return this.words[0]=0,this.length=1,this;var i=this.length,r=t.length;this.sign=t.sign!==this.sign,this.length=this.length+t.length,this.words[this.length-1]=0;for(var n=this.length-2;n>=0;n--){for(var s=0,h=0,e=Math.min(n,r-1),o=Math.max(0,n-i+1);e>=o;o++){var f=n-o,d=this.words[f],u=t.words[o],l=d*u,p=67108863&l;s+=l/67108864|0,p+=h,h=67108863&p,s+=p>>>26}this.words[n]=h,this.words[n+1]+=s,s=0}for(var s=0,f=1;f<this.length;f++){var g=this.words[f]+s;this.words[f]=67108863&g,s=g>>>26}return this.strip()},s.prototype.imuln=function(t){r("number"==typeof t);for(var i=0,n=0;n<this.length;n++){var s=this.words[n]*t,h=(67108863&s)+(67108863&i);i>>=26,i+=s/67108864|0,i+=h>>>26,this.words[n]=67108863&h}return 0!==i&&(this.words[n]=i,this.length++),this},s.prototype.sqr=function(){return this.mul(this)},s.prototype.isqr=function(){return this.mul(this)},s.prototype.ishln=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=67108863>>>26-i<<26-i;if(0!==i){for(var h=0,e=0;e<this.length;e++){var o=this.words[e]&s,f=this.words[e]-o<<i;this.words[e]=f|h,h=o>>>26-i}h&&(this.words[e]=h,this.length++)}if(0!==n){for(var e=this.length-1;e>=0;e--)this.words[e+n]=this.words[e];for(var e=0;n>e;e++)this.words[e]=0;this.length+=n}return this.strip()},s.prototype.ishrn=function(t,i,n){r("number"==typeof t&&t>=0),i=i?(i-i%26)/26:0;var s=t%26,h=Math.min((t-s)/26,this.length),e=67108863^67108863>>>s<<s,o=n;if(i-=h,i=Math.max(0,i),o){for(var f=0;h>f;f++)o.words[f]=this.words[f];o.length=h}if(0===h);else if(this.length>h){this.length-=h;for(var f=0;f<this.length;f++)this.words[f]=this.words[f+h]}else this.words[0]=0,this.length=1;for(var d=0,f=this.length-1;f>=0&&(0!==d||f>=i);f--){var u=this.words[f];this.words[f]=d<<26-s|u>>>s,d=u&e}return o&&0!==d&&(o.words[o.length++]=d),0===this.length&&(this.words[0]=0,this.length=1),this.strip(),n?{hi:this,lo:o}:this},s.prototype.shln=function(t){return this.clone().ishln(t)},s.prototype.shrn=function(t){return this.clone().ishrn(t)},s.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n)return!1;var h=this.words[n];return!!(h&s)},s.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26;if(r(!this.sign,"imaskn works only with positive numbers"),0!==i&&n++,this.length=Math.min(n,this.length),0!==i){var s=67108863^67108863>>>i<<i;this.words[this.length-1]&=s}return this.strip()},s.prototype.maskn=function(t){return this.clone().imaskn(t)},s.prototype.iaddn=function(t){return r("number"==typeof t),0>t?this.isubn(-t):this.sign?1===this.length&&this.words[0]<t?(this.words[0]=t-this.words[0],this.sign=!1,this):(this.sign=!1,this.isubn(t),this.sign=!0,this):this._iaddn(t)},s.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},s.prototype.isubn=function(t){if(r("number"==typeof t),0>t)return this.iaddn(-t);if(this.sign)return this.sign=!1,this.iaddn(t),this.sign=!0,this;this.words[0]-=t;for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},s.prototype.addn=function(t){return this.clone().iaddn(t)},s.prototype.subn=function(t){return this.clone().isubn(t)},s.prototype.iabs=function(){return this.sign=!1,this},s.prototype.abs=function(){return this.clone().iabs()},s.prototype._ishlnsubmul=function(t,i,n){var s,h=t.length+n;if(this.words.length<h){for(var e=new Array(h),s=0;s<this.length;s++)e[s]=this.words[s];this.words=e}else s=this.length;for(this.length=Math.max(this.length,h);s<this.length;s++)this.words[s]=0;for(var o=0,s=0;s<t.length;s++){var f=this.words[s+n]+o,d=t.words[s]*i;f-=67108863&d,o=(f>>26)-(d/67108864|0),this.words[s+n]=67108863&f}for(;s<this.length-n;s++){var f=this.words[s+n]+o;o=f>>26,this.words[s+n]=67108863&f}if(0===o)return this.strip();r(-1===o),o=0;for(var s=0;s<this.length;s++){var f=-this.words[s]+o;o=f>>26,this.words[s]=67108863&f}return this.sign=!0,this.strip()},s.prototype._wordDiv=function(t,i){for(var r=this.length-t.length,n=this.clone(),h=t,e=h.words[h.length-1],r=0;33554432>e;r++)e<<=1;0!==r&&(h=h.shln(r),n.ishln(r),e=h.words[h.length-1]);var o,f=n.length-h.length;if("mod"!==i){o=new s(null),o.length=f+1,o.words=new Array(o.length);for(var d=0;d<o.length;d++)o.words[d]=0}var u=n.clone()._ishlnsubmul(h,1,f);u.sign||(n=u,o&&(o.words[f]=1));for(var l=f-1;l>=0;l--){var p=67108864*n.words[h.length+l]+n.words[h.length+l-1];for(p=Math.min(p/e|0,67108863),n._ishlnsubmul(h,p,l);n.sign;)p--,n.sign=!1,n._ishlnsubmul(h,1,l),n.sign=!n.sign;o&&(o.words[l]=p)}return o&&o.strip(),n.strip(),"div"!==i&&0!==r&&n.ishrn(r),{div:o?o:null,mod:n}},s.prototype.divmod=function(t,i){if(r(0!==t.cmpn(0)),this.sign&&!t.sign){var n,h,e=this.neg().divmod(t,i);return"mod"!==i&&(n=e.div.neg()),"div"!==i&&(h=0===e.mod.cmpn(0)?e.mod:t.sub(e.mod)),{div:n,mod:h}}if(!this.sign&&t.sign){var n,e=this.divmod(t.neg(),i);return"mod"!==i&&(n=e.div.neg()),{div:n,mod:e.mod}}return this.sign&&t.sign?this.neg().divmod(t.neg(),i):t.length>this.length||this.cmp(t)<0?{div:new s(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new s(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new s(this.modn(t.words[0]))}:this._wordDiv(t,i)},s.prototype.div=function(t){return this.divmod(t,"div").div},s.prototype.mod=function(t){return this.divmod(t,"mod").mod},s.prototype.divRound=function(t){var i=this.divmod(t);if(0===i.mod.cmpn(0))return i.div;var r=i.div.sign?i.mod.isub(t):i.mod,n=t.shrn(1),s=t.andln(1),h=r.cmp(n);return 0>h||1===s&&0===h?i.div:i.div.sign?i.div.isubn(1):i.div.iaddn(1)},s.prototype.modn=function(t){r(67108863>=t);for(var i=(1<<26)%t,n=0,s=this.length-1;s>=0;s--)n=(i*n+this.words[s])%t;return n},s.prototype.idivn=function(t){r(67108863>=t);for(var i=0,n=this.length-1;n>=0;n--){var s=this.words[n]+67108864*i;this.words[n]=s/t|0,i=s%t}return this.strip()},s.prototype.divn=function(t){return this.clone().idivn(t)},s.prototype._egcd=function(t,i){r(!i.sign),r(0!==i.cmpn(0));var n=this,h=i.clone();n=n.sign?n.mod(i):n.clone();for(var e=new s(0);h.isEven();)h.ishrn(1);for(var o=h.clone();n.cmpn(1)>0&&h.cmpn(1)>0;){for(;n.isEven();)n.ishrn(1),t.isEven()?t.ishrn(1):t.iadd(o).ishrn(1);for(;h.isEven();)h.ishrn(1),e.isEven()?e.ishrn(1):e.iadd(o).ishrn(1);n.cmp(h)>=0?(n.isub(h),t.isub(e)):(h.isub(n),e.isub(t))}return 0===n.cmpn(1)?t:e},s.prototype.gcd=function(t){if(0===this.cmpn(0))return t.clone();if(0===t.cmpn(0))return this.clone();var i=this.clone(),r=t.clone();i.sign=!1,r.sign=!1;for(var n=0;i.isEven()&&r.isEven();n++)i.ishrn(1),r.ishrn(1);for(;i.isEven();)i.ishrn(1);do{for(;r.isEven();)r.ishrn(1);if(i.cmp(r)<0){var s=i;i=r,r=s}i.isub(i.div(r).mul(r))}while(0!==i.cmpn(0)&&0!==r.cmpn(0));return 0===i.cmpn(0)?r.ishln(n):i.ishln(n)},s.prototype.invm=function(t){return this._egcd(new s(1),t).mod(t)},s.prototype.isEven=function(){return 0===(1&this.words[0])},s.prototype.isOdd=function(){return 1===(1&this.words[0])},s.prototype.andln=function(t){return this.words[0]&t},s.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n){for(var h=this.length;n+1>h;h++)this.words[h]=0;return this.words[n]|=s,this.length=n+1,this}for(var e=s,h=n;0!==e&&h<this.length;h++){var o=this.words[h];o+=e,e=o>>>26,o&=67108863,this.words[h]=o}return 0!==e&&(this.words[h]=e,this.length++),this},s.prototype.cmpn=function(t){var i=0>t;if(i&&(t=-t),this.sign&&!i)return-1;if(!this.sign&&i)return 1;t&=67108863,this.strip();var r;if(this.length>1)r=1;else{var n=this.words[0];r=n===t?0:t>n?-1:1}return this.sign&&(r=-r),r},s.prototype.cmp=function(t){if(this.sign&&!t.sign)return-1;if(!this.sign&&t.sign)return 1;var i=this.ucmp(t);return this.sign?-i:i},s.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var n=this.words[r],s=t.words[r];if(n!==s){s>n?i=-1:n>s&&(i=1);break}}return i},s.red=function(t){return new p(t)},s.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(!this.sign,"red works only with positives"),t.convertTo(this)._forceRed(t)},s.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},s.prototype._forceRed=function(t){return this.red=t,this},s.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},s.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},s.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},s.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},s.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},s.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},s.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},s.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},s.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},s.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},s.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},s.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},s.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},s.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var w={k256:null,p224:null,p192:null,p25519:null};o.prototype._tmp=function(){var t=new s(null);return t.words=new Array(Math.ceil(this.n/13)),t},o.prototype.ireduce=function(t){var i,r=t;do{var n=r.ishrn(this.n,0,this.tmp);r=this.imulK(n.hi),r=r.iadd(n.lo),i=r.bitLength()}while(i>this.n);var s=i<this.n?-1:r.cmp(this.p);return 0===s?(r.words[0]=0,r.length=1):s>0?r.isub(this.p):r.strip(),r},o.prototype.imulK=function(t){return t.imul(this.k)},n(f,o),f.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i,r=0,n=0;n<t.length;n++){var s=t.words[n];i=64*s,r+=977*s,i+=r/67108864|0,r&=67108863,t.words[n]=r,r=i}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},n(d,o),n(u,o),n(l,o),l.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var n=19*t.words[r]+i,s=67108863&n;n>>>=26,t.words[r]=s,i=n}return 0!==i&&(t.words[t.length++]=i),t},s._prime=function v(t){if(w[t])return w[t];var v;if("k256"===t)v=new f;else if("p224"===t)v=new d;else if("p192"===t)v=new u;else{if("p25519"!==t)throw new Error("Unknown prime "+t);v=new l}return w[t]=v,v},p.prototype._verify1=function(t){r(!t.sign,"red works only with positives"),r(t.red,"red works only with red numbers")},p.prototype._verify2=function(t,i){r(!t.sign&&!i.sign,"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},p.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.mod(this.m)._forceRed(this)},p.prototype.neg=function(t){var i=t.clone();return i.sign=!i.sign,i.iadd(this.m)._forceRed(this)},p.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},p.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},p.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},p.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},p.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.shln(i))},p.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},p.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},p.prototype.isqr=function(t){return this.imul(t,t)},p.prototype.sqr=function(t){return this.mul(t,t)},p.prototype.sqrt=function(t){if(0===t.cmpn(0))return t.clone();var i=this.m.andln(3);if(r(i%2===1),3===i){var n=this.m.add(new s(1)).ishrn(2),h=this.pow(t,n);return h}for(var e=this.m.subn(1),o=0;0!==e.cmpn(0)&&0===e.andln(1);)o++,e.ishrn(1);r(0!==e.cmpn(0));var f=new s(1).toRed(this),d=f.redNeg(),u=this.m.subn(1).ishrn(1),l=this.m.bitLength();for(l=new s(2*l*l).toRed(this);0!==this.pow(l,u).cmp(d);)l.redIAdd(d);for(var p=this.pow(l,e),h=this.pow(t,e.addn(1).ishrn(1)),g=this.pow(t,e),a=o;0!==g.cmp(f);){for(var c=g,m=0;0!==c.cmp(f);m++)c=c.redSqr();r(a>m);var w=this.pow(p,new s(1).ishln(a-m-1));h=h.redMul(w),p=w.redSqr(),g=g.redMul(p),a=m}return h},p.prototype.invm=function(t){var i=t._egcd(new s(1),this.m);return i.sign?(i.sign=!1,this.imod(i).redNeg()):this.imod(i)},p.prototype.pow=function(t,i){for(var r=[],n=i.clone();0!==n.cmpn(0);)r.push(n.andln(1)),n.ishrn(1);for(var s=t,h=0;h<r.length&&0===r[h];h++,s=this.sqr(s));if(++h<r.length)for(var n=this.sqr(s);h<r.length;h++,n=this.sqr(n))0!==r[h]&&(s=this.mul(s,n));return s},p.prototype.convertTo=function(t){return t.clone()},p.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},s.mont=function(t){return new g(t)},n(g,p),g.prototype.convertTo=function(t){return this.imod(t.shln(this.shift))},g.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},g.prototype.imul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return t.words[0]=0,t.length=1,t;var r=t.imul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),s=r.isub(n).ishrn(this.shift),h=s;return s.cmp(this.m)>=0?h=s.isub(this.m):s.cmpn(0)<0&&(h=s.iadd(this.m)),h._forceRed(this)},g.prototype.mul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return new s(0)._forceRed(this);var r=t.mul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),h=r.isub(n).ishrn(this.shift),e=h;return h.cmp(this.m)>=0?e=h.isub(this.m):h.cmpn(0)<0&&(e=h.iadd(this.m)),e._forceRed(this)},g.prototype.invm=function(t){var i=this.imod(t.invm(this.m).mul(this.r2));return i._forceRed(this)}}("undefined"==typeof module||module,this);


},{}],89:[function(require,module,exports){
var elliptic=exports;elliptic.version=require("../package.json").version,elliptic.utils=require("./elliptic/utils"),elliptic.rand=require("brorand"),elliptic.hmacDRBG=require("./elliptic/hmac-drbg"),elliptic.curve=require("./elliptic/curve"),elliptic.curves=require("./elliptic/curves"),elliptic.ec=require("./elliptic/ec");


},{"../package.json":108,"./elliptic/curve":92,"./elliptic/curves":95,"./elliptic/ec":96,"./elliptic/hmac-drbg":99,"./elliptic/utils":100,"brorand":101}],90:[function(require,module,exports){
function BaseCurve(t,e){this.type=t,this.p=new bn(e.p,16),this.red=e.prime?bn.red(e.prime):bn.mont(this.p),this.zero=new bn(0).toRed(this.red),this.one=new bn(1).toRed(this.red),this.two=new bn(2).toRed(this.red),this.n=e.n&&new bn(e.n,16),this.g=e.g&&this.pointFromJSON(e.g,e.gRed),this._wnafT1=new Array(4),this._wnafT2=new Array(4),this._wnafT3=new Array(4),this._wnafT4=new Array(4)}function BasePoint(t,e){this.curve=t,this.type=e,this.precomputed=null}var bn=require("bn.js"),elliptic=require("../../elliptic"),getNAF=elliptic.utils.getNAF,getJSF=elliptic.utils.getJSF,assert=elliptic.utils.assert;module.exports=BaseCurve,BaseCurve.prototype.point=function(){throw new Error("Not implemented")},BaseCurve.prototype.validate=function(){throw new Error("Not implemented")},BaseCurve.prototype._fixedNafMul=function(t,e){var n=t._getDoubles(),r=getNAF(e,1),i=(1<<n.step+1)-(n.step%2===0?2:1);i/=3;for(var o=[],s=0;s<r.length;s+=n.step){for(var a=0,e=s+n.step-1;e>=s;e--)a=(a<<1)+r[e];o.push(a)}for(var l=this.jpoint(null,null,null),p=this.jpoint(null,null,null),u=i;u>0;u--){for(var s=0;s<o.length;s++){var a=o[s];a===u?p=p.mixedAdd(n.points[s]):a===-u&&(p=p.mixedAdd(n.points[s].neg()))}l=l.add(p)}return l.toP()},BaseCurve.prototype._wnafMul=function(t,e){var n=4,r=t._getNAFPoints(n);n=r.wnd;for(var i=r.points,o=getNAF(e,n),s=this.jpoint(null,null,null),a=o.length-1;a>=0;a--){for(var e=0;a>=0&&0===o[a];a--)e++;if(a>=0&&e++,s=s.dblp(e),0>a)break;var l=o[a];assert(0!==l),s="affine"===t.type?s.mixedAdd(l>0?i[l-1>>1]:i[-l-1>>1].neg()):s.add(l>0?i[l-1>>1]:i[-l-1>>1].neg())}return"affine"===t.type?s.toP():s},BaseCurve.prototype._wnafMulAdd=function(t,e,n,r){for(var i=this._wnafT1,o=this._wnafT2,s=this._wnafT3,a=0,l=0;r>l;l++){var p=e[l],u=p._getNAFPoints(t);i[l]=u.wnd,o[l]=u.points}for(var l=r-1;l>=1;l-=2){var d=l-1,h=l;if(1===i[d]&&1===i[h]){var f=[e[d],null,null,e[h]];0===e[d].y.cmp(e[h].y)?(f[1]=e[d].add(e[h]),f[2]=e[d].toJ().mixedAdd(e[h].neg())):0===e[d].y.cmp(e[h].y.redNeg())?(f[1]=e[d].toJ().mixedAdd(e[h]),f[2]=e[d].add(e[h].neg())):(f[1]=e[d].toJ().mixedAdd(e[h]),f[2]=e[d].toJ().mixedAdd(e[h].neg()));var v=[-3,-1,-5,-7,0,7,5,1,3],g=getJSF(n[d],n[h]);a=Math.max(g[0].length,a),s[d]=new Array(a),s[h]=new Array(a);for(var c=0;a>c;c++){var m=0|g[0][c],w=0|g[1][c];s[d][c]=v[3*(m+1)+(w+1)],s[h][c]=0,o[d]=f}}else s[d]=getNAF(n[d],i[d]),s[h]=getNAF(n[h],i[h]),a=Math.max(s[d].length,a),a=Math.max(s[h].length,a)}for(var b=this.jpoint(null,null,null),y=this._wnafT4,l=a;l>=0;l--){for(var A=0;l>=0;){for(var _=!0,c=0;r>c;c++)y[c]=0|s[c][l],0!==y[c]&&(_=!1);if(!_)break;A++,l--}if(l>=0&&A++,b=b.dblp(A),0>l)break;for(var c=0;r>c;c++){var p,B=y[c];0!==B&&(B>0?p=o[c][B-1>>1]:0>B&&(p=o[c][-B-1>>1].neg()),b="affine"===p.type?b.mixedAdd(p):b.add(p))}}for(var l=0;r>l;l++)o[l]=null;return b.toP()},BaseCurve.BasePoint=BasePoint,BasePoint.prototype.validate=function(){return this.curve.validate(this)},BasePoint.prototype.precompute=function(t){if(this.precomputed)return this;var e={doubles:null,naf:null,beta:null};return e.naf=this._getNAFPoints(8),e.doubles=this._getDoubles(4,t),e.beta=this._getBeta(),this.precomputed=e,this},BasePoint.prototype._getDoubles=function(t,e){if(this.precomputed&&this.precomputed.doubles)return this.precomputed.doubles;for(var n=[this],r=this,i=0;e>i;i+=t){for(var o=0;t>o;o++)r=r.dbl();n.push(r)}return{step:t,points:n}},BasePoint.prototype._getNAFPoints=function(t){if(this.precomputed&&this.precomputed.naf)return this.precomputed.naf;for(var e=[this],n=(1<<t)-1,r=1===n?null:this.dbl(),i=1;n>i;i++)e[i]=e[i-1].add(r);return{wnd:t,points:e}},BasePoint.prototype._getBeta=function(){return null},BasePoint.prototype.dblp=function(t){for(var e=this,n=0;t>n;n++)e=e.dbl();return e};


},{"../../elliptic":89,"bn.js":88}],91:[function(require,module,exports){
function EdwardsCurve(t){this.twisted=1!=t.a,this.mOneA=this.twisted&&-1==t.a,this.extended=this.mOneA,Base.call(this,"mont",t),this.a=new bn(t.a,16).mod(this.red.m).toRed(this.red),this.c=new bn(t.c,16).toRed(this.red),this.c2=this.c.redSqr(),this.d=new bn(t.d,16).toRed(this.red),this.dd=this.d.redAdd(this.d),assert(!this.twisted||0===this.c.fromRed().cmpn(1)),this.oneC=1==t.c}function Point(t,e,r,i,d){Base.BasePoint.call(this,t,"projective"),null===e&&null===r&&null===i?(this.x=this.curve.zero,this.y=this.curve.one,this.z=this.curve.one,this.t=this.curve.zero,this.zOne=!0):(this.x=new bn(e,16),this.y=new bn(r,16),this.z=i?new bn(i,16):this.curve.one,this.t=d&&new bn(d,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.t&&!this.t.red&&(this.t=this.t.toRed(this.curve.red)),this.zOne=this.z===this.curve.one,this.curve.extended&&!this.t&&(this.t=this.x.redMul(this.y),this.zOne||(this.t=this.t.redMul(this.z.redInvm()))))}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(EdwardsCurve,Base),module.exports=EdwardsCurve,EdwardsCurve.prototype._mulA=function(t){return this.mOneA?t.redNeg():this.a.redMul(t)},EdwardsCurve.prototype._mulC=function(t){return this.oneC?t:this.c.redMul(t)},EdwardsCurve.prototype.point=function(t,e,r,i){return new Point(this,t,e,r,i)},EdwardsCurve.prototype.jpoint=function(t,e,r,i){return this.point(t,e,r,i)},EdwardsCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},EdwardsCurve.prototype.pointFromX=function(t,e){e=new bn(e,16),e.red||(e=e.toRed(this.red));var r=e.redSqr(),i=this.c2.redSub(this.a.redMul(r)),d=this.one.redSub(this.c2.redMul(this.d).redMul(r)),s=i.redMul(d.redInvm()).redSqrt(),u=s.fromRed().isOdd();return(t&&!u||!t&&u)&&(s=s.redNeg()),this.point(e,s,curve.one)},EdwardsCurve.prototype.validate=function(t){if(t.isInfinity())return!0;t.normalize();var e=t.x.redSqr(),r=t.y.redSqr(),i=e.redMul(this.a).redAdd(r),d=this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));return 0===i.cmp(d)},inherits(Point,Base.BasePoint),Point.fromJSON=function(t,e){return new Point(t,e[0],e[1],e[2])},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.x.cmpn(0)&&0===this.y.cmp(this.z)},Point.prototype._extDbl=function(){var t=this.x.redSqr(),e=this.y.redSqr(),r=this.z.redSqr();r=r.redIAdd(r);var i=this.curve._mulA(t),d=this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),s=i.redAdd(e),u=s.redSub(r),n=i.redSub(e),h=d.redMul(u),o=s.redMul(n),l=d.redMul(n),c=u.redMul(s);return this.curve.point(h,o,c,l)},Point.prototype._projDbl=function(){var t=this.x.redAdd(this.y).redSqr(),e=this.x.redSqr(),r=this.y.redSqr();if(this.curve.twisted){var i=this.curve._mulA(e),d=i.redAdd(r);if(this.zOne)var s=t.redSub(e).redSub(r).redMul(d.redSub(this.curve.two)),u=d.redMul(i.redSub(r)),n=d.redSqr().redSub(d).redSub(d);else var h=this.z.redSqr(),o=d.redSub(h).redISub(h),s=t.redSub(e).redISub(r).redMul(o),u=d.redMul(i.redSub(r)),n=d.redMul(o)}else var i=e.redAdd(r),h=this.curve._mulC(redMul(this.z)).redSqr(),o=i.redSub(h).redSub(h),s=this.curve._mulC(t.redISub(i)).redMul(o),u=this.curve._mulC(i).redMul(e.redISub(r)),n=i.redMul(o);return this.curve.point(s,u,n)},Point.prototype.dbl=function(){return this.isInfinity()?this:this.curve.extended?this._extDbl():this._projDbl()},Point.prototype._extAdd=function(t){var e=this.y.redSub(this.x).redMul(t.y.redSub(t.x)),r=this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),i=this.t.redMul(this.curve.dd).redMul(t.t),d=this.z.redMul(t.z.redAdd(t.z)),s=r.redSub(e),u=d.redSub(i),n=d.redAdd(i),h=r.redAdd(e),o=s.redMul(u),l=n.redMul(h),c=s.redMul(h),p=u.redMul(n);return this.curve.point(o,l,p,c)},Point.prototype._projAdd=function(t){var e=this.z.redMul(t.z),r=e.redSqr(),i=this.x.redMul(t.x),d=this.y.redMul(t.y),s=this.curve.d.redMul(i).redMul(d),u=r.redSub(s),n=r.redAdd(s),h=this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(i).redISub(d),o=e.redMul(u).redMul(h);if(this.curve.twisted)var l=e.redMul(n).redMul(d.redSub(this.curve._mulA(i))),c=u.redMul(n);else var l=e.redMul(n).redMul(d.redSub(i)),c=this.curve._mulC(u).redMul(n);return this.curve.point(o,l,c)},Point.prototype.add=function(t){return this.isInfinity()?t:t.isInfinity()?this:this.curve.extended?this._extAdd(t):this._projAdd(t)},Point.prototype.mul=function(t){return this.precomputed&&this.precomputed.doubles?this.curve._fixedNafMul(this,t):this.curve._wnafMul(this,t)},Point.prototype.mulAdd=function(t,e,r){return this.curve._wnafMulAdd(1,[this,e],[t,r],2)},Point.prototype.normalize=function(){if(this.zOne)return this;var t=this.z.redInvm();return this.x=this.x.redMul(t),this.y=this.y.redMul(t),this.t&&(this.t=this.t.redMul(t)),this.z=this.curve.one,this.zOne=!0,this},Point.prototype.neg=function(){return this.curve.point(this.x.redNeg(),this.y,this.z,this.t&&this.t.redNeg())},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()},Point.prototype.getY=function(){return this.normalize(),this.y.fromRed()},Point.prototype.toP=Point.prototype.normalize,Point.prototype.mixedAdd=Point.prototype.add;


},{"../../elliptic":89,"../curve":92,"bn.js":88,"inherits":162}],92:[function(require,module,exports){
var curve=exports;curve.base=require("./base"),curve["short"]=require("./short"),curve.mont=require("./mont"),curve.edwards=require("./edwards");


},{"./base":90,"./edwards":91,"./mont":93,"./short":94}],93:[function(require,module,exports){
function MontCurve(t){Base.call(this,"mont",t),this.a=new bn(t.a,16).toRed(this.red),this.b=new bn(t.b,16).toRed(this.red),this.i4=new bn(4).toRed(this.red).redInvm(),this.two=new bn(2).toRed(this.red),this.a24=this.i4.redMul(this.a.redAdd(this.two))}function Point(t,e,r){Base.BasePoint.call(this,t,"projective"),null===e&&null===r?(this.x=this.curve.one,this.z=this.curve.zero):(this.x=new bn(e,16),this.z=new bn(r,16),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)))}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(MontCurve,Base),module.exports=MontCurve,MontCurve.prototype.point=function(t,e){return new Point(this,t,e)},MontCurve.prototype.pointFromJSON=function(t){return Point.fromJSON(this,t)},MontCurve.prototype.validate=function(t){var e=t.normalize().x,r=e.redSqr(),i=r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e),n=i.redSqrt();return 0===n.redSqr().cmp(i)},inherits(Point,Base.BasePoint),Point.prototype.precompute=function(){},Point.fromJSON=function(t,e){return new Point(t,e[0],e[1]||t.one)},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" z: "+this.z.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return 0===this.z.cmpn(0)},Point.prototype.dbl=function(){var t=this.x.redAdd(this.z),e=t.redSqr(),r=this.x.redSub(this.z),i=r.redSqr(),n=e.redSub(i),o=e.redMul(i),d=n.redMul(i.redAdd(this.curve.a24.redMul(n)));return this.curve.point(o,d)},Point.prototype.add=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.diffAdd=function(t,e){var r=this.x.redAdd(this.z),i=this.x.redSub(this.z),n=t.x.redAdd(t.z),o=t.x.redSub(t.z),d=o.redMul(r),s=n.redMul(i),u=e.z.redMul(d.redAdd(s).redSqr()),h=e.x.redMul(d.redISub(s).redSqr());return this.curve.point(u,h)},Point.prototype.mul=function(t){for(var e=t.clone(),r=this,i=this.curve.point(null,null),n=this,o=[];0!==e.cmpn(0);e.ishrn(1))o.push(e.andln(1));for(var d=o.length-1;d>=0;d--)0===o[d]?(r=r.diffAdd(i,n),i=i.dbl()):(i=r.diffAdd(i,n),r=r.dbl());return i},Point.prototype.mulAdd=function(){throw new Error("Not supported on Montgomery curve")},Point.prototype.normalize=function(){return this.x=this.x.redMul(this.z.redInvm()),this.z=this.curve.one,this},Point.prototype.getX=function(){return this.normalize(),this.x.fromRed()};


},{"../../elliptic":89,"../curve":92,"bn.js":88,"inherits":162}],94:[function(require,module,exports){
function ShortCurve(r){Base.call(this,"short",r),this.a=new bn(r.a,16).toRed(this.red),this.b=new bn(r.b,16).toRed(this.red),this.tinv=this.two.redInvm(),this.zeroA=0===this.a.fromRed().cmpn(0),this.threeA=0===this.a.fromRed().sub(this.p).cmpn(-3),this.endo=this._getEndomorphism(r),this._endoWnafT1=new Array(4),this._endoWnafT2=new Array(4)}function Point(r,e,t,d){Base.BasePoint.call(this,r,"affine"),null===e&&null===t?(this.x=null,this.y=null,this.inf=!0):(this.x=new bn(e,16),this.y=new bn(t,16),d&&(this.x.forceRed(this.curve.red),this.y.forceRed(this.curve.red)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.inf=!1)}function JPoint(r,e,t,d){Base.BasePoint.call(this,r,"jacobian"),null===e&&null===t&&null===d?(this.x=this.curve.one,this.y=this.curve.one,this.z=new bn(0)):(this.x=new bn(e,16),this.y=new bn(t,16),this.z=new bn(d,16)),this.x.red||(this.x=this.x.toRed(this.curve.red)),this.y.red||(this.y=this.y.toRed(this.curve.red)),this.z.red||(this.z=this.z.toRed(this.curve.red)),this.zOne=this.z===this.curve.one}var curve=require("../curve"),elliptic=require("../../elliptic"),bn=require("bn.js"),inherits=require("inherits"),Base=curve.base,getNAF=elliptic.utils.getNAF,assert=elliptic.utils.assert;inherits(ShortCurve,Base),module.exports=ShortCurve,ShortCurve.prototype._getEndomorphism=function(r){if(this.zeroA&&this.g&&this.n&&1===this.p.modn(3)){var e,t;if(r.beta)e=new bn(r.beta,16).toRed(this.red);else{var d=this._getEndoRoots(this.p);e=d[0].cmp(d[1])<0?d[0]:d[1],e=e.toRed(this.red)}if(r.lambda)t=new bn(r.lambda,16);else{var i=this._getEndoRoots(this.n);0===this.g.mul(i[0]).x.cmp(this.g.x.redMul(e))?t=i[0]:(t=i[1],assert(0===this.g.mul(t).x.cmp(this.g.x.redMul(e))))}var n;return n=r.basis?r.basis.map(function(r){return{a:new bn(r.a,16),b:new bn(r.b,16)}}):this._getEndoBasis(t),{beta:e,lambda:t,basis:n}}},ShortCurve.prototype._getEndoRoots=function(r){var e=r===this.p?this.red:bn.mont(r),t=new bn(2).toRed(e).redInvm(),d=t.redNeg(),i=(new bn(1).toRed(e),new bn(3).toRed(e).redNeg().redSqrt().redMul(t)),n=d.redAdd(i).fromRed(),s=d.redSub(i).fromRed();return[n,s]},ShortCurve.prototype._getEndoBasis=function(r){for(var e,t,d,i,n,s,u,o=this.n.shrn(Math.floor(this.n.bitLength()/2)),h=r,l=this.n.clone(),p=new bn(1),a=new bn(0),b=new bn(0),f=new bn(1),c=0;0!==h.cmpn(0);){var S=l.div(h),v=l.sub(S.mul(h)),I=b.sub(S.mul(p)),y=f.sub(S.mul(a));if(!d&&v.cmp(o)<0)e=u.neg(),t=p,d=v.neg(),i=I;else if(d&&2===++c)break;u=v,l=h,h=v,b=p,p=I,f=a,a=y}n=v.neg(),s=I;var A=d.sqr().add(i.sqr()),m=n.sqr().add(s.sqr());return m.cmp(A)>=0&&(n=e,s=t),d.sign&&(d=d.neg(),i=i.neg()),n.sign&&(n=n.neg(),s=s.neg()),[{a:d,b:i},{a:n,b:s}]},ShortCurve.prototype._endoSplit=function(r){var e=this.endo.basis,t=e[0],d=e[1],i=d.b.mul(r).divRound(this.n),n=t.b.neg().mul(r).divRound(this.n),s=i.mul(t.a),u=n.mul(d.a),o=i.mul(t.b),h=n.mul(d.b),l=r.sub(s).sub(u),p=o.add(h).neg();return{k1:l,k2:p}},ShortCurve.prototype.point=function(r,e,t){return new Point(this,r,e,t)},ShortCurve.prototype.pointFromX=function(r,e){e=new bn(e,16),e.red||(e=e.toRed(this.red));var t=e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),d=t.redSqrt(),i=d.fromRed().isOdd();return(r&&!i||!r&&i)&&(d=d.redNeg()),this.point(e,d)},ShortCurve.prototype.jpoint=function(r,e,t){return new JPoint(this,r,e,t)},ShortCurve.prototype.pointFromJSON=function(r,e){return Point.fromJSON(this,r,e)},ShortCurve.prototype.validate=function(r){if(r.inf)return!0;var e=r.x,t=r.y,d=this.a.redMul(e),i=e.redSqr().redMul(e).redIAdd(d).redIAdd(this.b);return 0===t.redSqr().redISub(i).cmpn(0)},ShortCurve.prototype._endoWnafMulAdd=function(r,e){for(var t=this._endoWnafT1,d=this._endoWnafT2,i=0;i<r.length;i++){var n=this._endoSplit(e[i]),s=r[i],u=s._getBeta();n.k1.sign&&(n.k1.sign=!n.k1.sign,s=s.neg(!0)),n.k2.sign&&(n.k2.sign=!n.k2.sign,u=u.neg(!0)),t[2*i]=s,t[2*i+1]=u,d[2*i]=n.k1,d[2*i+1]=n.k2}for(var o=this._wnafMulAdd(1,t,d,2*i),h=0;2*i>h;h++)t[h]=null,d[h]=null;return o},inherits(Point,Base.BasePoint),Point.prototype._getBeta=function(){function r(r){return d.point(r.x.redMul(d.endo.beta),r.y)}if(this.curve.endo){var e=this.precomputed;if(e&&e.beta)return e.beta;var t=this.curve.point(this.x.redMul(this.curve.endo.beta),this.y);if(e){var d=this.curve;e.beta=t,t.precomputed={beta:null,naf:e.naf&&{wnd:e.naf.wnd,points:e.naf.points.map(r)},doubles:e.doubles&&{step:e.doubles.step,points:e.doubles.points.map(r)}}}return t}},Point.prototype.toJSON=function(){return this.precomputed?[this.x,this.y,this.precomputed&&{doubles:this.precomputed.doubles&&{step:this.precomputed.doubles.step,points:this.precomputed.doubles.points.slice(1)},naf:this.precomputed.naf&&{wnd:this.precomputed.naf.wnd,points:this.precomputed.naf.points.slice(1)}}]:[this.x,this.y]},Point.fromJSON=function(r,e,t){function d(e){return r.point(e[0],e[1],t)}"string"==typeof e&&(e=JSON.parse(e));var i=r.point(e[0],e[1],t);if(!e[2])return i;var n=e[2];return i.precomputed={beta:null,doubles:n.doubles&&{step:n.doubles.step,points:[i].concat(n.doubles.points.map(d))},naf:n.naf&&{wnd:n.naf.wnd,points:[i].concat(n.naf.points.map(d))}},i},Point.prototype.inspect=function(){return this.isInfinity()?"<EC Point Infinity>":"<EC Point x: "+this.x.fromRed().toString(16,2)+" y: "+this.y.fromRed().toString(16,2)+">"},Point.prototype.isInfinity=function(){return this.inf},Point.prototype.add=function(r){if(this.inf)return r;if(r.inf)return this;if(this.eq(r))return this.dbl();if(this.neg().eq(r))return this.curve.point(null,null);if(0===this.x.cmp(r.x))return this.curve.point(null,null);var e=this.y.redSub(r.y);0!==e.cmpn(0)&&(e=e.redMul(this.x.redSub(r.x).redInvm()));var t=e.redSqr().redISub(this.x).redISub(r.x),d=e.redMul(this.x.redSub(t)).redISub(this.y);return this.curve.point(t,d)},Point.prototype.dbl=function(){if(this.inf)return this;var r=this.y.redAdd(this.y);if(0===r.cmpn(0))return this.curve.point(null,null);var e=this.curve.a,t=this.x.redSqr(),d=r.redInvm(),i=t.redAdd(t).redIAdd(t).redIAdd(e).redMul(d),n=i.redSqr().redISub(this.x.redAdd(this.x)),s=i.redMul(this.x.redSub(n)).redISub(this.y);return this.curve.point(n,s)},Point.prototype.getX=function(){return this.x.fromRed()},Point.prototype.getY=function(){return this.y.fromRed()},Point.prototype.mul=function(r){return r=new bn(r,16),this.precomputed&&this.precomputed.doubles?this.curve._fixedNafMul(this,r):this.curve.endo?this.curve._endoWnafMulAdd([this],[r]):this.curve._wnafMul(this,r)},Point.prototype.mulAdd=function(r,e,t){var d=[this,e],i=[r,t];return this.curve.endo?this.curve._endoWnafMulAdd(d,i):this.curve._wnafMulAdd(1,d,i,2)},Point.prototype.eq=function(r){return this===r||this.inf===r.inf&&(this.inf||0===this.x.cmp(r.x)&&0===this.y.cmp(r.y))},Point.prototype.neg=function(r){function e(r){return r.neg()}if(this.inf)return this;var t=this.curve.point(this.x,this.y.redNeg());if(r&&this.precomputed){var d=this.precomputed;t.precomputed={naf:d.naf&&{wnd:d.naf.wnd,points:d.naf.points.map(e)},doubles:d.doubles&&{step:d.doubles.step,points:d.doubles.points.map(e)}}}return t},Point.prototype.toJ=function(){if(this.inf)return this.curve.jpoint(null,null,null);var r=this.curve.jpoint(this.x,this.y,this.curve.one);return r},inherits(JPoint,Base.BasePoint),JPoint.prototype.toP=function(){if(this.isInfinity())return this.curve.point(null,null);var r=this.z.redInvm(),e=r.redSqr(),t=this.x.redMul(e),d=this.y.redMul(e).redMul(r);return this.curve.point(t,d)},JPoint.prototype.neg=function(){return this.curve.jpoint(this.x,this.y.redNeg(),this.z)},JPoint.prototype.add=function(r){if(this.isInfinity())return r;if(r.isInfinity())return this;var e=r.z.redSqr(),t=this.z.redSqr(),d=this.x.redMul(e),i=r.x.redMul(t),n=this.y.redMul(e.redMul(r.z)),s=r.y.redMul(t.redMul(this.z)),u=d.redSub(i),o=n.redSub(s);if(0===u.cmpn(0))return 0!==o.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var h=u.redSqr(),l=h.redMul(u),p=d.redMul(h),a=o.redSqr().redIAdd(l).redISub(p).redISub(p),b=o.redMul(p.redISub(a)).redISub(n.redMul(l)),f=this.z.redMul(r.z).redMul(u);return this.curve.jpoint(a,b,f)},JPoint.prototype.mixedAdd=function(r){if(this.isInfinity())return r.toJ();if(r.isInfinity())return this;var e=this.z.redSqr(),t=this.x,d=r.x.redMul(e),i=this.y,n=r.y.redMul(e).redMul(this.z),s=t.redSub(d),u=i.redSub(n);if(0===s.cmpn(0))return 0!==u.cmpn(0)?this.curve.jpoint(null,null,null):this.dbl();var o=s.redSqr(),h=o.redMul(s),l=t.redMul(o),p=u.redSqr().redIAdd(h).redISub(l).redISub(l),a=u.redMul(l.redISub(p)).redISub(i.redMul(h)),b=this.z.redMul(s);return this.curve.jpoint(p,a,b)},JPoint.prototype.dblp=function(r){if(0===r)return this;if(this.isInfinity())return this;if(!r)return this.dbl();if(this.curve.zeroA||this.curve.threeA){for(var e=this,t=0;r>t;t++)e=e.dbl();return e}for(var d=this.curve.a,i=this.curve.tinv,n=this.x,s=this.y,u=this.z,o=u.redSqr().redSqr(),h=s.redAdd(s),t=0;r>t;t++){var l=n.redSqr(),p=h.redSqr(),a=p.redSqr(),b=l.redAdd(l).redIAdd(l).redIAdd(d.redMul(o)),f=n.redMul(p),c=b.redSqr().redISub(f.redAdd(f)),S=f.redISub(c),v=b.redMul(S);v=v.redIAdd(v).redISub(a);var I=h.redMul(u);r>t+1&&(o=o.redMul(a)),n=c,u=I,h=v}return this.curve.jpoint(n,h.redMul(i),u)},JPoint.prototype.dbl=function(){return this.isInfinity()?this:this.curve.zeroA?this._zeroDbl():this.curve.threeA?this._threeDbl():this._dbl()},JPoint.prototype._zeroDbl=function(){if(this.zOne){var r=this.x.redSqr(),e=this.y.redSqr(),t=e.redSqr(),d=this.x.redAdd(e).redSqr().redISub(r).redISub(t);d=d.redIAdd(d);var i=r.redAdd(r).redIAdd(r),n=i.redSqr().redISub(d).redISub(d),s=t.redIAdd(t);s=s.redIAdd(s),s=s.redIAdd(s);var u=n,o=i.redMul(d.redISub(n)).redISub(s),h=this.y.redAdd(this.y)}else{var l=this.x.redSqr(),p=this.y.redSqr(),a=p.redSqr(),b=this.x.redAdd(p).redSqr().redISub(l).redISub(a);b=b.redIAdd(b);var f=l.redAdd(l).redIAdd(l),c=f.redSqr(),S=a.redIAdd(a);S=S.redIAdd(S),S=S.redIAdd(S);var u=c.redISub(b).redISub(b),o=f.redMul(b.redISub(u)).redISub(S),h=this.y.redMul(this.z);h=h.redIAdd(h)}return this.curve.jpoint(u,o,h)},JPoint.prototype._threeDbl=function(){if(this.zOne){var r=this.x.redSqr(),e=this.y.redSqr(),t=e.redSqr(),d=this.x.redAdd(e).redSqr().redISub(r).redISub(t);d=d.redIAdd(d);var i=r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),n=i.redSqr().redISub(d).redISub(d),s=n,u=t.redIAdd(t);u=u.redIAdd(u),u=u.redIAdd(u);var o=i.redMul(d.redISub(n)).redISub(u),h=this.y.redAdd(this.y)}else{var l=this.z.redSqr(),p=this.y.redSqr(),a=this.x.redMul(p),b=this.x.redSub(l).redMul(this.x.redAdd(l));b=b.redAdd(b).redIAdd(b);var f=a.redIAdd(a);f=f.redIAdd(f);var c=f.redAdd(f),s=b.redSqr().redISub(c),h=this.y.redAdd(this.z).redSqr().redISub(p).redISub(l),S=p.redSqr();S=S.redIAdd(S),S=S.redIAdd(S),S=S.redIAdd(S);var o=b.redMul(f.redISub(s)).redISub(S)}return this.curve.jpoint(s,o,h)},JPoint.prototype._dbl=function(){var r=this.curve.a,e=(this.curve.tinv,this.x),t=this.y,d=this.z,i=d.redSqr().redSqr(),n=e.redSqr(),s=t.redSqr(),u=n.redAdd(n).redIAdd(n).redIAdd(r.redMul(i)),o=e.redAdd(e);o=o.redIAdd(o);var h=o.redMul(s),l=u.redSqr().redISub(h.redAdd(h)),p=h.redISub(l),a=s.redSqr();a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var b=u.redMul(p).redISub(a),f=t.redAdd(t).redMul(d);return this.curve.jpoint(l,b,f)},JPoint.prototype.trpl=function(){if(!this.curve.zeroA)return this.dbl().add(this);var r=this.x.redSqr(),e=this.y.redSqr(),t=this.z.redSqr(),d=e.redSqr(),i=r.redAdd(r).redIAdd(r),n=i.redSqr(),s=this.x.redAdd(e).redSqr().redISub(r).redISub(d);s=s.redIAdd(s),s=s.redAdd(s).redIAdd(s),s=s.redISub(n);var u=s.redSqr(),o=d.redIAdd(d);o=o.redIAdd(o),o=o.redIAdd(o),o=o.redIAdd(o);var h=i.redIAdd(s).redSqr().redISub(n).redISub(u).redISub(o),l=e.redMul(h);l=l.redIAdd(l),l=l.redIAdd(l);var p=this.x.redMul(u).redISub(l);p=p.redIAdd(p),p=p.redIAdd(p);var a=this.y.redMul(h.redMul(o.redISub(h)).redISub(s.redMul(u)));a=a.redIAdd(a),a=a.redIAdd(a),a=a.redIAdd(a);var b=this.z.redAdd(s).redSqr().redISub(t).redISub(u);return this.curve.jpoint(p,a,b)},JPoint.prototype.mul=function(r,e){return r=new bn(r,e),this.curve._wnafMul(this,r)},JPoint.prototype.eq=function(r){if("affine"===r.type)return this.eq(r.toJ());if(this===r)return!0;var e=this.z.redSqr(),t=r.z.redSqr();if(0!==this.x.redMul(t).redISub(r.x.redMul(e)).cmpn(0))return!1;var d=e.redMul(this.z),i=t.redMul(r.z);return 0===this.y.redMul(i).redISub(r.y.redMul(d)).cmpn(0)},JPoint.prototype.inspect=function(){return this.isInfinity()?"<EC JPoint Infinity>":"<EC JPoint x: "+this.x.toString(16,2)+" y: "+this.y.toString(16,2)+" z: "+this.z.toString(16,2)+">"},JPoint.prototype.isInfinity=function(){return 0===this.z.cmpn(0)};


},{"../../elliptic":89,"../curve":92,"bn.js":88,"inherits":162}],95:[function(require,module,exports){
function PresetCurve(f){this.curve="short"===f.type?new elliptic.curve["short"](f):"edwards"===f.type?new elliptic.curve.edwards(f):new elliptic.curve.mont(f),this.g=this.curve.g,this.n=this.curve.n,this.hash=f.hash,assert(this.g.validate(),"Invalid curve"),assert(this.g.mul(this.n).isInfinity(),"Invalid curve, G*N != O")}function defineCurve(f,e){Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,get:function(){var d=new PresetCurve(e);return Object.defineProperty(curves,f,{configurable:!0,enumerable:!0,value:d}),d}})}var curves=exports,hash=require("hash.js"),bn=require("bn.js"),elliptic=require("../elliptic"),assert=elliptic.utils.assert;curves.PresetCurve=PresetCurve,defineCurve("p192",{type:"short",prime:"p192",p:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",a:"ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",b:"64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",n:"ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",hash:hash.sha256,gRed:!1,g:["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012","07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]}),defineCurve("p224",{type:"short",prime:"p224",p:"ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",a:"ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",b:"b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",n:"ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",hash:hash.sha256,gRed:!1,g:["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21","bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]}),defineCurve("p256",{type:"short",prime:null,p:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",a:"ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",b:"5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",n:"ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",hash:hash.sha256,gRed:!1,g:["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296","4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]}),defineCurve("curve25519",{type:"mont",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"76d06",b:"0",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["9"]}),defineCurve("ed25519",{type:"edwards",prime:"p25519",p:"7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",a:"-1",c:"1",d:"52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",n:"1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",hash:hash.sha256,gRed:!1,g:["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a","6666666666666666666666666666666666666666666666666666666666666658"]}),defineCurve("secp256k1",{type:"short",prime:"k256",p:"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",a:"0",b:"7",n:"ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",h:"1",hash:hash.sha256,beta:"7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",lambda:"5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",basis:[{a:"3086d221a7d46bcde86c90e49284eb15",b:"-e4437ed6010e88286f547fa90abfe4c3"},{a:"114ca50f7a8e2f3f657c1108d9d44cfd8",b:"3086d221a7d46bcde86c90e49284eb15"}],gRed:!1,g:["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",{doubles:{step:4,points:[["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a","f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508","11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739","d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640","4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c","4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda","96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa","5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0","cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d","9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d","e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1","9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0","5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047","10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862","283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7","7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd","56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83","7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a","53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8","bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d","4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725","7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754","4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c","17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6","6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39","c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891","893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b","febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03","2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d","eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070","7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4","e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da","662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11","1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e","efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41","2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef","67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8","db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d","648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96","35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd","ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5","9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266","40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71","34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac","c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751","1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e","493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241","c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3","be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f","4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19","aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be","b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9","6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2","8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13","7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c","ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba","2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151","e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073","d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458","38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b","69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366","d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa","40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0","620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787","7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e","ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]},naf:{wnd:7,points:[["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9","388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4","d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc","6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe","cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb","d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8","ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e","581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34","4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c","85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5","321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f","2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714","73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729","a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db","2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4","e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5","b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479","2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d","80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f","1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb","d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9","eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963","758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74","958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530","e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b","5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247","cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1","cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120","4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435","91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18","673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8","59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb","3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f","55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143","efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba","e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45","f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a","744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e","c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8","e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c","30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519","e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab","100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca","ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf","8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610","68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4","f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c","d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940","edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980","a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3","66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf","9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63","4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448","fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf","5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5","8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6","8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5","5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99","f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51","f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5","42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5","204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997","4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881","73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5","39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66","d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726","ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede","6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94","60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31","3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51","b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252","ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5","cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b","6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4","322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f","6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889","2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246","b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984","998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a","b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030","bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197","6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593","c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef","21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38","60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a","49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111","5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502","7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea","be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26","8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986","39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e","62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4","25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda","ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859","cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f","f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c","6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942","fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a","1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80","5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d","438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1","cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63","c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352","6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193","ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00","9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58","ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7","d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8","c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e","67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d","cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b","299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f","f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6","462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297","62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a","7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c","ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52","4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb","bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065","bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917","603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9","cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3","553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57","712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66","ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8","9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721","9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180","4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]}}]});


},{"../elliptic":89,"bn.js":88,"hash.js":102}],96:[function(require,module,exports){
function EC(t){return this instanceof EC?("string"==typeof t&&(assert(elliptic.curves.hasOwnProperty(t),"Unknown curve "+t),t=elliptic.curves[t]),t instanceof elliptic.curves.PresetCurve&&(t={curve:t}),this.curve=t.curve.curve,this.n=this.curve.n,this.nh=this.n.shrn(1),this.g=this.curve.g,this.g=t.curve.g,this.g.precompute(t.curve.n.bitLength()+1),void(this.hash=t.hash||t.curve.hash)):new EC(t)}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert,KeyPair=require("./key"),Signature=require("./signature");module.exports=EC,EC.prototype.keyPair=function(t,e){return new KeyPair(this,t,e)},EC.prototype.genKeyPair=function(t){t||(t={});for(var e=new elliptic.hmacDRBG({hash:this.hash,pers:t.pers,entropy:t.entropy||elliptic.rand(this.hash.hmacStrength),nonce:this.n.toArray()}),n=this.n.byteLength(),i=this.n.sub(new bn(2));;){var r=new bn(e.generate(n));if(!(r.cmp(i)>0))return r.iaddn(1),this.keyPair(r)}},EC.prototype._truncateToN=function(t,e){var n=8*t.byteLength()-this.n.bitLength();return n>0&&(t=t.shrn(n)),!e&&t.cmp(this.n)>=0?t.sub(this.n):t},EC.prototype.sign=function(t,e,n){e=this.keyPair(e,"hex"),t=this._truncateToN(new bn(t,16)),n||(n={});for(var i=this.n.byteLength(),r=e.getPrivate().toArray(),s=r.length;21>s;s++)r.unshift(0);for(var h=t.toArray(),s=h.length;i>s;s++)h.unshift(0);for(var u=new elliptic.hmacDRBG({hash:this.hash,entropy:r,nonce:h}),a=this.n.sub(new bn(1));;){var c=new bn(u.generate(this.n.byteLength()));if(c=this._truncateToN(c,!0),!(c.cmpn(1)<=0||c.cmp(a)>=0)){var o=this.g.mul(c);if(!o.isInfinity()){var p=o.getX().mod(this.n);if(0!==p.cmpn(0)){var v=c.invm(this.n).mul(p.mul(e.getPrivate()).iadd(t)).mod(this.n);if(0!==v.cmpn(0))return n.canonical&&v.cmp(this.nh)>0&&(v=this.n.sub(v)),new Signature(p,v)}}}}},EC.prototype.verify=function(t,e,n){t=this._truncateToN(new bn(t,16)),n=this.keyPair(n,"hex"),e=new Signature(e,"hex");var i=e.r,r=e.s;if(i.cmpn(1)<0||i.cmp(this.n)>=0)return!1;if(r.cmpn(1)<0||r.cmp(this.n)>=0)return!1;var s=r.invm(this.n),h=s.mul(t).mod(this.n),u=s.mul(i).mod(this.n),a=this.g.mulAdd(h,n.getPublic(),u);return a.isInfinity()?!1:0===a.getX().mod(this.n).cmp(i)};


},{"../../elliptic":89,"./key":97,"./signature":98,"bn.js":88}],97:[function(require,module,exports){
function KeyPair(t,i,e){return i instanceof KeyPair?i:e instanceof KeyPair?e:(i||(i=e,e=null),null!==i&&"object"==typeof i&&(i.x?(e=i,i=null):(i.priv||i.pub)&&(e=i.pub,i=i.priv)),this.ec=t,this.priv=null,this.pub=null,void(this._importPublicHex(i,e)||("hex"===e&&(e=null),i&&this._importPrivate(i),e&&this._importPublic(e))))}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=KeyPair,KeyPair.prototype.validate=function(){var t=this.getPublic();return t.isInfinity()?{result:!1,reason:"Invalid public key"}:t.validate()?t.mul(this.ec.curve.n).isInfinity()?{result:!0,reason:null}:{result:!1,reason:"Public key * N != O"}:{result:!1,reason:"Public key is not a point"}},KeyPair.prototype.getPublic=function(t,i){if(this.pub||(this.pub=this.ec.g.mul(this.priv)),"string"==typeof t&&(i=t,t=null),!i)return this.pub;for(var e=this.ec.curve.p.byteLength(),r=this.pub.getX().toArray(),n=r.length;e>n;n++)r.unshift(0);if(t)var u=[this.pub.getY().isEven()?2:3].concat(r);else{for(var s=this.pub.getY().toArray(),n=s.length;e>n;n++)s.unshift(0);var u=[4].concat(r,s)}return utils.encode(u,i)},KeyPair.prototype.getPrivate=function(t){return"hex"===t?this.priv.toString(16,2):this.priv},KeyPair.prototype._importPrivate=function(t){this.priv=new bn(t,16),this.priv=this.priv.mod(this.ec.curve.n)},KeyPair.prototype._importPublic=function(t){this.pub=this.ec.curve.point(t.x,t.y)},KeyPair.prototype._importPublicHex=function(t,i){t=utils.toArray(t,i);var e=this.ec.curve.p.byteLength();if(4===t[0]&&t.length-1===2*e)this.pub=this.ec.curve.point(t.slice(1,1+e),t.slice(1+e,1+2*e));else{if(2!==t[0]&&3!==t[0]||t.length-1!==e)return!1;this.pub=this.ec.curve.pointFromX(3===t[0],t.slice(1,1+e))}return!0},KeyPair.prototype.derive=function(t){return t.mul(this.priv).getX()},KeyPair.prototype.sign=function(t){return this.ec.sign(t,this)},KeyPair.prototype.verify=function(t,i){return this.ec.verify(t,i,this)},KeyPair.prototype.inspect=function(){return"<Key priv: "+(this.priv&&this.priv.toString(16,2))+" pub: "+(this.pub&&this.pub.inspect())+" >"};


},{"../../elliptic":89,"bn.js":88}],98:[function(require,module,exports){
function Signature(t,r){return t instanceof Signature?t:void(this._importDER(t,r)||(assert(t&&r,"Signature without r or s"),this.r=new bn(t,16),this.s=new bn(r,16)))}var bn=require("bn.js"),elliptic=require("../../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=Signature,Signature.prototype._importDER=function(t,r){if(t=utils.toArray(t,r),t.length<6||48!==t[0]||2!==t[2])return!1;var e=t[1];if(1+e>t.length)return!1;var n=t[3];if(n>=128)return!1;if(4+n+2>=t.length)return!1;if(2!==t[4+n])return!1;var i=t[5+n];return i>=128?!1:4+n+2+i>t.length?!1:(this.r=new bn(t.slice(4,4+n)),this.s=new bn(t.slice(4+n+2,4+n+2+i)),!0)},Signature.prototype.toDER=function(t){var r=this.r.toArray(),e=this.s.toArray();128&r[0]&&(r=[0].concat(r)),128&e[0]&&(e=[0].concat(e));var n=r.length+e.length+4,i=[48,n,2,r.length];return i=i.concat(r,[2,e.length],e),utils.encode(i,t)};


},{"../../elliptic":89,"bn.js":88}],99:[function(require,module,exports){
function HmacDRBG(t){if(!(this instanceof HmacDRBG))return new HmacDRBG(t);this.hash=t.hash,this.predResist=!!t.predResist,this.outLen=this.hash.outSize,this.minEntropy=t.minEntropy||this.hash.hmacStrength,this.reseed=null,this.reseedInterval=null,this.K=null,this.V=null;var e=utils.toArray(t.entropy,t.entropyEnc),i=utils.toArray(t.nonce,t.nonceEnc),s=utils.toArray(t.pers,t.persEnc);assert(e.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._init(e,i,s)}var hash=require("hash.js"),elliptic=require("../elliptic"),utils=elliptic.utils,assert=utils.assert;module.exports=HmacDRBG,HmacDRBG.prototype._init=function(t,e,i){var s=t.concat(e).concat(i);this.K=new Array(this.outLen/8),this.V=new Array(this.outLen/8);for(var h=0;h<this.V.length;h++)this.K[h]=0,this.V[h]=1;this._update(s),this.reseed=1,this.reseedInterval=281474976710656},HmacDRBG.prototype._hmac=function(){return new hash.hmac(this.hash,this.K)},HmacDRBG.prototype._update=function(t){var e=this._hmac().update(this.V).update([0]);t&&(e=e.update(t)),this.K=e.digest(),this.V=this._hmac().update(this.V).digest(),t&&(this.K=this._hmac().update(this.V).update([1]).update(t).digest(),this.V=this._hmac().update(this.V).digest())},HmacDRBG.prototype.reseed=function(t,e,i,s){"string"!=typeof e&&(s=i,i=e,e=null),t=utils.toBuffer(t,e),i=utils.toBuffer(i,s),assert(t.length>=this.minEntropy/8,"Not enough entropy. Minimum is: "+this.minEntropy+" bits"),this._update(t.concat(i||[])),this.reseed=1},HmacDRBG.prototype.generate=function(t,e,i,s){if(this.reseed>this.reseedInterval)throw new Error("Reseed is required");"string"!=typeof e&&(s=i,i=e,e=null),i&&(i=utils.toArray(i,s),this._update(i));for(var h=[];h.length<t;)this.V=this._hmac().update(this.V).digest(),h=h.concat(this.V);var r=h.slice(0,t);return this._update(i),this.reseed++,utils.encode(r,e)};


},{"../elliptic":89,"hash.js":102}],100:[function(require,module,exports){
function toArray(r,n){if(Array.isArray(r))return r.slice();if(!r)return[];var e=[];if("string"==typeof r)if(n){if("hex"===n){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var t=0;t<r.length;t+=2)e.push(parseInt(r[t]+r[t+1],16))}}else for(var t=0;t<r.length;t++){var i=r.charCodeAt(t),o=i>>8,a=255&i;o?e.push(o,a):e.push(a)}else for(var t=0;t<r.length;t++)e[t]=0|r[t];return e}function toHex(r){for(var n="",e=0;e<r.length;e++)n+=zero2(r[e].toString(16));return n}function zero2(r){return 1===r.length?"0"+r:r}function getNAF(r,n){for(var e=[],t=1<<n+1,i=r.clone();i.cmpn(1)>=0;){var o;if(i.isOdd()){var a=i.andln(t-1);o=a>(t>>1)-1?(t>>1)-a:a,i.isubn(o)}else o=0;e.push(o);for(var s=0!==i.cmpn(0)&&0===i.andln(t-1)?n+1:1,u=1;s>u;u++)e.push(0);i.ishrn(s)}return e}function getJSF(r,n){var e=[[],[]];r=r.clone(),n=n.clone();for(var t=0,i=0;r.cmpn(-t)>0||n.cmpn(-i)>0;){var o=r.andln(3)+t&3,a=n.andln(3)+i&3;3===o&&(o=-1),3===a&&(a=-1);var s;if(0===(1&o))s=0;else{var u=r.andln(7)+t&7;s=3!==u&&5!==u||2!==a?o:-o}e[0].push(s);var l;if(0===(1&a))l=0;else{var u=n.andln(7)+i&7;l=3!==u&&5!==u||2!==o?a:-a}e[1].push(l),2*t===s+1&&(t=1-t),2*i===l+1&&(i=1-i),r.ishrn(1),n.ishrn(1)}return e}var bn=require("bn.js"),utils=exports;utils.assert=function(r,n){if(!r)throw new Error(n||"Assertion failed")},utils.toArray=toArray,utils.toHex=toHex,utils.encode=function(r,n){return"hex"===n?toHex(r):r},utils.zero2=zero2,utils.getNAF=getNAF,utils.getJSF=getJSF;


},{"bn.js":88}],101:[function(require,module,exports){
function Rand(n){this.rand=n}var r;if(module.exports=function(n){return r||(r=new Rand(null)),r.generate(n)},module.exports.Rand=Rand,Rand.prototype.generate=function(n){return this._rand(n)},"object"==typeof window)Rand.prototype._rand=window.crypto&&window.crypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.crypto.getRandomValues(r),r}:window.msCrypto&&window.msCrypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.msCrypto.getRandomValues(r),r}:function(){throw new Error("Not implemented yet")};else try{var crypto=require("crypto");Rand.prototype._rand=function(n){return crypto.randomBytes(n)}}catch(e){Rand.prototype._rand=function(n){for(var r=new Uint8Array(n),t=0;t<r.length;t++)r[t]=this.rand.getByte();return r}}


},{"crypto":21}],102:[function(require,module,exports){
var hash=exports;hash.utils=require("./hash/utils"),hash.common=require("./hash/common"),hash.sha=require("./hash/sha"),hash.ripemd=require("./hash/ripemd"),hash.hmac=require("./hash/hmac"),hash.sha1=hash.sha.sha1,hash.sha256=hash.sha.sha256,hash.sha224=hash.sha.sha224,hash.sha384=hash.sha.sha384,hash.sha512=hash.sha.sha512,hash.ripemd160=hash.ripemd.ripemd160;


},{"./hash/common":103,"./hash/hmac":104,"./hash/ripemd":105,"./hash/sha":106,"./hash/utils":107}],103:[function(require,module,exports){
function BlockHash(){this.pending=null,this.pendingTotal=0,this.blockSize=this.constructor.blockSize,this.outSize=this.constructor.outSize,this.hmacStrength=this.constructor.hmacStrength,this.padLength=this.constructor.padLength/8,this.endian="big",this._delta8=this.blockSize/8,this._delta32=this.blockSize/32}var hash=require("../hash"),utils=hash.utils,assert=utils.assert;exports.BlockHash=BlockHash,BlockHash.prototype.update=function(t,i){if(t=utils.toArray(t,i),this.pending=this.pending?this.pending.concat(t):t,this.pendingTotal+=t.length,this.pending.length>=this._delta8){t=this.pending;var h=t.length%this._delta8;this.pending=t.slice(t.length-h,t.length),0===this.pending.length&&(this.pending=null),t=utils.join32(t,0,t.length-h,this.endian);for(var s=0;s<t.length;s+=this._delta32)this._update(t,s,s+this._delta32)}return this},BlockHash.prototype.digest=function(t){return this.update(this._pad()),assert(null===this.pending),this._digest(t)},BlockHash.prototype._pad=function(){var t=this.pendingTotal,i=this._delta8,h=i-(t+this.padLength)%i,s=new Array(h+this.padLength);s[0]=128;for(var n=1;h>n;n++)s[n]=0;if(t<<=3,"big"===this.endian){for(var e=8;e<this.padLength;e++)s[n++]=0;s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=t>>>24&255,s[n++]=t>>>16&255,s[n++]=t>>>8&255,s[n++]=255&t}else{s[n++]=255&t,s[n++]=t>>>8&255,s[n++]=t>>>16&255,s[n++]=t>>>24&255,s[n++]=0,s[n++]=0,s[n++]=0,s[n++]=0;for(var e=8;e<this.padLength;e++)s[n++]=0}return s};


},{"../hash":102}],104:[function(require,module,exports){
function Hmac(t,i,e){return this instanceof Hmac?(this.Hash=t,this.blockSize=t.blockSize/8,this.outSize=t.outSize/8,this.inner=null,this.outer=null,void this._init(utils.toArray(i,e))):new Hmac(t,i,e)}var hmac=exports,hash=require("../hash"),utils=hash.utils,assert=utils.assert;module.exports=Hmac,Hmac.prototype._init=function(t){t.length>this.blockSize&&(t=(new this.Hash).update(t).digest()),assert(t.length<=this.blockSize);for(var i=t.length;i<this.blockSize;i++)t.push(0);for(var i=0;i<t.length;i++)t[i]^=54;this.inner=(new this.Hash).update(t);for(var i=0;i<t.length;i++)t[i]^=106;this.outer=(new this.Hash).update(t)},Hmac.prototype.update=function(t,i){return this.inner.update(t,i),this},Hmac.prototype.digest=function(t){return this.outer.update(this.inner.digest()),this.outer.digest(t)};


},{"../hash":102}],105:[function(require,module,exports){
function RIPEMD160(){return this instanceof RIPEMD160?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.endian="little")):new RIPEMD160}function f(t,h,s,i){return 15>=t?h^s^i:31>=t?h&s|~h&i:47>=t?(h|~s)^i:63>=t?h&i|s&~i:h^(s|~i)}function K(t){return 15>=t?0:31>=t?1518500249:47>=t?1859775393:63>=t?2400959708:2840853838}function Kh(t){return 15>=t?1352829926:31>=t?1548603684:47>=t?1836072691:63>=t?2053994217:0}var hash=require("../hash"),utils=hash.utils,rotl32=utils.rotl32,sum32=utils.sum32,sum32_3=utils.sum32_3,sum32_4=utils.sum32_4,BlockHash=hash.common.BlockHash;utils.inherits(RIPEMD160,BlockHash),exports.ripemd160=RIPEMD160,RIPEMD160.blockSize=512,RIPEMD160.outSize=160,RIPEMD160.hmacStrength=192,RIPEMD160.padLength=64,RIPEMD160.prototype._update=function(t,h){for(var i=this.h[0],u=this.h[1],l=this.h[2],o=this.h[3],e=this.h[4],n=i,m=u,a=l,c=o,_=e,D=0;80>D;D++){var E=sum32(rotl32(sum32_4(i,f(D,u,l,o),t[r[D]+h],K(D)),s[D]),e);i=e,e=o,o=rotl32(l,10),l=u,u=E,E=sum32(rotl32(sum32_4(n,f(79-D,m,a,c),t[rh[D]+h],Kh(D)),sh[D]),_),n=_,_=c,c=rotl32(a,10),a=m,m=E}E=sum32_3(this.h[1],l,c),this.h[1]=sum32_3(this.h[2],o,_),this.h[2]=sum32_3(this.h[3],e,n),this.h[3]=sum32_3(this.h[4],i,m),this.h[4]=sum32_3(this.h[0],u,a),this.h[0]=E},RIPEMD160.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"little"):utils.split32(this.h,"little")};var r=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],rh=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],s=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sh=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];


},{"../hash":102}],106:[function(require,module,exports){
function SHA256(){return this instanceof SHA256?(BlockHash.call(this),this.h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.k=sha256_K,void(this.W=new Array(64))):new SHA256}function SHA224(){return this instanceof SHA224?(SHA256.call(this),void(this.h=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])):new SHA224}function SHA512(){return this instanceof SHA512?(BlockHash.call(this),this.h=[1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209],this.k=sha512_K,void(this.W=new Array(160))):new SHA512}function SHA384(){return this instanceof SHA384?(SHA512.call(this),void(this.h=[3418070365,3238371032,1654270250,914150663,2438529370,812702999,355462360,4144912697,1731405415,4290775857,2394180231,1750603025,3675008525,1694076839,1203062813,3204075428])):new SHA384}function SHA1(){return this instanceof SHA1?(BlockHash.call(this),this.h=[1732584193,4023233417,2562383102,271733878,3285377520],void(this.W=new Array(80))):new SHA1}function ch32(t,h,s){return t&h^~t&s}function maj32(t,h,s){return t&h^t&s^h&s}function p32(t,h,s){return t^h^s}function s0_256(t){return rotr32(t,2)^rotr32(t,13)^rotr32(t,22)}function s1_256(t){return rotr32(t,6)^rotr32(t,11)^rotr32(t,25)}function g0_256(t){return rotr32(t,7)^rotr32(t,18)^t>>>3}function g1_256(t){return rotr32(t,17)^rotr32(t,19)^t>>>10}function ft_1(t,h,s,i){return 0===t?ch32(h,s,i):1===t||3===t?p32(h,s,i):2===t?maj32(h,s,i):void 0}function ch64_hi(t,h,s,i,r){var o=t&s^~t&r;return 0>o&&(o+=4294967296),o}function ch64_lo(t,h,s,i,r,o){var u=h&i^~h&o;return 0>u&&(u+=4294967296),u}function maj64_hi(t,h,s,i,r){var o=t&s^t&r^s&r;return 0>o&&(o+=4294967296),o}function maj64_lo(t,h,s,i,r,o){var u=h&i^h&o^i&o;return 0>u&&(u+=4294967296),u}function s0_512_hi(t,h){var s=rotr64_hi(t,h,28),i=rotr64_hi(h,t,2),r=rotr64_hi(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s0_512_lo(t,h){var s=rotr64_lo(t,h,28),i=rotr64_lo(h,t,2),r=rotr64_lo(h,t,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_hi(t,h){var s=rotr64_hi(t,h,14),i=rotr64_hi(t,h,18),r=rotr64_hi(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function s1_512_lo(t,h){var s=rotr64_lo(t,h,14),i=rotr64_lo(t,h,18),r=rotr64_lo(h,t,9),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_hi(t,h){var s=rotr64_hi(t,h,1),i=rotr64_hi(t,h,8),r=shr64_hi(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g0_512_lo(t,h){var s=rotr64_lo(t,h,1),i=rotr64_lo(t,h,8),r=shr64_lo(t,h,7),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_hi(t,h){var s=rotr64_hi(t,h,19),i=rotr64_hi(h,t,29),r=shr64_hi(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}function g1_512_lo(t,h){var s=rotr64_lo(t,h,19),i=rotr64_lo(h,t,29),r=shr64_lo(t,h,6),o=s^i^r;return 0>o&&(o+=4294967296),o}var hash=require("../hash"),utils=hash.utils,assert=utils.assert,rotr32=utils.rotr32,rotl32=utils.rotl32,sum32=utils.sum32,sum32_4=utils.sum32_4,sum32_5=utils.sum32_5,rotr64_hi=utils.rotr64_hi,rotr64_lo=utils.rotr64_lo,shr64_hi=utils.shr64_hi,shr64_lo=utils.shr64_lo,sum64=utils.sum64,sum64_hi=utils.sum64_hi,sum64_lo=utils.sum64_lo,sum64_4_hi=utils.sum64_4_hi,sum64_4_lo=utils.sum64_4_lo,sum64_5_hi=utils.sum64_5_hi,sum64_5_lo=utils.sum64_5_lo,BlockHash=hash.common.BlockHash,sha256_K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],sha512_K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],sha1_K=[1518500249,1859775393,2400959708,3395469782];utils.inherits(SHA256,BlockHash),exports.sha256=SHA256,SHA256.blockSize=512,SHA256.outSize=256,SHA256.hmacStrength=192,SHA256.padLength=64,SHA256.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=sum32_4(g1_256(s[i-2]),s[i-7],g0_256(s[i-15]),s[i-16]);var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],e=this.h[5],l=this.h[6],a=this.h[7];assert(this.k.length===s.length);for(var i=0;i<s.length;i++){var c=sum32_5(a,s1_256(_),ch32(_,e,l),this.k[i],s[i]),S=sum32(s0_256(r),maj32(r,o,u));a=l,l=e,e=_,_=sum32(n,c),n=u,u=o,o=r,r=sum32(c,S)}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_),this.h[5]=sum32(this.h[5],e),this.h[6]=sum32(this.h[6],l),this.h[7]=sum32(this.h[7],a)},SHA256.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA224,SHA256),exports.sha224=SHA224,SHA224.blockSize=512,SHA224.outSize=224,SHA224.hmacStrength=192,SHA224.padLength=64,SHA224.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,7),"big"):utils.split32(this.h.slice(0,7),"big")},utils.inherits(SHA512,BlockHash),exports.sha512=SHA512,SHA512.blockSize=1024,SHA512.outSize=512,SHA512.hmacStrength=192,SHA512.padLength=128,SHA512.prototype._prepareBlock=function(t,h){for(var s=this.W,i=0;32>i;i++)s[i]=t[h+i];for(;i<s.length;i+=2){var r=g1_512_hi(s[i-4],s[i-3]),o=g1_512_lo(s[i-4],s[i-3]),u=s[i-14],n=s[i-13],_=g0_512_hi(s[i-30],s[i-29]),e=g0_512_lo(s[i-30],s[i-29]),l=s[i-32],a=s[i-31];s[i]=sum64_4_hi(r,o,u,n,_,e,l,a),s[i+1]=sum64_4_lo(r,o,u,n,_,e,l,a)}},SHA512.prototype._update=function(t,h){this._prepareBlock(t,h);var s=this.W,i=this.h[0],r=this.h[1],o=this.h[2],u=this.h[3],n=this.h[4],_=this.h[5],e=this.h[6],l=this.h[7],a=this.h[8],c=this.h[9],S=this.h[10],m=this.h[11],H=this.h[12],A=this.h[13],f=this.h[14],g=this.h[15];assert(this.k.length===s.length);for(var p=0;p<s.length;p+=2){var v=f,k=g,d=s1_512_hi(a,c),b=s1_512_lo(a,c),x=ch64_hi(a,c,S,m,H,A),y=ch64_lo(a,c,S,m,H,A),z=this.k[p],B=this.k[p+1],w=s[p],j=s[p+1],W=sum64_5_hi(v,k,d,b,x,y,z,B,w,j),K=sum64_5_lo(v,k,d,b,x,y,z,B,w,j),v=s0_512_hi(i,r),k=s0_512_lo(i,r),d=maj64_hi(i,r,o,u,n,_),b=maj64_lo(i,r,o,u,n,_),L=sum64_hi(v,k,d,b),q=sum64_lo(v,k,d,b);f=H,g=A,H=S,A=m,S=a,m=c,a=sum64_hi(e,l,W,K),c=sum64_lo(l,l,W,K),e=n,l=_,n=o,_=u,o=i,u=r,i=sum64_hi(W,K,L,q),r=sum64_lo(W,K,L,q)}sum64(this.h,0,i,r),sum64(this.h,2,o,u),sum64(this.h,4,n,_),sum64(this.h,6,e,l),sum64(this.h,8,a,c),sum64(this.h,10,S,m),sum64(this.h,12,H,A),sum64(this.h,14,f,g)},SHA512.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")},utils.inherits(SHA384,SHA512),exports.sha384=SHA384,SHA384.blockSize=1024,SHA384.outSize=384,SHA384.hmacStrength=192,SHA384.padLength=128,SHA384.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h.slice(0,12),"big"):utils.split32(this.h.slice(0,12),"big")},utils.inherits(SHA1,BlockHash),exports.sha1=SHA1,SHA1.blockSize=512,SHA1.outSize=160,SHA1.hmacStrength=80,SHA1.padLength=64,SHA1.prototype._update=function(t,h){for(var s=this.W,i=0;16>i;i++)s[i]=t[h+i];for(;i<s.length;i++)s[i]=rotl32(s[i-3]^s[i-8]^s[i-14]^s[i-16],1);for(var r=this.h[0],o=this.h[1],u=this.h[2],n=this.h[3],_=this.h[4],i=0;i<s.length;i++){var e=~~(i/20),l=sum32_5(rotl32(r,5),ft_1(e,o,u,n),_,s[i],sha1_K[e]);_=n,n=u,u=rotl32(o,30),o=r,r=l}this.h[0]=sum32(this.h[0],r),this.h[1]=sum32(this.h[1],o),this.h[2]=sum32(this.h[2],u),this.h[3]=sum32(this.h[3],n),this.h[4]=sum32(this.h[4],_)},SHA1.prototype._digest=function(t){return"hex"===t?utils.toHex32(this.h,"big"):utils.split32(this.h,"big")};


},{"../hash":102}],107:[function(require,module,exports){
function toArray(r,t){if(Array.isArray(r))return r.slice();if(!r)return[];var n=[];if("string"==typeof r)if(t){if("hex"===t){r=r.replace(/[^a-z0-9]+/gi,""),r.length%2!==0&&(r="0"+r);for(var u=0;u<r.length;u+=2)n.push(parseInt(r[u]+r[u+1],16))}}else for(var u=0;u<r.length;u++){var o=r.charCodeAt(u),e=o>>8,s=255&o;e?n.push(e,s):n.push(s)}else for(var u=0;u<r.length;u++)n[u]=0|r[u];return n}function toHex(r){for(var t="",n=0;n<r.length;n++)t+=zero2(r[n].toString(16));return t}function htonl(r){var t=r>>>24|r>>>8&65280|r<<8&16711680|(255&r)<<24;return t>>>0}function toHex32(r,t){for(var n="",u=0;u<r.length;u++){var o=r[u];"little"===t&&(o=htonl(o)),n+=zero8(o.toString(16))}return n}function zero2(r){return 1===r.length?"0"+r:r}function zero8(r){return 7===r.length?"0"+r:6===r.length?"00"+r:5===r.length?"000"+r:4===r.length?"0000"+r:3===r.length?"00000"+r:2===r.length?"000000"+r:1===r.length?"0000000"+r:r}function join32(r,t,n,u){var o=n-t;assert(o%4===0);for(var e=new Array(o/4),s=0,i=t;s<e.length;s++,i+=4){var l;l="big"===u?r[i]<<24|r[i+1]<<16|r[i+2]<<8|r[i+3]:r[i+3]<<24|r[i+2]<<16|r[i+1]<<8|r[i],e[s]=l>>>0}return e}function split32(r,t){for(var n=new Array(4*r.length),u=0,o=0;u<r.length;u++,o+=4){var e=r[u];"big"===t?(n[o]=e>>>24,n[o+1]=e>>>16&255,n[o+2]=e>>>8&255,n[o+3]=255&e):(n[o+3]=e>>>24,n[o+2]=e>>>16&255,n[o+1]=e>>>8&255,n[o]=255&e)}return n}function rotr32(r,t){return r>>>t|r<<32-t}function rotl32(r,t){return r<<t|r>>>32-t}function sum32(r,t){return r+t>>>0}function sum32_3(r,t,n){return r+t+n>>>0}function sum32_4(r,t,n,u){return r+t+n+u>>>0}function sum32_5(r,t,n,u,o){return r+t+n+u+o>>>0}function assert(r,t){if(!r)throw new Error(t||"Assertion failed")}function sum64(r,t,n,u){var o=r[t],e=r[t+1],s=u+e>>>0,i=(u>s?1:0)+n+o;r[t]=i>>>0,r[t+1]=s}function sum64_hi(r,t,n,u){var o=t+u>>>0,e=(t>o?1:0)+r+n;return e>>>0}function sum64_lo(r,t,n,u){var o=t+u;return o>>>0}function sum64_4_hi(r,t,n,u,o,e,s,i){var l=0,h=t;h=h+u>>>0,l+=t>h?1:0,h=h+e>>>0,l+=e>h?1:0,h=h+i>>>0,l+=i>h?1:0;var _=r+n+o+s+l;return _>>>0}function sum64_4_lo(r,t,n,u,o,e,s,i){var l=t+u+e+i;return l>>>0}function sum64_5_hi(r,t,n,u,o,e,s,i,l,h){var _=0,a=t;a=a+u>>>0,_+=t>a?1:0,a=a+e>>>0,_+=e>a?1:0,a=a+i>>>0,_+=i>a?1:0,a=a+h>>>0,_+=h>a?1:0;var f=r+n+o+s+l+_;return f>>>0}function sum64_5_lo(r,t,n,u,o,e,s,i,l,h){var _=t+u+e+i+h;return _>>>0}function rotr64_hi(r,t,n){var u=t<<32-n|r>>>n;return u>>>0}function rotr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}function shr64_hi(r,t,n){return r>>>n}function shr64_lo(r,t,n){var u=r<<32-n|t>>>n;return u>>>0}var utils=exports,inherits=require("inherits");utils.toArray=toArray,utils.toHex=toHex,utils.htonl=htonl,utils.toHex32=toHex32,utils.zero2=zero2,utils.zero8=zero8,utils.join32=join32,utils.split32=split32,utils.rotr32=rotr32,utils.rotl32=rotl32,utils.sum32=sum32,utils.sum32_3=sum32_3,utils.sum32_4=sum32_4,utils.sum32_5=sum32_5,utils.assert=assert,utils.inherits=inherits,exports.sum64=sum64,exports.sum64_hi=sum64_hi,exports.sum64_lo=sum64_lo,exports.sum64_4_hi=sum64_4_hi,exports.sum64_4_lo=sum64_4_lo,exports.sum64_5_hi=sum64_5_hi,exports.sum64_5_lo=sum64_5_lo,exports.rotr64_hi=rotr64_hi,exports.rotr64_lo=rotr64_lo,exports.shr64_hi=shr64_hi,exports.shr64_lo=shr64_lo;


},{"inherits":162}],108:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"dup":63}],109:[function(require,module,exports){
(function (Buffer){
"use strict";function HashNoConstructor(t){Transform.call(this),this._hash=t,this.buffers=[]}function Hash(t){Transform.call(this),this._hash=t}var createHash=require("sha.js"),md5=require("./md5"),rmd160=require("ripemd160"),Transform=require("stream").Transform,inherits=require("inherits");module.exports=function(t){return"md5"===t?new HashNoConstructor(md5):"rmd160"===t?new HashNoConstructor(rmd160):new Hash(createHash(t))},inherits(HashNoConstructor,Transform),HashNoConstructor.prototype._transform=function(t,r,s){this.buffers.push(t),s()},HashNoConstructor.prototype._flush=function(t){var r=Buffer.concat(this.buffers),s=this._hash(r);this.buffers=null,this.push(s),t()},HashNoConstructor.prototype.update=function(t,r){return this.write(t,r),this},HashNoConstructor.prototype.digest=function(t){this.end();for(var r,s=new Buffer("");r=this.read();)s=Buffer.concat([s,r]);return t&&(s=s.toString(t)),s},inherits(Hash,Transform),Hash.prototype._transform=function(t,r,s){this._hash.update(t),s()},Hash.prototype._flush=function(t){this.push(this._hash.digest()),this._hash=null,t()},Hash.prototype.update=function(t,r){return this.write(t,r),this},Hash.prototype.digest=function(t){this.end();for(var r,s=new Buffer("");r=this.read();)s=Buffer.concat([s,r]);return t&&(s=s.toString(t)),s};


}).call(this,require("buffer").Buffer)

},{"./md5":111,"buffer":17,"inherits":162,"ripemd160":112,"sha.js":114,"stream":180}],110:[function(require,module,exports){
(function (Buffer){
"use strict";function toArray(r,e){if(r.length%intSize!==0){var t=r.length+(intSize-r.length%intSize);r=Buffer.concat([r,zeroBuffer],t)}for(var f=[],n=e?r.readInt32BE:r.readInt32LE,i=0;i<r.length;i+=intSize)f.push(n.call(r,i));return f}function toBuffer(r,e,t){for(var f=new Buffer(e),n=t?f.writeInt32BE:f.writeInt32LE,i=0;i<r.length;i++)n.call(f,r[i],4*i,!0);return f}function hash(r,e,t,f){Buffer.isBuffer(r)||(r=new Buffer(r));var n=e(toArray(r,f),r.length*chrsz);return toBuffer(n,t,f)}var intSize=4,zeroBuffer=new Buffer(intSize);zeroBuffer.fill(0);var chrsz=8;exports.hash=hash;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],111:[function(require,module,exports){
"use strict";function core_md5(d,_){d[_>>5]|=128<<_%32,d[(_+64>>>9<<4)+14]=_;for(var m=1732584193,f=-271733879,i=-1732584194,h=271733878,r=0;r<d.length;r+=16){var g=m,n=f,e=i,a=h;m=md5_ff(m,f,i,h,d[r+0],7,-680876936),h=md5_ff(h,m,f,i,d[r+1],12,-389564586),i=md5_ff(i,h,m,f,d[r+2],17,606105819),f=md5_ff(f,i,h,m,d[r+3],22,-1044525330),m=md5_ff(m,f,i,h,d[r+4],7,-176418897),h=md5_ff(h,m,f,i,d[r+5],12,1200080426),i=md5_ff(i,h,m,f,d[r+6],17,-1473231341),f=md5_ff(f,i,h,m,d[r+7],22,-45705983),m=md5_ff(m,f,i,h,d[r+8],7,1770035416),h=md5_ff(h,m,f,i,d[r+9],12,-1958414417),i=md5_ff(i,h,m,f,d[r+10],17,-42063),f=md5_ff(f,i,h,m,d[r+11],22,-1990404162),m=md5_ff(m,f,i,h,d[r+12],7,1804603682),h=md5_ff(h,m,f,i,d[r+13],12,-40341101),i=md5_ff(i,h,m,f,d[r+14],17,-1502002290),f=md5_ff(f,i,h,m,d[r+15],22,1236535329),m=md5_gg(m,f,i,h,d[r+1],5,-165796510),h=md5_gg(h,m,f,i,d[r+6],9,-1069501632),i=md5_gg(i,h,m,f,d[r+11],14,643717713),f=md5_gg(f,i,h,m,d[r+0],20,-373897302),m=md5_gg(m,f,i,h,d[r+5],5,-701558691),h=md5_gg(h,m,f,i,d[r+10],9,38016083),i=md5_gg(i,h,m,f,d[r+15],14,-660478335),f=md5_gg(f,i,h,m,d[r+4],20,-405537848),m=md5_gg(m,f,i,h,d[r+9],5,568446438),h=md5_gg(h,m,f,i,d[r+14],9,-1019803690),i=md5_gg(i,h,m,f,d[r+3],14,-187363961),f=md5_gg(f,i,h,m,d[r+8],20,1163531501),m=md5_gg(m,f,i,h,d[r+13],5,-1444681467),h=md5_gg(h,m,f,i,d[r+2],9,-51403784),i=md5_gg(i,h,m,f,d[r+7],14,1735328473),f=md5_gg(f,i,h,m,d[r+12],20,-1926607734),m=md5_hh(m,f,i,h,d[r+5],4,-378558),h=md5_hh(h,m,f,i,d[r+8],11,-2022574463),i=md5_hh(i,h,m,f,d[r+11],16,1839030562),f=md5_hh(f,i,h,m,d[r+14],23,-35309556),m=md5_hh(m,f,i,h,d[r+1],4,-1530992060),h=md5_hh(h,m,f,i,d[r+4],11,1272893353),i=md5_hh(i,h,m,f,d[r+7],16,-155497632),f=md5_hh(f,i,h,m,d[r+10],23,-1094730640),m=md5_hh(m,f,i,h,d[r+13],4,681279174),h=md5_hh(h,m,f,i,d[r+0],11,-358537222),i=md5_hh(i,h,m,f,d[r+3],16,-722521979),f=md5_hh(f,i,h,m,d[r+6],23,76029189),m=md5_hh(m,f,i,h,d[r+9],4,-640364487),h=md5_hh(h,m,f,i,d[r+12],11,-421815835),i=md5_hh(i,h,m,f,d[r+15],16,530742520),f=md5_hh(f,i,h,m,d[r+2],23,-995338651),m=md5_ii(m,f,i,h,d[r+0],6,-198630844),h=md5_ii(h,m,f,i,d[r+7],10,1126891415),i=md5_ii(i,h,m,f,d[r+14],15,-1416354905),f=md5_ii(f,i,h,m,d[r+5],21,-57434055),m=md5_ii(m,f,i,h,d[r+12],6,1700485571),h=md5_ii(h,m,f,i,d[r+3],10,-1894986606),i=md5_ii(i,h,m,f,d[r+10],15,-1051523),f=md5_ii(f,i,h,m,d[r+1],21,-2054922799),m=md5_ii(m,f,i,h,d[r+8],6,1873313359),h=md5_ii(h,m,f,i,d[r+15],10,-30611744),i=md5_ii(i,h,m,f,d[r+6],15,-1560198380),f=md5_ii(f,i,h,m,d[r+13],21,1309151649),m=md5_ii(m,f,i,h,d[r+4],6,-145523070),h=md5_ii(h,m,f,i,d[r+11],10,-1120210379),i=md5_ii(i,h,m,f,d[r+2],15,718787259),f=md5_ii(f,i,h,m,d[r+9],21,-343485551),m=safe_add(m,g),f=safe_add(f,n),i=safe_add(i,e),h=safe_add(h,a)}return Array(m,f,i,h)}function md5_cmn(d,_,m,f,i,h){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,h)),i),m)}function md5_ff(d,_,m,f,i,h,r){return md5_cmn(_&m|~_&f,d,_,i,h,r)}function md5_gg(d,_,m,f,i,h,r){return md5_cmn(_&f|m&~f,d,_,i,h,r)}function md5_hh(d,_,m,f,i,h,r){return md5_cmn(_^m^f,d,_,i,h,r)}function md5_ii(d,_,m,f,i,h,r){return md5_cmn(m^(_|~f),d,_,i,h,r)}function safe_add(d,_){var m=(65535&d)+(65535&_),f=(d>>16)+(_>>16)+(m>>16);return f<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}var helpers=require("./helpers");module.exports=function(d){return helpers.hash(d,core_md5,16)};


},{"./helpers":110}],112:[function(require,module,exports){
(function (Buffer){
function bytesToWords(r){for(var f=[],n=0,t=0;n<r.length;n++,t+=8)f[t>>>5]|=r[n]<<24-t%32;return f}function wordsToBytes(r){for(var f=[],n=0;n<32*r.length;n+=8)f.push(r[n>>>5]>>>24-n%32&255);return f}function processBlock(r,f,n){for(var t=0;16>t;t++){var o=n+t,e=f[o];f[o]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var u,l,s,h,c,a,i,v,d,p;a=u=r[0],i=l=r[1],v=s=r[2],d=h=r[3],p=c=r[4];for(var g,t=0;80>t;t+=1)g=u+f[n+zl[t]]|0,g+=16>t?f1(l,s,h)+hl[0]:32>t?f2(l,s,h)+hl[1]:48>t?f3(l,s,h)+hl[2]:64>t?f4(l,s,h)+hl[3]:f5(l,s,h)+hl[4],g=0|g,g=rotl(g,sl[t]),g=g+c|0,u=c,c=h,h=rotl(s,10),s=l,l=g,g=a+f[n+zr[t]]|0,g+=16>t?f5(i,v,d)+hr[0]:32>t?f4(i,v,d)+hr[1]:48>t?f3(i,v,d)+hr[2]:64>t?f2(i,v,d)+hr[3]:f1(i,v,d)+hr[4],g=0|g,g=rotl(g,sr[t]),g=g+p|0,a=p,p=d,d=rotl(v,10),v=i,i=g;g=r[1]+s+d|0,r[1]=r[2]+h+p|0,r[2]=r[3]+c+a|0,r[3]=r[4]+u+i|0,r[4]=r[0]+l+v|0,r[0]=g}function f1(r,f,n){return r^f^n}function f2(r,f,n){return r&f|~r&n}function f3(r,f,n){return(r|~f)^n}function f4(r,f,n){return r&n|f&~n}function f5(r,f,n){return r^(f|~n)}function rotl(r,f){return r<<f|r>>>32-f}function ripemd160(r){var f=[1732584193,4023233417,2562383102,271733878,3285377520];"string"==typeof r&&(r=new Buffer(r,"utf8"));var n=bytesToWords(r),t=8*r.length,o=8*r.length;n[t>>>5]|=128<<24-t%32,n[(t+64>>>9<<4)+14]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8);for(var e=0;e<n.length;e+=16)processBlock(f,n,e);for(var e=0;5>e;e++){var u=f[e];f[e]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var l=wordsToBytes(f);return new Buffer(l)}var zl=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],zr=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],sl=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],sr=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11],hl=[0,1518500249,1859775393,2400959708,2840853838],hr=[1352829926,1548603684,1836072691,2053994217,0];module.exports=ripemd160;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],113:[function(require,module,exports){
(function (Buffer){
function Hash(t,i){this._block=new Buffer(t),this._finalSize=i,this._blockSize=t,this._len=0,this._s=0}Hash.prototype.update=function(t,i){"string"==typeof t&&(i=i||"utf8",t=new Buffer(t,i));for(var s=this._len+=t.length,e=this._s||0,h=0,o=this._block;s>e;){for(var l=Math.min(t.length,h+this._blockSize-e%this._blockSize),_=l-h,n=0;_>n;n++)o[e%this._blockSize+n]=t[n+h];e+=_,h+=_,e%this._blockSize===0&&this._update(o)}return this._s=e,this},Hash.prototype.digest=function(t){var i=8*this._len;this._block[this._len%this._blockSize]=128,this._block.fill(0,this._len%this._blockSize+1),i%(8*this._blockSize)>=8*this._finalSize&&(this._update(this._block),this._block.fill(0)),this._block.writeInt32BE(i,this._blockSize-4);var s=this._update(this._block)||this._hash();return t?s.toString(t):s},Hash.prototype._update=function(){throw new Error("_update must be implemented by subclass")},module.exports=Hash;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],114:[function(require,module,exports){
var exports=module.exports=function(e){var r=exports[e.toLowerCase()];if(!r)throw new Error(e+" is not supported (we accept pull requests)");return new r};exports.sha1=require("./sha1"),exports.sha224=require("./sha224"),exports.sha256=require("./sha256"),exports.sha384=require("./sha384"),exports.sha512=require("./sha512");


},{"./sha1":115,"./sha224":116,"./sha256":117,"./sha384":118,"./sha512":119}],115:[function(require,module,exports){
(function (Buffer){
function Sha1(){this.init(),this._w=W,Hash.call(this,64,56)}function rol(t,i){return t<<i|t>>>32-i}var inherits=require("inherits"),Hash=require("./hash"),W=new Array(80);inherits(Sha1,Hash),Sha1.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},Sha1.prototype._update=function(t){function i(){return rol(s[u-3]^s[u-8]^s[u-14]^s[u-16],1)}function h(t,i){s[u]=t;var h=rol(e,5)+i+o+t+r;o=a,a=_,_=rol(n,30),n=e,e=h,u++}var r,s=this._w,e=this._a,n=this._b,_=this._c,a=this._d,o=this._e,u=0;for(r=1518500249;16>u;)h(t.readInt32BE(4*u),n&_|~n&a);for(;20>u;)h(i(),n&_|~n&a);for(r=1859775393;40>u;)h(i(),n^_^a);for(r=-1894007588;60>u;)h(i(),n&_|n&a|_&a);for(r=-899497514;80>u;)h(i(),n^_^a);this._a=e+this._a|0,this._b=n+this._b|0,this._c=_+this._c|0,this._d=a+this._d|0,this._e=o+this._e|0},Sha1.prototype._hash=function(){var t=new Buffer(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},module.exports=Sha1;


}).call(this,require("buffer").Buffer)

},{"./hash":113,"buffer":17,"inherits":162}],116:[function(require,module,exports){
(function (Buffer){
function Sha224(){this.init(),this._w=W,Hash.call(this,64,56)}var inherits=require("inherits"),SHA256=require("./sha256"),Hash=require("./hash"),W=new Array(64);inherits(Sha224,SHA256),Sha224.prototype.init=function(){return this._a=-1056596264,this._b=914150663,this._c=812702999,this._d=-150054599,this._e=-4191439,this._f=1750603025,this._g=1694076839,this._h=-1090891868,this},Sha224.prototype._hash=function(){var t=new Buffer(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},module.exports=Sha224;


}).call(this,require("buffer").Buffer)

},{"./hash":113,"./sha256":117,"buffer":17,"inherits":162}],117:[function(require,module,exports){
(function (Buffer){
function Sha256(){this.init(),this._w=W,Hash.call(this,64,56)}function S(t,i){return t>>>i|t<<32-i}function R(t,i){return t>>>i}function Ch(t,i,h){return t&i^~t&h}function Maj(t,i,h){return t&i^t&h^i&h}function Sigma0256(t){return S(t,2)^S(t,13)^S(t,22)}function Sigma1256(t){return S(t,6)^S(t,11)^S(t,25)}function Gamma0256(t){return S(t,7)^S(t,18)^R(t,3)}function Gamma1256(t){return S(t,17)^S(t,19)^R(t,10)}var inherits=require("inherits"),Hash=require("./hash"),K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],W=new Array(64);inherits(Sha256,Hash),Sha256.prototype.init=function(){return this._a=1779033703,this._b=-1150833019,this._c=1013904242,this._d=-1521486534,this._e=1359893119,this._f=-1694144372,this._g=528734635,this._h=1541459225,this},Sha256.prototype._update=function(t){function i(){return Gamma1256(n[S-2])+n[S-7]+Gamma0256(n[S-15])+n[S-16]}function h(t){n[S]=t;var i=f+Sigma1256(a)+Ch(a,u,o)+K[S]+t,h=Sigma0256(s)+Maj(s,r,_);f=o,o=u,u=a,a=e+i,e=_,_=r,r=s,s=i+h,S++}for(var n=this._w,s=0|this._a,r=0|this._b,_=0|this._c,e=0|this._d,a=0|this._e,u=0|this._f,o=0|this._g,f=0|this._h,S=0;16>S;)h(t.readInt32BE(4*S));for(;64>S;)h(i());this._a=s+this._a|0,this._b=r+this._b|0,this._c=_+this._c|0,this._d=e+this._d|0,this._e=a+this._e|0,this._f=u+this._f|0,this._g=o+this._g|0,this._h=f+this._h|0},Sha256.prototype._hash=function(){var t=new Buffer(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},module.exports=Sha256;


}).call(this,require("buffer").Buffer)

},{"./hash":113,"buffer":17,"inherits":162}],118:[function(require,module,exports){
(function (Buffer){
function Sha384(){this.init(),this._w=W,Hash.call(this,128,112)}var inherits=require("inherits"),SHA512=require("./sha512"),Hash=require("./hash"),W=new Array(160);inherits(Sha384,SHA512),Sha384.prototype.init=function(){return this._a=-876896931,this._b=1654270250,this._c=-1856437926,this._d=355462360,this._e=1731405415,this._f=-1900787065,this._g=-619958771,this._h=1203062813,this._al=-1056596264,this._bl=914150663,this._cl=812702999,this._dl=-150054599,this._el=-4191439,this._fl=1750603025,this._gl=1694076839,this._hl=-1090891868,this},Sha384.prototype._hash=function(){function t(t,h,s){i.writeInt32BE(t,s),i.writeInt32BE(h,s+4)}var i=new Buffer(48);return t(this._a,this._al,0),t(this._b,this._bl,8),t(this._c,this._cl,16),t(this._d,this._dl,24),t(this._e,this._el,32),t(this._f,this._fl,40),i},module.exports=Sha384;


}).call(this,require("buffer").Buffer)

},{"./hash":113,"./sha512":119,"buffer":17,"inherits":162}],119:[function(require,module,exports){
(function (Buffer){
function Sha512(){this.init(),this._w=W,Hash.call(this,128,112)}function S(t,h,i){return t>>>i|h<<32-i}function Ch(t,h,i){return t&h^~t&i}function Maj(t,h,i){return t&h^t&i^h&i}var inherits=require("inherits"),Hash=require("./hash"),K=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],W=new Array(160);inherits(Sha512,Hash),Sha512.prototype.init=function(){return this._a=1779033703,this._b=-1150833019,this._c=1013904242,this._d=-1521486534,this._e=1359893119,this._f=-1694144372,this._g=528734635,this._h=1541459225,this._al=-205731576,this._bl=-2067093701,this._cl=-23791573,this._dl=1595750129,this._el=-1377402159,this._fl=725511199,this._gl=-79577749,this._hl=327033209,this},Sha512.prototype._update=function(t){function h(){var t=l[I-30],h=l[I-30+1],i=S(t,h,1)^S(t,h,8)^t>>>7,a=S(h,t,1)^S(h,t,8)^S(h,t,7);t=l[I-4],h=l[I-4+1];var r=S(t,h,19)^S(h,t,29)^t>>>6,e=S(h,t,19)^S(t,h,29)^S(h,t,6),n=l[I-14],f=l[I-14+1],c=l[I-32],o=l[I-32+1];_=a+f,s=i+n+(a>>>0>_>>>0?1:0),_+=e,s=s+r+(e>>>0>_>>>0?1:0),_+=o,s=s+c+(o>>>0>_>>>0?1:0)}function i(){l[I]=s,l[I+1]=_;var t=Maj(a,r,e),h=Maj(d,b,g),i=S(a,d,28)^S(d,a,2)^S(d,a,7),j=S(d,a,28)^S(a,d,2)^S(a,d,7),C=S(f,v,14)^S(f,v,18)^S(v,f,9),H=S(v,f,14)^S(v,f,18)^S(f,v,9),M=K[I],q=K[I+1],W=Ch(f,c,o),m=Ch(v,w,B),x=y+H,A=u+C+(y>>>0>x>>>0?1:0);x+=m,A=A+W+(m>>>0>x>>>0?1:0),x+=q,A=A+M+(q>>>0>x>>>0?1:0),x+=_,A=A+s+(_>>>0>x>>>0?1:0);var k=j+h,z=i+t+(j>>>0>k>>>0?1:0);u=o,y=B,o=c,B=w,c=f,w=v,v=p+x|0,f=n+A+(p>>>0>v>>>0?1:0)|0,n=e,p=g,e=r,g=b,r=a,b=d,d=x+k|0,a=A+z+(x>>>0>d>>>0?1:0)|0,E++,I+=2}for(var s,_,l=this._w,a=0|this._a,r=0|this._b,e=0|this._c,n=0|this._d,f=0|this._e,c=0|this._f,o=0|this._g,u=0|this._h,d=0|this._al,b=0|this._bl,g=0|this._cl,p=0|this._dl,v=0|this._el,w=0|this._fl,B=0|this._gl,y=0|this._hl,E=0,I=0;16>E;)s=t.readInt32BE(4*I),_=t.readInt32BE(4*I+4),i();for(;80>E;)h(),i();this._al=this._al+d|0,this._bl=this._bl+b|0,this._cl=this._cl+g|0,this._dl=this._dl+p|0,this._el=this._el+v|0,this._fl=this._fl+w|0,this._gl=this._gl+B|0,this._hl=this._hl+y|0,this._a=this._a+a+(this._al>>>0<d>>>0?1:0)|0,this._b=this._b+r+(this._bl>>>0<b>>>0?1:0)|0,this._c=this._c+e+(this._cl>>>0<g>>>0?1:0)|0,this._d=this._d+n+(this._dl>>>0<p>>>0?1:0)|0,this._e=this._e+f+(this._el>>>0<v>>>0?1:0)|0,this._f=this._f+c+(this._fl>>>0<w>>>0?1:0)|0,this._g=this._g+o+(this._gl>>>0<B>>>0?1:0)|0,this._h=this._h+u+(this._hl>>>0<y>>>0?1:0)|0},Sha512.prototype._hash=function(){function t(t,i,s){h.writeInt32BE(t,s),h.writeInt32BE(i,s+4)}var h=new Buffer(64);return t(this._a,this._al,0),t(this._b,this._bl,8),t(this._c,this._cl,16),t(this._d,this._dl,24),t(this._e,this._el,32),t(this._f,this._fl,40),t(this._g,this._gl,48),t(this._h,this._hl,56),h},module.exports=Sha512;


}).call(this,require("buffer").Buffer)

},{"./hash":113,"buffer":17,"inherits":162}],120:[function(require,module,exports){
(function (Buffer){
"use strict";function Hmac(t,e){Transform.call(this),"string"==typeof e&&(e=new Buffer(e));var r="sha512"===t||"sha384"===t?128:64;this._alg=t,this._key=e,e.length>r?e=createHash(t).update(e).digest():e.length<r&&(e=Buffer.concat([e,ZEROS],r));for(var a=this._ipad=new Buffer(r),s=this._opad=new Buffer(r),i=0;r>i;i++)a[i]=54^e[i],s[i]=92^e[i];this._hash=createHash(t).update(a)}var createHash=require("create-hash/browser"),inherits=require("inherits"),Transform=require("stream").Transform,ZEROS=new Buffer(128);ZEROS.fill(0),inherits(Hmac,Transform),Hmac.prototype.update=function(t,e){return this._hash.update(t,e),this},Hmac.prototype._transform=function(t,e,r){this._hash.update(t),r()},Hmac.prototype._flush=function(t){this.push(this.digest()),t()},Hmac.prototype.digest=function(t){var e=this._hash.digest();return createHash(this._alg).update(this._opad).update(e).digest(t)},module.exports=function(t,e){return new Hmac(t,e)};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"create-hash/browser":109,"inherits":162,"stream":180}],121:[function(require,module,exports){
(function (Buffer){
function getDiffieHellman(e){var r=new Buffer(primes[e].prime,"hex"),f=new Buffer(primes[e].gen,"hex");return new DH(r,f)}function createDiffieHellman(e,r,f,i){return(Buffer.isBuffer(r)||"string"==typeof r&&-1===["hex","binary","base64"].indexOf(r))&&(i=f,f=r,r=void 0),r=r||"binary",i=i||"binary",f=f||new Buffer([2]),Buffer.isBuffer(f)||(f=new Buffer(f,i)),"number"==typeof e?new DH(generatePrime(e,f),f,!0):(Buffer.isBuffer(e)||(e=new Buffer(e,r)),new DH(e,f,!0))}var generatePrime=require("./lib/generatePrime"),primes=require("./lib/primes"),DH=require("./lib/dh");exports.DiffieHellmanGroup=exports.createDiffieHellmanGroup=exports.getDiffieHellman=getDiffieHellman,exports.createDiffieHellman=exports.DiffieHellman=createDiffieHellman;


}).call(this,require("buffer").Buffer)

},{"./lib/dh":122,"./lib/generatePrime":123,"./lib/primes":124,"buffer":17}],122:[function(require,module,exports){
(function (Buffer){
function setPublicKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._pub=new BN(e),this}function setPrivateKey(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._priv=new BN(e),this}function checkPrime(e,r){var t=r.toString("hex"),i=[t,e.toString(16)].join("_");if(i in primeCache)return primeCache[i];var n=0;if(e.isEven()||!primes.simpleSieve||!primes.fermatTest(e)||!millerRabin.test(e))return n+=1,n+="02"===t||"05"===t?8:4,primeCache[i]=n,n;millerRabin.test(e.shrn(1))||(n+=2);var u;switch(t){case"02":e.mod(TWENTYFOUR).cmp(ELEVEN)&&(n+=8);break;case"05":u=e.mod(TEN),u.cmp(THREE)&&u.cmp(SEVEN)&&(n+=8);break;default:n+=4}return primeCache[i]=n,n}function defineError(e,r){try{Object.defineProperty(e,"verifyError",{enumerable:!0,value:r,writable:!1})}catch(t){e.verifyError=r}}function DH(e,r,t){this.setGenerator(r),this.__prime=new BN(e),this._prime=BN.mont(this.__prime),this._primeLen=e.length,this._pub=void 0,this._priv=void 0,t?(this.setPublicKey=setPublicKey,this.setPrivateKey=setPrivateKey,defineError(this,checkPrime(this.__prime,r))):defineError(this,8)}function formatReturnValue(e,r){var t=new Buffer(e.toArray());return r?t.toString(r):t}var BN=require("bn.js"),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,TWENTYFOUR=new BN(24),ELEVEN=new BN(11),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),primes=require("./generatePrime"),randomBytes=require("randombytes");module.exports=DH;var primeCache={};DH.prototype.generateKeys=function(){return this._priv||(this._priv=new BN(randomBytes(this._primeLen))),this._pub=this._gen.toRed(this._prime).redPow(this._priv).fromRed(),this.getPublicKey()},DH.prototype.computeSecret=function(e){e=new BN(e),e=e.toRed(this._prime);var r=e.redPow(this._priv).fromRed(),t=new Buffer(r.toArray()),i=this.getPrime();if(t.length<i.length){var n=new Buffer(i.length-t.length);n.fill(0),t=Buffer.concat([n,t])}return t},DH.prototype.getPublicKey=function(e){return formatReturnValue(this._pub,e)},DH.prototype.getPrivateKey=function(e){return formatReturnValue(this._priv,e)},DH.prototype.getPrime=function(e){return formatReturnValue(this.__prime,e)},DH.prototype.getGenerator=function(e){return formatReturnValue(this._gen,e)},DH.prototype.setGenerator=function(e,r){return r=r||"utf8",Buffer.isBuffer(e)||(e=new Buffer(e,r)),this._gen=new BN(e),this};


}).call(this,require("buffer").Buffer)

},{"./generatePrime":123,"bn.js":125,"buffer":17,"miller-rabin":126,"randombytes":155}],123:[function(require,module,exports){
function _getPrimes(){if(null!==primes)return primes;var e=1048576,r=[];r[0]=2;for(var n=1,i=3;e>i;i+=2){for(var m=Math.ceil(Math.sqrt(i)),t=0;n>t&&r[t]<=m&&i%r[t]!==0;t++);n!==t&&r[t]<=m||(r[n++]=i)}return primes=r,r}function simpleSieve(e){for(var r=_getPrimes(),n=0;n<r.length;n++)if(0===e.modn(r[n]))return 0===e.cmpn(r[n])?!0:!1;return!0}function fermatTest(e){var r=BN.mont(e);return 0===TWO.toRed(r).redPow(e.subn(1)).fromRed().cmpn(1)}function findPrime(e,r){function n(e){i=-1;for(var n=new BN(randomBytes(Math.ceil(e/8)));n.bitLength()>e;)n.ishrn(1);if(n.isEven()&&n.iadd(ONE),n.testn(1)||n.iadd(TWO),r.cmp(TWO))if(r.cmp(FIVE))m={major:[FOUR],minor:[TWO]};else{for(rem=n.mod(TEN);rem.cmp(THREE);)n.iadd(FOUR),rem=n.mod(TEN);m={major:[FOUR,SIXTEEN],minor:[TWO,EIGHT]}}else{for(;n.mod(TWENTYFOUR).cmp(ELEVEN);)n.iadd(FOUR);m={major:[TWENTYFOUR],minor:[TWELVE]}}return n}if(16>e)return new BN(2===r||5===r?[140,123]:[140,39]);r=new BN(r);for(var i,m,t=n(e),a=t.shrn(1);;){for(;t.bitLength()>e;)t=n(e),a=t.shrn(1);if(i++,simpleSieve(a)&&simpleSieve(t)&&fermatTest(a)&&fermatTest(t)&&millerRabin.test(a)&&millerRabin.test(t))return t;t.iadd(m.major[i%m.major.length]),a.iadd(m.minor[i%m.minor.length])}}var randomBytes=require("randombytes");module.exports=findPrime,findPrime.simpleSieve=simpleSieve,findPrime.fermatTest=fermatTest;var BN=require("bn.js"),TWENTYFOUR=new BN(24),MillerRabin=require("miller-rabin"),millerRabin=new MillerRabin,ONE=new BN(1),TWO=new BN(2),FIVE=new BN(5),SIXTEEN=new BN(16),EIGHT=new BN(8),TEN=new BN(10),THREE=new BN(3),SEVEN=new BN(7),ELEVEN=new BN(11),FOUR=new BN(4),TWELVE=new BN(12),primes=null;


},{"bn.js":125,"miller-rabin":126,"randombytes":155}],124:[function(require,module,exports){
module.exports={
    "modp1": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
    },
    "modp2": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
    },
    "modp5": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
    },
    "modp14": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
    },
    "modp15": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
    },
    "modp16": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
    },
    "modp17": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
    },
    "modp18": {
        "gen": "02",
        "prime": "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
    }
}
},{}],125:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function n(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function s(t,i,r){return null!==t&&"object"==typeof t&&Array.isArray(t.words)?t:(this.sign=!1,this.words=null,this.length=0,this.red=null,("le"===i||"be"===i)&&(r=i,i=10),void(null!==t&&this._init(t||0,i||10,r||"be")))}function h(t,i,r){for(var n=0,s=Math.min(t.length,r),h=i;s>h;h++){var e=t.charCodeAt(h)-48;n<<=4,n|=e>=49&&54>=e?e-49+10:e>=17&&22>=e?e-17+10:15&e}return n}function e(t,i,r,n){for(var s=0,h=Math.min(t.length,r),e=i;h>e;e++){var o=t.charCodeAt(e)-48;s*=n,s+=o>=49?o-49+10:o>=17?o-17+10:o}return s}function o(t,i){this.name=t,this.p=new s(i,16),this.n=this.p.bitLength(),this.k=new s(1).ishln(this.n).isub(this.p),this.tmp=this._tmp()}function f(){o.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function d(){o.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function u(){o.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function l(){o.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function p(t){if("string"==typeof t){var i=s._prime(t);this.m=i.p,this.prime=i}else this.m=t,this.prime=null}function g(t){p.call(this,t),this.shift=this.m.bitLength(),this.shift%26!==0&&(this.shift+=26-this.shift%26),this.r=new s(1).ishln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r.invm(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv.sign=!0,this.minv=this.minv.mod(this.r)}"object"==typeof t?t.exports=s:i.BN=s,s.BN=s,s.wordSize=26,s.prototype._init=function(t,i,n){if("number"==typeof t)return 0>t&&(this.sign=!0,t=-t),void(67108864>t?(this.words=[67108863&t],this.length=1):(this.words=[67108863&t,t/67108864&67108863],this.length=2));if("object"==typeof t)return this._initArray(t,i,n);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&36>=i),t=t.toString().replace(/\s+/g,"");var s=0;"-"===t[0]&&s++,16===i?this._parseHex(t,s):this._parseBase(t,i,s),"-"===t[0]&&(this.sign=!0),this.strip()},s.prototype._initArray=function(t,i,n){r("number"==typeof t.length),this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var s=0;s<this.length;s++)this.words[s]=0;var h=0;if("be"===n)for(var s=t.length-1,e=0;s>=0;s-=3){var o=t[s]|t[s-1]<<8|t[s-2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}else if("le"===n)for(var s=0,e=0;s<t.length;s+=3){var o=t[s]|t[s+1]<<8|t[s+2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}return this.strip()},s.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;for(var n=0,r=t.length-6,s=0;r>=i;r-=6){var e=h(t,r,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303,n+=24,n>=26&&(n-=26,s++)}if(r+6!==i){var e=h(t,i,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303}this.strip()},s.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var n=0,s=1;67108863>=s;s*=i)n++;n--,s=s/i|0;for(var h=t.length-r,o=h%n,f=Math.min(h,h-o)+r,d=0,u=r;f>u;u+=n)d=e(t,u,u+n,i),this.imuln(s),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d);if(0!==o){for(var l=1,d=e(t,u,t.length,i),u=0;o>u;u++)l*=i;this.imuln(l),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d)}},s.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.sign=this.sign,t.red=this.red},s.prototype.clone=function(){var t=new s(null);return this.copy(t),t},s.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},s.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.sign=!1),this},s.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var a=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],c=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],m=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];s.prototype.toString=function(t,i){if(t=t||10,16===t||"hex"===t){for(var n="",s=0,i=0|i||1,h=0,e=0;e<this.length;e++){var o=this.words[e],f=(16777215&(o<<s|h)).toString(16);h=o>>>24-s&16777215,n=0!==h||e!==this.length-1?a[6-f.length]+f+n:f+n,s+=2,s>=26&&(s-=26,e--)}for(0!==h&&(n=h.toString(16)+n);n.length%i!==0;)n="0"+n;return this.sign&&(n="-"+n),n}if(t===(0|t)&&t>=2&&36>=t){var d=c[t],u=m[t],n="",l=this.clone();for(l.sign=!1;0!==l.cmpn(0);){var p=l.modn(u).toString(t);l=l.idivn(u),n=0!==l.cmpn(0)?a[d-p.length]+p+n:p+n}return 0===this.cmpn(0)&&(n="0"+n),this.sign&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},s.prototype.toJSON=function(){return this.toString(16)},s.prototype.toArray=function(){this.strip();var t=new Array(this.byteLength());t[0]=0;for(var i=this.clone(),r=0;0!==i.cmpn(0);r++){var n=i.andln(255);i.ishrn(8),t[t.length-r-1]=n}return t},s.prototype._countBits=function(t){return t>=33554432?26:t>=16777216?25:t>=8388608?24:t>=4194304?23:t>=2097152?22:t>=1048576?21:t>=524288?20:t>=262144?19:t>=131072?18:t>=65536?17:t>=32768?16:t>=16384?15:t>=8192?14:t>=4096?13:t>=2048?12:t>=1024?11:t>=512?10:t>=256?9:t>=128?8:t>=64?7:t>=32?6:t>=16?5:t>=8?4:t>=4?3:t>=2?2:t>=1?1:0},s.prototype.bitLength=function(){var t=0,i=this.words[this.length-1],t=this._countBits(i);return 26*(this.length-1)+t},s.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},s.prototype.neg=function(){if(0===this.cmpn(0))return this.clone();var t=this.clone();return t.sign=!this.sign,t},s.prototype.ior=function(t){for(this.sign=this.sign||t.sign;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},s.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},s.prototype.iand=function(t){this.sign=this.sign&&t.sign;var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},s.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},s.prototype.ixor=function(t){this.sign=this.sign||t.sign;var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var n=0;n<r.length;n++)this.words[n]=i.words[n]^r.words[n];if(this!==i)for(;n<i.length;n++)this.words[n]=i.words[n];return this.length=i.length,this.strip()},s.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},s.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);for(var n=t/26|0,s=t%26;this.length<=n;)this.words[this.length++]=0;return this.words[n]=i?this.words[n]|1<<s:this.words[n]&~(1<<s),this.strip()},s.prototype.iadd=function(t){if(this.sign&&!t.sign){this.sign=!1;var i=this.isub(t);return this.sign=!this.sign,this._normSign()}if(!this.sign&&t.sign){t.sign=!1;var i=this.isub(t);return t.sign=!0,i._normSign()}var r,n;this.length>t.length?(r=this,n=t):(r=t,n=this);for(var s=0,h=0;h<n.length;h++){var i=r.words[h]+n.words[h]+s;this.words[h]=67108863&i,s=i>>>26}for(;0!==s&&h<r.length;h++){var i=r.words[h]+s;this.words[h]=67108863&i,s=i>>>26}if(this.length=r.length,0!==s)this.words[this.length]=s,this.length++;else if(r!==this)for(;h<r.length;h++)this.words[h]=r.words[h];return this},s.prototype.add=function(t){if(t.sign&&!this.sign){t.sign=!1;var i=this.sub(t);return t.sign=!0,i}if(!t.sign&&this.sign){this.sign=!1;var i=t.sub(this);return this.sign=!0,i}return this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},s.prototype.isub=function(t){if(t.sign){t.sign=!1;var i=this.iadd(t);return t.sign=!0,i._normSign()}if(this.sign)return this.sign=!1,this.iadd(t),this.sign=!0,this._normSign();var r=this.cmp(t);if(0===r)return this.sign=!1,this.length=1,this.words[0]=0,this;var n,s;r>0?(n=this,s=t):(n=t,s=this);for(var h=0,e=0;e<s.length;e++){var i=n.words[e]-s.words[e]+h;h=i>>26,this.words[e]=67108863&i}for(;0!==h&&e<n.length;e++){var i=n.words[e]+h;h=i>>26,this.words[e]=67108863&i}if(0===h&&e<n.length&&n!==this)for(;e<n.length;e++)this.words[e]=n.words[e];return this.length=Math.max(this.length,e),n!==this&&(this.sign=!0),this.strip()},s.prototype.sub=function(t){return this.clone().isub(t)},s.prototype._smallMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0;n<i.length-1;n++){for(var s=r>>>26,h=67108863&r,e=Math.min(n,t.length-1),o=Math.max(0,n-this.length+1);e>=o;o++){var f=n-o,d=0|this.words[f],u=0|t.words[o],l=d*u,p=67108863&l;s=s+(l/67108864|0)|0,p=p+h|0,h=67108863&p,s=s+(p>>>26)|0}i.words[n]=h,r=s}return 0!==r?i.words[n]=r:i.length--,i.strip()},s.prototype._bigMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0,s=0;s<i.length-1;s++){var h=n;n=0;for(var e=67108863&r,o=Math.min(s,t.length-1),f=Math.max(0,s-this.length+1);o>=f;f++){var d=s-f,u=0|this.words[d],l=0|t.words[f],p=u*l,g=67108863&p;h=h+(p/67108864|0)|0,g=g+e|0,e=67108863&g,h=h+(g>>>26)|0,n+=h>>>26,h&=67108863}i.words[s]=e,r=h,h=n}return 0!==r?i.words[s]=r:i.length--,i.strip()},s.prototype.mulTo=function(t,i){var r;return r=this.length+t.length<63?this._smallMulTo(t,i):this._bigMulTo(t,i)},s.prototype.mul=function(t){var i=new s(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},s.prototype.imul=function(t){if(0===this.cmpn(0)||0===t.cmpn(0))return this.words[0]=0,this.length=1,this;var i=this.length,r=t.length;this.sign=t.sign!==this.sign,this.length=this.length+t.length,this.words[this.length-1]=0;for(var n=this.length-2;n>=0;n--){for(var s=0,h=0,e=Math.min(n,r-1),o=Math.max(0,n-i+1);e>=o;o++){var f=n-o,d=this.words[f],u=t.words[o],l=d*u,p=67108863&l;s+=l/67108864|0,p+=h,h=67108863&p,s+=p>>>26}this.words[n]=h,this.words[n+1]+=s,s=0}for(var s=0,f=1;f<this.length;f++){var g=this.words[f]+s;this.words[f]=67108863&g,s=g>>>26}return this.strip()},s.prototype.imuln=function(t){r("number"==typeof t);for(var i=0,n=0;n<this.length;n++){var s=this.words[n]*t,h=(67108863&s)+(67108863&i);i>>=26,i+=s/67108864|0,i+=h>>>26,this.words[n]=67108863&h}return 0!==i&&(this.words[n]=i,this.length++),this},s.prototype.sqr=function(){return this.mul(this)},s.prototype.isqr=function(){return this.mul(this)},s.prototype.ishln=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=67108863>>>26-i<<26-i;if(0!==i){for(var h=0,e=0;e<this.length;e++){var o=this.words[e]&s,f=this.words[e]-o<<i;this.words[e]=f|h,h=o>>>26-i}h&&(this.words[e]=h,this.length++)}if(0!==n){for(var e=this.length-1;e>=0;e--)this.words[e+n]=this.words[e];for(var e=0;n>e;e++)this.words[e]=0;this.length+=n}return this.strip()},s.prototype.ishrn=function(t,i,n){r("number"==typeof t&&t>=0),i=i?(i-i%26)/26:0;var s=t%26,h=Math.min((t-s)/26,this.length),e=67108863^67108863>>>s<<s,o=n;if(i-=h,i=Math.max(0,i),o){for(var f=0;h>f;f++)o.words[f]=this.words[f];o.length=h}if(0===h);else if(this.length>h){this.length-=h;for(var f=0;f<this.length;f++)this.words[f]=this.words[f+h]}else this.words[0]=0,this.length=1;for(var d=0,f=this.length-1;f>=0&&(0!==d||f>=i);f--){var u=this.words[f];this.words[f]=d<<26-s|u>>>s,d=u&e}return o&&0!==d&&(o.words[o.length++]=d),0===this.length&&(this.words[0]=0,this.length=1),this.strip(),n?{hi:this,lo:o}:this},s.prototype.shln=function(t){return this.clone().ishln(t)},s.prototype.shrn=function(t){return this.clone().ishrn(t)},s.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n)return!1;var h=this.words[n];return!!(h&s)},s.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26;if(r(!this.sign,"imaskn works only with positive numbers"),0!==i&&n++,this.length=Math.min(n,this.length),0!==i){var s=67108863^67108863>>>i<<i;this.words[this.length-1]&=s}return this.strip()},s.prototype.maskn=function(t){return this.clone().imaskn(t)},s.prototype.iaddn=function(t){return r("number"==typeof t),0>t?this.isubn(-t):this.sign?1===this.length&&this.words[0]<t?(this.words[0]=t-this.words[0],this.sign=!1,this):(this.sign=!1,this.isubn(t),this.sign=!0,this):this._iaddn(t)},s.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},s.prototype.isubn=function(t){if(r("number"==typeof t),0>t)return this.iaddn(-t);if(this.sign)return this.sign=!1,this.iaddn(t),this.sign=!0,this;this.words[0]-=t;for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},s.prototype.addn=function(t){return this.clone().iaddn(t)},s.prototype.subn=function(t){return this.clone().isubn(t)},s.prototype.iabs=function(){return this.sign=!1,this},s.prototype.abs=function(){return this.clone().iabs()},s.prototype._ishlnsubmul=function(t,i,n){var s,h=t.length+n;if(this.words.length<h){for(var e=new Array(h),s=0;s<this.length;s++)e[s]=this.words[s];this.words=e}else s=this.length;for(this.length=Math.max(this.length,h);s<this.length;s++)this.words[s]=0;for(var o=0,s=0;s<t.length;s++){var f=this.words[s+n]+o,d=t.words[s]*i;f-=67108863&d,o=(f>>26)-(d/67108864|0),this.words[s+n]=67108863&f}for(;s<this.length-n;s++){var f=this.words[s+n]+o;o=f>>26,this.words[s+n]=67108863&f}if(0===o)return this.strip();r(-1===o),o=0;for(var s=0;s<this.length;s++){var f=-this.words[s]+o;o=f>>26,this.words[s]=67108863&f}return this.sign=!0,this.strip()},s.prototype._wordDiv=function(t,i){for(var r=this.length-t.length,n=this.clone(),h=t,e=h.words[h.length-1],r=0;33554432>e;r++)e<<=1;0!==r&&(h=h.shln(r),n.ishln(r),e=h.words[h.length-1]);var o,f=n.length-h.length;if("mod"!==i){o=new s(null),o.length=f+1,o.words=new Array(o.length);for(var d=0;d<o.length;d++)o.words[d]=0}var u=n.clone()._ishlnsubmul(h,1,f);u.sign||(n=u,o&&(o.words[f]=1));for(var l=f-1;l>=0;l--){var p=67108864*n.words[h.length+l]+n.words[h.length+l-1];for(p=Math.min(p/e|0,67108863),n._ishlnsubmul(h,p,l);n.sign;)p--,n.sign=!1,n._ishlnsubmul(h,1,l),n.sign=!n.sign;o&&(o.words[l]=p)}return o&&o.strip(),n.strip(),"div"!==i&&0!==r&&n.ishrn(r),{div:o?o:null,mod:n}},s.prototype.divmod=function(t,i){if(r(0!==t.cmpn(0)),this.sign&&!t.sign){var n,h,e=this.neg().divmod(t,i);return"mod"!==i&&(n=e.div.neg()),"div"!==i&&(h=0===e.mod.cmpn(0)?e.mod:t.sub(e.mod)),{div:n,mod:h}}if(!this.sign&&t.sign){var n,e=this.divmod(t.neg(),i);return"mod"!==i&&(n=e.div.neg()),{div:n,mod:e.mod}}return this.sign&&t.sign?this.neg().divmod(t.neg(),i):t.length>this.length||this.cmp(t)<0?{div:new s(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new s(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new s(this.modn(t.words[0]))}:this._wordDiv(t,i)},s.prototype.div=function(t){return this.divmod(t,"div").div},s.prototype.mod=function(t){return this.divmod(t,"mod").mod},s.prototype.divRound=function(t){var i=this.divmod(t);if(0===i.mod.cmpn(0))return i.div;var r=i.div.sign?i.mod.isub(t):i.mod,n=t.shrn(1),s=t.andln(1),h=r.cmp(n);return 0>h||1===s&&0===h?i.div:i.div.sign?i.div.isubn(1):i.div.iaddn(1)},s.prototype.modn=function(t){r(67108863>=t);for(var i=(1<<26)%t,n=0,s=this.length-1;s>=0;s--)n=(i*n+this.words[s])%t;return n},s.prototype.idivn=function(t){r(67108863>=t);for(var i=0,n=this.length-1;n>=0;n--){var s=this.words[n]+67108864*i;this.words[n]=s/t|0,i=s%t}return this.strip()},s.prototype.divn=function(t){return this.clone().idivn(t)},s.prototype._egcd=function(t,i){r(!i.sign),r(0!==i.cmpn(0));var n=this,h=i.clone();n=n.sign?n.mod(i):n.clone();for(var e=new s(0);h.isEven();)h.ishrn(1);for(var o=h.clone();n.cmpn(1)>0&&h.cmpn(1)>0;){for(;n.isEven();)n.ishrn(1),t.isEven()?t.ishrn(1):t.iadd(o).ishrn(1);for(;h.isEven();)h.ishrn(1),e.isEven()?e.ishrn(1):e.iadd(o).ishrn(1);n.cmp(h)>=0?(n.isub(h),t.isub(e)):(h.isub(n),e.isub(t))}return 0===n.cmpn(1)?t:e},s.prototype.gcd=function(t){if(0===this.cmpn(0))return t.clone();if(0===t.cmpn(0))return this.clone();var i=this.clone(),r=t.clone();i.sign=!1,r.sign=!1;for(var n=0;i.isEven()&&r.isEven();n++)i.ishrn(1),r.ishrn(1);for(;i.isEven();)i.ishrn(1);do{for(;r.isEven();)r.ishrn(1);if(i.cmp(r)<0){var s=i;i=r,r=s}i.isub(i.div(r).mul(r))}while(0!==i.cmpn(0)&&0!==r.cmpn(0));return 0===i.cmpn(0)?r.ishln(n):i.ishln(n)},s.prototype.invm=function(t){return this._egcd(new s(1),t).mod(t)},s.prototype.isEven=function(){return 0===(1&this.words[0])},s.prototype.isOdd=function(){return 1===(1&this.words[0])},s.prototype.andln=function(t){return this.words[0]&t},s.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n){for(var h=this.length;n+1>h;h++)this.words[h]=0;return this.words[n]|=s,this.length=n+1,this}for(var e=s,h=n;0!==e&&h<this.length;h++){var o=this.words[h];o+=e,e=o>>>26,o&=67108863,this.words[h]=o}return 0!==e&&(this.words[h]=e,this.length++),this},s.prototype.cmpn=function(t){var i=0>t;if(i&&(t=-t),this.sign&&!i)return-1;if(!this.sign&&i)return 1;t&=67108863,this.strip();var r;if(this.length>1)r=1;else{var n=this.words[0];r=n===t?0:t>n?-1:1}return this.sign&&(r=-r),r},s.prototype.cmp=function(t){if(this.sign&&!t.sign)return-1;if(!this.sign&&t.sign)return 1;var i=this.ucmp(t);return this.sign?-i:i},s.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var n=this.words[r],s=t.words[r];if(n!==s){s>n?i=-1:n>s&&(i=1);break}}return i},s.red=function(t){return new p(t)},s.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(!this.sign,"red works only with positives"),t.convertTo(this)._forceRed(t)},s.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},s.prototype._forceRed=function(t){return this.red=t,this},s.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},s.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},s.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},s.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},s.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},s.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},s.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},s.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},s.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},s.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},s.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},s.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},s.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},s.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var w={k256:null,p224:null,p192:null,p25519:null};o.prototype._tmp=function(){var t=new s(null);return t.words=new Array(Math.ceil(this.n/13)),t},o.prototype.ireduce=function(t){var i,r=t;do{var n=r.ishrn(this.n,0,this.tmp);r=this.imulK(n.hi),r=r.iadd(n.lo),i=r.bitLength()}while(i>this.n);var s=i<this.n?-1:r.cmp(this.p);return 0===s?(r.words[0]=0,r.length=1):s>0?r.isub(this.p):r.strip(),r},o.prototype.imulK=function(t){return t.imul(this.k)},n(f,o),f.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i,r=0,n=0;n<t.length;n++){var s=t.words[n];i=64*s,r+=977*s,i+=r/67108864|0,r&=67108863,t.words[n]=r,r=i}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},n(d,o),n(u,o),n(l,o),l.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var n=19*t.words[r]+i,s=67108863&n;n>>>=26,t.words[r]=s,i=n}return 0!==i&&(t.words[t.length++]=i),t},s._prime=function v(t){if(w[t])return w[t];var v;if("k256"===t)v=new f;else if("p224"===t)v=new d;else if("p192"===t)v=new u;else{if("p25519"!==t)throw new Error("Unknown prime "+t);v=new l}return w[t]=v,v},p.prototype._verify1=function(t){r(!t.sign,"red works only with positives"),r(t.red,"red works only with red numbers")},p.prototype._verify2=function(t,i){r(!t.sign&&!i.sign,"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},p.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.mod(this.m)._forceRed(this)},p.prototype.neg=function(t){var i=t.clone();return i.sign=!i.sign,i.iadd(this.m)._forceRed(this)},p.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},p.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},p.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},p.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},p.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.shln(i))},p.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},p.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},p.prototype.isqr=function(t){return this.imul(t,t)},p.prototype.sqr=function(t){return this.mul(t,t)},p.prototype.sqrt=function(t){if(0===t.cmpn(0))return t.clone();var i=this.m.andln(3);if(r(i%2===1),3===i){var n=this.m.add(new s(1)).ishrn(2),h=this.pow(t,n);return h}for(var e=this.m.subn(1),o=0;0!==e.cmpn(0)&&0===e.andln(1);)o++,e.ishrn(1);r(0!==e.cmpn(0));var f=new s(1).toRed(this),d=f.redNeg(),u=this.m.subn(1).ishrn(1),l=this.m.bitLength();for(l=new s(2*l*l).toRed(this);0!==this.pow(l,u).cmp(d);)l.redIAdd(d);for(var p=this.pow(l,e),h=this.pow(t,e.addn(1).ishrn(1)),g=this.pow(t,e),a=o;0!==g.cmp(f);){for(var c=g,m=0;0!==c.cmp(f);m++)c=c.redSqr();r(a>m);var w=this.pow(p,new s(1).ishln(a-m-1));h=h.redMul(w),p=w.redSqr(),g=g.redMul(p),a=m}return h},p.prototype.invm=function(t){var i=t._egcd(new s(1),this.m);return i.sign?(i.sign=!1,this.imod(i).redNeg()):this.imod(i)},p.prototype.pow=function(t,i){for(var r=[],n=i.clone();0!==n.cmpn(0);)r.push(n.andln(1)),n.ishrn(1);for(var s=t,h=0;h<r.length&&0===r[h];h++,s=this.sqr(s));if(++h<r.length)for(var n=this.sqr(s);h<r.length;h++,n=this.sqr(n))0!==r[h]&&(s=this.mul(s,n));return s},p.prototype.convertTo=function(t){return t.clone()},p.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},s.mont=function(t){return new g(t)},n(g,p),g.prototype.convertTo=function(t){return this.imod(t.shln(this.shift))},g.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},g.prototype.imul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return t.words[0]=0,t.length=1,t;var r=t.imul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),s=r.isub(n).ishrn(this.shift),h=s;return s.cmp(this.m)>=0?h=s.isub(this.m):s.cmpn(0)<0&&(h=s.iadd(this.m)),h._forceRed(this)},g.prototype.mul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return new s(0)._forceRed(this);var r=t.mul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),h=r.isub(n).ishrn(this.shift),e=h;return h.cmp(this.m)>=0?e=h.isub(this.m):h.cmpn(0)<0&&(e=h.iadd(this.m)),e._forceRed(this)},g.prototype.invm=function(t){var i=this.imod(t.invm(this.m).mul(this.r2));return i._forceRed(this)}}("undefined"==typeof module||module,this);


},{}],126:[function(require,module,exports){
function MillerRabin(r){this.rand=r||new brorand.Rand}var bn=require("bn.js"),brorand=require("brorand");module.exports=MillerRabin,MillerRabin.create=function(r){return new MillerRabin(r)},MillerRabin.prototype._rand=function(r){var n=r.bitLength(),e=this.rand.generate(Math.ceil(n/8));e[0]|=3;var t=7&n;return 0!==t&&(e[e.length-1]>>=7-t),new bn(e)},MillerRabin.prototype.test=function(r,n,e){var t=r.bitLength(),a=bn.mont(r),i=new bn(1).toRed(a);n||(n=Math.max(1,t/48|0));for(var o=r.subn(1),b=o.subn(1),d=0;!o.testn(d);d++);for(var u=r.shrn(d),f=o.toRed(a),c=!0;n>0;n--){var s=this._rand(b);e&&e(s);var l=s.toRed(a).redPow(u);if(0!==l.cmp(i)&&0!==l.cmp(f)){for(var m=1;d>m;m++){if(l=l.redSqr(),0===l.cmp(i))return!1;if(0===l.cmp(f))break}if(m===d)return!1}}return c},MillerRabin.prototype.getDivisor=function(r,n){var e=r.bitLength(),t=bn.mont(r),a=new bn(1).toRed(t);n||(n=Math.max(1,e/48|0));for(var i=r.subn(1),o=i.subn(1),b=0;!i.testn(b);b++);for(var d=r.shrn(b),u=i.toRed(t),f=!0;n>0;n--){var c=this._rand(o),s=r.gcd(c);if(0!==s.cmpn(1))return s;var l=c.toRed(t).redPow(d);if(0!==l.cmp(a)&&0!==l.cmp(u)){for(var m=1;b>m;m++){if(l=l.redSqr(),0===l.cmp(a))return l.fromRed().subn(1).gcd(r);if(0===l.cmp(u))break}if(m===b)return l=l.redSqr(),l.fromRed().subn(1).gcd(r)}}return f};


},{"bn.js":125,"brorand":127}],127:[function(require,module,exports){
function Rand(n){this.rand=n}var r;if(module.exports=function(n){return r||(r=new Rand(null)),r.generate(n)},module.exports.Rand=Rand,Rand.prototype.generate=function(n){return this._rand(n)},"object"==typeof window)Rand.prototype._rand=window.crypto&&window.crypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.crypto.getRandomValues(r),r}:window.msCrypto&&window.msCrypto.getRandomValues?function(n){var r=new Uint8Array(n);return window.msCrypto.getRandomValues(r),r}:function(){throw new Error("Not implemented yet")};else try{var crypto=require("crypto");Rand.prototype._rand=function(n){return crypto.randomBytes(n)}}catch(e){Rand.prototype._rand=function(n){for(var r=new Uint8Array(n),t=0;t<r.length;t++)r[t]=this.rand.getByte();return r}}


},{"crypto":21}],128:[function(require,module,exports){
(function (Buffer){
function pbkdf2(e,r,t,f,n,o){if("function"==typeof n&&(o=n,n=void 0),"function"!=typeof o)throw new Error("No callback provided to pbkdf2");var a=pbkdf2Sync(e,r,t,f,n);setTimeout(function(){o(void 0,a)})}function pbkdf2Sync(e,r,t,f,n){if("number"!=typeof t)throw new TypeError("Iterations not a number");if(0>t)throw new TypeError("Bad iterations");if("number"!=typeof f)throw new TypeError("Key length not a number");if(0>f)throw new TypeError("Bad key length");n=n||"sha1",Buffer.isBuffer(e)||(e=new Buffer(e)),Buffer.isBuffer(r)||(r=new Buffer(r));var o,a=1,i=new Buffer(f),p=new Buffer(r.length+4);r.copy(p,0,0,r.length);for(var c,u,d=1;a>=d;d++){p.writeUInt32BE(d,r.length);var w=createHmac(n,e).update(p).digest();if(!o&&(o=w.length,u=new Buffer(o),a=Math.ceil(f/o),c=f-(a-1)*o,f>(Math.pow(2,32)-1)*o))throw new TypeError("keylen exceeds maximum length");w.copy(u,0,0,o);for(var y=1;t>y;y++){w=createHmac(n,e).update(w).digest();for(var h=0;o>h;h++)u[h]^=w[h]}var b=(d-1)*o,m=d===a?c:o;u.copy(i,b,0,m)}return i}var createHmac=require("create-hmac");exports.pbkdf2=pbkdf2,exports.pbkdf2Sync=pbkdf2Sync;


}).call(this,require("buffer").Buffer)

},{"buffer":17,"create-hmac":120}],129:[function(require,module,exports){
exports.publicEncrypt=require("./publicEncrypt"),exports.privateDecrypt=require("./privateDecrypt"),exports.privateEncrypt=function(r,p){return exports.publicEncrypt(r,p,!0)},exports.publicDecrypt=function(r,p){return exports.privateDecrypt(r,p,!0)};


},{"./privateDecrypt":151,"./publicEncrypt":152}],130:[function(require,module,exports){
(function (Buffer){
function i2ops(e){var r=new Buffer(4);return r.writeUInt32BE(e,0),r}var createHash=require("create-hash");module.exports=function(e,r){for(var t,a=new Buffer(""),n=0;a.length<r;)t=i2ops(n++),a=Buffer.concat([a,createHash("sha1").update(e).update(t).digest()]);return a.slice(0,r)};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"create-hash":109}],131:[function(require,module,exports){
!function(t,i){"use strict";function r(t,i){if(!t)throw new Error(i||"Assertion failed")}function n(t,i){t.super_=i;var r=function(){};r.prototype=i.prototype,t.prototype=new r,t.prototype.constructor=t}function s(t,i,r){return null!==t&&"object"==typeof t&&Array.isArray(t.words)?t:(this.sign=!1,this.words=null,this.length=0,this.red=null,("le"===i||"be"===i)&&(r=i,i=10),void(null!==t&&this._init(t||0,i||10,r||"be")))}function h(t,i,r){for(var n=0,s=Math.min(t.length,r),h=i;s>h;h++){var e=t.charCodeAt(h)-48;n<<=4,n|=e>=49&&54>=e?e-49+10:e>=17&&22>=e?e-17+10:15&e}return n}function e(t,i,r,n){for(var s=0,h=Math.min(t.length,r),e=i;h>e;e++){var o=t.charCodeAt(e)-48;s*=n,s+=o>=49?o-49+10:o>=17?o-17+10:o}return s}function o(t,i){this.name=t,this.p=new s(i,16),this.n=this.p.bitLength(),this.k=new s(1).ishln(this.n).isub(this.p),this.tmp=this._tmp()}function f(){o.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function d(){o.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function u(){o.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function l(){o.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function p(t){if("string"==typeof t){var i=s._prime(t);this.m=i.p,this.prime=i}else this.m=t,this.prime=null}function g(t){p.call(this,t),this.shift=this.m.bitLength(),this.shift%26!==0&&(this.shift+=26-this.shift%26),this.r=new s(1).ishln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r.invm(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv.sign=!0,this.minv=this.minv.mod(this.r)}"object"==typeof t?t.exports=s:i.BN=s,s.BN=s,s.wordSize=26,s.prototype._init=function(t,i,n){if("number"==typeof t)return 0>t&&(this.sign=!0,t=-t),void(67108864>t?(this.words=[67108863&t],this.length=1):(this.words=[67108863&t,t/67108864&67108863],this.length=2));if("object"==typeof t)return this._initArray(t,i,n);"hex"===i&&(i=16),r(i===(0|i)&&i>=2&&36>=i),t=t.toString().replace(/\s+/g,"");var s=0;"-"===t[0]&&s++,16===i?this._parseHex(t,s):this._parseBase(t,i,s),"-"===t[0]&&(this.sign=!0),this.strip()},s.prototype._initArray=function(t,i,n){r("number"==typeof t.length),this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var s=0;s<this.length;s++)this.words[s]=0;var h=0;if("be"===n)for(var s=t.length-1,e=0;s>=0;s-=3){var o=t[s]|t[s-1]<<8|t[s-2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}else if("le"===n)for(var s=0,e=0;s<t.length;s+=3){var o=t[s]|t[s+1]<<8|t[s+2]<<16;this.words[e]|=o<<h&67108863,this.words[e+1]=o>>>26-h&67108863,h+=24,h>=26&&(h-=26,e++)}return this.strip()},s.prototype._parseHex=function(t,i){this.length=Math.ceil((t.length-i)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;for(var n=0,r=t.length-6,s=0;r>=i;r-=6){var e=h(t,r,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303,n+=24,n>=26&&(n-=26,s++)}if(r+6!==i){var e=h(t,i,r+6);this.words[s]|=e<<n&67108863,this.words[s+1]|=e>>>26-n&4194303}this.strip()},s.prototype._parseBase=function(t,i,r){this.words=[0],this.length=1;for(var n=0,s=1;67108863>=s;s*=i)n++;n--,s=s/i|0;for(var h=t.length-r,o=h%n,f=Math.min(h,h-o)+r,d=0,u=r;f>u;u+=n)d=e(t,u,u+n,i),this.imuln(s),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d);if(0!==o){for(var l=1,d=e(t,u,t.length,i),u=0;o>u;u++)l*=i;this.imuln(l),this.words[0]+d<67108864?this.words[0]+=d:this._iaddn(d)}},s.prototype.copy=function(t){t.words=new Array(this.length);for(var i=0;i<this.length;i++)t.words[i]=this.words[i];t.length=this.length,t.sign=this.sign,t.red=this.red},s.prototype.clone=function(){var t=new s(null);return this.copy(t),t},s.prototype.strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},s.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.sign=!1),this},s.prototype.inspect=function(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"};var a=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],c=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],m=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];s.prototype.toString=function(t,i){if(t=t||10,16===t||"hex"===t){for(var n="",s=0,i=0|i||1,h=0,e=0;e<this.length;e++){var o=this.words[e],f=(16777215&(o<<s|h)).toString(16);h=o>>>24-s&16777215,n=0!==h||e!==this.length-1?a[6-f.length]+f+n:f+n,s+=2,s>=26&&(s-=26,e--)}for(0!==h&&(n=h.toString(16)+n);n.length%i!==0;)n="0"+n;return this.sign&&(n="-"+n),n}if(t===(0|t)&&t>=2&&36>=t){var d=c[t],u=m[t],n="",l=this.clone();for(l.sign=!1;0!==l.cmpn(0);){var p=l.modn(u).toString(t);l=l.idivn(u),n=0!==l.cmpn(0)?a[d-p.length]+p+n:p+n}return 0===this.cmpn(0)&&(n="0"+n),this.sign&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},s.prototype.toJSON=function(){return this.toString(16)},s.prototype.toArray=function(){this.strip();var t=new Array(this.byteLength());t[0]=0;for(var i=this.clone(),r=0;0!==i.cmpn(0);r++){var n=i.andln(255);i.ishrn(8),t[t.length-r-1]=n}return t},s.prototype._countBits=function(t){return t>=33554432?26:t>=16777216?25:t>=8388608?24:t>=4194304?23:t>=2097152?22:t>=1048576?21:t>=524288?20:t>=262144?19:t>=131072?18:t>=65536?17:t>=32768?16:t>=16384?15:t>=8192?14:t>=4096?13:t>=2048?12:t>=1024?11:t>=512?10:t>=256?9:t>=128?8:t>=64?7:t>=32?6:t>=16?5:t>=8?4:t>=4?3:t>=2?2:t>=1?1:0},s.prototype.bitLength=function(){var t=0,i=this.words[this.length-1],t=this._countBits(i);return 26*(this.length-1)+t},s.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},s.prototype.neg=function(){if(0===this.cmpn(0))return this.clone();var t=this.clone();return t.sign=!this.sign,t},s.prototype.ior=function(t){for(this.sign=this.sign||t.sign;this.length<t.length;)this.words[this.length++]=0;for(var i=0;i<t.length;i++)this.words[i]=this.words[i]|t.words[i];return this.strip()},s.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},s.prototype.iand=function(t){this.sign=this.sign&&t.sign;var i;i=this.length>t.length?t:this;for(var r=0;r<i.length;r++)this.words[r]=this.words[r]&t.words[r];return this.length=i.length,this.strip()},s.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},s.prototype.ixor=function(t){this.sign=this.sign||t.sign;var i,r;this.length>t.length?(i=this,r=t):(i=t,r=this);for(var n=0;n<r.length;n++)this.words[n]=i.words[n]^r.words[n];if(this!==i)for(;n<i.length;n++)this.words[n]=i.words[n];return this.length=i.length,this.strip()},s.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},s.prototype.setn=function(t,i){r("number"==typeof t&&t>=0);for(var n=t/26|0,s=t%26;this.length<=n;)this.words[this.length++]=0;return this.words[n]=i?this.words[n]|1<<s:this.words[n]&~(1<<s),this.strip()},s.prototype.iadd=function(t){if(this.sign&&!t.sign){this.sign=!1;var i=this.isub(t);return this.sign=!this.sign,this._normSign()}if(!this.sign&&t.sign){t.sign=!1;var i=this.isub(t);return t.sign=!0,i._normSign()}var r,n;this.length>t.length?(r=this,n=t):(r=t,n=this);for(var s=0,h=0;h<n.length;h++){var i=r.words[h]+n.words[h]+s;this.words[h]=67108863&i,s=i>>>26}for(;0!==s&&h<r.length;h++){var i=r.words[h]+s;this.words[h]=67108863&i,s=i>>>26}if(this.length=r.length,0!==s)this.words[this.length]=s,this.length++;else if(r!==this)for(;h<r.length;h++)this.words[h]=r.words[h];return this},s.prototype.add=function(t){if(t.sign&&!this.sign){t.sign=!1;var i=this.sub(t);return t.sign=!0,i}if(!t.sign&&this.sign){this.sign=!1;var i=t.sub(this);return this.sign=!0,i}return this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},s.prototype.isub=function(t){if(t.sign){t.sign=!1;var i=this.iadd(t);return t.sign=!0,i._normSign()}if(this.sign)return this.sign=!1,this.iadd(t),this.sign=!0,this._normSign();var r=this.cmp(t);if(0===r)return this.sign=!1,this.length=1,this.words[0]=0,this;var n,s;r>0?(n=this,s=t):(n=t,s=this);for(var h=0,e=0;e<s.length;e++){var i=n.words[e]-s.words[e]+h;h=i>>26,this.words[e]=67108863&i}for(;0!==h&&e<n.length;e++){var i=n.words[e]+h;h=i>>26,this.words[e]=67108863&i}if(0===h&&e<n.length&&n!==this)for(;e<n.length;e++)this.words[e]=n.words[e];return this.length=Math.max(this.length,e),n!==this&&(this.sign=!0),this.strip()},s.prototype.sub=function(t){return this.clone().isub(t)},s.prototype._smallMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0;n<i.length-1;n++){for(var s=r>>>26,h=67108863&r,e=Math.min(n,t.length-1),o=Math.max(0,n-this.length+1);e>=o;o++){var f=n-o,d=0|this.words[f],u=0|t.words[o],l=d*u,p=67108863&l;s=s+(l/67108864|0)|0,p=p+h|0,h=67108863&p,s=s+(p>>>26)|0}i.words[n]=h,r=s}return 0!==r?i.words[n]=r:i.length--,i.strip()},s.prototype._bigMulTo=function(t,i){i.sign=t.sign!==this.sign,i.length=this.length+t.length;for(var r=0,n=0,s=0;s<i.length-1;s++){var h=n;n=0;for(var e=67108863&r,o=Math.min(s,t.length-1),f=Math.max(0,s-this.length+1);o>=f;f++){var d=s-f,u=0|this.words[d],l=0|t.words[f],p=u*l,g=67108863&p;h=h+(p/67108864|0)|0,g=g+e|0,e=67108863&g,h=h+(g>>>26)|0,n+=h>>>26,h&=67108863}i.words[s]=e,r=h,h=n}return 0!==r?i.words[s]=r:i.length--,i.strip()},s.prototype.mulTo=function(t,i){var r;return r=this.length+t.length<63?this._smallMulTo(t,i):this._bigMulTo(t,i)},s.prototype.mul=function(t){var i=new s(null);return i.words=new Array(this.length+t.length),this.mulTo(t,i)},s.prototype.imul=function(t){if(0===this.cmpn(0)||0===t.cmpn(0))return this.words[0]=0,this.length=1,this;var i=this.length,r=t.length;this.sign=t.sign!==this.sign,this.length=this.length+t.length,this.words[this.length-1]=0;for(var n=this.length-2;n>=0;n--){for(var s=0,h=0,e=Math.min(n,r-1),o=Math.max(0,n-i+1);e>=o;o++){var f=n-o,d=this.words[f],u=t.words[o],l=d*u,p=67108863&l;s+=l/67108864|0,p+=h,h=67108863&p,s+=p>>>26}this.words[n]=h,this.words[n+1]+=s,s=0}for(var s=0,f=1;f<this.length;f++){var g=this.words[f]+s;this.words[f]=67108863&g,s=g>>>26}return this.strip()},s.prototype.imuln=function(t){r("number"==typeof t);for(var i=0,n=0;n<this.length;n++){var s=this.words[n]*t,h=(67108863&s)+(67108863&i);i>>=26,i+=s/67108864|0,i+=h>>>26,this.words[n]=67108863&h}return 0!==i&&(this.words[n]=i,this.length++),this},s.prototype.sqr=function(){return this.mul(this)},s.prototype.isqr=function(){return this.mul(this)},s.prototype.ishln=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=67108863>>>26-i<<26-i;if(0!==i){for(var h=0,e=0;e<this.length;e++){var o=this.words[e]&s,f=this.words[e]-o<<i;this.words[e]=f|h,h=o>>>26-i}h&&(this.words[e]=h,this.length++)}if(0!==n){for(var e=this.length-1;e>=0;e--)this.words[e+n]=this.words[e];for(var e=0;n>e;e++)this.words[e]=0;this.length+=n}return this.strip()},s.prototype.ishrn=function(t,i,n){r("number"==typeof t&&t>=0),i=i?(i-i%26)/26:0;var s=t%26,h=Math.min((t-s)/26,this.length),e=67108863^67108863>>>s<<s,o=n;if(i-=h,i=Math.max(0,i),o){for(var f=0;h>f;f++)o.words[f]=this.words[f];o.length=h}if(0===h);else if(this.length>h){this.length-=h;for(var f=0;f<this.length;f++)this.words[f]=this.words[f+h]}else this.words[0]=0,this.length=1;for(var d=0,f=this.length-1;f>=0&&(0!==d||f>=i);f--){var u=this.words[f];this.words[f]=d<<26-s|u>>>s,d=u&e}return o&&0!==d&&(o.words[o.length++]=d),0===this.length&&(this.words[0]=0,this.length=1),this.strip(),n?{hi:this,lo:o}:this},s.prototype.shln=function(t){return this.clone().ishln(t)},s.prototype.shrn=function(t){return this.clone().ishrn(t)},s.prototype.testn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n)return!1;var h=this.words[n];return!!(h&s)},s.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var i=t%26,n=(t-i)/26;if(r(!this.sign,"imaskn works only with positive numbers"),0!==i&&n++,this.length=Math.min(n,this.length),0!==i){var s=67108863^67108863>>>i<<i;this.words[this.length-1]&=s}return this.strip()},s.prototype.maskn=function(t){return this.clone().imaskn(t)},s.prototype.iaddn=function(t){return r("number"==typeof t),0>t?this.isubn(-t):this.sign?1===this.length&&this.words[0]<t?(this.words[0]=t-this.words[0],this.sign=!1,this):(this.sign=!1,this.isubn(t),this.sign=!0,this):this._iaddn(t)},s.prototype._iaddn=function(t){this.words[0]+=t;for(var i=0;i<this.length&&this.words[i]>=67108864;i++)this.words[i]-=67108864,i===this.length-1?this.words[i+1]=1:this.words[i+1]++;return this.length=Math.max(this.length,i+1),this},s.prototype.isubn=function(t){if(r("number"==typeof t),0>t)return this.iaddn(-t);if(this.sign)return this.sign=!1,this.iaddn(t),this.sign=!0,this;this.words[0]-=t;for(var i=0;i<this.length&&this.words[i]<0;i++)this.words[i]+=67108864,this.words[i+1]-=1;return this.strip()},s.prototype.addn=function(t){return this.clone().iaddn(t)},s.prototype.subn=function(t){return this.clone().isubn(t)},s.prototype.iabs=function(){return this.sign=!1,this},s.prototype.abs=function(){return this.clone().iabs()},s.prototype._ishlnsubmul=function(t,i,n){var s,h=t.length+n;if(this.words.length<h){for(var e=new Array(h),s=0;s<this.length;s++)e[s]=this.words[s];this.words=e}else s=this.length;for(this.length=Math.max(this.length,h);s<this.length;s++)this.words[s]=0;for(var o=0,s=0;s<t.length;s++){var f=this.words[s+n]+o,d=t.words[s]*i;f-=67108863&d,o=(f>>26)-(d/67108864|0),this.words[s+n]=67108863&f}for(;s<this.length-n;s++){var f=this.words[s+n]+o;o=f>>26,this.words[s+n]=67108863&f}if(0===o)return this.strip();r(-1===o),o=0;for(var s=0;s<this.length;s++){var f=-this.words[s]+o;o=f>>26,this.words[s]=67108863&f}return this.sign=!0,this.strip()},s.prototype._wordDiv=function(t,i){for(var r=this.length-t.length,n=this.clone(),h=t,e=h.words[h.length-1],r=0;33554432>e;r++)e<<=1;0!==r&&(h=h.shln(r),n.ishln(r),e=h.words[h.length-1]);var o,f=n.length-h.length;if("mod"!==i){o=new s(null),o.length=f+1,o.words=new Array(o.length);for(var d=0;d<o.length;d++)o.words[d]=0}var u=n.clone()._ishlnsubmul(h,1,f);u.sign||(n=u,o&&(o.words[f]=1));for(var l=f-1;l>=0;l--){var p=67108864*n.words[h.length+l]+n.words[h.length+l-1];for(p=Math.min(p/e|0,67108863),n._ishlnsubmul(h,p,l);n.sign;)p--,n.sign=!1,n._ishlnsubmul(h,1,l),n.sign=!n.sign;o&&(o.words[l]=p)}return o&&o.strip(),n.strip(),"div"!==i&&0!==r&&n.ishrn(r),{div:o?o:null,mod:n}},s.prototype.divmod=function(t,i){if(r(0!==t.cmpn(0)),this.sign&&!t.sign){var n,h,e=this.neg().divmod(t,i);return"mod"!==i&&(n=e.div.neg()),"div"!==i&&(h=0===e.mod.cmpn(0)?e.mod:t.sub(e.mod)),{div:n,mod:h}}if(!this.sign&&t.sign){var n,e=this.divmod(t.neg(),i);return"mod"!==i&&(n=e.div.neg()),{div:n,mod:e.mod}}return this.sign&&t.sign?this.neg().divmod(t.neg(),i):t.length>this.length||this.cmp(t)<0?{div:new s(0),mod:this}:1===t.length?"div"===i?{div:this.divn(t.words[0]),mod:null}:"mod"===i?{div:null,mod:new s(this.modn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new s(this.modn(t.words[0]))}:this._wordDiv(t,i)},s.prototype.div=function(t){return this.divmod(t,"div").div},s.prototype.mod=function(t){return this.divmod(t,"mod").mod},s.prototype.divRound=function(t){var i=this.divmod(t);if(0===i.mod.cmpn(0))return i.div;var r=i.div.sign?i.mod.isub(t):i.mod,n=t.shrn(1),s=t.andln(1),h=r.cmp(n);return 0>h||1===s&&0===h?i.div:i.div.sign?i.div.isubn(1):i.div.iaddn(1)},s.prototype.modn=function(t){r(67108863>=t);for(var i=(1<<26)%t,n=0,s=this.length-1;s>=0;s--)n=(i*n+this.words[s])%t;return n},s.prototype.idivn=function(t){r(67108863>=t);for(var i=0,n=this.length-1;n>=0;n--){var s=this.words[n]+67108864*i;this.words[n]=s/t|0,i=s%t}return this.strip()},s.prototype.divn=function(t){return this.clone().idivn(t)},s.prototype._egcd=function(t,i){r(!i.sign),r(0!==i.cmpn(0));var n=this,h=i.clone();n=n.sign?n.mod(i):n.clone();for(var e=new s(0);h.isEven();)h.ishrn(1);for(var o=h.clone();n.cmpn(1)>0&&h.cmpn(1)>0;){for(;n.isEven();)n.ishrn(1),t.isEven()?t.ishrn(1):t.iadd(o).ishrn(1);for(;h.isEven();)h.ishrn(1),e.isEven()?e.ishrn(1):e.iadd(o).ishrn(1);n.cmp(h)>=0?(n.isub(h),t.isub(e)):(h.isub(n),e.isub(t))}return 0===n.cmpn(1)?t:e},s.prototype.gcd=function(t){if(0===this.cmpn(0))return t.clone();if(0===t.cmpn(0))return this.clone();var i=this.clone(),r=t.clone();i.sign=!1,r.sign=!1;for(var n=0;i.isEven()&&r.isEven();n++)i.ishrn(1),r.ishrn(1);for(;i.isEven();)i.ishrn(1);do{for(;r.isEven();)r.ishrn(1);if(i.cmp(r)<0){var s=i;i=r,r=s}i.isub(i.div(r).mul(r))}while(0!==i.cmpn(0)&&0!==r.cmpn(0));return 0===i.cmpn(0)?r.ishln(n):i.ishln(n)},s.prototype.invm=function(t){return this._egcd(new s(1),t).mod(t)},s.prototype.isEven=function(){return 0===(1&this.words[0])},s.prototype.isOdd=function(){return 1===(1&this.words[0])},s.prototype.andln=function(t){return this.words[0]&t},s.prototype.bincn=function(t){r("number"==typeof t);var i=t%26,n=(t-i)/26,s=1<<i;if(this.length<=n){for(var h=this.length;n+1>h;h++)this.words[h]=0;return this.words[n]|=s,this.length=n+1,this}for(var e=s,h=n;0!==e&&h<this.length;h++){var o=this.words[h];o+=e,e=o>>>26,o&=67108863,this.words[h]=o}return 0!==e&&(this.words[h]=e,this.length++),this},s.prototype.cmpn=function(t){var i=0>t;if(i&&(t=-t),this.sign&&!i)return-1;if(!this.sign&&i)return 1;t&=67108863,this.strip();var r;if(this.length>1)r=1;else{var n=this.words[0];r=n===t?0:t>n?-1:1}return this.sign&&(r=-r),r},s.prototype.cmp=function(t){if(this.sign&&!t.sign)return-1;if(!this.sign&&t.sign)return 1;var i=this.ucmp(t);return this.sign?-i:i},s.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var i=0,r=this.length-1;r>=0;r--){var n=this.words[r],s=t.words[r];if(n!==s){s>n?i=-1:n>s&&(i=1);break}}return i},s.red=function(t){return new p(t)},s.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(!this.sign,"red works only with positives"),t.convertTo(this)._forceRed(t)},s.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},s.prototype._forceRed=function(t){return this.red=t,this},s.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},s.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},s.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},s.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},s.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},s.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},s.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},s.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},s.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},s.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},s.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},s.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},s.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},s.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var w={k256:null,p224:null,p192:null,p25519:null};o.prototype._tmp=function(){var t=new s(null);return t.words=new Array(Math.ceil(this.n/13)),t},o.prototype.ireduce=function(t){var i,r=t;do{var n=r.ishrn(this.n,0,this.tmp);r=this.imulK(n.hi),r=r.iadd(n.lo),i=r.bitLength()}while(i>this.n);var s=i<this.n?-1:r.cmp(this.p);return 0===s?(r.words[0]=0,r.length=1):s>0?r.isub(this.p):r.strip(),r},o.prototype.imulK=function(t){return t.imul(this.k)},n(f,o),f.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var i,r=0,n=0;n<t.length;n++){var s=t.words[n];i=64*s,r+=977*s,i+=r/67108864|0,r&=67108863,t.words[n]=r,r=i}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},n(d,o),n(u,o),n(l,o),l.prototype.imulK=function(t){for(var i=0,r=0;r<t.length;r++){var n=19*t.words[r]+i,s=67108863&n;n>>>=26,t.words[r]=s,i=n}return 0!==i&&(t.words[t.length++]=i),t},s._prime=function v(t){if(w[t])return w[t];var v;if("k256"===t)v=new f;else if("p224"===t)v=new d;else if("p192"===t)v=new u;else{if("p25519"!==t)throw new Error("Unknown prime "+t);v=new l}return w[t]=v,v},p.prototype._verify1=function(t){r(!t.sign,"red works only with positives"),r(t.red,"red works only with red numbers")},p.prototype._verify2=function(t,i){r(!t.sign&&!i.sign,"red works only with positives"),r(t.red&&t.red===i.red,"red works only with red numbers")},p.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):t.mod(this.m)._forceRed(this)},p.prototype.neg=function(t){var i=t.clone();return i.sign=!i.sign,i.iadd(this.m)._forceRed(this)},p.prototype.add=function(t,i){this._verify2(t,i);var r=t.add(i);return r.cmp(this.m)>=0&&r.isub(this.m),r._forceRed(this)},p.prototype.iadd=function(t,i){this._verify2(t,i);var r=t.iadd(i);return r.cmp(this.m)>=0&&r.isub(this.m),r},p.prototype.sub=function(t,i){this._verify2(t,i);var r=t.sub(i);return r.cmpn(0)<0&&r.iadd(this.m),r._forceRed(this)},p.prototype.isub=function(t,i){this._verify2(t,i);var r=t.isub(i);return r.cmpn(0)<0&&r.iadd(this.m),r},p.prototype.shl=function(t,i){return this._verify1(t),this.imod(t.shln(i))},p.prototype.imul=function(t,i){return this._verify2(t,i),this.imod(t.imul(i))},p.prototype.mul=function(t,i){return this._verify2(t,i),this.imod(t.mul(i))},p.prototype.isqr=function(t){return this.imul(t,t)},p.prototype.sqr=function(t){return this.mul(t,t)},p.prototype.sqrt=function(t){if(0===t.cmpn(0))return t.clone();var i=this.m.andln(3);if(r(i%2===1),3===i){var n=this.m.add(new s(1)).ishrn(2),h=this.pow(t,n);return h}for(var e=this.m.subn(1),o=0;0!==e.cmpn(0)&&0===e.andln(1);)o++,e.ishrn(1);r(0!==e.cmpn(0));var f=new s(1).toRed(this),d=f.redNeg(),u=this.m.subn(1).ishrn(1),l=this.m.bitLength();for(l=new s(2*l*l).toRed(this);0!==this.pow(l,u).cmp(d);)l.redIAdd(d);for(var p=this.pow(l,e),h=this.pow(t,e.addn(1).ishrn(1)),g=this.pow(t,e),a=o;0!==g.cmp(f);){for(var c=g,m=0;0!==c.cmp(f);m++)c=c.redSqr();r(a>m);var w=this.pow(p,new s(1).ishln(a-m-1));h=h.redMul(w),p=w.redSqr(),g=g.redMul(p),a=m}return h},p.prototype.invm=function(t){var i=t._egcd(new s(1),this.m);return i.sign?(i.sign=!1,this.imod(i).redNeg()):this.imod(i)},p.prototype.pow=function(t,i){for(var r=[],n=i.clone();0!==n.cmpn(0);)r.push(n.andln(1)),n.ishrn(1);for(var s=t,h=0;h<r.length&&0===r[h];h++,s=this.sqr(s));if(++h<r.length)for(var n=this.sqr(s);h<r.length;h++,n=this.sqr(n))0!==r[h]&&(s=this.mul(s,n));return s},p.prototype.convertTo=function(t){return t.clone()},p.prototype.convertFrom=function(t){var i=t.clone();return i.red=null,i},s.mont=function(t){return new g(t)},n(g,p),g.prototype.convertTo=function(t){return this.imod(t.shln(this.shift))},g.prototype.convertFrom=function(t){var i=this.imod(t.mul(this.rinv));return i.red=null,i},g.prototype.imul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return t.words[0]=0,t.length=1,t;var r=t.imul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),s=r.isub(n).ishrn(this.shift),h=s;return s.cmp(this.m)>=0?h=s.isub(this.m):s.cmpn(0)<0&&(h=s.iadd(this.m)),h._forceRed(this)},g.prototype.mul=function(t,i){if(0===t.cmpn(0)||0===i.cmpn(0))return new s(0)._forceRed(this);var r=t.mul(i),n=r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),h=r.isub(n).ishrn(this.shift),e=h;return h.cmp(this.m)>=0?e=h.isub(this.m):h.cmpn(0)<0&&(e=h.iadd(this.m)),e._forceRed(this)},g.prototype.invm=function(t){var i=this.imod(t.invm(this.m).mul(this.r2));return i._forceRed(this)}}("undefined"==typeof module||module,this);


},{}],132:[function(require,module,exports){
(function (Buffer){
function blind(e){var n=getr(e),r=n.toRed(bn.mont(e.modulus)).redPow(new bn(e.publicExponent)).fromRed();return{blinder:r,unblinder:n.invm(e.modulus)}}function crt(e,n){var r=blind(n),o=n.modulus.byteLength(),m=(bn.mont(n.modulus),new bn(e).mul(r.blinder).mod(n.modulus)),t=m.toRed(bn.mont(n.prime1)),u=m.toRed(bn.mont(n.prime2)),d=n.coefficient,i=n.prime1,l=n.prime2,b=t.redPow(n.exponent1),f=u.redPow(n.exponent2);b=b.fromRed(),f=f.fromRed();var s=b.isub(f).imul(d).mod(i);s.imul(l),f.iadd(s);var a=new Buffer(f.imul(r.unblinder).mod(n.modulus).toArray());if(a.length<o){var c=new Buffer(o-a.length);c.fill(0),a=Buffer.concat([c,a],o)}return a}function getr(e){for(var n=e.modulus.byteLength(),r=new bn(randomBytes(n));r.cmp(e.modulus)>=0||!r.mod(e.prime1)||!r.mod(e.prime2);)r=new bn(randomBytes(n));return r}var bn=require("bn.js"),randomBytes=require("randombytes");module.exports=crt,crt.getr=getr;


}).call(this,require("buffer").Buffer)

},{"bn.js":131,"buffer":17,"randombytes":155}],133:[function(require,module,exports){
(function (Buffer){
var createHash=require("create-hash");module.exports=function(e,r,a){a/=8;for(var t,f,u,i=0,d=new Buffer(a),h=0;;){if(t=createHash("md5"),h++>0&&t.update(f),t.update(e),t.update(r),f=t.digest(),u=0,a>0)for(;;){if(0===a)break;if(u===f.length)break;d[i++]=f[u++],a--}if(0===a)break}for(u=0;u<f.length;u++)f[u]=0;return d};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"create-hash":109}],134:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],135:[function(require,module,exports){
var asn1=require("asn1.js"),RSAPrivateKey=asn1.define("RSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("modulus")["int"](),this.key("publicExponent")["int"](),this.key("privateExponent")["int"](),this.key("prime1")["int"](),this.key("prime2")["int"](),this.key("exponent1")["int"](),this.key("exponent2")["int"](),this.key("coefficient")["int"]())});exports.RSAPrivateKey=RSAPrivateKey;var RSAPublicKey=asn1.define("RSAPublicKey",function(){this.seq().obj(this.key("modulus")["int"](),this.key("publicExponent")["int"]())});exports.RSAPublicKey=RSAPublicKey;var PublicKey=asn1.define("SubjectPublicKeyInfo",function(){this.seq().obj(this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPublicKey").bitstr())});exports.PublicKey=PublicKey;var AlgorithmIdentifier=asn1.define("AlgorithmIdentifier",function(){this.seq().obj(this.key("algorithm").objid(),this.key("none").null_().optional(),this.key("curve").objid().optional(),this.key("params").seq().obj(this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"]()).optional())}),PrivateKeyInfo=asn1.define("PrivateKeyInfo",function(){this.seq().obj(this.key("version")["int"](),this.key("algorithm").use(AlgorithmIdentifier),this.key("subjectPrivateKey").octstr())});exports.PrivateKey=PrivateKeyInfo;var EncryptedPrivateKeyInfo=asn1.define("EncryptedPrivateKeyInfo",function(){this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(),this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(),this.key("kdeparams").seq().obj(this.key("salt").octstr(),this.key("iters")["int"]())),this.key("cipher").seq().obj(this.key("algo").objid(),this.key("iv").octstr()))),this.key("subjectPrivateKey").octstr())});exports.EncryptedPrivateKey=EncryptedPrivateKeyInfo;var DSAPrivateKey=asn1.define("DSAPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("p")["int"](),this.key("q")["int"](),this.key("g")["int"](),this.key("pub_key")["int"](),this.key("priv_key")["int"]())});exports.DSAPrivateKey=DSAPrivateKey,exports.DSAparam=asn1.define("DSAparam",function(){this["int"]()});var ECPrivateKey=asn1.define("ECPrivateKey",function(){this.seq().obj(this.key("version")["int"](),this.key("privateKey").octstr(),this.key("parameters").optional().explicit(0).use(ECParameters),this.key("publicKey").optional().explicit(1).bitstr())});exports.ECPrivateKey=ECPrivateKey;var ECParameters=asn1.define("ECParameters",function(){this.choice({namedCurve:this.objid()})});exports.signature=asn1.define("signature",function(){this.seq().obj(this.key("r")["int"](),this.key("s")["int"]())});


},{"asn1.js":138}],136:[function(require,module,exports){
(function (Buffer){
function wrap(e){for(var r=[];e;){if(e.length<64){r.push(e);break}r.push(e.slice(0,64)),e=e.slice(64)}return r.join("\n")}var findProc=/Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m,startRegex=/^-----BEGIN (.*) KEY-----\n/m,fullRegex=/^-----BEGIN (.*) KEY-----\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?-----END \1 KEY-----$/m,evp=require("./EVP_BytesToKey"),ciphers=require("browserify-aes");module.exports=function(e,r){var n,a=e.toString(),t=a.match(findProc);if(t){var f="aes"+t[1],s=new Buffer(t[2],"hex"),c=new Buffer(t[3].replace(/\n\r?/g,""),"base64"),i=evp(r,s.slice(0,8),parseInt(t[1])),u=[],p=ciphers.createDecipheriv(f,i,s);u.push(p.update(c)),u.push(p["final"]()),n=Buffer.concat(u)}else{var o=a.match(fullRegex);n=new Buffer(o[2].replace(/\n\r?/g,""),"base64")}var l=a.match(startRegex)[1]+" KEY";return{tag:l,data:n}};


}).call(this,require("buffer").Buffer)

},{"./EVP_BytesToKey":133,"browserify-aes":25,"buffer":17}],137:[function(require,module,exports){
(function (Buffer){
function parseKeys(e){var r;"object"!=typeof e||Buffer.isBuffer(e)||(r=e.passphrase,e=e.key),"string"==typeof e&&(e=new Buffer(e));var a,t,s=fixProc(e,r),i=s.tag,c=s.data;switch(i){case"PUBLIC KEY":switch(t=asn1.PublicKey.decode(c,"der"),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPublicKey.decode(t.subjectPublicKey.data,"der");case"1.2.840.10045.2.1":return t.subjectPrivateKey=t.subjectPublicKey,{type:"ec",data:t};case"1.2.840.10040.4.1":return t.algorithm.params.pub_key=asn1.DSAparam.decode(t.subjectPublicKey.data,"der"),{type:"dsa",data:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"ENCRYPTED PRIVATE KEY":c=asn1.EncryptedPrivateKey.decode(c,"der"),c=decrypt(c,r);case"PRIVATE KEY":switch(t=asn1.PrivateKey.decode(c,"der"),a=t.algorithm.algorithm.join(".")){case"1.2.840.113549.1.1.1":return asn1.RSAPrivateKey.decode(t.subjectPrivateKey,"der");case"1.2.840.10045.2.1":return{curve:t.algorithm.curve,privateKey:asn1.ECPrivateKey.decode(t.subjectPrivateKey,"der").privateKey};case"1.2.840.10040.4.1":return t.algorithm.params.priv_key=asn1.DSAparam.decode(t.subjectPrivateKey,"der"),{type:"dsa",params:t.algorithm.params};default:throw new Error("unknown key id "+a)}throw new Error("unknown key type "+i);case"RSA PUBLIC KEY":return asn1.RSAPublicKey.decode(c,"der");case"RSA PRIVATE KEY":return asn1.RSAPrivateKey.decode(c,"der");case"DSA PRIVATE KEY":return{type:"dsa",params:asn1.DSAPrivateKey.decode(c,"der")};case"EC PRIVATE KEY":return c=asn1.ECPrivateKey.decode(c,"der"),{curve:c.parameters.value,privateKey:c.privateKey};default:throw new Error("unknown key type "+i)}}function decrypt(e,r){var a=e.algorithm.decrypt.kde.kdeparams.salt,t=e.algorithm.decrypt.kde.kdeparams.iters,s=aesid[e.algorithm.decrypt.cipher.algo.join(".")],i=e.algorithm.decrypt.cipher.iv,c=e.subjectPrivateKey,d=parseInt(s.split("-")[1],10)/8,n=compat.pbkdf2Sync(r,a,t,d),o=ciphers.createDecipheriv(s,n,i),u=[];return u.push(o.update(c)),u.push(o["final"]()),Buffer.concat(u)}var asn1=require("./asn1"),aesid=require("./aesid.json"),fixProc=require("./fixProc"),ciphers=require("browserify-aes"),compat=require("pbkdf2-compat");module.exports=parseKeys,parseKeys.signature=asn1.signature;


}).call(this,require("buffer").Buffer)

},{"./aesid.json":134,"./asn1":135,"./fixProc":136,"browserify-aes":25,"buffer":17,"pbkdf2-compat":128}],138:[function(require,module,exports){
var asn1=exports;asn1.bignum=require("bn.js"),asn1.define=require("./asn1/api").define,asn1.base=require("./asn1/base"),asn1.constants=require("./asn1/constants"),asn1.decoders=require("./asn1/decoders"),asn1.encoders=require("./asn1/encoders");


},{"./asn1/api":139,"./asn1/base":141,"./asn1/constants":145,"./asn1/decoders":147,"./asn1/encoders":149,"bn.js":131}],139:[function(require,module,exports){
function Entity(e,t){this.name=e,this.body=t,this.decoders={},this.encoders={}}var asn1=require("../asn1"),inherits=require("inherits"),vm=require("vm"),api=exports;api.define=function(e,t){return new Entity(e,t)},Entity.prototype._createNamed=function(e){var t=vm.runInThisContext("(function "+this.name+"(entity) {\n  this._initNamed(entity);\n})");return inherits(t,e),t.prototype._initNamed=function(t){e.call(this,t)},new t(this)},Entity.prototype._getDecoder=function(e){return this.decoders.hasOwnProperty(e)||(this.decoders[e]=this._createNamed(asn1.decoders[e])),this.decoders[e]},Entity.prototype.decode=function(e,t,n){return this._getDecoder(t).decode(e,n)},Entity.prototype._getEncoder=function(e){return this.encoders.hasOwnProperty(e)||(this.encoders[e]=this._createNamed(asn1.encoders[e])),this.encoders[e]},Entity.prototype.encode=function(e,t,n){return this._getEncoder(t).encode(e,n)};


},{"../asn1":138,"inherits":162,"vm":185}],140:[function(require,module,exports){
function DecoderBuffer(e,t){return Reporter.call(this,t),Buffer.isBuffer(e)?(this.base=e,this.offset=0,void(this.length=e.length)):void this.error("Input not Buffer")}function EncoderBuffer(e,t){if(Array.isArray(e))this.length=0,this.value=e.map(function(e){return e instanceof EncoderBuffer||(e=new EncoderBuffer(e,t)),this.length+=e.length,e},this);else if("number"==typeof e){if(!(e>=0&&255>=e))return t.error("non-byte EncoderBuffer value");this.value=e,this.length=1}else if("string"==typeof e)this.value=e,this.length=Buffer.byteLength(e);else{if(!Buffer.isBuffer(e))return t.error("Unsupported type: "+typeof e);this.value=e,this.length=e.length}}var inherits=require("inherits"),Reporter=require("../base").Reporter,Buffer=require("buffer").Buffer;inherits(DecoderBuffer,Reporter),exports.DecoderBuffer=DecoderBuffer,DecoderBuffer.prototype.save=function(){return{offset:this.offset}},DecoderBuffer.prototype.restore=function(e){var t=new DecoderBuffer(this.base);return t.offset=e.offset,t.length=this.offset,this.offset=e.offset,t},DecoderBuffer.prototype.isEmpty=function(){return this.offset===this.length},DecoderBuffer.prototype.readUInt8=function(e){return this.offset+1<=this.length?this.base.readUInt8(this.offset++,!0):this.error(e||"DecoderBuffer overrun")},DecoderBuffer.prototype.skip=function(e,t){if(!(this.offset+e<=this.length))return this.error(t||"DecoderBuffer overrun");var r=new DecoderBuffer(this.base);return r._reporterState=this._reporterState,r.offset=this.offset,r.length=this.offset+e,this.offset+=e,r},DecoderBuffer.prototype.raw=function(e){return this.base.slice(e?e.offset:this.offset,this.length)},exports.EncoderBuffer=EncoderBuffer,EncoderBuffer.prototype.join=function(e,t){return e||(e=new Buffer(this.length)),t||(t=0),0===this.length?e:(Array.isArray(this.value)?this.value.forEach(function(r){r.join(e,t),t+=r.length}):("number"==typeof this.value?e[t]=this.value:"string"==typeof this.value?e.write(this.value,t):Buffer.isBuffer(this.value)&&this.value.copy(e,t),t+=this.length),e)};


},{"../base":141,"buffer":17,"inherits":162}],141:[function(require,module,exports){
var base=exports;base.Reporter=require("./reporter").Reporter,base.DecoderBuffer=require("./buffer").DecoderBuffer,base.EncoderBuffer=require("./buffer").EncoderBuffer,base.Node=require("./node");


},{"./buffer":140,"./node":142,"./reporter":143}],142:[function(require,module,exports){
function Node(e,t){var r={};this._baseState=r,r.enc=e,r.parent=t||null,r.children=null,r.tag=null,r.args=null,r.reverseArgs=null,r.choice=null,r.optional=!1,r.any=!1,r.obj=!1,r.use=null,r.useDecoder=null,r.key=null,r["default"]=null,r.explicit=null,r.implicit=null,r.parent||(r.children=[],this._wrap())}var Reporter=require("../base").Reporter,EncoderBuffer=require("../base").EncoderBuffer,assert=require("minimalistic-assert"),tags=["seq","seqof","set","setof","octstr","bitstr","objid","bool","gentime","utctime","null_","enum","int","ia5str"],methods=["key","obj","use","optional","explicit","implicit","def","choice","any"].concat(tags),overrided=["_peekTag","_decodeTag","_use","_decodeStr","_decodeObjid","_decodeTime","_decodeNull","_decodeInt","_decodeBool","_decodeList","_encodeComposite","_encodeStr","_encodeObjid","_encodeTime","_encodeNull","_encodeInt","_encodeBool"];module.exports=Node;var stateProps=["enc","parent","children","tag","args","reverseArgs","choice","optional","any","obj","use","alteredUse","key","default","explicit","implicit"];Node.prototype.clone=function(){var e=this._baseState,t={};stateProps.forEach(function(r){t[r]=e[r]});var r=new this.constructor(t.parent);return r._baseState=t,r},Node.prototype._wrap=function(){var e=this._baseState;methods.forEach(function(t){this[t]=function(){var r=new this.constructor(this);return e.children.push(r),r[t].apply(r,arguments)}},this)},Node.prototype._init=function(e){var t=this._baseState;assert(null===t.parent),e.call(this),t.children=t.children.filter(function(e){return e._baseState.parent===this},this),assert.equal(t.children.length,1,"Root node can have only one child")},Node.prototype._useArgs=function(e){var t=this._baseState,r=e.filter(function(e){return e instanceof this.constructor},this);e=e.filter(function(e){return!(e instanceof this.constructor)},this),0!==r.length&&(assert(null===t.children),t.children=r,r.forEach(function(e){e._baseState.parent=this},this)),0!==e.length&&(assert(null===t.args),t.args=e,t.reverseArgs=e.map(function(e){if("object"!=typeof e||e.constructor!==Object)return e;var t={};return Object.keys(e).forEach(function(r){r==(0|r)&&(r|=0);var i=e[r];t[i]=r}),t}))},overrided.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState;throw new Error(e+" not implemented for encoding: "+t.enc)}}),tags.forEach(function(e){Node.prototype[e]=function(){var t=this._baseState,r=Array.prototype.slice.call(arguments);return assert(null===t.tag),t.tag=e,this._useArgs(r),this}}),Node.prototype.use=function(e){var t=this._baseState;return assert(null===t.use),t.use=e,this},Node.prototype.optional=function(){var e=this._baseState;return e.optional=!0,this},Node.prototype.def=function(e){var t=this._baseState;return assert(null===t["default"]),t["default"]=e,t.optional=!0,this},Node.prototype.explicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.explicit=e,this},Node.prototype.implicit=function(e){var t=this._baseState;return assert(null===t.explicit&&null===t.implicit),t.implicit=e,this},Node.prototype.obj=function(){var e=this._baseState,t=Array.prototype.slice.call(arguments);return e.obj=!0,0!==t.length&&this._useArgs(t),this},Node.prototype.key=function(e){var t=this._baseState;return assert(null===t.key),t.key=e,this},Node.prototype.any=function(){var e=this._baseState;return e.any=!0,this},Node.prototype.choice=function(e){var t=this._baseState;return assert(null===t.choice),t.choice=e,this._useArgs(Object.keys(e).map(function(t){return e[t]})),this},Node.prototype._decode=function(e){var t=this._baseState;if(null===t.parent)return e.wrapResult(t.children[0]._decode(e));var r,i=t["default"],o=!0;if(null!==t.key&&(r=e.enterKey(t.key)),t.optional&&(o=this._peekTag(e,null!==t.explicit?t.explicit:null!==t.implicit?t.implicit:t.tag||0),e.isError(o)))return o;var n;if(t.obj&&o&&(n=e.enterObject()),o){if(null!==t.explicit){var s=this._decodeTag(e,t.explicit);if(e.isError(s))return s;e=s}if(null===t.use&&null===t.choice){if(t.any)var a=e.save();var c=this._decodeTag(e,null!==t.implicit?t.implicit:t.tag,t.any);if(e.isError(c))return c;t.any?i=e.raw(a):e=c}if(i=t.any?i:null===t.choice?this._decodeGeneric(t.tag,e):this._decodeChoice(e),e.isError(i))return i;if(!t.any&&null===t.choice&&null!==t.children){var l=t.children.some(function(t){t._decode(e)});if(l)return err}}return t.obj&&o&&(i=e.leaveObject(n)),null===t.key||null===i&&o!==!0||e.leaveKey(r,t.key,i),i},Node.prototype._decodeGeneric=function(e,t){var r=this._baseState;return"seq"===e||"set"===e?null:"seqof"===e||"setof"===e?this._decodeList(t,e,r.args[0]):"octstr"===e||"bitstr"===e||"ia5str"===e?this._decodeStr(t,e):"objid"===e&&r.args?this._decodeObjid(t,r.args[0],r.args[1]):"objid"===e?this._decodeObjid(t,null,null):"gentime"===e||"utctime"===e?this._decodeTime(t,e):"null_"===e?this._decodeNull(t):"bool"===e?this._decodeBool(t):"int"===e||"enum"===e?this._decodeInt(t,r.args&&r.args[0]):null!==r.use?this._getUse(r.use,t._reporterState.obj)._decode(t):t.error("unknown tag: "+e)},Node.prototype._getUse=function(e,t){var r=this._baseState;return r.useDecoder=this._use(e,t),assert(null===r.useDecoder._baseState.parent),r.useDecoder=r.useDecoder._baseState.children[0],r.implicit!==r.useDecoder._baseState.implicit&&(r.useDecoder=r.useDecoder.clone(),r.useDecoder._baseState.implicit=r.implicit),r.useDecoder},Node.prototype._decodeChoice=function(e){var t=this._baseState,r=null,i=!1;return Object.keys(t.choice).some(function(o){var n=e.save(),s=t.choice[o];try{var a=s._decode(e);if(e.isError(a))return!1;r={type:o,value:a},i=!0}catch(c){return e.restore(n),!1}return!0},this),i?r:e.error("Choice not matched")},Node.prototype._createEncoderBuffer=function(e){return new EncoderBuffer(e,this.reporter)},Node.prototype._encode=function(e,t,r){var i=this._baseState;if(null===i["default"]||i["default"]!==e){var o=this._encodeValue(e,t,r);if(void 0!==o&&!this._skipDefault(o,t,r))return o}},Node.prototype._encodeValue=function(e,t,r){var i=this._baseState;if(null===i.parent)return i.children[0]._encode(e,t||new Reporter);var o=null;if(this.reporter=t,i.optional&&void 0===e){if(null===i["default"])return;e=i["default"]}var n=null,s=!1;if(i.any)o=this._createEncoderBuffer(e);else if(i.choice)o=this._encodeChoice(e,t);else if(i.children)n=i.children.map(function(r){if("null_"===r._baseState.tag)return r._encode(null,t,e);if(null===r._baseState.key)return t.error("Child should have a key");var i=t.enterKey(r._baseState.key);if("object"!=typeof e)return t.error("Child expected, but input is not object");var o=r._encode(e[r._baseState.key],t,e);return t.leaveKey(i),o},this).filter(function(e){return e}),n=this._createEncoderBuffer(n);else if("seqof"===i.tag||"setof"===i.tag){if(!i.args||1!==i.args.length)return t.error("Too many args for : "+i.tag);if(!Array.isArray(e))return t.error("seqof/setof, but data is not Array");var a=this.clone();a._baseState.implicit=null,n=this._createEncoderBuffer(e.map(function(r){var i=this._baseState;return this._getUse(i.args[0],e)._encode(r,t)},a))}else null!==i.use?o=this._getUse(i.use,r)._encode(e,t):(n=this._encodePrimitive(i.tag,e),s=!0);var o;if(!i.any&&null===i.choice){var c=null!==i.implicit?i.implicit:i.tag,l=null===i.implicit?"universal":"context";null===c?null===i.use&&t.error("Tag could be ommited only for .use()"):null===i.use&&(o=this._encodeComposite(c,s,l,n))}return null!==i.explicit&&(o=this._encodeComposite(i.explicit,!1,"context",o)),o},Node.prototype._encodeChoice=function(e,t){var r=this._baseState,i=r.choice[e.type];return i||assert(!1,e.type+" not found in "+JSON.stringify(Object.keys(r.choice))),i._encode(e.value,t)},Node.prototype._encodePrimitive=function(e,t){var r=this._baseState;if("octstr"===e||"bitstr"===e||"ia5str"===e)return this._encodeStr(t,e);if("objid"===e&&r.args)return this._encodeObjid(t,r.reverseArgs[0],r.args[1]);if("objid"===e)return this._encodeObjid(t,null,null);if("gentime"===e||"utctime"===e)return this._encodeTime(t,e);if("null_"===e)return this._encodeNull();if("int"===e||"enum"===e)return this._encodeInt(t,r.args&&r.reverseArgs[0]);if("bool"===e)return this._encodeBool(t);throw new Error("Unsupported tag: "+e)};


},{"../base":141,"minimalistic-assert":150}],143:[function(require,module,exports){
function Reporter(r){this._reporterState={obj:null,path:[],options:r||{},errors:[]}}function ReporterError(r,t){this.path=r,this.rethrow(t)}var inherits=require("inherits");exports.Reporter=Reporter,Reporter.prototype.isError=function(r){return r instanceof ReporterError},Reporter.prototype.enterKey=function(r){return this._reporterState.path.push(r)},Reporter.prototype.leaveKey=function(r,t,e){var o=this._reporterState;o.path=o.path.slice(0,r-1),null!==o.obj&&(o.obj[t]=e)},Reporter.prototype.enterObject=function(){var r=this._reporterState,t=r.obj;return r.obj={},t},Reporter.prototype.leaveObject=function(r){var t=this._reporterState,e=t.obj;return t.obj=r,e},Reporter.prototype.error=function(r){var t,e=this._reporterState,o=r instanceof ReporterError;if(t=o?r:new ReporterError(e.path.map(function(r){return"["+JSON.stringify(r)+"]"}).join(""),r.message||r,r.stack),!e.options.partial)throw t;return o||e.errors.push(t),t},Reporter.prototype.wrapResult=function(r){var t=this._reporterState;return t.options.partial?{result:this.isError(r)?null:r,errors:t.errors}:r},inherits(ReporterError,Error),ReporterError.prototype.rethrow=function(r){return this.message=r+" at: "+(this.path||"(shallow)"),Error.captureStackTrace(this,ReporterError),this};


},{"inherits":162}],144:[function(require,module,exports){
var constants=require("../constants");exports.tagClass={0:"universal",1:"application",2:"context",3:"private"},exports.tagClassByName=constants._reverse(exports.tagClass),exports.tag={0:"end",1:"bool",2:"int",3:"bitstr",4:"octstr",5:"null_",6:"objid",7:"objDesc",8:"external",9:"real",10:"enum",11:"embed",12:"utf8str",13:"relativeOid",16:"seq",17:"set",18:"numstr",19:"printstr",20:"t61str",21:"videostr",22:"ia5str",23:"utctime",24:"gentime",25:"graphstr",26:"iso646str",27:"genstr",28:"unistr",29:"charstr",30:"bmpstr"},exports.tagByName=constants._reverse(exports.tag);


},{"../constants":145}],145:[function(require,module,exports){
var constants=exports;constants._reverse=function(r){var e={};return Object.keys(r).forEach(function(n){(0|n)==n&&(n=0|n);var t=r[n];e[t]=n}),e},constants.der=require("./der");


},{"./der":144}],146:[function(require,module,exports){
function DERDecoder(r){this.enc="der",this.name=r.name,this.entity=r,this.tree=new DERNode,this.tree._init(r.body)}function DERNode(r){base.Node.call(this,"der",r)}function derDecodeTag(r,e){var t=r.readUInt8(e);if(r.isError(t))return t;var i=der.tagClass[t>>6],o=0===(32&t);if(31===(31&t)){var n=t;for(t=0;128===(128&n);){if(n=r.readUInt8(e),r.isError(n))return n;t<<=7,t|=127&n}}else t&=31;var d=der.tag[t];return{cls:i,primitive:o,tag:t,tagStr:d}}function derDecodeLen(r,e,t){var i=r.readUInt8(t);if(r.isError(i))return i;if(!e&&128===i)return null;if(0===(128&i))return i;var o=127&i;if(o>=4)return r.error("length octect is too long");i=0;for(var n=0;o>n;n++){i<<=8;var d=r.readUInt8(t);if(r.isError(d))return d;i|=d}return i}var inherits=require("inherits"),asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DERDecoder,DERDecoder.prototype.decode=function(r,e){return r instanceof base.DecoderBuffer||(r=new base.DecoderBuffer(r,e)),this.tree._decode(r,e)},inherits(DERNode,base.Node),DERNode.prototype._peekTag=function(r,e){if(r.isEmpty())return!1;var t=r.save(),i=derDecodeTag(r,'Failed to peek tag: "'+e+'"');return r.isError(i)?i:(r.restore(t),i.tag===e||i.tagStr===e)},DERNode.prototype._decodeTag=function(r,e,t){var i=derDecodeTag(r,'Failed to decode tag of "'+e+'"');if(r.isError(i))return i;var o=derDecodeLen(r,i.primitive,'Failed to get length of "'+e+'"');if(r.isError(o))return o;if(!t&&i.tag!==e&&i.tagStr!==e&&i.tagStr+"of"!==e)return r.error('Failed to match tag: "'+e+'"');if(i.primitive||null!==o)return r.skip(o,'Failed to match body of: "'+e+'"');var n=r.start(),d=this._skipUntilEnd(r,'Failed to skip indefinite length body: "'+this.tag+'"');return r.isError(d)?d:r.cut(n)},DERNode.prototype._skipUntilEnd=function(r,e){for(;;){var t=derDecodeTag(r,e);if(r.isError(t))return t;var i=derDecodeLen(r,t.primitive,e);if(r.isError(i))return i;var o;if(o=t.primitive||null!==i?r.skip(i):this._skipUntilEnd(r,e),r.isError(o))return o;if("end"===t.tagStr)break}},DERNode.prototype._decodeList=function(r,e,t){for(var i=[];!r.isEmpty();){var o=this._peekTag(r,"end");if(r.isError(o))return o;var n=t.decode(r,"der");if(r.isError(n)&&o)break;i.push(n)}return i},DERNode.prototype._decodeStr=function(r,e){if("octstr"===e)return r.raw();if("bitstr"===e){var t=r.readUInt8();return r.isError(t)?t:{unused:t,data:r.raw()}}return"ia5str"===e?r.raw().toString():this.error("Decoding of string type: "+e+" unsupported")},DERNode.prototype._decodeObjid=function(r,e,t){for(var i=[],o=0;!r.isEmpty();){var n=r.readUInt8();o<<=7,o|=127&n,0===(128&n)&&(i.push(o),o=0)}128&n&&i.push(o);var d=i[0]/40|0,a=i[0]%40;return result=t?i:[d,a].concat(i.slice(1)),e&&(result=e[result.join(" ")]),result},DERNode.prototype._decodeTime=function(r,e){var t=r.raw().toString();if("gentime"===e)var i=0|t.slice(0,4),o=0|t.slice(4,6),n=0|t.slice(6,8),d=0|t.slice(8,10),a=0|t.slice(10,12),s=0|t.slice(12,14);else{if("utctime"!==e)return this.error("Decoding "+e+" time is not supported yet");var i=0|t.slice(0,2),o=0|t.slice(2,4),n=0|t.slice(4,6),d=0|t.slice(6,8),a=0|t.slice(8,10),s=0|t.slice(10,12);i=70>i?2e3+i:1900+i}return Date.UTC(i,o-1,n,d,a,s,0)},DERNode.prototype._decodeNull=function(){return null},DERNode.prototype._decodeBool=function(r){var e=r.readUInt8();return r.isError(e)?e:0!==e},DERNode.prototype._decodeInt=function(r,e){var t=0,i=r.raw();if(i.length>3)return new bignum(i);for(;!r.isEmpty();){t<<=8;var o=r.readUInt8();if(r.isError(o))return o;t|=o}return e&&(t=e[t]||t),t},DERNode.prototype._use=function(r,e){return"function"==typeof r&&(r=r(e)),r._getDecoder("der").tree};


},{"../../asn1":138,"inherits":162}],147:[function(require,module,exports){
var decoders=exports;decoders.der=require("./der");


},{"./der":146}],148:[function(require,module,exports){
function DEREncoder(e){this.enc="der",this.name=e.name,this.entity=e,this.tree=new DERNode,this.tree._init(e.body)}function DERNode(e){base.Node.call(this,"der",e)}function two(e){return 10>=e?"0"+e:e}function encodeTag(e,r,t,n){var o;if("seqof"===e?e="seq":"setof"===e&&(e="set"),der.tagByName.hasOwnProperty(e))o=der.tagByName[e];else{if("number"!=typeof e||(0|e)!==e)return n.error("Unknown tag: "+e);o=e}return o>=31?n.error("Multi-octet tag encoding unsupported"):(r||(o|=32),o|=der.tagClassByName[t||"universal"]<<6)}var inherits=require("inherits"),Buffer=require("buffer").Buffer,asn1=require("../../asn1"),base=asn1.base,bignum=asn1.bignum,der=asn1.constants.der;module.exports=DEREncoder,DEREncoder.prototype.encode=function(e,r){return this.tree._encode(e,r).join()},inherits(DERNode,base.Node),DERNode.prototype._encodeComposite=function(e,r,t,n){var o=encodeTag(e,r,t,this.reporter);if(n.length<128){var i=new Buffer(2);return i[0]=o,i[1]=n.length,this._createEncoderBuffer([i,n])}for(var f=1,u=n.length;u>=256;u>>=8)f++;var i=new Buffer(2+f);i[0]=o,i[1]=128|f;for(var u=1+f,s=n.length;s>0;u--,s>>=8)i[u]=255&s;return this._createEncoderBuffer([i,n])},DERNode.prototype._encodeStr=function(e,r){return"octstr"===r?this._createEncoderBuffer(e):"bitstr"===r?this._createEncoderBuffer([0|e.unused,e.data]):"ia5str"===r?this._createEncoderBuffer(e):this.reporter.error("Encoding of string type: "+r+" unsupported")},DERNode.prototype._encodeObjid=function(e,r,t){if("string"==typeof e){if(!r)return this.reporter.error("string objid given, but no values map found");if(!r.hasOwnProperty(e))return this.reporter.error("objid not found in values map");e=r[e].split(/\s+/g);for(var n=0;n<e.length;n++)e[n]|=0}else Array.isArray(e)&&(e=e.slice());if(!Array.isArray(e))return this.reporter.error("objid() should be either array or string, got: "+JSON.stringify(e));if(!t){if(e[1]>=40)return this.reporter.error("Second objid identifier OOB");e.splice(0,2,40*e[0]+e[1])}for(var o=0,n=0;n<e.length;n++){var i=e[n];for(o++;i>=128;i>>=7)o++}for(var f=new Buffer(o),u=f.length-1,n=e.length-1;n>=0;n--){var i=e[n];for(f[u--]=127&i;(i>>=7)>0;)f[u--]=128|127&i}return this._createEncoderBuffer(f)},DERNode.prototype._encodeTime=function(e,r){var t,n=new Date(e);return"gentime"===r?t=[n.getFullYear(),two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):"utctime"===r?t=[n.getFullYear()%100,two(n.getUTCMonth()+1),two(n.getUTCDate()),two(n.getUTCHours()),two(n.getUTCMinutes()),two(n.getUTCSeconds()),"Z"].join(""):this.reporter.error("Encoding "+r+" time is not supported yet"),this._encodeStr(t,"octstr")},DERNode.prototype._encodeNull=function(){return this._createEncoderBuffer("")},DERNode.prototype._encodeInt=function(e,r){if("string"==typeof e){if(!r)return this.reporter.error("String int or enum given, but no values map");if(!r.hasOwnProperty(e))return this.reporter.error("Values map doesn't contain: "+JSON.stringify(e));e=r[e]}if(null!==bignum&&e instanceof bignum){var t=e.toArray();e.sign===!1&&128&t[0]&&t.unshift(0),e=new Buffer(t)}if(Buffer.isBuffer(e)){var n=e.length;0===e.length&&n++;var o=new Buffer(n);return e.copy(o),0===e.length&&(o[0]=0),this._createEncoderBuffer(o)}if(128>e)return this._createEncoderBuffer(e);if(256>e)return this._createEncoderBuffer([0,e]);for(var n=1,i=e;i>=256;i>>=8)n++;for(var o=new Array(n),i=o.length-1;i>=0;i--)o[i]=255&e,e>>=8;return 128&o[0]&&o.unshift(0),this._createEncoderBuffer(new Buffer(o))},DERNode.prototype._encodeBool=function(e){return this._createEncoderBuffer(e?255:0)},DERNode.prototype._use=function(e,r){return"function"==typeof e&&(e=e(r)),e._getEncoder("der").tree},DERNode.prototype._skipDefault=function(e,r,t){var n,o=this._baseState;if(null===o["default"])return!1;var i=e.join();if(void 0===o.defaultBuffer&&(o.defaultBuffer=this._encodeValue(o["default"],r,t).join()),i.length!==o.defaultBuffer.length)return!1;for(n=0;n<i.length;n++)if(i[n]!==o.defaultBuffer[n])return!1;return!0};


},{"../../asn1":138,"buffer":17,"inherits":162}],149:[function(require,module,exports){
var encoders=exports;encoders.der=require("./der");


},{"./der":148}],150:[function(require,module,exports){
function assert(r,e){if(!r)throw new Error(e||"Assertion failed")}module.exports=assert,assert.equal=function(r,e,s){if(r!=e)throw new Error(s||"Assertion failed: "+r+" != "+e)};


},{}],151:[function(require,module,exports){
(function (Buffer){
function oaep(r,e){var n=(r.modulus,r.modulus.byteLength()),t=(e.length,createHash("sha1").update(new Buffer("")).digest()),i=t.length;if(0!==e[0])throw new Error("decryption error");var o=e.slice(1,i+1),u=e.slice(i+1),a=xor(o,mgf(u,i)),c=xor(u,mgf(a,n-i-1));if(compare(t,c.slice(0,i)))throw new Error("decryption error");for(var f=i;0===c[f];)f++;if(1!==c[f++])throw new Error("decryption error");return c.slice(f)}function pkcs1(r,e,n){for(var t=e.slice(0,2),i=2,o=0;0!==e[i++];)if(i>=e.length){o++;break}{var u=e.slice(2,i-1);e.slice(i-1,i)}if(("0002"!==t.toString("hex")&&!n||"0001"!==t.toString("hex")&&n)&&o++,u.length<8&&o++,o)throw new Error("decryption error");return e.slice(i)}function compare(r,e){r=new Buffer(r),e=new Buffer(e);var n=0,t=r.length;r.length!==e.length&&(n++,t=Math.min(r.length,e.length));for(var i=-1;++i<t;)n+=r[i]^e[i];return n}var parseKeys=require("parse-asn1"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),crt=require("browserify-rsa"),createHash=require("create-hash"),withPublic=require("./withPublic");module.exports=function(r,e,n){var t;t=r.padding?r.padding:n?1:4;var i=parseKeys(r),o=i.modulus.byteLength();if(e.length>o||new bn(e).cmp(i.modulus)>=0)throw new Error("decryption error");var u;u=n?withPublic(new bn(e),i):crt(e,i);var a=new Buffer(o-u.length);if(a.fill(0),u=Buffer.concat([a,u],o),4===t)return oaep(i,u);if(1===t)return pkcs1(i,u,n);if(3===t)return u;throw new Error("unknown padding")};


}).call(this,require("buffer").Buffer)

},{"./mgf":130,"./withPublic":153,"./xor":154,"bn.js":131,"browserify-rsa":132,"buffer":17,"create-hash":109,"parse-asn1":137}],152:[function(require,module,exports){
(function (Buffer){
function oaep(e,r){var n=e.modulus.byteLength(),o=r.length,t=createHash("sha1").update(new Buffer("")).digest(),f=t.length,u=2*f;if(o>n-u-2)throw new Error("message too long");var a=new Buffer(n-o-u-2);a.fill(0);var s=n-f-1,i=randomBytes(f),w=xor(Buffer.concat([t,a,new Buffer([1]),r],s),mgf(i,s)),c=xor(i,mgf(w,f));return new bn(Buffer.concat([new Buffer([0]),c,w],n))}function pkcs1(e,r,n){var o=r.length,t=e.modulus.byteLength();if(o>t-11)throw new Error("message too long");var f;return n?(f=new Buffer(t-o-3),f.fill(255)):f=nonZero(t-o-3),new bn(Buffer.concat([new Buffer([0,n?1:2]),f,new Buffer([0]),r],t))}function nonZero(e){for(var r,n=new Buffer(e),o=0,t=randomBytes(2*e),f=0;e>o;)f===t.length&&(t=randomBytes(2*e),f=0),r=t[f++],r&&(n[o++]=r);return n}var parseKeys=require("parse-asn1"),randomBytes=require("randombytes"),createHash=require("create-hash"),mgf=require("./mgf"),xor=require("./xor"),bn=require("bn.js"),withPublic=require("./withPublic"),crt=require("browserify-rsa"),constants={RSA_PKCS1_OAEP_PADDING:4,RSA_PKCS1_PADDIN:1,RSA_NO_PADDING:3};module.exports=function(e,r,n){var o;o=e.padding?e.padding:n?1:4;var t,f=parseKeys(e);if(4===o)t=oaep(f,r);else if(1===o)t=pkcs1(f,r,n);else{if(3!==o)throw new Error("unknown padding");if(t=new bn(r),t.cmp(f.modulus)>=0)throw new Error("data too long for modulus")}return n?crt(t,f):withPublic(t,f)};


}).call(this,require("buffer").Buffer)

},{"./mgf":130,"./withPublic":153,"./xor":154,"bn.js":131,"browserify-rsa":132,"buffer":17,"create-hash":109,"parse-asn1":137,"randombytes":155}],153:[function(require,module,exports){
(function (Buffer){
function withPublic(e,n){return new Buffer(e.toRed(bn.mont(n.modulus)).redPow(new bn(n.publicExponent)).fromRed().toArray())}var bn=require("bn.js");module.exports=withPublic;


}).call(this,require("buffer").Buffer)

},{"bn.js":131,"buffer":17}],154:[function(require,module,exports){
module.exports=function(r,e){for(var n=r.length,o=-1;++o<n;)r[o]^=e[o];return r};


},{}],155:[function(require,module,exports){
(function (process,global,Buffer){
"use strict";function randomBytes(r,o){var e=new Buffer(r);return crypto.getRandomValues(e),"function"==typeof o?process.nextTick(function(){o(null,e)}):e}function oldBrowser(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}var crypto=global.crypto||global.msCrypto;module.exports=crypto&&crypto.getRandomValues?randomBytes:oldBrowser;


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)

},{"_process":164,"buffer":17}],156:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,n,s,i,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],isUndefined(n))return!1;if(isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];n.apply(this,i)}else if(isObject(n)){for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];for(o=n.slice(),s=o.length,r=0;s>r;r++)o[r].apply(this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){var n;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned){var n;n=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},EventEmitter.prototype.removeListener=function(e,t){var n,s,i,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,s=-1,n===t||isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(n)){for(r=i;r-->0;)if(n[r]===t||n[r].listener&&n[r].listener===t){s=r;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],isFunction(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?isFunction(e._events[t])?1:e._events[t].length:0};


},{}],157:[function(require,module,exports){
var http=module.exports,EventEmitter=require("events").EventEmitter,Request=require("./lib/request"),url=require("url");http.request=function(e,t){"string"==typeof e&&(e=url.parse(e)),e||(e={}),e.host||e.port||(e.port=parseInt(window.location.port,10)),!e.host&&e.hostname&&(e.host=e.hostname),e.protocol||(e.protocol=e.scheme?e.scheme+":":window.location.protocol),e.host||(e.host=window.location.hostname||window.location.host),/:/.test(e.host)&&(e.port||(e.port=e.host.split(":")[1]),e.host=e.host.split(":")[0]),e.port||(e.port="https:"==e.protocol?443:80);var o=new Request(new xhrHttp,e);return t&&o.on("response",t),o},http.get=function(e,t){e.method="GET";var o=http.request(e,t);return o.end(),o},http.Agent=function(){},http.Agent.defaultMaxSockets=4;var xhrHttp=function(){if("undefined"==typeof window)throw new Error("no window object present");if(window.XMLHttpRequest)return window.XMLHttpRequest;if(window.ActiveXObject){for(var e=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"],t=0;t<e.length;t++)try{var o=new window.ActiveXObject(e[t]);return function(){if(o){var r=o;return o=null,r}return new window.ActiveXObject(e[t])}}catch(r){}throw new Error("ajax not supported in this browser")}throw new Error("ajax not supported in this browser")}();http.STATUS_CODES={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choices",301:"Moved Permanently",302:"Moved Temporarily",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Time-out",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Large",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Time-out",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"};


},{"./lib/request":158,"events":156,"url":182}],158:[function(require,module,exports){
var Stream=require("stream"),Response=require("./response"),Base64=require("Base64"),inherits=require("inherits"),Request=module.exports=function(e,t){var r=this;r.writable=!0,r.xhr=e,r.body=[],r.uri=(t.protocol||"http:")+"//"+t.host+(t.port?":"+t.port:"")+(t.path||"/"),"undefined"==typeof t.withCredentials&&(t.withCredentials=!0);try{e.withCredentials=t.withCredentials}catch(o){}if(t.responseType)try{e.responseType=t.responseType}catch(o){}if(e.open(t.method||"GET",r.uri,!0),e.onerror=function(){r.emit("error",new Error("Network error"))},r._headers={},t.headers)for(var s=objectKeys(t.headers),i=0;i<s.length;i++){var n=s[i];if(r.isSafeRequestHeader(n)){var a=t.headers[n];r.setHeader(n,a)}}t.auth&&this.setHeader("Authorization","Basic "+Base64.btoa(t.auth));var h=new Response;h.on("close",function(){r.emit("close")}),h.on("ready",function(){r.emit("response",h)}),h.on("error",function(e){r.emit("error",e)}),e.onreadystatechange=function(){e.__aborted||h.handle(e)}};inherits(Request,Stream),Request.prototype.setHeader=function(e,t){this._headers[e.toLowerCase()]=t},Request.prototype.getHeader=function(e){return this._headers[e.toLowerCase()]},Request.prototype.removeHeader=function(e){delete this._headers[e.toLowerCase()]},Request.prototype.write=function(e){this.body.push(e)},Request.prototype.destroy=function(){this.xhr.__aborted=!0,this.xhr.abort(),this.emit("close")},Request.prototype.end=function(e){void 0!==e&&this.body.push(e);for(var t=objectKeys(this._headers),r=0;r<t.length;r++){var o=t[r],s=this._headers[o];if(isArray(s))for(var i=0;i<s.length;i++)this.xhr.setRequestHeader(o,s[i]);else this.xhr.setRequestHeader(o,s)}if(0===this.body.length)this.xhr.send("");else if("string"==typeof this.body[0])this.xhr.send(this.body.join(""));else if(isArray(this.body[0])){for(var n=[],r=0;r<this.body.length;r++)n.push.apply(n,this.body[r]);this.xhr.send(n)}else if(/Array/.test(Object.prototype.toString.call(this.body[0]))){for(var a=0,r=0;r<this.body.length;r++)a+=this.body[r].length;for(var n=new this.body[0].constructor(a),h=0,r=0;r<this.body.length;r++)for(var d=this.body[r],i=0;i<d.length;i++)n[h++]=d[i];this.xhr.send(n)}else if(isXHR2Compatible(this.body[0]))this.xhr.send(this.body[0]);else{for(var n="",r=0;r<this.body.length;r++)n+=this.body[r].toString();this.xhr.send(n)}},Request.unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","content-transfer-encoding","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"],Request.prototype.isSafeRequestHeader=function(e){return e?-1===indexOf(Request.unsafeHeaders,e.toLowerCase()):!1};var objectKeys=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t},isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},indexOf=function(e,t){if(e.indexOf)return e.indexOf(t);for(var r=0;r<e.length;r++)if(e[r]===t)return r;return-1},isXHR2Compatible=function(e){return"undefined"!=typeof Blob&&e instanceof Blob?!0:"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?!0:"undefined"!=typeof FormData&&e instanceof FormData?!0:void 0};


},{"./response":159,"Base64":160,"inherits":162,"stream":180}],159:[function(require,module,exports){
function parseHeaders(e){for(var t=e.getAllResponseHeaders().split(/\r?\n/),s={},r=0;r<t.length;r++){var a=t[r];if(""!==a){var i=a.match(/^([^:]+):\s*(.*)/);if(i){var o=i[1].toLowerCase(),n=i[2];void 0!==s[o]?isArray(s[o])?s[o].push(n):s[o]=[s[o],n]:s[o]=n}else s[a]=!0}}return s}var Stream=require("stream"),util=require("util"),Response=module.exports=function(){this.offset=0,this.readable=!0};util.inherits(Response,Stream);var capable={streaming:!0,status2:!0};Response.prototype.getResponse=function(e){var t=String(e.responseType).toLowerCase();return"blob"===t?e.responseBlob||e.response:"arraybuffer"===t?e.response:e.responseText},Response.prototype.getHeader=function(e){return this.headers[e.toLowerCase()]},Response.prototype.handle=function(e){if(2===e.readyState&&capable.status2){try{this.statusCode=e.status,this.headers=parseHeaders(e)}catch(t){capable.status2=!1}capable.status2&&this.emit("ready")}else if(capable.streaming&&3===e.readyState){try{this.statusCode||(this.statusCode=e.status,this.headers=parseHeaders(e),this.emit("ready"))}catch(t){}try{this._emitData(e)}catch(t){capable.streaming=!1}}else 4===e.readyState&&(this.statusCode||(this.statusCode=e.status,this.emit("ready")),this._emitData(e),e.error?this.emit("error",this.getResponse(e)):this.emit("end"),this.emit("close"))},Response.prototype._emitData=function(e){var t=this.getResponse(e);return t.toString().match(/ArrayBuffer/)?(this.emit("data",new Uint8Array(t,this.offset)),void(this.offset=t.byteLength)):void(t.length>this.offset&&(this.emit("data",t.slice(this.offset)),this.offset=t.length))};var isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};


},{"stream":180,"util":184}],160:[function(require,module,exports){
!function(){function t(t){this.message=t}var e="undefined"!=typeof exports?exports:this,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var o,n,a=0,i=r,c="";e.charAt(0|a)||(i="=",a%1);c+=i.charAt(63&o>>8-a%1*8)){if(n=e.charCodeAt(a+=.75),n>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");o=o<<8|n}return c}),e.atob||(e.atob=function(e){if(e=e.replace(/=+$/,""),e.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,n,a=0,i=0,c="";n=e.charAt(i++);~n&&(o=a%4?64*o+n:n,a++%4)?c+=String.fromCharCode(255&o>>(-2*a&6)):0)n=r.indexOf(n);return c})}();


},{}],161:[function(require,module,exports){
var http=require("http"),https=module.exports;for(var key in http)http.hasOwnProperty(key)&&(https[key]=http[key]);https.request=function(t,e){return t||(t={}),t.scheme="https",http.request.call(this,t,e)};


},{"http":157}],162:[function(require,module,exports){
module.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};


},{}],163:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};


},{}],164:[function(require,module,exports){
function drainQueue(){if(!draining){draining=!0;for(var e,o=queue.length;o;){e=queue,queue=[];for(var r=-1;++r<o;)e[r]();o=queue.length}draining=!1}}function noop(){}var process=module.exports={},queue=[],draining=!1;process.nextTick=function(e){queue.push(e),draining||setTimeout(drainQueue,0)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};


},{}],165:[function(require,module,exports){
(function (global){
!function(o){function e(o){throw RangeError(L[o])}function n(o,e){for(var n=o.length;n--;)o[n]=e(o[n]);return o}function t(o,e){return n(o.split(S),e).join(".")}function r(o){for(var e,n,t=[],r=0,u=o.length;u>r;)e=o.charCodeAt(r++),e>=55296&&56319>=e&&u>r?(n=o.charCodeAt(r++),56320==(64512&n)?t.push(((1023&e)<<10)+(1023&n)+65536):(t.push(e),r--)):t.push(e);return t}function u(o){return n(o,function(o){var e="";return o>65535&&(o-=65536,e+=R(o>>>10&1023|55296),o=56320|1023&o),e+=R(o)}).join("")}function i(o){return 10>o-48?o-22:26>o-65?o-65:26>o-97?o-97:x}function f(o,e){return o+22+75*(26>o)-((0!=e)<<5)}function c(o,e,n){var t=0;for(o=n?P(o/m):o>>1,o+=P(o/e);o>M*C>>1;t+=x)o=P(o/M);return P(t+(M+1)*o/(o+j))}function l(o){var n,t,r,f,l,d,s,a,p,h,v=[],g=o.length,w=0,j=I,m=A;for(t=o.lastIndexOf(F),0>t&&(t=0),r=0;t>r;++r)o.charCodeAt(r)>=128&&e("not-basic"),v.push(o.charCodeAt(r));for(f=t>0?t+1:0;g>f;){for(l=w,d=1,s=x;f>=g&&e("invalid-input"),a=i(o.charCodeAt(f++)),(a>=x||a>P((b-w)/d))&&e("overflow"),w+=a*d,p=m>=s?y:s>=m+C?C:s-m,!(p>a);s+=x)h=x-p,d>P(b/h)&&e("overflow"),d*=h;n=v.length+1,m=c(w-l,n,0==l),P(w/n)>b-j&&e("overflow"),j+=P(w/n),w%=n,v.splice(w++,0,j)}return u(v)}function d(o){var n,t,u,i,l,d,s,a,p,h,v,g,w,j,m,E=[];for(o=r(o),g=o.length,n=I,t=0,l=A,d=0;g>d;++d)v=o[d],128>v&&E.push(R(v));for(u=i=E.length,i&&E.push(F);g>u;){for(s=b,d=0;g>d;++d)v=o[d],v>=n&&s>v&&(s=v);for(w=u+1,s-n>P((b-t)/w)&&e("overflow"),t+=(s-n)*w,n=s,d=0;g>d;++d)if(v=o[d],n>v&&++t>b&&e("overflow"),v==n){for(a=t,p=x;h=l>=p?y:p>=l+C?C:p-l,!(h>a);p+=x)m=a-h,j=x-h,E.push(R(f(h+m%j,0))),a=P(m/j);E.push(R(f(a,0))),l=c(t,w,u==i),t=0,++u}++t,++n}return E.join("")}function s(o){return t(o,function(o){return E.test(o)?l(o.slice(4).toLowerCase()):o})}function a(o){return t(o,function(o){return O.test(o)?"xn--"+d(o):o})}var p="object"==typeof exports&&exports,h="object"==typeof module&&module&&module.exports==p&&module,v="object"==typeof global&&global;(v.global===v||v.window===v)&&(o=v);var g,w,b=2147483647,x=36,y=1,C=26,j=38,m=700,A=72,I=128,F="-",E=/^xn--/,O=/[^ -~]/,S=/\x2E|\u3002|\uFF0E|\uFF61/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},M=x-y,P=Math.floor,R=String.fromCharCode;if(g={version:"1.2.4",ucs2:{decode:r,encode:u},decode:l,encode:d,toASCII:a,toUnicode:s},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return g});else if(p&&!p.nodeType)if(h)h.exports=g;else for(w in g)g.hasOwnProperty(w)&&(p[w]=g[w]);else o.punycode=g}(this);


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],166:[function(require,module,exports){
"use strict";function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}module.exports=function(r,e,t,n){e=e||"&",t=t||"=";var o={};if("string"!=typeof r||0===r.length)return o;var a=/\+/g;r=r.split(e);var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var y=0;p>y;++y){var u,c,i,l,f=r[y].replace(a,"%20"),v=f.indexOf(t);v>=0?(u=f.substr(0,v),c=f.substr(v+1)):(u=f,c=""),i=decodeURIComponent(u),l=decodeURIComponent(c),hasOwnProperty(o,i)?isArray(o[i])?o[i].push(l):o[i]=[o[i],l]:o[i]=l}return o};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};


},{}],167:[function(require,module,exports){
"use strict";function map(r,e){if(r.map)return r.map(e);for(var t=[],n=0;n<r.length;n++)t.push(e(r[n],n));return t}var stringifyPrimitive=function(r){switch(typeof r){case"string":return r;case"boolean":return r?"true":"false";case"number":return isFinite(r)?r:"";default:return""}};module.exports=function(r,e,t,n){return e=e||"&",t=t||"=",null===r&&(r=void 0),"object"==typeof r?map(objectKeys(r),function(n){var i=encodeURIComponent(stringifyPrimitive(n))+t;return isArray(r[n])?map(r[n],function(r){return i+encodeURIComponent(stringifyPrimitive(r))}).join(e):i+encodeURIComponent(stringifyPrimitive(r[n]))}).join(e):n?encodeURIComponent(stringifyPrimitive(n))+t+encodeURIComponent(stringifyPrimitive(r)):""};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)},objectKeys=Object.keys||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.push(t);return e};


},{}],168:[function(require,module,exports){
"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode");


},{"./decode":166,"./encode":167}],169:[function(require,module,exports){
module.exports=require("./lib/_stream_duplex.js");


},{"./lib/_stream_duplex.js":170}],170:[function(require,module,exports){
(function (process){
function Duplex(e){return this instanceof Duplex?(Readable.call(this,e),Writable.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",onend)):new Duplex(e)}function onend(){this.allowHalfOpen||this._writableState.ended||process.nextTick(this.end.bind(this))}function forEach(e,t){for(var i=0,r=e.length;r>i;i++)t(e[i],i)}module.exports=Duplex;var objectKeys=Object.keys||function(e){var t=[];for(var i in e)t.push(i);return t},util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable),forEach(objectKeys(Writable.prototype),function(e){Duplex.prototype[e]||(Duplex.prototype[e]=Writable.prototype[e])});


}).call(this,require('_process'))

},{"./_stream_readable":172,"./_stream_writable":174,"_process":164,"core-util-is":175,"inherits":162}],171:[function(require,module,exports){
function PassThrough(r){return this instanceof PassThrough?void Transform.call(this,r):new PassThrough(r)}module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(r,s,i){i(null,r)};


},{"./_stream_transform":173,"core-util-is":175,"inherits":162}],172:[function(require,module,exports){
(function (process){
function ReadableState(e,t){var n=require("./_stream_duplex");e=e||{};var r=e.highWaterMark,i=e.objectMode?16:16384;this.highWaterMark=r||0===r?r:i,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!e.objectMode,t instanceof n&&(this.objectMode=this.objectMode||!!e.readableObjectMode),this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){require("./_stream_duplex");return this instanceof Readable?(this._readableState=new ReadableState(e,this),this.readable=!0,void Stream.call(this)):new Readable(e)}function readableAddChunk(e,t,n,r,i){var a=chunkInvalid(t,n);if(a)e.emit("error",a);else if(util.isNullOrUndefined(n))t.reading=!1,t.ended||onEofChunk(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!i){var d=new Error("stream.push() after EOF");e.emit("error",d)}else if(t.endEmitted&&i){var d=new Error("stream.unshift() after end event");e.emit("error",d)}else!t.decoder||i||r||(n=t.decoder.write(n)),i||(t.reading=!1),t.flowing&&0===t.length&&!t.sync?(e.emit("data",n),e.read(0)):(t.length+=t.objectMode?1:n.length,i?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&emitReadable(e)),maybeReadMore(e,t);else i||(t.reading=!1);return needMoreData(t)}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function roundUpToNextPowerOf2(e){if(e>=MAX_HWM)e=MAX_HWM;else{e--;for(var t=1;32>t;t<<=1)e|=e>>t;e++}return e}function howMuchToRead(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:isNaN(e)||util.isNull(e)?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=roundUpToNextPowerOf2(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function chunkInvalid(e,t){var n=null;return util.isBuffer(t)||util.isString(t)||util.isNullOrUndefined(t)||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function onEofChunk(e,t){if(t.decoder&&!t.ended){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,emitReadable(e)}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(debug("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?process.nextTick(function(){emitReadable_(e)}):emitReadable_(e))}function emitReadable_(e){debug("emit readable"),e.emit("readable"),flow(e)}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,process.nextTick(function(){maybeReadMore_(e,t)}))}function maybeReadMore_(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(debug("maybeReadMore read 0"),e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;debug("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&EE.listenerCount(e,"data")&&(t.flowing=!0,flow(e))}}function resume(e,t){t.resumeScheduled||(t.resumeScheduled=!0,process.nextTick(function(){resume_(e,t)}))}function resume_(e,t){t.resumeScheduled=!1,e.emit("resume"),flow(e),t.flowing&&!t.reading&&e.read(0)}function flow(e){var t=e._readableState;if(debug("flow",t.flowing),t.flowing)do var n=e.read();while(null!==n&&t.flowing)}function fromList(e,t){var n,r=t.buffer,i=t.length,a=!!t.decoder,d=!!t.objectMode;if(0===r.length)return null;if(0===i)n=null;else if(d)n=r.shift();else if(!e||e>=i)n=a?r.join(""):Buffer.concat(r,i),r.length=0;else if(e<r[0].length){var o=r[0];n=o.slice(0,e),r[0]=o.slice(e)}else if(e===r[0].length)n=r.shift();else{n=a?"":new Buffer(e);for(var l=0,u=0,s=r.length;s>u&&e>l;u++){var o=r[0],h=Math.min(e-l,o.length);a?n+=o.slice(0,h):o.copy(n,l,0,h),h<o.length?r[0]=o.slice(h):r.shift(),l+=h}}return n}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error("endReadable called on non-empty stream");t.endEmitted||(t.ended=!0,process.nextTick(function(){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}))}function forEach(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}function indexOf(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}module.exports=Readable;var isArray=require("isarray"),Buffer=require("buffer").Buffer;Readable.ReadableState=ReadableState;var EE=require("events").EventEmitter;EE.listenerCount||(EE.listenerCount=function(e,t){return e.listeners(t).length});var Stream=require("stream"),util=require("core-util-is");util.inherits=require("inherits");var StringDecoder,debug=require("util");debug=debug&&debug.debuglog?debug.debuglog("stream"):function(){},util.inherits(Readable,Stream),Readable.prototype.push=function(e,t){var n=this._readableState;return util.isString(e)&&!n.objectMode&&(t=t||n.defaultEncoding,t!==n.encoding&&(e=new Buffer(e,t),t="")),readableAddChunk(this,n,e,t,!1)},Readable.prototype.unshift=function(e){var t=this._readableState;return readableAddChunk(this,t,e,"",!0)},Readable.prototype.setEncoding=function(e){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e,this};var MAX_HWM=8388608;Readable.prototype.read=function(e){debug("read",e);var t=this._readableState,n=e;if((!util.isNumber(e)||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return debug("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?endReadable(this):emitReadable(this),null;if(e=howMuchToRead(e,t),0===e&&t.ended)return 0===t.length&&endReadable(this),null;var r=t.needReadable;debug("need readable",r),(0===t.length||t.length-e<t.highWaterMark)&&(r=!0,debug("length less than watermark",r)),(t.ended||t.reading)&&(r=!1,debug("reading or ended",r)),r&&(debug("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),r&&!t.reading&&(e=howMuchToRead(n,t));var i;return i=e>0?fromList(e,t):null,util.isNull(i)&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),n!==e&&t.ended&&0===t.length&&endReadable(this),util.isNull(i)||this.emit("data",i),i},Readable.prototype._read=function(){this.emit("error",new Error("not implemented"))},Readable.prototype.pipe=function(e,t){function n(e){debug("onunpipe"),e===s&&i()}function r(){debug("onend"),e.end()}function i(){debug("cleanup"),e.removeListener("close",o),e.removeListener("finish",l),e.removeListener("drain",g),e.removeListener("error",d),e.removeListener("unpipe",n),s.removeListener("end",r),s.removeListener("end",i),s.removeListener("data",a),!h.awaitDrain||e._writableState&&!e._writableState.needDrain||g()}function a(t){debug("ondata");var n=e.write(t);!1===n&&(debug("false write response, pause",s._readableState.awaitDrain),s._readableState.awaitDrain++,s.pause())}function d(t){debug("onerror",t),u(),e.removeListener("error",d),0===EE.listenerCount(e,"error")&&e.emit("error",t)}function o(){e.removeListener("finish",l),u()}function l(){debug("onfinish"),e.removeListener("close",o),u()}function u(){debug("unpipe"),s.unpipe(e)}var s=this,h=this._readableState;switch(h.pipesCount){case 0:h.pipes=e;break;case 1:h.pipes=[h.pipes,e];break;default:h.pipes.push(e)}h.pipesCount+=1,debug("pipe count=%d opts=%j",h.pipesCount,t);var f=(!t||t.end!==!1)&&e!==process.stdout&&e!==process.stderr,b=f?r:i;h.endEmitted?process.nextTick(b):s.once("end",b),e.on("unpipe",n);var g=pipeOnDrain(s);return e.on("drain",g),s.on("data",a),e._events&&e._events.error?isArray(e._events.error)?e._events.error.unshift(d):e._events.error=[d,e._events.error]:e.on("error",d),e.once("close",o),e.once("finish",l),e.emit("pipe",s),h.flowing||(debug("pipe resume"),s.resume()),e},Readable.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var i=0;r>i;i++)n[i].emit("unpipe",this);return this}var i=indexOf(t.pipes,e);return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},Readable.prototype.on=function(e,t){var n=Stream.prototype.on.call(this,e,t);if("data"===e&&!1!==this._readableState.flowing&&this.resume(),"readable"===e&&this.readable){var r=this._readableState;if(!r.readableListening)if(r.readableListening=!0,r.emittedReadable=!1,r.needReadable=!0,r.reading)r.length&&emitReadable(this,r);else{var i=this;process.nextTick(function(){debug("readable nexttick read 0"),i.read(0)})}}return n},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var e=this._readableState;return e.flowing||(debug("resume"),e.flowing=!0,e.reading||(debug("resume read 0"),this.read(0)),resume(this,e)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;e.on("end",function(){if(debug("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(i){if(debug("wrapped data"),t.decoder&&(i=t.decoder.write(i)),i&&(t.objectMode||i.length)){var a=r.push(i);a||(n=!0,e.pause())}});for(var i in e)util.isFunction(e[i])&&util.isUndefined(this[i])&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));var a=["error","close","destroy","pause","resume"];return forEach(a,function(t){e.on(t,r.emit.bind(r,t))}),r._read=function(t){debug("wrapped _read",t),n&&(n=!1,e.resume())},r},Readable._fromList=fromList;


}).call(this,require('_process'))

},{"./_stream_duplex":170,"_process":164,"buffer":17,"core-util-is":175,"events":156,"inherits":162,"isarray":163,"stream":180,"string_decoder/":181,"util":3}],173:[function(require,module,exports){
function TransformState(r,t){this.afterTransform=function(r,n){return afterTransform(t,r,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function afterTransform(r,t,n){var e=r._transformState;e.transforming=!1;var i=e.writecb;if(!i)return r.emit("error",new Error("no writecb in Transform class"));e.writechunk=null,e.writecb=null,util.isNullOrUndefined(n)||r.push(n),i&&i(t);var a=r._readableState;a.reading=!1,(a.needReadable||a.length<a.highWaterMark)&&r._read(a.highWaterMark)}function Transform(r){if(!(this instanceof Transform))return new Transform(r);Duplex.call(this,r),this._transformState=new TransformState(r,this);var t=this;this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("prefinish",function(){util.isFunction(this._flush)?this._flush(function(r){done(t,r)}):done(t)})}function done(r,t){if(t)return r.emit("error",t);var n=r._writableState,e=r._transformState;if(n.length)throw new Error("calling transform done when ws.length != 0");if(e.transforming)throw new Error("calling transform done when still transforming");return r.push(null)}module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(r,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,r,t)},Transform.prototype._transform=function(){throw new Error("not implemented")},Transform.prototype._write=function(r,t,n){var e=this._transformState;if(e.writecb=n,e.writechunk=r,e.writeencoding=t,!e.transforming){var i=this._readableState;(e.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(){var r=this._transformState;util.isNull(r.writechunk)||!r.writecb||r.transforming?r.needTransform=!0:(r.transforming=!0,this._transform(r.writechunk,r.writeencoding,r.afterTransform))};


},{"./_stream_duplex":170,"core-util-is":175,"inherits":162}],174:[function(require,module,exports){
(function (process){
function WriteReq(e,i,t){this.chunk=e,this.encoding=i,this.callback=t}function WritableState(e,i){var t=require("./_stream_duplex");e=e||{};var r=e.highWaterMark,n=e.objectMode?16:16384;this.highWaterMark=r||0===r?r:n,this.objectMode=!!e.objectMode,i instanceof t&&(this.objectMode=this.objectMode||!!e.writableObjectMode),this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var o=e.decodeStrings===!1;this.decodeStrings=!o,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(i,e)},this.writecb=null,this.writelen=0,this.buffer=[],this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1}function Writable(e){var i=require("./_stream_duplex");return this instanceof Writable||this instanceof i?(this._writableState=new WritableState(e,this),this.writable=!0,void Stream.call(this)):new Writable(e)}function writeAfterEnd(e,i,t){var r=new Error("write after end");e.emit("error",r),process.nextTick(function(){t(r)})}function validChunk(e,i,t,r){var n=!0;if(!(util.isBuffer(t)||util.isString(t)||util.isNullOrUndefined(t)||i.objectMode)){var o=new TypeError("Invalid non-string/buffer chunk");e.emit("error",o),process.nextTick(function(){r(o)}),n=!1}return n}function decodeChunk(e,i,t){return!e.objectMode&&e.decodeStrings!==!1&&util.isString(i)&&(i=new Buffer(i,t)),i}function writeOrBuffer(e,i,t,r,n){t=decodeChunk(i,t,r),util.isBuffer(t)&&(r="buffer");var o=i.objectMode?1:t.length;i.length+=o;var f=i.length<i.highWaterMark;return f||(i.needDrain=!0),i.writing||i.corked?i.buffer.push(new WriteReq(t,r,n)):doWrite(e,i,!1,o,t,r,n),f}function doWrite(e,i,t,r,n,o,f){i.writelen=r,i.writecb=f,i.writing=!0,i.sync=!0,t?e._writev(n,i.onwrite):e._write(n,o,i.onwrite),i.sync=!1}function onwriteError(e,i,t,r,n){t?process.nextTick(function(){i.pendingcb--,n(r)}):(i.pendingcb--,n(r)),e._writableState.errorEmitted=!0,e.emit("error",r)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,i){var t=e._writableState,r=t.sync,n=t.writecb;if(onwriteStateUpdate(t),i)onwriteError(e,t,r,i,n);else{var o=needFinish(e,t);o||t.corked||t.bufferProcessing||!t.buffer.length||clearBuffer(e,t),r?process.nextTick(function(){afterWrite(e,t,o,n)}):afterWrite(e,t,o,n)}}function afterWrite(e,i,t,r){t||onwriteDrain(e,i),i.pendingcb--,r(),finishMaybe(e,i)}function onwriteDrain(e,i){0===i.length&&i.needDrain&&(i.needDrain=!1,e.emit("drain"))}function clearBuffer(e,i){if(i.bufferProcessing=!0,e._writev&&i.buffer.length>1){for(var t=[],r=0;r<i.buffer.length;r++)t.push(i.buffer[r].callback);i.pendingcb++,doWrite(e,i,!0,i.length,i.buffer,"",function(e){for(var r=0;r<t.length;r++)i.pendingcb--,t[r](e)}),i.buffer=[]}else{for(var r=0;r<i.buffer.length;r++){var n=i.buffer[r],o=n.chunk,f=n.encoding,u=n.callback,s=i.objectMode?1:o.length;if(doWrite(e,i,!1,s,o,f,u),i.writing){r++;break}}r<i.buffer.length?i.buffer=i.buffer.slice(r):i.buffer.length=0}i.bufferProcessing=!1}function needFinish(e,i){return i.ending&&0===i.length&&!i.finished&&!i.writing}function prefinish(e,i){i.prefinished||(i.prefinished=!0,e.emit("prefinish"))}function finishMaybe(e,i){var t=needFinish(e,i);return t&&(0===i.pendingcb?(prefinish(e,i),i.finished=!0,e.emit("finish")):prefinish(e,i)),t}function endWritable(e,i,t){i.ending=!0,finishMaybe(e,i),t&&(i.finished?process.nextTick(t):e.once("finish",t)),i.ended=!0}module.exports=Writable;var Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var Stream=require("stream");util.inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,i,t){var r=this._writableState,n=!1;return util.isFunction(i)&&(t=i,i=null),util.isBuffer(e)?i="buffer":i||(i=r.defaultEncoding),util.isFunction(t)||(t=function(){}),r.ended?writeAfterEnd(this,r,t):validChunk(this,r,e,t)&&(r.pendingcb++,n=writeOrBuffer(this,r,e,i,t)),n},Writable.prototype.cork=function(){var e=this._writableState;e.corked++},Writable.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.buffer.length||clearBuffer(this,e))},Writable.prototype._write=function(e,i,t){t(new Error("not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(e,i,t){var r=this._writableState;util.isFunction(e)?(t=e,e=null,i=null):util.isFunction(i)&&(t=i,i=null),util.isNullOrUndefined(e)||this.write(e,i),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||endWritable(this,r,t)};


}).call(this,require('_process'))

},{"./_stream_duplex":170,"_process":164,"buffer":17,"core-util-is":175,"inherits":162,"stream":180}],175:[function(require,module,exports){
(function (Buffer){
function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function isBuffer(e){return Buffer.isBuffer(e)}function objectToString(e){return Object.prototype.toString.call(e)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=isBuffer;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],176:[function(require,module,exports){
module.exports=require("./lib/_stream_passthrough.js");


},{"./lib/_stream_passthrough.js":171}],177:[function(require,module,exports){
exports=module.exports=require("./lib/_stream_readable.js"),exports.Stream=require("stream"),exports.Readable=exports,exports.Writable=require("./lib/_stream_writable.js"),exports.Duplex=require("./lib/_stream_duplex.js"),exports.Transform=require("./lib/_stream_transform.js"),exports.PassThrough=require("./lib/_stream_passthrough.js");


},{"./lib/_stream_duplex.js":170,"./lib/_stream_passthrough.js":171,"./lib/_stream_readable.js":172,"./lib/_stream_transform.js":173,"./lib/_stream_writable.js":174,"stream":180}],178:[function(require,module,exports){
module.exports=require("./lib/_stream_transform.js");


},{"./lib/_stream_transform.js":173}],179:[function(require,module,exports){
module.exports=require("./lib/_stream_writable.js");


},{"./lib/_stream_writable.js":174}],180:[function(require,module,exports){
function Stream(){EE.call(this)}module.exports=Stream;var EE=require("events").EventEmitter,inherits=require("inherits");inherits(Stream,EE),Stream.Readable=require("readable-stream/readable.js"),Stream.Writable=require("readable-stream/writable.js"),Stream.Duplex=require("readable-stream/duplex.js"),Stream.Transform=require("readable-stream/transform.js"),Stream.PassThrough=require("readable-stream/passthrough.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,r){function t(r){e.writable&&!1===e.write(r)&&m.pause&&m.pause()}function n(){m.readable&&m.resume&&m.resume()}function a(){u||(u=!0,e.end())}function o(){u||(u=!0,"function"==typeof e.destroy&&e.destroy())}function i(e){if(s(),0===EE.listenerCount(this,"error"))throw e}function s(){m.removeListener("data",t),e.removeListener("drain",n),m.removeListener("end",a),m.removeListener("close",o),m.removeListener("error",i),e.removeListener("error",i),m.removeListener("end",s),m.removeListener("close",s),e.removeListener("close",s)}var m=this;m.on("data",t),e.on("drain",n),e._isStdio||r&&r.end===!1||(m.on("end",a),m.on("close",o));var u=!1;return m.on("error",i),e.on("error",i),m.on("end",s),m.on("close",s),e.on("close",s),e.emit("pipe",m),e};


},{"events":156,"inherits":162,"readable-stream/duplex.js":169,"readable-stream/passthrough.js":176,"readable-stream/readable.js":177,"readable-stream/transform.js":178,"readable-stream/writable.js":179}],181:[function(require,module,exports){
function assertEncoding(e){if(e&&!isBufferEncoding(e))throw new Error("Unknown encoding: "+e)}function passThroughWrite(e){return e.toString(this.encoding)}function utf16DetectIncompleteChar(e){this.charReceived=e.length%2,this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(e){this.charReceived=e.length%3,this.charLength=this.charReceived?3:0}var Buffer=require("buffer").Buffer,isBufferEncoding=Buffer.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},StringDecoder=exports.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),assertEncoding(e),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=base64DetectIncompleteChar;break;default:return void(this.write=passThroughWrite)}this.charBuffer=new Buffer(6),this.charReceived=0,this.charLength=0};StringDecoder.prototype.write=function(e){for(var t="";this.charLength;){var r=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,0,r),this.charReceived+=r,this.charReceived<this.charLength)return"";e=e.slice(r,e.length),t=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var h=t.charCodeAt(t.length-1);if(!(h>=55296&&56319>=h)){if(this.charReceived=this.charLength=0,0===e.length)return t;break}this.charLength+=this.surrogateSize,t=""}this.detectIncompleteChar(e);var i=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,i),i-=this.charReceived),t+=e.toString(this.encoding,0,i);var i=t.length-1,h=t.charCodeAt(i);if(h>=55296&&56319>=h){var c=this.surrogateSize;return this.charLength+=c,this.charReceived+=c,this.charBuffer.copy(this.charBuffer,c,0,c),e.copy(this.charBuffer,0,0,c),t.substring(0,i)}return t},StringDecoder.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var r=e[e.length-t];if(1==t&&r>>5==6){this.charLength=2;break}if(2>=t&&r>>4==14){this.charLength=3;break}if(3>=t&&r>>3==30){this.charLength=4;break}}this.charReceived=t},StringDecoder.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)),this.charReceived){var r=this.charReceived,h=this.charBuffer,i=this.encoding;t+=h.slice(0,r).toString(i)}return t};


},{"buffer":17}],182:[function(require,module,exports){
function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function urlParse(t,s,e){if(t&&isObject(t)&&t instanceof Url)return t;var h=new Url;return h.parse(t,s,e),h}function urlFormat(t){return isString(t)&&(t=urlParse(t)),t instanceof Url?t.format():Url.prototype.format.call(t)}function urlResolve(t,s){return urlParse(t,!1,!0).resolve(s)}function urlResolveObject(t,s){return t?urlParse(t,!1,!0).resolveObject(s):s}function isString(t){return"string"==typeof t}function isObject(t){return"object"==typeof t&&null!==t}function isNull(t){return null===t}function isNullOrUndefined(t){return null==t}var punycode=require("punycode");exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,delims=["<",">",'"',"`"," ","\r","\n","	"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");Url.prototype.parse=function(t,s,e){if(!isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var h=t;h=h.trim();var r=protocolPattern.exec(h);if(r){r=r[0];var o=r.toLowerCase();this.protocol=o,h=h.substr(r.length)}if(e||r||h.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===h.substr(0,2);!a||r&&hostlessProtocol[r]||(h=h.substr(2),this.slashes=!0)}if(!hostlessProtocol[r]&&(a||r&&!slashedProtocol[r])){for(var n=-1,i=0;i<hostEndingChars.length;i++){var l=h.indexOf(hostEndingChars[i]);-1!==l&&(-1===n||n>l)&&(n=l)}var c,u;u=-1===n?h.lastIndexOf("@"):h.lastIndexOf("@",n),-1!==u&&(c=h.slice(0,u),h=h.slice(u+1),this.auth=decodeURIComponent(c)),n=-1;for(var i=0;i<nonHostChars.length;i++){var l=h.indexOf(nonHostChars[i]);-1!==l&&(-1===n||n>l)&&(n=l)}-1===n&&(n=h.length),this.host=h.slice(0,n),h=h.slice(n),this.parseHost(),this.hostname=this.hostname||"";var p="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!p)for(var f=this.hostname.split(/\./),i=0,m=f.length;m>i;i++){var v=f[i];if(v&&!v.match(hostnamePartPattern)){for(var g="",y=0,d=v.length;d>y;y++)g+=v.charCodeAt(y)>127?"x":v[y];if(!g.match(hostnamePartPattern)){var P=f.slice(0,i),b=f.slice(i+1),j=v.match(hostnamePartStart);j&&(P.push(j[1]),b.unshift(j[2])),b.length&&(h="/"+b.join(".")+h),this.hostname=P.join(".");break}}}if(this.hostname=this.hostname.length>hostnameMaxLen?"":this.hostname.toLowerCase(),!p){for(var O=this.hostname.split("."),q=[],i=0;i<O.length;++i){var x=O[i];q.push(x.match(/[^A-Za-z0-9_-]/)?"xn--"+punycode.encode(x):x)}this.hostname=q.join(".")}var U=this.port?":"+this.port:"",C=this.hostname||"";this.host=C+U,this.href+=this.host,p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==h[0]&&(h="/"+h))}if(!unsafeProtocol[o])for(var i=0,m=autoEscape.length;m>i;i++){var A=autoEscape[i],E=encodeURIComponent(A);E===A&&(E=escape(A)),h=h.split(A).join(E)}var w=h.indexOf("#");-1!==w&&(this.hash=h.substr(w),h=h.slice(0,w));var R=h.indexOf("?");if(-1!==R?(this.search=h.substr(R),this.query=h.substr(R+1),s&&(this.query=querystring.parse(this.query)),h=h.slice(0,R)):s&&(this.search="",this.query={}),h&&(this.pathname=h),slashedProtocol[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",x=this.search||"";this.path=U+x}return this.href=this.format(),this},Url.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var s=this.protocol||"",e=this.pathname||"",h=this.hash||"",r=!1,o="";this.host?r=t+this.host:this.hostname&&(r=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(r+=":"+this.port)),this.query&&isObject(this.query)&&Object.keys(this.query).length&&(o=querystring.stringify(this.query));var a=this.search||o&&"?"+o||"";return s&&":"!==s.substr(-1)&&(s+=":"),this.slashes||(!s||slashedProtocol[s])&&r!==!1?(r="//"+(r||""),e&&"/"!==e.charAt(0)&&(e="/"+e)):r||(r=""),h&&"#"!==h.charAt(0)&&(h="#"+h),a&&"?"!==a.charAt(0)&&(a="?"+a),e=e.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),a=a.replace("#","%23"),s+r+e+a+h},Url.prototype.resolve=function(t){return this.resolveObject(urlParse(t,!1,!0)).format()},Url.prototype.resolveObject=function(t){if(isString(t)){var s=new Url;s.parse(t,!1,!0),t=s}var e=new Url;if(Object.keys(this).forEach(function(t){e[t]=this[t]},this),e.hash=t.hash,""===t.href)return e.href=e.format(),e;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(s){"protocol"!==s&&(e[s]=t[s])}),slashedProtocol[e.protocol]&&e.hostname&&!e.pathname&&(e.path=e.pathname="/"),e.href=e.format(),e;if(t.protocol&&t.protocol!==e.protocol){if(!slashedProtocol[t.protocol])return Object.keys(t).forEach(function(s){e[s]=t[s]}),e.href=e.format(),e;if(e.protocol=t.protocol,t.host||hostlessProtocol[t.protocol])e.pathname=t.pathname;else{for(var h=(t.pathname||"").split("/");h.length&&!(t.host=h.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==h[0]&&h.unshift(""),h.length<2&&h.unshift(""),e.pathname=h.join("/")}if(e.search=t.search,e.query=t.query,e.host=t.host||"",e.auth=t.auth,e.hostname=t.hostname||t.host,e.port=t.port,e.pathname||e.search){var r=e.pathname||"",o=e.search||"";e.path=r+o}return e.slashes=e.slashes||t.slashes,e.href=e.format(),e}var a=e.pathname&&"/"===e.pathname.charAt(0),n=t.host||t.pathname&&"/"===t.pathname.charAt(0),i=n||a||e.host&&t.pathname,l=i,c=e.pathname&&e.pathname.split("/")||[],h=t.pathname&&t.pathname.split("/")||[],u=e.protocol&&!slashedProtocol[e.protocol];if(u&&(e.hostname="",e.port=null,e.host&&(""===c[0]?c[0]=e.host:c.unshift(e.host)),e.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===h[0]?h[0]=t.host:h.unshift(t.host)),t.host=null),i=i&&(""===h[0]||""===c[0])),n)e.host=t.host||""===t.host?t.host:e.host,e.hostname=t.hostname||""===t.hostname?t.hostname:e.hostname,e.search=t.search,e.query=t.query,c=h;else if(h.length)c||(c=[]),c.pop(),c=c.concat(h),e.search=t.search,e.query=t.query;else if(!isNullOrUndefined(t.search)){if(u){e.hostname=e.host=c.shift();var p=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;p&&(e.auth=p.shift(),e.host=e.hostname=p.shift())}return e.search=t.search,e.query=t.query,isNull(e.pathname)&&isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.href=e.format(),e}if(!c.length)return e.pathname=null,e.path=e.search?"/"+e.search:null,e.href=e.format(),e;for(var f=c.slice(-1)[0],m=(e.host||t.host)&&("."===f||".."===f)||""===f,v=0,g=c.length;g>=0;g--)f=c[g],"."==f?c.splice(g,1):".."===f?(c.splice(g,1),v++):v&&(c.splice(g,1),v--);if(!i&&!l)for(;v--;v)c.unshift("..");!i||""===c[0]||c[0]&&"/"===c[0].charAt(0)||c.unshift(""),m&&"/"!==c.join("/").substr(-1)&&c.push("");var y=""===c[0]||c[0]&&"/"===c[0].charAt(0);if(u){e.hostname=e.host=y?"":c.length?c.shift():"";var p=e.host&&e.host.indexOf("@")>0?e.host.split("@"):!1;p&&(e.auth=p.shift(),e.host=e.hostname=p.shift())}return i=i||e.host&&c.length,i&&!y&&c.unshift(""),c.length?e.pathname=c.join("/"):(e.pathname=null,e.path=null),isNull(e.pathname)&&isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.auth=t.auth||e.auth,e.slashes=e.slashes||t.slashes,e.href=e.format(),e},Url.prototype.parseHost=function(){var t=this.host,s=portPattern.exec(t);s&&(s=s[0],":"!==s&&(this.port=s.substr(1)),t=t.substr(0,t.length-s.length)),t&&(this.hostname=t)};


},{"punycode":165,"querystring":168}],183:[function(require,module,exports){
module.exports=function(o){return o&&"object"==typeof o&&"function"==typeof o.copy&&"function"==typeof o.fill&&"function"==typeof o.readUInt8};


},{}],184:[function(require,module,exports){
(function (process,global){
function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e){return e}function arrayToHash(e){var r={};return e.forEach(function(e){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var a="",c=!1,l=["{","}"];if(isArray(r)&&(c=!0,l=["[","]"]),isFunction(r)){var p=r.name?": "+r.name:"";a=" [Function"+p+"]"}if(isRegExp(r)&&(a=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(a=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(a=" "+formatError(r)),0===o.length&&(!c||0==r.length))return l[0]+a+l[1];if(0>t)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var f;return f=c?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,c)}),e.seen.pop(),reduceToSingleString(f,a,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;u>s;++s)o.push(hasOwnProperty(r,String(s))?formatProperty(e,r,t,n,String(s),!0):"");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,a;if(a=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]},a.get?u=a.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):a.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(a.value)<0?(u=isNull(t)?formatValue(e,a.value,null):formatValue(e,a.value,t-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0,i=e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return 10>e?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(r){return"[Circular]"}default:return e}}),s=n[t];i>t;s=n[++t])o+=isNull(s)||!isObject(s)?" "+s:" "+inspect(s);return o},exports.deprecate=function(e,r){function t(){if(!n){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),n=!0}return e.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(process.noDeprecation===!0)return e;var n=!1;return t};var debugs={},debugEnviron;exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":183,"_process":164,"inherits":162}],185:[function(require,module,exports){
function Context(){}var indexOf=require("indexof"),Object_keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var r in e)t.push(r);return t},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(e,t,r){Object.defineProperty(e,t,{writable:!0,enumerable:!1,configurable:!0,value:r})}}catch(e){return function(e,t,r){e[t]=r}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];Context.prototype={};var Script=exports.Script=function(e){return this instanceof Script?void(this.code=e):new Script(e)};Script.prototype.runInContext=function(e){if(!(e instanceof Context))throw new TypeError("needs a 'context' argument.");var t=document.createElement("iframe");t.style||(t.style={}),t.style.display="none",document.body.appendChild(t);var r=t.contentWindow,n=r.eval,o=r.execScript;!n&&o&&(o.call(r,"null"),n=r.eval),forEach(Object_keys(e),function(t){r[t]=e[t]}),forEach(globals,function(t){e[t]&&(r[t]=e[t])});var c=Object_keys(r),i=n.call(r,this.code);return forEach(Object_keys(r),function(t){(t in e||-1===indexOf(c,t))&&(e[t]=r[t])}),forEach(globals,function(t){t in e||defineProp(e,t,r[t])}),document.body.removeChild(t),i},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(e){var t=Script.createContext(e),r=this.runInContext(t);return forEach(Object_keys(t),function(r){e[r]=t[r]}),r},forEach(Object_keys(Script.prototype),function(e){exports[e]=Script[e]=function(t){var r=Script(t);return r[e].apply(r,[].slice.call(arguments,1))}}),exports.createScript=function(e){return exports.Script(e)},exports.createContext=Script.createContext=function(e){var t=new Context;return"object"==typeof e&&forEach(Object_keys(e),function(r){t[r]=e[r]}),t};


},{"indexof":186}],186:[function(require,module,exports){
var indexOf=[].indexOf;module.exports=function(e,n){if(indexOf)return e.indexOf(n);for(var r=0;r<e.length;++r)if(e[r]===n)return r;return-1};


},{}],187:[function(require,module,exports){
function build(e){var r=function o(){return applyStyle.apply(o,arguments)};return r._styles=e,r.__proto__=proto,r}function applyStyle(){var e=arguments,r=e.length,o=0!==r&&String(arguments[0]);if(r>1)for(var s=1;r>s;s++)o+=" "+e[s];if(!colors.enabled||!o)return o;for(var t=this._styles,n=t.length;n--;){var l=ansiStyles[t[n]];o=l.open+o.replace(l.closeRe,l.open)+l.close}return o}function applyTheme(e){for(var r in e)!function(r){colors[r]=function(o){return colors[e[r]](o)}}(r)}function init(){var e={};return Object.keys(styles).forEach(function(r){e[r]={get:function(){return build([r])}}}),e}var colors={};module.exports=colors,colors.themes={};var ansiStyles=colors.styles=require("./styles"),defineProps=Object.defineProperties;colors.supportsColor=require("./system/supports-colors"),"undefined"==typeof colors.enabled&&(colors.enabled=colors.supportsColor),colors.stripColors=colors.strip=function(e){return(""+e).replace(/\x1B\[\d+m/g,"")};var stylize=colors.stylize=function(e,r){return ansiStyles[r].open+e+ansiStyles[r].close},matchOperatorsRe=/[|\\{}()[\]^$+*?.]/g,escapeStringRegexp=function(e){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(matchOperatorsRe,"\\$&")},styles=function(){var e={};return ansiStyles.grey=ansiStyles.gray,Object.keys(ansiStyles).forEach(function(r){ansiStyles[r].closeRe=new RegExp(escapeStringRegexp(ansiStyles[r].close),"g"),e[r]={get:function(){return build(this._styles.concat(r))}}}),e}(),proto=defineProps(function(){},styles);colors.setTheme=function(e){if("string"==typeof e)try{return colors.themes[e]=require(e),applyTheme(colors.themes[e]),colors.themes[e]}catch(r){return console.log(r),r}else applyTheme(e)};var sequencer=function(e,r){var o=r.split("");return o=o.map(e),o.join("")};colors.trap=require("./custom/trap"),colors.zalgo=require("./custom/zalgo"),colors.maps={},colors.maps.america=require("./maps/america"),colors.maps.zebra=require("./maps/zebra"),colors.maps.rainbow=require("./maps/rainbow"),colors.maps.random=require("./maps/random");for(var map in colors.maps)!function(e){colors[e]=function(r){return sequencer(colors.maps[e],r)}}(map);defineProps(colors,init());


},{"./custom/trap":188,"./custom/zalgo":189,"./maps/america":192,"./maps/rainbow":193,"./maps/random":194,"./maps/zebra":195,"./styles":196,"./system/supports-colors":197}],188:[function(require,module,exports){
module.exports=function(t){var o="";t=t||"Run the trap, drop the bass",t=t.split("");var r={a:["@","Ą","Ⱥ","Ʌ","Δ","Λ","Д"],b:["ß","Ɓ","Ƀ","ɮ","β","฿"],c:["©","Ȼ","Ͼ"],d:["Ð","Ɗ","Ԁ","ԁ","Ԃ","ԃ"],e:["Ë","ĕ","Ǝ","ɘ","Σ","ξ","Ҽ","੬"],f:["Ӻ"],g:["ɢ"],h:["Ħ","ƕ","Ң","Һ","Ӈ","Ԋ"],i:["༏"],j:["Ĵ"],k:["ĸ","Ҡ","Ӄ","Ԟ"],l:["Ĺ"],m:["ʍ","Ӎ","ӎ","Ԡ","ԡ","൩"],n:["Ñ","ŋ","Ɲ","Ͷ","Π","Ҋ"],o:["Ø","õ","ø","Ǿ","ʘ","Ѻ","ם","۝","๏"],p:["Ƿ","Ҏ"],q:["্"],r:["®","Ʀ","Ȑ","Ɍ","ʀ","Я"],s:["§","Ϟ","ϟ","Ϩ"],t:["Ł","Ŧ","ͳ"],u:["Ʊ","Ս"],v:["ט"],w:["Ш","Ѡ","Ѽ","൰"],x:["Ҳ","Ӿ","Ӽ","ӽ"],y:["¥","Ұ","Ӌ"],z:["Ƶ","ɀ"]};return t.forEach(function(t){t=t.toLowerCase();var e=r[t]||[" "],a=Math.floor(Math.random()*e.length);o+="undefined"!=typeof r[t]?r[t][a]:t}),o};


},{}],189:[function(require,module,exports){
module.exports=function(n){function i(n){var i=Math.floor(Math.random()*n);return i}function r(n){var i=!1;return d.filter(function(r){i=r===n}),i}function o(n,o){var d,e,a="";o=o||{},o.up=o.up||!0,o.mid=o.mid||!0,o.down=o.down||!0,o.size=o.size||"maxi",n=n.split("");for(e in n)if(!r(e)){switch(a+=n[e],d={up:0,down:0,mid:0},o.size){case"mini":d.up=i(8),d.min=i(2),d.down=i(8);break;case"maxi":d.up=i(16)+3,d.min=i(4)+1,d.down=i(64)+3;break;default:d.up=i(8)+1,d.mid=i(6)/2,d.down=i(8)+1}var t=["up","mid","down"];for(var m in t)for(var f=t[m],p=0;p<=d[f];p++)o[f]&&(a+=u[f][i(u[f].length)])}return a}n=n||"   he is here   ";var u={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},d=[].concat(u.up,u.down,u.mid);return o(n)};


},{}],190:[function(require,module,exports){
var colors=require("./colors"),styles=require("./styles");module.exports=function(){function r(r){var o=["__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","charAt","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf","charCodeAt","indexOf","lastIndexof","length","localeCompare","match","replace","search","slice","split","substring","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","trim","trimLeft","trimRight"];Object.keys(r).forEach(function(e){-1!==o.indexOf(e)?console.log("warn: ".red+("String.prototype"+e).magenta+" is probably something you don't want to override. Ignoring style name"):"string"==typeof r[e]?(colors[e]=colors[r[e]],t(e,function(){return colors[r[e]](this)})):t(e,function(){for(var t=this,o=0;o<r[e].length;o++)t=exports[r[e][o]](t);return t})})}var t=function(r,t){String.prototype.__defineGetter__(r,t)},o=function(r,t){return styles[t].open+r+styles[t].close};t("strip",function(){return colors.strip(this)}),t("stripColors",function(){return colors.strip(this)}),t("trap",function(){return colors.trap(this)}),t("zalgo",function(){return colors.zalgo(this)}),t("zebra",function(){return colors.zebra(this)}),t("rainbow",function(){return colors.rainbow(this)}),t("random",function(){return colors.random(this)}),t("america",function(){return colors.america(this)});var e=Object.keys(colors.styles);e.forEach(function(r){t(r,function(){return o(this,r)})}),colors.setTheme=function(t){if("string"==typeof t)try{return colors.themes[t]=require(t),r(colors.themes[t]),colors.themes[t]}catch(o){return console.log(o),o}else r(t)}};


},{"./colors":187,"./styles":196}],191:[function(require,module,exports){
var colors=require("./colors");module.exports=colors;var extendStringPrototype=require("./extendStringPrototype")();


},{"./colors":187,"./extendStringPrototype":190}],192:[function(require,module,exports){
var colors=require("../colors");module.exports=function(){return function(r,e){if(" "===r)return r;switch(e%3){case 0:return colors.red(r);case 1:return colors.white(r);case 2:return colors.blue(r)}}}();


},{"../colors":187}],193:[function(require,module,exports){
var colors=require("../colors");module.exports=function(){var r=["red","yellow","green","blue","magenta"];return function(e,o){return" "===e?e:colors[r[o++%r.length]](e)}}();


},{"../colors":187}],194:[function(require,module,exports){
var colors=require("../colors");module.exports=function(){var e=["underline","inverse","grey","yellow","red","green","blue","white","cyan","magenta"];return function(r){return" "===r?r:colors[e[Math.round(Math.random()*(e.length-1))]](r)}}();


},{"../colors":187}],195:[function(require,module,exports){
var colors=require("../colors");module.exports=function(r,o){return o%2===0?r:colors.inverse(r)};


},{"../colors":187}],196:[function(require,module,exports){
var styles={};module.exports=styles;var codes={reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],grey:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBG:[40,49],redBG:[41,49],greenBG:[42,49],yellowBG:[43,49],blueBG:[44,49],magentaBG:[45,49],cyanBG:[46,49],whiteBG:[47,49]};Object.keys(codes).forEach(function(e){var l=codes[e],a=styles[e]=[];a.open="["+l[0]+"m",a.close="["+l[1]+"m"});


},{}],197:[function(require,module,exports){
(function (process){
var argv=process.argv;module.exports=function(){return-1!==argv.indexOf("--no-color")||-1!==argv.indexOf("--color=false")?!1:-1!==argv.indexOf("--color")||-1!==argv.indexOf("--color=true")||-1!==argv.indexOf("--color=always")?!0:process.stdout&&!process.stdout.isTTY?!1:"win32"===process.platform?!0:"COLORTERM"in process.env?!0:"dumb"===process.env.TERM?!1:/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)?!0:!1}();


}).call(this,require('_process'))

},{"_process":164}],198:[function(require,module,exports){
function arrayCopy(r,a){var o=-1,y=r.length;for(a||(a=Array(y));++o<y;)a[o]=r[o];return a}module.exports=arrayCopy;


},{}],199:[function(require,module,exports){
function arrayEach(r,a){for(var e=-1,n=r.length;++e<n&&a(r[e],e,r)!==!1;);return r}module.exports=arrayEach;


},{}],200:[function(require,module,exports){
function assignDefaults(e,n){return"undefined"==typeof e?n:e}module.exports=assignDefaults;


},{}],201:[function(require,module,exports){
function assignOwnDefaults(t,e,o,r){return"undefined"!=typeof t&&hasOwnProperty.call(r,o)?t:e}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=assignOwnDefaults;


},{}],202:[function(require,module,exports){
function baseAssign(e,r,s){var n=keys(r);if(!s)return baseCopy(r,e,n);for(var a=-1,o=n.length;++a<o;){var i=n[a],t=e[i],u=s(t,r[i],i,e,r);(u===u?u===t:t!==t)&&("undefined"!=typeof t||i in e)||(e[i]=u)}return e}var baseCopy=require("./baseCopy"),keys=require("../object/keys");module.exports=baseAssign;


},{"../object/keys":255,"./baseCopy":205}],203:[function(require,module,exports){
function baseCallback(e,a,r){var t=typeof e;return"function"==t?"undefined"!=typeof a&&isBindable(e)?bindCallback(e,a,r):e:null==e?identity:"object"==t?baseMatches(e):"undefined"==typeof a?baseProperty(e+""):baseMatchesProperty(e+"",a)}var baseMatches=require("./baseMatches"),baseMatchesProperty=require("./baseMatchesProperty"),baseProperty=require("./baseProperty"),bindCallback=require("./bindCallback"),identity=require("../utility/identity"),isBindable=require("./isBindable");module.exports=baseCallback;


},{"../utility/identity":265,"./baseMatches":213,"./baseMatchesProperty":214,"./baseProperty":215,"./bindCallback":219,"./isBindable":230}],204:[function(require,module,exports){
function baseClone(a,e,r,o,t,n,g){var l;if(r&&(l=t?r(a,o,t):r(a)),"undefined"!=typeof l)return l;if(!isObject(a))return a;var T=isArray(a);if(T){if(l=initCloneArray(a),!e)return arrayCopy(a,l)}else{var b=objToString.call(a),c=b==funcTag;if(b!=objectTag&&b!=argsTag&&(!c||t))return cloneableTags[b]?initCloneByTag(a,b,e):t?a:{};if(l=initCloneObject(c?{}:a),!e)return baseCopy(a,l,keys(a))}n||(n=[]),g||(g=[]);for(var i=n.length;i--;)if(n[i]==a)return g[i];return n.push(a),g.push(l),(T?arrayEach:baseForOwn)(a,function(o,t){l[t]=baseClone(o,e,r,t,a,n,g)}),l}var arrayCopy=require("./arrayCopy"),arrayEach=require("./arrayEach"),baseCopy=require("./baseCopy"),baseForOwn=require("./baseForOwn"),initCloneArray=require("./initCloneArray"),initCloneByTag=require("./initCloneByTag"),initCloneObject=require("./initCloneObject"),isArray=require("../lang/isArray"),isObject=require("../lang/isObject"),keys=require("../object/keys"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[stringTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=!0,cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[mapTag]=cloneableTags[setTag]=cloneableTags[weakMapTag]=!1;var objectProto=Object.prototype,objToString=objectProto.toString;module.exports=baseClone;


},{"../lang/isArray":244,"../lang/isObject":248,"../object/keys":255,"./arrayCopy":198,"./arrayEach":199,"./baseCopy":205,"./baseForOwn":208,"./initCloneArray":227,"./initCloneByTag":228,"./initCloneObject":229}],205:[function(require,module,exports){
function baseCopy(e,o,r){r||(r=o,o={});for(var a=-1,n=r.length;++a<n;){var t=r[a];o[t]=e[t]}return o}module.exports=baseCopy;


},{}],206:[function(require,module,exports){
function baseFind(n,e,r,i){var o;return r(n,function(n,r,t){return e(n,r,t)?(o=i?r:n,!1):void 0}),o}module.exports=baseFind;


},{}],207:[function(require,module,exports){
function baseFor(e,r,t){for(var o=-1,a=toObject(e),b=t(e),c=b.length;++o<c;){var n=b[o];if(r(a[n],n,a)===!1)break}return e}var toObject=require("./toObject");module.exports=baseFor;


},{"./toObject":241}],208:[function(require,module,exports){
function baseForOwn(e,r){return baseFor(e,r,keys)}var baseFor=require("./baseFor"),keys=require("../object/keys");module.exports=baseForOwn;


},{"../object/keys":255,"./baseFor":207}],209:[function(require,module,exports){
function baseIsEqual(e,u,a,s,l,n){if(e===u)return 0!==e||1/e==1/u;var t=typeof e,o=typeof u;return"function"!=t&&"object"!=t&&"function"!=o&&"object"!=o||null==e||null==u?e!==e&&u!==u:baseIsEqualDeep(e,u,baseIsEqual,a,s,l,n)}var baseIsEqualDeep=require("./baseIsEqualDeep");module.exports=baseIsEqual;


},{"./baseIsEqualDeep":210}],210:[function(require,module,exports){
function baseIsEqualDeep(r,a,e,t,o,s,u){var g=isArray(r),y=isArray(a),l=arrayTag,b=arrayTag;g||(l=objToString.call(r),l==argsTag?l=objectTag:l!=objectTag&&(g=isTypedArray(r))),y||(b=objToString.call(a),b==argsTag?b=objectTag:b!=objectTag&&(y=isTypedArray(a)));var c=l==objectTag,p=b==objectTag,T=l==b;if(T&&!g&&!c)return equalByTag(r,a,l);var i=c&&hasOwnProperty.call(r,"__wrapped__"),j=p&&hasOwnProperty.call(a,"__wrapped__");if(i||j)return e(i?r.value():r,j?a.value():a,t,o,s,u);if(!T)return!1;s||(s=[]),u||(u=[]);for(var n=s.length;n--;)if(s[n]==r)return u[n]==a;s.push(r),u.push(a);var q=(g?equalArrays:equalObjects)(r,a,e,t,o,s,u);return s.pop(),u.pop(),q}var equalArrays=require("./equalArrays"),equalByTag=require("./equalByTag"),equalObjects=require("./equalObjects"),isArray=require("../lang/isArray"),isTypedArray=require("../lang/isTypedArray"),argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objToString=objectProto.toString;module.exports=baseIsEqualDeep;


},{"../lang/isArray":244,"../lang/isTypedArray":249,"./equalArrays":222,"./equalByTag":223,"./equalObjects":224}],211:[function(require,module,exports){
function baseIsFunction(n){return"function"==typeof n||!1}module.exports=baseIsFunction;


},{}],212:[function(require,module,exports){
function baseIsMatch(r,e,a,t,o){var s=e.length;if(null==r)return!s;for(var n=-1,l=!o;++n<s;)if(l&&t[n]?a[n]!==r[e[n]]:!hasOwnProperty.call(r,e[n]))return!1;for(n=-1;++n<s;){var u=e[n];if(l&&t[n])var f=hasOwnProperty.call(r,u);else{var b=r[u],c=a[n];f=o?o(b,c,u):void 0,"undefined"==typeof f&&(f=baseIsEqual(c,b,o,!0))}if(!f)return!1}return!0}var baseIsEqual=require("./baseIsEqual"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseIsMatch;


},{"./baseIsEqual":209}],213:[function(require,module,exports){
function baseMatches(r){var e=keys(r),t=e.length;if(1==t){var a=e[0],o=r[a];if(isStrictComparable(o))return function(r){return null!=r&&r[a]===o&&hasOwnProperty.call(r,a)}}for(var s=Array(t),c=Array(t);t--;)o=r[e[t]],s[t]=o,c[t]=isStrictComparable(o);return function(r){return baseIsMatch(r,e,s,c)}}var baseIsMatch=require("./baseIsMatch"),isStrictComparable=require("./isStrictComparable"),keys=require("../object/keys"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseMatches;


},{"../object/keys":255,"./baseIsMatch":212,"./isStrictComparable":235}],214:[function(require,module,exports){
function baseMatchesProperty(r,e){return isStrictComparable(e)?function(a){return null!=a&&a[r]===e}:function(a){return null!=a&&baseIsEqual(e,a[r],null,!0)}}var baseIsEqual=require("./baseIsEqual"),isStrictComparable=require("./isStrictComparable");module.exports=baseMatchesProperty;


},{"./baseIsEqual":209,"./isStrictComparable":235}],215:[function(require,module,exports){
function baseProperty(r){return function(e){return null==e?void 0:e[r]}}module.exports=baseProperty;


},{}],216:[function(require,module,exports){
var identity=require("../utility/identity"),metaMap=require("./metaMap"),baseSetData=metaMap?function(t,e){return metaMap.set(t,e),t}:identity;module.exports=baseSetData;


},{"../utility/identity":265,"./metaMap":236}],217:[function(require,module,exports){
function baseToString(n){return"string"==typeof n?n:null==n?"":n+""}module.exports=baseToString;


},{}],218:[function(require,module,exports){
function baseValues(e,r){for(var a=-1,s=r.length,u=Array(s);++a<s;)u[a]=e[r[a]];return u}module.exports=baseValues;


},{}],219:[function(require,module,exports){
function bindCallback(n,t,r){if("function"!=typeof n)return identity;if("undefined"==typeof t)return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)};case 5:return function(r,e,u,i,c){return n.call(t,r,e,u,i,c)}}return function(){return n.apply(t,arguments)}}var identity=require("../utility/identity");module.exports=bindCallback;


},{"../utility/identity":265}],220:[function(require,module,exports){
(function (global){
function bufferClone(r){return bufferSlice.call(r,0)}var constant=require("../utility/constant"),isNative=require("../lang/isNative"),ArrayBuffer=isNative(ArrayBuffer=global.ArrayBuffer)&&ArrayBuffer,bufferSlice=isNative(bufferSlice=ArrayBuffer&&new ArrayBuffer(0).slice)&&bufferSlice,floor=Math.floor,Uint8Array=isNative(Uint8Array=global.Uint8Array)&&Uint8Array,Float64Array=function(){try{var r=isNative(r=global.Float64Array)&&r,e=new r(new ArrayBuffer(10),0,1)&&r}catch(a){}return e}(),FLOAT64_BYTES_PER_ELEMENT=Float64Array?Float64Array.BYTES_PER_ELEMENT:0;bufferSlice||(bufferClone=ArrayBuffer&&Uint8Array?function(r){var e=r.byteLength,a=Float64Array?floor(e/FLOAT64_BYTES_PER_ELEMENT):0,t=a*FLOAT64_BYTES_PER_ELEMENT,f=new ArrayBuffer(e);if(a){var n=new Float64Array(f,0,a);n.set(new Float64Array(r,0,a))}return e!=t&&(n=new Uint8Array(f,t),n.set(new Uint8Array(r,t))),f}:constant(null)),module.exports=bufferClone;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":247,"../utility/constant":264}],221:[function(require,module,exports){
function createAssigner(e){return function(){var r=arguments,n=r.length,a=r[0];if(2>n||null==a)return a;var l=r[n-2],t=r[n-1],i=r[3];n>3&&"function"==typeof l?(l=bindCallback(l,t,5),n-=2):(l=n>2&&"function"==typeof t?t:null,n-=l?1:0),i&&isIterateeCall(r[1],r[2],i)&&(l=3==n?null:l,n=2);for(var u=0;++u<n;){var c=r[u];c&&e(a,c,l)}return a}}var bindCallback=require("./bindCallback"),isIterateeCall=require("./isIterateeCall");module.exports=createAssigner;


},{"./bindCallback":219,"./isIterateeCall":232}],222:[function(require,module,exports){
function equalArrays(r,e,f,n,a,o,t){var u=-1,i=r.length,l=e.length,d=!0;if(i!=l&&!(a&&l>i))return!1;for(;d&&++u<i;){var s=r[u],v=e[u];if(d=void 0,n&&(d=a?n(v,s,u):n(s,v,u)),"undefined"==typeof d)if(a)for(var y=l;y--&&(v=e[y],!(d=s&&s===v||f(s,v,n,a,o,t))););else d=s&&s===v||f(s,v,n,a,o,t)}return!!d}module.exports=equalArrays;


},{}],223:[function(require,module,exports){
function equalByTag(e,a,r){switch(r){case boolTag:case dateTag:return+e==+a;case errorTag:return e.name==a.name&&e.message==a.message;case numberTag:return e!=+e?a!=+a:0==e?1/e==1/a:e==+a;case regexpTag:case stringTag:return e==a+""}return!1}var boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",numberTag="[object Number]",regexpTag="[object RegExp]",stringTag="[object String]";module.exports=equalByTag;


},{}],224:[function(require,module,exports){
function equalObjects(t,r,o,e,n,c,s){var u=keys(t),f=u.length,i=keys(r),a=i.length;if(f!=a&&!n)return!1;for(var y,p=-1;++p<f;){var l=u[p],v=hasOwnProperty.call(r,l);if(v){var b=t[l],j=r[l];v=void 0,e&&(v=n?e(j,b,l):e(b,j,l)),"undefined"==typeof v&&(v=b&&b===j||o(b,j,e,n,c,s))}if(!v)return!1;y||(y="constructor"==l)}if(!y){var O=t.constructor,h=r.constructor;if(O!=h&&"constructor"in t&&"constructor"in r&&!("function"==typeof O&&O instanceof O&&"function"==typeof h&&h instanceof h))return!1}return!0}var keys=require("../object/keys"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=equalObjects;


},{"../object/keys":255}],225:[function(require,module,exports){
function escapeHtmlChar(t){return htmlEscapes[t]}var htmlEscapes={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};module.exports=escapeHtmlChar;


},{}],226:[function(require,module,exports){
function escapeStringChar(r){return"\\"+stringEscapes[r]}var stringEscapes={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};module.exports=escapeStringChar;


},{}],227:[function(require,module,exports){
function initCloneArray(t){var r=t.length,n=new t.constructor(r);return r&&"string"==typeof t[0]&&hasOwnProperty.call(t,"index")&&(n.index=t.index,n.input=t.input),n}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=initCloneArray;


},{}],228:[function(require,module,exports){
function initCloneByTag(a,e,t){var r=a.constructor;switch(e){case arrayBufferTag:return bufferClone(a);case boolTag:case dateTag:return new r(+a);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:var n=a.buffer;return new r(t?bufferClone(n):n,a.byteOffset,a.length);case numberTag:case stringTag:return new r(a);case regexpTag:var g=new r(a.source,reFlags.exec(a));g.lastIndex=a.lastIndex}return g}var bufferClone=require("./bufferClone"),boolTag="[object Boolean]",dateTag="[object Date]",numberTag="[object Number]",regexpTag="[object RegExp]",stringTag="[object String]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",reFlags=/\w*$/;module.exports=initCloneByTag;


},{"./bufferClone":220}],229:[function(require,module,exports){
function initCloneObject(n){var t=n.constructor;return"function"==typeof t&&t instanceof t||(t=Object),new t}module.exports=initCloneObject;


},{}],230:[function(require,module,exports){
function isBindable(e){var t=!(support.funcNames?e.name:support.funcDecomp);if(!t){var r=fnToString.call(e);support.funcNames||(t=!reFuncName.test(r)),t||(t=reThis.test(r)||isNative(e),baseSetData(e,t))}return t}var baseSetData=require("./baseSetData"),isNative=require("../lang/isNative"),support=require("../support"),reFuncName=/^\s*function[ \n\r\t]+\w/,reThis=/\bthis\b/,fnToString=Function.prototype.toString;module.exports=isBindable;


},{"../lang/isNative":247,"../support":262,"./baseSetData":216}],231:[function(require,module,exports){
function isIndex(n,E){return n=+n,E=null==E?MAX_SAFE_INTEGER:E,n>-1&&n%1==0&&E>n}var MAX_SAFE_INTEGER=Math.pow(2,53)-1;module.exports=isIndex;


},{}],232:[function(require,module,exports){
function isIterateeCall(e,r,i){if(!isObject(i))return!1;var t=typeof r;if("number"==t)var n=i.length,s=isLength(n)&&isIndex(r,n);else s="string"==t&&r in i;if(s){var a=i[r];return e===e?e===a:a!==a}return!1}var isIndex=require("./isIndex"),isLength=require("./isLength"),isObject=require("../lang/isObject");module.exports=isIterateeCall;


},{"../lang/isObject":248,"./isIndex":231,"./isLength":233}],233:[function(require,module,exports){
function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&MAX_SAFE_INTEGER>=e}var MAX_SAFE_INTEGER=Math.pow(2,53)-1;module.exports=isLength;


},{}],234:[function(require,module,exports){
function isObjectLike(e){return e&&"object"==typeof e||!1}module.exports=isObjectLike;


},{}],235:[function(require,module,exports){
function isStrictComparable(e){return e===e&&(0===e?1/e>0:!isObject(e))}var isObject=require("../lang/isObject");module.exports=isStrictComparable;


},{"../lang/isObject":248}],236:[function(require,module,exports){
(function (global){
var isNative=require("../lang/isNative"),WeakMap=isNative(WeakMap=global.WeakMap)&&WeakMap,metaMap=WeakMap&&new WeakMap;module.exports=metaMap;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":247}],237:[function(require,module,exports){
var reEscape=/<%-([\s\S]+?)%>/g;module.exports=reEscape;


},{}],238:[function(require,module,exports){
var reEvaluate=/<%([\s\S]+?)%>/g;module.exports=reEvaluate;


},{}],239:[function(require,module,exports){
var reInterpolate=/<%=([\s\S]+?)%>/g;module.exports=reInterpolate;


},{}],240:[function(require,module,exports){
function shimKeys(r){for(var e=keysIn(r),s=e.length,n=s&&r.length,t=n&&isLength(n)&&(isArray(r)||support.nonEnumArgs&&isArguments(r)),i=-1,o=[];++i<s;){var u=e[i];(t&&isIndex(u,n)||hasOwnProperty.call(r,u))&&o.push(u)}return o}var isArguments=require("../lang/isArguments"),isArray=require("../lang/isArray"),isIndex=require("./isIndex"),isLength=require("./isLength"),keysIn=require("../object/keysIn"),support=require("../support"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=shimKeys;


},{"../lang/isArguments":243,"../lang/isArray":244,"../object/keysIn":256,"../support":262,"./isIndex":231,"./isLength":233}],241:[function(require,module,exports){
function toObject(e){return isObject(e)?e:Object(e)}var isObject=require("../lang/isObject");module.exports=toObject;


},{"../lang/isObject":248}],242:[function(require,module,exports){
function cloneDeep(e,n,l){return n="function"==typeof n&&bindCallback(n,l,1),baseClone(e,!0,n)}var baseClone=require("../internal/baseClone"),bindCallback=require("../internal/bindCallback");module.exports=cloneDeep;


},{"../internal/baseClone":204,"../internal/bindCallback":219}],243:[function(require,module,exports){
function isArguments(e){var t=isObjectLike(e)?e.length:void 0;return isLength(t)&&objToString.call(e)==argsTag||!1}var isLength=require("../internal/isLength"),isObjectLike=require("../internal/isObjectLike"),argsTag="[object Arguments]",objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isArguments;


},{"../internal/isLength":233,"../internal/isObjectLike":234}],244:[function(require,module,exports){
var isLength=require("../internal/isLength"),isNative=require("./isNative"),isObjectLike=require("../internal/isObjectLike"),arrayTag="[object Array]",objectProto=Object.prototype,objToString=objectProto.toString,nativeIsArray=isNative(nativeIsArray=Array.isArray)&&nativeIsArray,isArray=nativeIsArray||function(r){return isObjectLike(r)&&isLength(r.length)&&objToString.call(r)==arrayTag||!1};module.exports=isArray;


},{"../internal/isLength":233,"../internal/isObjectLike":234,"./isNative":247}],245:[function(require,module,exports){
function isError(r){return isObjectLike(r)&&"string"==typeof r.message&&objToString.call(r)==errorTag||!1}var isObjectLike=require("../internal/isObjectLike"),errorTag="[object Error]",objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isError;


},{"../internal/isObjectLike":234}],246:[function(require,module,exports){
(function (global){
var baseIsFunction=require("../internal/baseIsFunction"),isNative=require("./isNative"),funcTag="[object Function]",objectProto=Object.prototype,objToString=objectProto.toString,Uint8Array=isNative(Uint8Array=global.Uint8Array)&&Uint8Array,isFunction=baseIsFunction(/x/)||Uint8Array&&!baseIsFunction(Uint8Array)?function(t){return objToString.call(t)==funcTag}:baseIsFunction;module.exports=isFunction;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../internal/baseIsFunction":211,"./isNative":247}],247:[function(require,module,exports){
function isNative(t){return null==t?!1:objToString.call(t)==funcTag?reNative.test(fnToString.call(t)):isObjectLike(t)&&reHostCtor.test(t)||!1}var escapeRegExp=require("../string/escapeRegExp"),isObjectLike=require("../internal/isObjectLike"),funcTag="[object Function]",reHostCtor=/^\[object .+?Constructor\]$/,objectProto=Object.prototype,fnToString=Function.prototype.toString,objToString=objectProto.toString,reNative=RegExp("^"+escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");module.exports=isNative;


},{"../internal/isObjectLike":234,"../string/escapeRegExp":259}],248:[function(require,module,exports){
function isObject(t){var e=typeof t;return"function"==e||t&&"object"==e||!1}module.exports=isObject;


},{}],249:[function(require,module,exports){
function isTypedArray(a){return isObjectLike(a)&&isLength(a.length)&&typedArrayTags[objToString.call(a)]||!1}var isLength=require("../internal/isLength"),isObjectLike=require("../internal/isObjectLike"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var objectProto=Object.prototype,objToString=objectProto.toString;module.exports=isTypedArray;


},{"../internal/isLength":233,"../internal/isObjectLike":234}],250:[function(require,module,exports){
function isUndefined(e){return"undefined"==typeof e}module.exports=isUndefined;


},{}],251:[function(require,module,exports){
var baseAssign=require("../internal/baseAssign"),createAssigner=require("../internal/createAssigner"),assign=createAssigner(baseAssign);module.exports=assign;


},{"../internal/baseAssign":202,"../internal/createAssigner":221}],252:[function(require,module,exports){
function defaults(a){if(null==a)return a;var r=arrayCopy(arguments);return r.push(assignDefaults),assign.apply(void 0,r)}var arrayCopy=require("../internal/arrayCopy"),assign=require("./assign"),assignDefaults=require("../internal/assignDefaults");module.exports=defaults;


},{"../internal/arrayCopy":198,"../internal/assignDefaults":200,"./assign":251}],253:[function(require,module,exports){
function findKey(e,a,n){return a=baseCallback(a,n,3),baseFind(e,a,baseForOwn,!0)}var baseCallback=require("../internal/baseCallback"),baseFind=require("../internal/baseFind"),baseForOwn=require("../internal/baseForOwn");module.exports=findKey;


},{"../internal/baseCallback":203,"../internal/baseFind":206,"../internal/baseForOwn":208}],254:[function(require,module,exports){
function invert(e,r,t){t&&isIterateeCall(e,r,t)&&(r=null);for(var o=-1,a=keys(e),l=a.length,n={};++o<l;){var s=a[o],i=e[s];r?hasOwnProperty.call(n,i)?n[i].push(s):n[i]=[s]:n[i]=s}return n}var isIterateeCall=require("../internal/isIterateeCall"),keys=require("./keys"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=invert;


},{"../internal/isIterateeCall":232,"./keys":255}],255:[function(require,module,exports){
var isLength=require("../internal/isLength"),isNative=require("../lang/isNative"),isObject=require("../lang/isObject"),shimKeys=require("../internal/shimKeys"),nativeKeys=isNative(nativeKeys=Object.keys)&&nativeKeys,keys=nativeKeys?function(e){if(e)var i=e.constructor,t=e.length;return"function"==typeof i&&i.prototype===e||"function"!=typeof e&&t&&isLength(t)?shimKeys(e):isObject(e)?nativeKeys(e):[]}:shimKeys;module.exports=keys;


},{"../internal/isLength":233,"../internal/shimKeys":240,"../lang/isNative":247,"../lang/isObject":248}],256:[function(require,module,exports){
function keysIn(r){if(null==r)return[];isObject(r)||(r=Object(r));var e=r.length;e=e&&isLength(e)&&(isArray(r)||support.nonEnumArgs&&isArguments(r))&&e||0;for(var t=r.constructor,n=-1,s="function"==typeof t&&t.prototype===r,o=Array(e),i=e>0;++n<e;)o[n]=n+"";for(var u in r)i&&isIndex(u,e)||"constructor"==u&&(s||!hasOwnProperty.call(r,u))||o.push(u);return o}var isArguments=require("../lang/isArguments"),isArray=require("../lang/isArray"),isIndex=require("../internal/isIndex"),isLength=require("../internal/isLength"),isObject=require("../lang/isObject"),support=require("../support"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=keysIn;


},{"../internal/isIndex":231,"../internal/isLength":233,"../lang/isArguments":243,"../lang/isArray":244,"../lang/isObject":248,"../support":262}],257:[function(require,module,exports){
function mapValues(a,e,r){var n={};return e=baseCallback(e,r,3),baseForOwn(a,function(a,r,l){n[r]=e(a,r,l)}),n}var baseCallback=require("../internal/baseCallback"),baseForOwn=require("../internal/baseForOwn");module.exports=mapValues;


},{"../internal/baseCallback":203,"../internal/baseForOwn":208}],258:[function(require,module,exports){
function escape(e){return e=baseToString(e),e&&reHasUnescapedHtml.test(e)?e.replace(reUnescapedHtml,escapeHtmlChar):e}var baseToString=require("../internal/baseToString"),escapeHtmlChar=require("../internal/escapeHtmlChar"),reUnescapedHtml=/[&<>"'`]/g,reHasUnescapedHtml=RegExp(reUnescapedHtml.source);module.exports=escape;


},{"../internal/baseToString":217,"../internal/escapeHtmlChar":225}],259:[function(require,module,exports){
function escapeRegExp(e){return e=baseToString(e),e&&reHasRegExpChars.test(e)?e.replace(reRegExpChars,"\\$&"):e}var baseToString=require("../internal/baseToString"),reRegExpChars=/[.*+?^${}()|[\]\/\\]/g,reHasRegExpChars=RegExp(reRegExpChars.source);module.exports=escapeRegExp;


},{"../internal/baseToString":217}],260:[function(require,module,exports){
function template(e,r,t){var n=templateSettings.imports._.templateSettings||templateSettings;t&&isIterateeCall(e,r,t)&&(r=t=null),e=baseToString(e),r=baseAssign(baseAssign({},t||r),n,assignOwnDefaults);var a,i,s=baseAssign(baseAssign({},r.imports),n.imports,assignOwnDefaults),l=keys(s),p=baseValues(s,l),u=0,o=r.interpolate||reNoMatch,g="__p += '",c=RegExp((r.escape||reNoMatch).source+"|"+o.source+"|"+(o===reInterpolate?reEsTemplate:reNoMatch).source+"|"+(r.evaluate||reNoMatch).source+"|$","g"),_="sourceURL"in r?"//# sourceURL="+r.sourceURL+"\n":"";e.replace(c,function(r,t,n,s,l,p){return n||(n=s),g+=e.slice(u,p).replace(reUnescapedString,escapeStringChar),t&&(a=!0,g+="' +\n__e("+t+") +\n'"),l&&(i=!0,g+="';\n"+l+";\n__p += '"),n&&(g+="' +\n((__t = ("+n+")) == null ? '' : __t) +\n'"),u=p+r.length,r}),g+="';\n";var m=r.variable;m||(g="with (obj) {\n"+g+"\n}\n"),g=(i?g.replace(reEmptyStringLeading,""):g).replace(reEmptyStringMiddle,"$1").replace(reEmptyStringTrailing,"$1;"),g="function("+(m||"obj")+") {\n"+(m?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(a?", __e = _.escape":"")+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+g+"return __p\n}";var b=attempt(function(){return Function(l,_+"return "+g).apply(void 0,p)});if(b.source=g,isError(b))throw b;return b}var assignOwnDefaults=require("../internal/assignOwnDefaults"),attempt=require("../utility/attempt"),baseAssign=require("../internal/baseAssign"),baseToString=require("../internal/baseToString"),baseValues=require("../internal/baseValues"),escapeStringChar=require("../internal/escapeStringChar"),isError=require("../lang/isError"),isIterateeCall=require("../internal/isIterateeCall"),keys=require("../object/keys"),reInterpolate=require("../internal/reInterpolate"),templateSettings=require("./templateSettings"),reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g,reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,reNoMatch=/($^)/,reUnescapedString=/['\n\r\u2028\u2029\\]/g;module.exports=template;


},{"../internal/assignOwnDefaults":201,"../internal/baseAssign":202,"../internal/baseToString":217,"../internal/baseValues":218,"../internal/escapeStringChar":226,"../internal/isIterateeCall":232,"../internal/reInterpolate":239,"../lang/isError":245,"../object/keys":255,"../utility/attempt":263,"./templateSettings":261}],261:[function(require,module,exports){
var escape=require("./escape"),reEscape=require("../internal/reEscape"),reEvaluate=require("../internal/reEvaluate"),reInterpolate=require("../internal/reInterpolate"),templateSettings={escape:reEscape,evaluate:reEvaluate,interpolate:reInterpolate,variable:"",imports:{_:{escape:escape}}};module.exports=templateSettings;


},{"../internal/reEscape":237,"../internal/reEvaluate":238,"../internal/reInterpolate":239,"./escape":258}],262:[function(require,module,exports){
(function (global){
var isNative=require("./lang/isNative"),reThis=/\bthis\b/,objectProto=Object.prototype,document=(document=global.window)&&document.document,propertyIsEnumerable=objectProto.propertyIsEnumerable,support={};!function(){support.funcDecomp=!isNative(global.WinRTError)&&reThis.test(function(){return this}),support.funcNames="string"==typeof Function.name;try{support.dom=11===document.createDocumentFragment().nodeType}catch(t){support.dom=!1}try{support.nonEnumArgs=!propertyIsEnumerable.call(arguments,1)}catch(t){support.nonEnumArgs=!0}}(0,0),module.exports=support;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lang/isNative":247}],263:[function(require,module,exports){
function attempt(){for(var r=arguments[0],t=arguments.length,e=Array(t?t-1:0);--t>0;)e[t-1]=arguments[t];try{return r.apply(void 0,e)}catch(a){return isError(a)?a:new Error(a)}}var isError=require("../lang/isError");module.exports=attempt;


},{"../lang/isError":245}],264:[function(require,module,exports){
function constant(n){return function(){return n}}module.exports=constant;


},{}],265:[function(require,module,exports){
function identity(t){return t}module.exports=identity;


},{}],266:[function(require,module,exports){
module.exports=require("./lib/_stream_duplex.js");


},{"./lib/_stream_duplex.js":267}],267:[function(require,module,exports){
(function (process){
function Duplex(e){return this instanceof Duplex?(Readable.call(this,e),Writable.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",onend)):new Duplex(e)}function onend(){this.allowHalfOpen||this._writableState.ended||process.nextTick(this.end.bind(this))}function forEach(e,t){for(var i=0,r=e.length;r>i;i++)t(e[i],i)}module.exports=Duplex;var objectKeys=Object.keys||function(e){var t=[];for(var i in e)t.push(i);return t},util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable),forEach(objectKeys(Writable.prototype),function(e){Duplex.prototype[e]||(Duplex.prototype[e]=Writable.prototype[e])});


}).call(this,require('_process'))

},{"./_stream_readable":269,"./_stream_writable":271,"_process":164,"core-util-is":272,"inherits":273}],268:[function(require,module,exports){
function PassThrough(r){return this instanceof PassThrough?void Transform.call(this,r):new PassThrough(r)}module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(r,s,i){i(null,r)};


},{"./_stream_transform":270,"core-util-is":272,"inherits":273}],269:[function(require,module,exports){
(function (process){
function ReadableState(e){e=e||{};var t=e.highWaterMark;this.highWaterMark=t||0===t?t:16384,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=!1,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.calledRead=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!e.objectMode,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){return this instanceof Readable?(this._readableState=new ReadableState(e,this),this.readable=!0,void Stream.call(this)):new Readable(e)}function readableAddChunk(e,t,n,r,i){var a=chunkInvalid(t,n);if(a)e.emit("error",a);else if(null===n||void 0===n)t.reading=!1,t.ended||onEofChunk(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!i){var d=new Error("stream.push() after EOF");e.emit("error",d)}else if(t.endEmitted&&i){var d=new Error("stream.unshift() after end event");e.emit("error",d)}else!t.decoder||i||r||(n=t.decoder.write(n)),t.length+=t.objectMode?1:n.length,i?t.buffer.unshift(n):(t.reading=!1,t.buffer.push(n)),t.needReadable&&emitReadable(e),maybeReadMore(e,t);else i||(t.reading=!1);return needMoreData(t)}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function roundUpToNextPowerOf2(e){if(e>=MAX_HWM)e=MAX_HWM;else{e--;for(var t=1;32>t;t<<=1)e|=e>>t;e++}return e}function howMuchToRead(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:null===e||isNaN(e)?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=roundUpToNextPowerOf2(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function chunkInvalid(e,t){var n=null;return Buffer.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function onEofChunk(e,t){if(t.decoder&&!t.ended){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,t.length>0?emitReadable(e):endReadable(e)}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,t.sync?process.nextTick(function(){emitReadable_(e)}):emitReadable_(e))}function emitReadable_(e){e.emit("readable")}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,process.nextTick(function(){maybeReadMore_(e,t)}))}function maybeReadMore_(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;t.awaitDrain--,0===t.awaitDrain&&flow(e)}}function flow(e){function t(e){var t=e.write(n);!1===t&&r.awaitDrain++}var n,r=e._readableState;for(r.awaitDrain=0;r.pipesCount&&null!==(n=e.read());)if(1===r.pipesCount?t(r.pipes,0,null):forEach(r.pipes,t),e.emit("data",n),r.awaitDrain>0)return;return 0===r.pipesCount?(r.flowing=!1,void(EE.listenerCount(e,"data")>0&&emitDataEvents(e))):void(r.ranOut=!0)}function pipeOnReadable(){this._readableState.ranOut&&(this._readableState.ranOut=!1,flow(this))}function emitDataEvents(e,t){var n=e._readableState;if(n.flowing)throw new Error("Cannot switch to old mode now.");var r=t||!1,i=!1;e.readable=!0,e.pipe=Stream.prototype.pipe,e.on=e.addListener=Stream.prototype.on,e.on("readable",function(){i=!0;for(var t;!r&&null!==(t=e.read());)e.emit("data",t);null===t&&(i=!1,e._readableState.needReadable=!0)}),e.pause=function(){r=!0,this.emit("pause")},e.resume=function(){r=!1,i?process.nextTick(function(){e.emit("readable")}):this.read(0),this.emit("resume")},e.emit("readable")}function fromList(e,t){var n,r=t.buffer,i=t.length,a=!!t.decoder,d=!!t.objectMode;if(0===r.length)return null;if(0===i)n=null;else if(d)n=r.shift();else if(!e||e>=i)n=a?r.join(""):Buffer.concat(r,i),r.length=0;else if(e<r[0].length){var o=r[0];n=o.slice(0,e),r[0]=o.slice(e)}else if(e===r[0].length)n=r.shift();else{n=a?"":new Buffer(e);for(var l=0,s=0,u=r.length;u>s&&e>l;s++){var o=r[0],h=Math.min(e-l,o.length);a?n+=o.slice(0,h):o.copy(n,l,0,h),h<o.length?r[0]=o.slice(h):r.shift(),l+=h}}return n}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error("endReadable called on non-empty stream");!t.endEmitted&&t.calledRead&&(t.ended=!0,process.nextTick(function(){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}))}function forEach(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}function indexOf(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}module.exports=Readable;var isArray=require("isarray"),Buffer=require("buffer").Buffer;Readable.ReadableState=ReadableState;var EE=require("events").EventEmitter;EE.listenerCount||(EE.listenerCount=function(e,t){return e.listeners(t).length});var Stream=require("stream"),util=require("core-util-is");util.inherits=require("inherits");var StringDecoder;util.inherits(Readable,Stream),Readable.prototype.push=function(e,t){var n=this._readableState;return"string"!=typeof e||n.objectMode||(t=t||n.defaultEncoding,t!==n.encoding&&(e=new Buffer(e,t),t="")),readableAddChunk(this,n,e,t,!1)},Readable.prototype.unshift=function(e){var t=this._readableState;return readableAddChunk(this,t,e,"",!0)},Readable.prototype.setEncoding=function(e){StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e};var MAX_HWM=8388608;Readable.prototype.read=function(e){var t=this._readableState;t.calledRead=!0;var n,r=e;if(("number"!=typeof e||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return emitReadable(this),null;if(e=howMuchToRead(e,t),0===e&&t.ended)return n=null,t.length>0&&t.decoder&&(n=fromList(e,t),t.length-=n.length),0===t.length&&endReadable(this),n;var i=t.needReadable;return t.length-e<=t.highWaterMark&&(i=!0),(t.ended||t.reading)&&(i=!1),i&&(t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),i&&!t.reading&&(e=howMuchToRead(r,t)),n=e>0?fromList(e,t):null,null===n&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),t.ended&&!t.endEmitted&&0===t.length&&endReadable(this),n},Readable.prototype._read=function(){this.emit("error",new Error("not implemented"))},Readable.prototype.pipe=function(e,t){function n(e){e===s&&i()}function r(){e.end()}function i(){e.removeListener("close",d),e.removeListener("finish",o),e.removeListener("drain",p),e.removeListener("error",a),e.removeListener("unpipe",n),s.removeListener("end",r),s.removeListener("end",i),(!e._writableState||e._writableState.needDrain)&&p()}function a(t){l(),e.removeListener("error",a),0===EE.listenerCount(e,"error")&&e.emit("error",t)}function d(){e.removeListener("finish",o),l()}function o(){e.removeListener("close",d),l()}function l(){s.unpipe(e)}var s=this,u=this._readableState;switch(u.pipesCount){case 0:u.pipes=e;break;case 1:u.pipes=[u.pipes,e];break;default:u.pipes.push(e)}u.pipesCount+=1;var h=(!t||t.end!==!1)&&e!==process.stdout&&e!==process.stderr,f=h?r:i;u.endEmitted?process.nextTick(f):s.once("end",f),e.on("unpipe",n);var p=pipeOnDrain(s);return e.on("drain",p),e._events&&e._events.error?isArray(e._events.error)?e._events.error.unshift(a):e._events.error=[a,e._events.error]:e.on("error",a),e.once("close",d),e.once("finish",o),e.emit("pipe",s),u.flowing||(this.on("readable",pipeOnReadable),u.flowing=!0,process.nextTick(function(){flow(s)})),e},Readable.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1;for(var i=0;r>i;i++)n[i].emit("unpipe",this);return this}var i=indexOf(t.pipes,e);return-1===i?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},Readable.prototype.on=function(e,t){var n=Stream.prototype.on.call(this,e,t);if("data"!==e||this._readableState.flowing||emitDataEvents(this),"readable"===e&&this.readable){var r=this._readableState;r.readableListening||(r.readableListening=!0,r.emittedReadable=!1,r.needReadable=!0,r.reading?r.length&&emitReadable(this,r):this.read(0))}return n},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){emitDataEvents(this),this.read(0),this.emit("resume")},Readable.prototype.pause=function(){emitDataEvents(this,!0),this.emit("pause")},Readable.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;e.on("end",function(){if(t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(i){if(t.decoder&&(i=t.decoder.write(i)),(!t.objectMode||null!==i&&void 0!==i)&&(t.objectMode||i&&i.length)){var a=r.push(i);a||(n=!0,e.pause())}});for(var i in e)"function"==typeof e[i]&&"undefined"==typeof this[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));var a=["error","close","destroy","pause","resume"];return forEach(a,function(t){e.on(t,r.emit.bind(r,t))}),r._read=function(){n&&(n=!1,e.resume())},r},Readable._fromList=fromList;


}).call(this,require('_process'))

},{"_process":164,"buffer":17,"core-util-is":272,"events":156,"inherits":273,"isarray":274,"stream":180,"string_decoder/":275}],270:[function(require,module,exports){
function TransformState(r,t){this.afterTransform=function(r,e){return afterTransform(t,r,e)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function afterTransform(r,t,e){var n=r._transformState;n.transforming=!1;var a=n.writecb;if(!a)return r.emit("error",new Error("no writecb in Transform class"));n.writechunk=null,n.writecb=null,null!==e&&void 0!==e&&r.push(e),a&&a(t);var i=r._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&r._read(i.highWaterMark)}function Transform(r){if(!(this instanceof Transform))return new Transform(r);Duplex.call(this,r);var t=(this._transformState=new TransformState(r,this),this);this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(r){done(t,r)}):done(t)})}function done(r,t){if(t)return r.emit("error",t);var e=r._writableState,n=(r._readableState,r._transformState);if(e.length)throw new Error("calling transform done when ws.length != 0");if(n.transforming)throw new Error("calling transform done when still transforming");return r.push(null)}module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(r,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,r,t)},Transform.prototype._transform=function(){throw new Error("not implemented")},Transform.prototype._write=function(r,t,e){var n=this._transformState;if(n.writecb=e,n.writechunk=r,n.writeencoding=t,!n.transforming){var a=this._readableState;(n.needTransform||a.needReadable||a.length<a.highWaterMark)&&this._read(a.highWaterMark)}},Transform.prototype._read=function(){var r=this._transformState;null!==r.writechunk&&r.writecb&&!r.transforming?(r.transforming=!0,this._transform(r.writechunk,r.writeencoding,r.afterTransform)):r.needTransform=!0};


},{"./_stream_duplex":267,"core-util-is":272,"inherits":273}],271:[function(require,module,exports){
(function (process){
function WriteReq(e,t,i){this.chunk=e,this.encoding=t,this.callback=i}function WritableState(e,t){e=e||{};var i=e.highWaterMark;this.highWaterMark=i||0===i?i:16384,this.objectMode=!!e.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var r=e.decodeStrings===!1;this.decodeStrings=!r,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.buffer=[],this.errorEmitted=!1}function Writable(e){var t=require("./_stream_duplex");return this instanceof Writable||this instanceof t?(this._writableState=new WritableState(e,this),this.writable=!0,void Stream.call(this)):new Writable(e)}function writeAfterEnd(e,t,i){var r=new Error("write after end");e.emit("error",r),process.nextTick(function(){i(r)})}function validChunk(e,t,i,r){var n=!0;if(!Buffer.isBuffer(i)&&"string"!=typeof i&&null!==i&&void 0!==i&&!t.objectMode){var f=new TypeError("Invalid non-string/buffer chunk");e.emit("error",f),process.nextTick(function(){r(f)}),n=!1}return n}function decodeChunk(e,t,i){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=new Buffer(t,i)),t}function writeOrBuffer(e,t,i,r,n){i=decodeChunk(t,i,r),Buffer.isBuffer(i)&&(r="buffer");var f=t.objectMode?1:i.length;t.length+=f;var o=t.length<t.highWaterMark;return o||(t.needDrain=!0),t.writing?t.buffer.push(new WriteReq(i,r,n)):doWrite(e,t,f,i,r,n),o}function doWrite(e,t,i,r,n,f){t.writelen=i,t.writecb=f,t.writing=!0,t.sync=!0,e._write(r,n,t.onwrite),t.sync=!1}function onwriteError(e,t,i,r,n){i?process.nextTick(function(){n(r)}):n(r),e._writableState.errorEmitted=!0,e.emit("error",r)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var i=e._writableState,r=i.sync,n=i.writecb;if(onwriteStateUpdate(i),t)onwriteError(e,i,r,t,n);else{var f=needFinish(e,i);f||i.bufferProcessing||!i.buffer.length||clearBuffer(e,i),r?process.nextTick(function(){afterWrite(e,i,f,n)}):afterWrite(e,i,f,n)}}function afterWrite(e,t,i,r){i||onwriteDrain(e,t),r(),i&&finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;for(var i=0;i<t.buffer.length;i++){var r=t.buffer[i],n=r.chunk,f=r.encoding,o=r.callback,a=t.objectMode?1:n.length;if(doWrite(e,t,a,n,f,o),t.writing){i++;break}}t.bufferProcessing=!1,i<t.buffer.length?t.buffer=t.buffer.slice(i):t.buffer.length=0}function needFinish(e,t){return t.ending&&0===t.length&&!t.finished&&!t.writing}function finishMaybe(e,t){var i=needFinish(e,t);return i&&(t.finished=!0,e.emit("finish")),i}function endWritable(e,t,i){t.ending=!0,finishMaybe(e,t),i&&(t.finished?process.nextTick(i):e.once("finish",i)),t.ended=!0}module.exports=Writable;var Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var Stream=require("stream");util.inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,t,i){var r=this._writableState,n=!1;return"function"==typeof t&&(i=t,t=null),Buffer.isBuffer(e)?t="buffer":t||(t=r.defaultEncoding),"function"!=typeof i&&(i=function(){}),r.ended?writeAfterEnd(this,r,i):validChunk(this,r,e,i)&&(n=writeOrBuffer(this,r,e,t,i)),n},Writable.prototype._write=function(e,t,i){i(new Error("not implemented"))},Writable.prototype.end=function(e,t,i){var r=this._writableState;"function"==typeof e?(i=e,e=null,t=null):"function"==typeof t&&(i=t,t=null),"undefined"!=typeof e&&null!==e&&this.write(e,t),r.ending||r.finished||endWritable(this,r,i)};


}).call(this,require('_process'))

},{"./_stream_duplex":267,"_process":164,"buffer":17,"core-util-is":272,"inherits":273,"stream":180}],272:[function(require,module,exports){
(function (Buffer){
function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function isBuffer(e){return Buffer.isBuffer(e)}function objectToString(e){return Object.prototype.toString.call(e)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=isBuffer;


}).call(this,require("buffer").Buffer)

},{"buffer":17}],273:[function(require,module,exports){
module.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};


},{}],274:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};


},{}],275:[function(require,module,exports){
function assertEncoding(e){if(e&&!isBufferEncoding(e))throw new Error("Unknown encoding: "+e)}function passThroughWrite(e){return e.toString(this.encoding)}function utf16DetectIncompleteChar(e){this.charReceived=e.length%2,this.charLength=this.charReceived?2:0}function base64DetectIncompleteChar(e){this.charReceived=e.length%3,this.charLength=this.charReceived?3:0}var Buffer=require("buffer").Buffer,isBufferEncoding=Buffer.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},StringDecoder=exports.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),assertEncoding(e),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=base64DetectIncompleteChar;break;default:return void(this.write=passThroughWrite)}this.charBuffer=new Buffer(6),this.charReceived=0,this.charLength=0};StringDecoder.prototype.write=function(e){for(var t="";this.charLength;){var r=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,0,r),this.charReceived+=r,this.charReceived<this.charLength)return"";e=e.slice(r,e.length),t=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var h=t.charCodeAt(t.length-1);if(!(h>=55296&&56319>=h)){if(this.charReceived=this.charLength=0,0===e.length)return t;break}this.charLength+=this.surrogateSize,t=""}this.detectIncompleteChar(e);var i=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,i),i-=this.charReceived),t+=e.toString(this.encoding,0,i);var i=t.length-1,h=t.charCodeAt(i);if(h>=55296&&56319>=h){var c=this.surrogateSize;return this.charLength+=c,this.charReceived+=c,this.charBuffer.copy(this.charBuffer,c,0,c),e.copy(this.charBuffer,0,0,c),t.substring(0,i)}return t},StringDecoder.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var r=e[e.length-t];if(1==t&&r>>5==6){this.charLength=2;break}if(2>=t&&r>>4==14){this.charLength=3;break}if(3>=t&&r>>3==30){this.charLength=4;break}}this.charReceived=t},StringDecoder.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)),this.charReceived){var r=this.charReceived,h=this.charBuffer,i=this.encoding;t+=h.slice(0,r).toString(i)}return t};


},{"buffer":17}],276:[function(require,module,exports){
module.exports=require("./lib/_stream_passthrough.js");


},{"./lib/_stream_passthrough.js":268}],277:[function(require,module,exports){
module.exports=require("./lib/_stream_transform.js");


},{"./lib/_stream_transform.js":270}],278:[function(require,module,exports){
"use strict";function initParams(e,t,r){return r=filterForCallback([t,r]),t=constructOptionsFrom(e,t),constructObject().extend({callback:r}).extend({options:t}).extend({uri:t.uri}).done()}function request(e,t,r){if("undefined"==typeof e)throw new Error("undefined is not a valid uri or options object.");var n=initParams(e,t,r);return t=n.options,t.callback=n.callback,t.uri=n.uri,new request.Request(t)}function requester(e){return"function"==typeof e.options._requester?e.options._requester:request}var extend=require("util")._extend,cookies=require("./lib/cookies"),helpers=require("./lib/helpers"),isFunction=helpers.isFunction,constructObject=helpers.constructObject,filterForCallback=helpers.filterForCallback,constructOptionsFrom=helpers.constructOptionsFrom,paramsHaveRequestBody=helpers.paramsHaveRequestBody;request.get=function(e,t,r){var n=initParams(e,t,r);return n.options.method="GET",requester(n)(n.uri||null,n.options,n.callback)},request.head=function(e,t,r){var n=initParams(e,t,r);if(n.options.method="HEAD",paramsHaveRequestBody(n))throw new Error("HTTP HEAD requests MUST NOT include a request body.");return requester(n)(n.uri||null,n.options,n.callback)},request.post=function(e,t,r){var n=initParams(e,t,r);return n.options.method="POST",requester(n)(n.uri||null,n.options,n.callback)},request.put=function(e,t,r){var n=initParams(e,t,r);return n.options.method="PUT",requester(n)(n.uri||null,n.options,n.callback)},request.patch=function(e,t,r){var n=initParams(e,t,r);return n.options.method="PATCH",requester(n)(n.uri||null,n.options,n.callback)},request.del=function(e,t,r){var n=initParams(e,t,r);return n.options.method="DELETE",requester(n)(n.uri||null,n.options,n.callback)},request.jar=function(e){return cookies.jar(e)},request.cookie=function(e){return cookies.parse(e)},request.defaults=function(e,t){var r=this,n=function(n){var o=function(e){return e=extend({},e),delete e.headers,e},u=function(e,t){return constructObject().extend(t.headers).extend(e.options.headers).done()};return function(s,i,a){var c=initParams(s,i,a);return c.options=extend(o(e),c.options),e.headers&&(c.options.headers=u(c,e)),isFunction(t)&&(n===r?n=t:c.options._requester=t),n(c.options,c.callback)}},o=n(r);return o.get=n(r.get),o.patch=n(r.patch),o.post=n(r.post),o.put=n(r.put),o.head=n(r.head),o.del=n(r.del),o.cookie=n(r.cookie),o.jar=r.jar,o.defaults=r.defaults,o},request.forever=function(e,t){var r=constructObject();return t&&r.extend(t),e&&(r.agentOptions=e),r.extend({forever:!0}),request.defaults(r.done())},module.exports=request,request.Request=require("./request"),request.initParams=initParams,Object.defineProperty(request,"debug",{enumerable:!0,get:function(){return request.Request.debug},set:function(e){request.Request.debug=e}});


},{"./lib/cookies":280,"./lib/helpers":283,"./request":327,"util":184}],279:[function(require,module,exports){
"use strict";function Auth(){this.hasAuth=!1,this.sentAuth=!1,this.bearerToken=null,this.user=null,this.pass=null}var caseless=require("caseless"),uuid=require("node-uuid"),helpers=require("./helpers"),md5=helpers.md5,toBase64=helpers.toBase64;Auth.prototype.basic=function(e,r,t){var s=this;if("string"!=typeof e||void 0!==r&&"string"!=typeof r)throw new Error("auth() received invalid user or password");s.user=e,s.pass=r,s.hasAuth=!0;var a="undefined"!=typeof r?e+":"+r:e;if(t||"undefined"==typeof t){var u="Basic "+toBase64(a);return s.sentAuth=!0,u}},Auth.prototype.bearer=function(e,r){var t=this;if(t.bearerToken=e,t.hasAuth=!0,r||"undefined"==typeof r){"function"==typeof e&&(e=e());var s="Bearer "+e;return t.sentAuth=!0,s}},Auth.prototype.digest=function(e,r,t){for(var s=this,a={},u=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;;){var n=u.exec(t);if(!n)break;a[n[1]]=n[2]||n[3]}var i=md5(s.user+":"+a.realm+":"+s.pass),o=md5(e+":"+r),h=/(^|,)\s*auth\s*($|,)/.test(a.qop)&&"auth",p=h&&"00000001",c=h&&uuid().replace(/-/g,""),l=md5(h?i+":"+a.nonce+":"+p+":"+c+":"+h+":"+o:i+":"+a.nonce+":"+o),d={username:s.user,realm:a.realm,nonce:a.nonce,uri:r,qop:h,response:l,nc:p,cnonce:c,algorithm:a.algorithm,opaque:a.opaque};t=[];for(var f in d)d[f]&&t.push("qop"===f||"nc"===f||"algorithm"===f?f+"="+d[f]:f+'="'+d[f]+'"');return t="Digest "+t.join(", "),s.sentAuth=!0,t},Auth.prototype.response=function(e,r,t){var s=this;if(!s.hasAuth||s.sentAuth)return null;var a=caseless(t),u=a.get("www-authenticate"),n=u&&u.split(" ")[0].toLowerCase();switch(n){case"basic":return s.basic(s.user,s.pass,!0);case"bearer":return s.bearer(s.bearerToken,!0);case"digest":return s.digest(e,r,u)}},exports.Auth=Auth;


},{"./helpers":283,"caseless":287,"node-uuid":314}],280:[function(require,module,exports){
"use strict";function RequestJar(e){var o=this;o._jar=new CookieJar(e)}var tough=require("tough-cookie"),Cookie=tough.Cookie,CookieJar=tough.CookieJar;exports.parse=function(e){if(e&&e.uri&&(e=e.uri),"string"!=typeof e)throw new Error("The cookie function only accepts STRING as param");return Cookie.parse(e)},RequestJar.prototype.setCookie=function(e,o,r){var t=this;return t._jar.setCookieSync(e,o,r||{})},RequestJar.prototype.getCookieString=function(e){var o=this;return o._jar.getCookieStringSync(e)},RequestJar.prototype.getCookies=function(e){var o=this;return o._jar.getCookiesSync(e)},exports.jar=function(e){return new RequestJar(e)};


},{"tough-cookie":322}],281:[function(require,module,exports){
"use strict";module.exports=function(t){var e={};return Object.keys(t).forEach(function(r){e[r]=t[r]}),e};


},{}],282:[function(require,module,exports){
(function (process){
"use strict";function formatHostname(o){return o.replace(/^\.*/,".").toLowerCase()}function parseNoProxyZone(o){o=o.trim().toLowerCase();var r=o.split(":",2),t=formatHostname(r[0]),e=r[1],n=o.indexOf(":")>-1;return{hostname:t,port:e,hasPort:n}}function uriInNoProxy(o,r){var t=o.port||("https:"===o.protocol?"443":"80"),e=formatHostname(o.hostname),n=r.split(",");return n.map(parseNoProxyZone).some(function(o){var r=e.indexOf(o.hostname),n=r>-1&&r===e.length-o.hostname.length;return o.hasPort?t===o.port&&n:n})}function getProxyFromURI(o){var r=process.env.NO_PROXY||process.env.no_proxy||"";return"*"===r?null:""!==r&&uriInNoProxy(o,r)?null:"http:"===o.protocol?process.env.HTTP_PROXY||process.env.http_proxy||null:"https:"===o.protocol?process.env.HTTPS_PROXY||process.env.https_proxy||process.env.HTTP_PROXY||process.env.http_proxy||null:null}module.exports=getProxyFromURI;


}).call(this,require('_process'))

},{"_process":164}],283:[function(require,module,exports){
(function (process,Buffer){
"use strict";function deferMethod(){return"undefined"==typeof setImmediate?process.nextTick:setImmediate}function constructObject(t){return t=t||{},{extend:function(e){return constructObject(extend(t,e))},done:function(){return t}}}function constructOptionsFrom(t,e){var r=constructObject();return"object"==typeof e?r.extend(e).extend({uri:t}):r.extend("string"==typeof t?{uri:t}:t),r.done()}function isFunction(t){return"function"==typeof t}function filterForCallback(t){var e=t.filter(isFunction);return e[0]}function paramsHaveRequestBody(t){return t.options.body||t.options.requestBodyStream||t.options.json&&"boolean"!=typeof t.options.json||t.options.multipart}function safeStringify(t){var e;try{e=JSON.stringify(t)}catch(r){e=jsonSafeStringify(t)}return e}function md5(t){return crypto.createHash("md5").update(t).digest("hex")}function isReadStream(t){return t.readable&&t.path&&t.mode}function toBase64(t){return new Buffer(t||"","ascii").toString("base64")}var extend=require("util")._extend,jsonSafeStringify=require("json-stringify-safe"),crypto=require("crypto");exports.isFunction=isFunction,exports.constructObject=constructObject,exports.constructOptionsFrom=constructOptionsFrom,exports.filterForCallback=filterForCallback,exports.paramsHaveRequestBody=paramsHaveRequestBody,exports.safeStringify=safeStringify,exports.md5=md5,exports.isReadStream=isReadStream,exports.toBase64=toBase64,exports.defer=deferMethod();


}).call(this,require('_process'),require("buffer").Buffer)

},{"_process":164,"buffer":17,"crypto":21,"json-stringify-safe":310,"util":184}],284:[function(require,module,exports){
"use strict";var querystring=require("querystring"),qs=require("qs"),caseless=require("caseless"),uuid=require("node-uuid"),oauth=require("oauth-sign");exports.buildParams=function(e,t,r,a,o,u){var s={};for(var n in e)s["oauth_"+n]=e[n];s.oauth_version||(s.oauth_version="1.0"),s.oauth_timestamp||(s.oauth_timestamp=Math.floor(Date.now()/1e3).toString()),s.oauth_nonce||(s.oauth_nonce=uuid().replace(/-/g,"")),s.oauth_signature_method||(s.oauth_signature_method="HMAC-SHA1");var h=s.oauth_consumer_secret||s.oauth_private_key;delete s.oauth_consumer_secret,delete s.oauth_private_key;var i=s.oauth_token_secret;delete s.oauth_token_secret;var c=s.oauth_realm;delete s.oauth_realm,delete s.oauth_transport_method;var _=t.protocol+"//"+t.host+t.pathname,d=u.parse([].concat(a,o,u.stringify(s)).join("&"));return s.oauth_signature=oauth.sign(s.oauth_signature_method,r,_,d,h,i),c&&(s.realm=c),s},exports.concatParams=function(e,t,r){r=r||"";var a=Object.keys(e).filter(function(e){return"realm"!==e&&"oauth_signature"!==e}).sort();return e.realm&&a.splice(0,1,"realm"),a.push("oauth_signature"),a.map(function(t){return t+"="+r+oauth.rfc3986(e[t])+r}).join(t)},exports.oauth=function(e){var t,r,a=e.uri||{},o=e.method||"",u=caseless(e.headers),s=e.body||"",n=e.oauth||{},h=e.qsLib||qs,i=u.get("content-type")||"",c="application/x-www-form-urlencoded",_=n.transport_method||"header";if(i.slice(0,c.length)===c&&(i=c,t=s),a.query&&(r=a.query),"body"===_&&("POST"!==o||i!==c))throw new Error("oauth: transport_method of 'body' requires 'POST' and content-type '"+c+"'");var d,m=this.buildParams(n,a,o,r,t,h);switch(_){case"header":d="OAuth "+this.concatParams(m,",",'"');break;case"query":d=(r?"&":"?")+this.concatParams(m,"&");break;case"body":d=(t?t+"&":"")+this.concatParams(m,"&");break;default:throw new Error("oauth: transport_method invalid")}return{oauth:d,transport:_}};


},{"caseless":287,"node-uuid":314,"oauth-sign":315,"qs":316,"querystring":168}],285:[function(require,module,exports){
function authorization(e){return"AWS "+e.key+":"+sign(e)}function hmacSha1(e){return crypto.createHmac("sha1",e.secret).update(e.message).digest("base64")}function sign(e){return e.message=stringToSign(e),hmacSha1(e)}function signQuery(e){return e.message=queryStringToSign(e),hmacSha1(e)}function stringToSign(e){var n=e.amazonHeaders||"";n&&(n+="\n");var r=[e.verb,e.md5,e.contentType,e.date?e.date.toUTCString():"",n+e.resource];return r.join("\n")}function queryStringToSign(e){return"GET\n\n\n"+e.date+"\n"+e.resource}function canonicalizeHeaders(e){for(var n=[],r=Object.keys(e),o=0,t=r.length;t>o;++o){var i=r[o],a=e[i],i=i.toLowerCase();0===i.indexOf("x-amz")&&n.push(i+":"+a)}return n.sort().join("\n")}function canonicalizeResource(e){var n=parse(e,!0),r=n.pathname,o=[];return Object.keys(n.query).forEach(function(e){if(~keys.indexOf(e)){var r=""==n.query[e]?"":"="+encodeURIComponent(n.query[e]);o.push(e+r)}}),r+(o.length?"?"+o.sort().join("&"):"")}var crypto=require("crypto"),parse=require("url").parse,keys=["acl","location","logging","notification","partNumber","policy","requestPayment","torrent","uploadId","uploads","versionId","versioning","versions","website"];module.exports=authorization,module.exports.authorization=authorization,module.exports.hmacSha1=hmacSha1,module.exports.sign=sign,module.exports.signQuery=signQuery,module.exports.queryStringToSign=stringToSign,module.exports.queryStringToSign=queryStringToSign,module.exports.canonicalizeHeaders=canonicalizeHeaders,module.exports.canonicalizeResource=canonicalizeResource;


},{"crypto":21,"url":182}],286:[function(require,module,exports){
(function (Buffer){
function BufferList(t){if(!(this instanceof BufferList))return new BufferList(t);if(this._bufs=[],this.length=0,"function"==typeof t){this._callback=t;var e=function(t){this._callback&&(this._callback(t),this._callback=null)}.bind(this);this.on("pipe",function(t){t.on("error",e)}),this.on("unpipe",function(t){t.removeListener("error",e)})}else Buffer.isBuffer(t)?this.append(t):Array.isArray(t)&&t.forEach(function(t){Buffer.isBuffer(t)&&this.append(t)}.bind(this));DuplexStream.call(this)}var DuplexStream=require("readable-stream/duplex"),util=require("util");util.inherits(BufferList,DuplexStream),BufferList.prototype._offset=function(t){for(var e,i=0,s=0;s<this._bufs.length;s++){if(e=i+this._bufs[s].length,e>t)return[s,t-i];i=e}},BufferList.prototype.append=function(t){var e=Buffer.isBuffer(t)||t instanceof BufferList;return this._bufs.push(e?t:new Buffer(t)),this.length+=t.length,this},BufferList.prototype._write=function(t,e,i){this.append(t),i&&i()},BufferList.prototype._read=function(t){return this.length?(t=Math.min(t,this.length),this.push(this.slice(0,t)),void this.consume(t)):this.push(null)},BufferList.prototype.end=function(t){DuplexStream.prototype.end.call(this,t),this._callback&&(this._callback(null,this.slice()),this._callback=null)},BufferList.prototype.get=function(t){return this.slice(t,t+1)[0]},BufferList.prototype.slice=function(t,e){return this.copy(null,0,t,e)},BufferList.prototype.copy=function(t,e,i,s){if(("number"!=typeof i||0>i)&&(i=0),("number"!=typeof s||s>this.length)&&(s=this.length),i>=this.length)return t||new Buffer(0);if(0>=s)return t||new Buffer(0);var r,f,n=!!t,u=this._offset(i),h=s-i,o=h,l=n&&e||0,a=u[1];if(0===i&&s==this.length){if(!n)return Buffer.concat(this._bufs);for(f=0;f<this._bufs.length;f++)this._bufs[f].copy(t,l),l+=this._bufs[f].length;return t}if(o<=this._bufs[u[0]].length-a)return n?this._bufs[u[0]].copy(t,e,a,a+o):this._bufs[u[0]].slice(a,a+o);for(n||(t=new Buffer(h)),f=u[0];f<this._bufs.length;f++){if(r=this._bufs[f].length-a,!(o>r)){this._bufs[f].copy(t,l,a,a+o);break}this._bufs[f].copy(t,l,a),l+=r,o-=r,a&&(a=0)}return t},BufferList.prototype.toString=function(t,e,i){return this.slice(e,i).toString(t)},BufferList.prototype.consume=function(t){for(;this._bufs.length;){if(!(t>this._bufs[0].length)){this._bufs[0]=this._bufs[0].slice(t),this.length-=t;break}t-=this._bufs[0].length,this.length-=this._bufs[0].length,this._bufs.shift()}return this},BufferList.prototype.duplicate=function(){for(var t=0,e=new BufferList;t<this._bufs.length;t++)e.append(this._bufs[t]);return e},BufferList.prototype.destroy=function(){this._bufs.length=0,this.length=0,this.push(null)},function(){var t={readDoubleBE:8,readDoubleLE:8,readFloatBE:4,readFloatLE:4,readInt32BE:4,readInt32LE:4,readUInt32BE:4,readUInt32LE:4,readInt16BE:2,readInt16LE:2,readUInt16BE:2,readUInt16LE:2,readInt8:1,readUInt8:1};for(var e in t)!function(e){BufferList.prototype[e]=function(i){return this.slice(i,i+t[e])[e](0)}}(e)}(),module.exports=BufferList;


}).call(this,require("buffer").Buffer)

},{"buffer":17,"readable-stream/duplex":266,"util":184}],287:[function(require,module,exports){
function Caseless(e){this.dict=e||{}}Caseless.prototype.set=function(e,t,s){if("object"!=typeof e){"undefined"==typeof s&&(s=!0);var r=this.has(e);return!s&&r?this.dict[r]=this.dict[r]+","+t:this.dict[r||e]=t,r}for(var n in e)this.set(n,e[n],t)},Caseless.prototype.has=function(e){for(var t=Object.keys(this.dict),e=e.toLowerCase(),s=0;s<t.length;s++)if(t[s].toLowerCase()===e)return t[s];return!1},Caseless.prototype.get=function(e){e=e.toLowerCase();var t,s,r=this.dict;return Object.keys(r).forEach(function(n){s=n.toLowerCase(),e===s&&(t=r[n])}),t},Caseless.prototype.swap=function(e){var t=this.has(e);if(!t)throw new Error('There is no header than matches "'+e+'"');this.dict[e]=this.dict[t],delete this.dict[t]},Caseless.prototype.del=function(e){var t=this.has(e);return delete this.dict[t||e]},module.exports=function(e){return new Caseless(e)},module.exports.httpify=function(e,t){var s=new Caseless(t);return e.setHeader=function(e,t,r){return s.set(e,t,r)},e.hasHeader=function(e){return s.has(e)},e.getHeader=function(e){return s.get(e)},e.removeHeader=function(e){return s.del(e)},e.headers=s.dict,s};


},{}],288:[function(require,module,exports){
(function (Buffer){
function CombinedStream(){this.writable=!1,this.readable=!0,this.dataSize=0,this.maxDataSize=2097152,this.pauseStreams=!0,this._released=!1,this._streams=[],this._currentStream=null}var util=require("util"),Stream=require("stream").Stream,DelayedStream=require("delayed-stream");module.exports=CombinedStream,util.inherits(CombinedStream,Stream),CombinedStream.create=function(t){var e=new this;t=t||{};for(var i in t)e[i]=t[i];return e},CombinedStream.isStreamLike=function(t){return"function"!=typeof t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t&&!Buffer.isBuffer(t)},CombinedStream.prototype.append=function(t){var e=CombinedStream.isStreamLike(t);if(e){if(!(t instanceof DelayedStream)){var i=DelayedStream.create(t,{maxDataSize:1/0,pauseStream:this.pauseStreams});t.on("data",this._checkDataSize.bind(this)),t=i}this._handleErrors(t),this.pauseStreams&&t.pause()}return this._streams.push(t),this},CombinedStream.prototype.pipe=function(t,e){return Stream.prototype.pipe.call(this,t,e),this.resume(),t},CombinedStream.prototype._getNext=function(){this._currentStream=null;var t=this._streams.shift();if("undefined"==typeof t)return void this.end();if("function"!=typeof t)return void this._pipeNext(t);var e=t;e(function(t){var e=CombinedStream.isStreamLike(t);e&&(t.on("data",this._checkDataSize.bind(this)),this._handleErrors(t)),this._pipeNext(t)}.bind(this))},CombinedStream.prototype._pipeNext=function(t){this._currentStream=t;var e=CombinedStream.isStreamLike(t);if(e)return t.on("end",this._getNext.bind(this)),void t.pipe(this,{end:!1});var i=t;this.write(i),this._getNext()},CombinedStream.prototype._handleErrors=function(t){var e=this;t.on("error",function(t){e._emitError(t)})},CombinedStream.prototype.write=function(t){this.emit("data",t)},CombinedStream.prototype.pause=function(){this.pauseStreams&&(this.pauseStreams&&this._currentStream&&"function"==typeof this._currentStream.pause&&this._currentStream.pause(),this.emit("pause"))},CombinedStream.prototype.resume=function(){this._released||(this._released=!0,this.writable=!0,this._getNext()),this.pauseStreams&&this._currentStream&&"function"==typeof this._currentStream.resume&&this._currentStream.resume(),this.emit("resume")},CombinedStream.prototype.end=function(){this._reset(),this.emit("end")},CombinedStream.prototype.destroy=function(){this._reset(),this.emit("close")},CombinedStream.prototype._reset=function(){this.writable=!1,this._streams=[],this._currentStream=null},CombinedStream.prototype._checkDataSize=function(){if(this._updateDataSize(),!(this.dataSize<=this.maxDataSize)){var t="DelayedStream#maxDataSize of "+this.maxDataSize+" bytes exceeded.";this._emitError(new Error(t))}},CombinedStream.prototype._updateDataSize=function(){this.dataSize=0;var t=this;this._streams.forEach(function(e){e.dataSize&&(t.dataSize+=e.dataSize)}),this._currentStream&&this._currentStream.dataSize&&(this.dataSize+=this._currentStream.dataSize)},CombinedStream.prototype._emitError=function(t){this._reset(),this.emit("error",t)};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"delayed-stream":289,"stream":180,"util":184}],289:[function(require,module,exports){
function DelayedStream(){this.source=null,this.dataSize=0,this.maxDataSize=1048576,this.pauseStream=!0,this._maxDataSizeExceeded=!1,this._released=!1,this._bufferedEvents=[]}var Stream=require("stream").Stream,util=require("util");module.exports=DelayedStream,util.inherits(DelayedStream,Stream),DelayedStream.create=function(e,t){var a=new this;t=t||{};for(var r in t)a[r]=t[r];a.source=e;var i=e.emit;return e.emit=function(){return a._handleEmit(arguments),i.apply(e,arguments)},e.on("error",function(){}),a.pauseStream&&e.pause(),a},DelayedStream.prototype.__defineGetter__("readable",function(){return this.source.readable}),DelayedStream.prototype.resume=function(){this._released||this.release(),this.source.resume()},DelayedStream.prototype.pause=function(){this.source.pause()},DelayedStream.prototype.release=function(){this._released=!0,this._bufferedEvents.forEach(function(e){this.emit.apply(this,e)}.bind(this)),this._bufferedEvents=[]},DelayedStream.prototype.pipe=function(){var e=Stream.prototype.pipe.apply(this,arguments);return this.resume(),e},DelayedStream.prototype._handleEmit=function(e){return this._released?void this.emit.apply(this,e):("data"===e[0]&&(this.dataSize+=e[1].length,this._checkIfMaxDataSizeExceeded()),void this._bufferedEvents.push(e))},DelayedStream.prototype._checkIfMaxDataSizeExceeded=function(){if(!(this._maxDataSizeExceeded||this.dataSize<=this.maxDataSize)){this._maxDataSizeExceeded=!0;var e="DelayedStream#maxDataSize of "+this.maxDataSize+" bytes exceeded.";this.emit("error",new Error(e))}};


},{"stream":180,"util":184}],290:[function(require,module,exports){
function ForeverAgent(e){var t=this;t.options=e||{},t.requests={},t.sockets={},t.freeSockets={},t.maxSockets=t.options.maxSockets||Agent.defaultMaxSockets,t.minSockets=t.options.minSockets||ForeverAgent.defaultMinSockets,t.on("free",function(e,o,r){var s=o+":"+r;if(t.requests[s]&&t.requests[s].length)t.requests[s].shift().onSocket(e);else if(t.sockets[s].length<t.minSockets){t.freeSockets[s]||(t.freeSockets[s]=[]),t.freeSockets[s].push(e);var n=function(){e.destroy()};e._onIdleError=n,e.on("error",n)}else e.destroy()})}function ForeverAgentSSL(e){ForeverAgent.call(this,e)}function createConnectionSSL(e,t,o){return o="object"==typeof e?e:"object"==typeof t?t:"object"==typeof o?o:{},"number"==typeof e&&(o.port=e),"string"==typeof t&&(o.host=t),tls.connect(o)}module.exports=ForeverAgent,ForeverAgent.SSL=ForeverAgentSSL;var util=require("util"),Agent=require("http").Agent,net=require("net"),tls=require("tls"),AgentSSL=require("https").Agent;util.inherits(ForeverAgent,Agent),ForeverAgent.defaultMinSockets=5,ForeverAgent.prototype.createConnection=net.createConnection,ForeverAgent.prototype.addRequestNoreuse=Agent.prototype.addRequest,ForeverAgent.prototype.addRequest=function(e,t,o){var r=t+":"+o;if(this.freeSockets[r]&&this.freeSockets[r].length>0&&!e.useChunkedEncodingByDefault){var s=this.freeSockets[r].pop();s.removeListener("error",s._onIdleError),delete s._onIdleError,e._reusedSocket=!0,e.onSocket(s)}else this.addRequestNoreuse(e,t,o)},ForeverAgent.prototype.removeSocket=function(e,t,o,r){if(this.sockets[t]){var s=this.sockets[t].indexOf(e);-1!==s&&this.sockets[t].splice(s,1)}else this.sockets[t]&&0===this.sockets[t].length&&(delete this.sockets[t],delete this.requests[t]);if(this.freeSockets[t]){var s=this.freeSockets[t].indexOf(e);-1!==s&&(this.freeSockets[t].splice(s,1),0===this.freeSockets[t].length&&delete this.freeSockets[t])}this.requests[t]&&this.requests[t].length&&this.createSocket(t,o,r).emit("free")},util.inherits(ForeverAgentSSL,ForeverAgent),ForeverAgentSSL.prototype.createConnection=createConnectionSSL,ForeverAgentSSL.prototype.addRequestNoreuse=AgentSSL.prototype.addRequest;


},{"http":157,"https":161,"net":1,"tls":1,"util":184}],291:[function(require,module,exports){
(function (process,Buffer){
function FormData(){this._overheadLength=0,this._valueLength=0,this._lengthRetrievers=[],CombinedStream.call(this)}function populate(t,e){for(var r in e)t[r]||(t[r]=e[r]);return t}var CombinedStream=require("combined-stream"),util=require("util"),path=require("path"),http=require("http"),https=require("https"),parseUrl=require("url").parse,fs=require("fs"),mime=require("mime-types"),async=require("async");module.exports=FormData,util.inherits(FormData,CombinedStream),FormData.LINE_BREAK="\r\n",FormData.prototype.append=function(t,e,r){r=r||{};var n=CombinedStream.prototype.append.bind(this);if("number"==typeof e&&(e=""+e),util.isArray(e))return void this._error(new Error("Arrays are not supported."));var a=this._multiPartHeader(t,e,r),o=this._multiPartFooter(t,e,r);n(a),n(e),n(o),this._trackLength(a,e,r)},FormData.prototype._trackLength=function(t,e,r){var n=0;null!=r.knownLength?n+=+r.knownLength:Buffer.isBuffer(e)?n=e.length:"string"==typeof e&&(n=Buffer.byteLength(e)),this._valueLength+=n,this._overheadLength+=Buffer.byteLength(t)+ +FormData.LINE_BREAK.length,e&&(e.path||e.readable&&e.hasOwnProperty("httpVersion"))&&(r.knownLength||this._lengthRetrievers.push(function(t){e.hasOwnProperty("fd")?void 0!=e.end&&e.end!=1/0&&void 0!=e.start?t(null,e.end+1-(e.start?e.start:0)):fs.stat(e.path,function(r,n){var a;return r?void t(r):(a=n.size-(e.start?e.start:0),void t(null,a))}):e.hasOwnProperty("httpVersion")?t(null,+e.headers["content-length"]):e.hasOwnProperty("httpModule")?(e.on("response",function(r){e.pause(),t(null,+r.headers["content-length"])}),e.resume()):t("Unknown stream")}))},FormData.prototype._multiPartHeader=function(t,e,r){var n=this.getBoundary(),a="";return null!=r.header?a=r.header:(a+="--"+n+FormData.LINE_BREAK+'Content-Disposition: form-data; name="'+t+'"',r.filename||e.path?a+='; filename="'+path.basename(r.filename||e.path)+'"'+FormData.LINE_BREAK+"Content-Type: "+(r.contentType||mime.lookup(r.filename||e.path)):e.readable&&e.hasOwnProperty("httpVersion")&&(a+='; filename="'+path.basename(e.client._httpMessage.path)+'"'+FormData.LINE_BREAK+"Content-Type: "+e.headers["content-type"]),a+=FormData.LINE_BREAK+FormData.LINE_BREAK),a},FormData.prototype._multiPartFooter=function(){return function(t){var e=FormData.LINE_BREAK,r=0===this._streams.length;r&&(e+=this._lastBoundary()),t(e)}.bind(this)},FormData.prototype._lastBoundary=function(){return"--"+this.getBoundary()+"--"},FormData.prototype.getHeaders=function(t){var e={"content-type":"multipart/form-data; boundary="+this.getBoundary()};for(var r in t)e[r.toLowerCase()]=t[r];return e},FormData.prototype.getCustomHeaders=function(t){t=t?t:"multipart/form-data";var e={"content-type":t+"; boundary="+this.getBoundary(),"content-length":this.getLengthSync()};return e},FormData.prototype.getBoundary=function(){return this._boundary||this._generateBoundary(),this._boundary},FormData.prototype._generateBoundary=function(){for(var t="--------------------------",e=0;24>e;e++)t+=Math.floor(10*Math.random()).toString(16);this._boundary=t},FormData.prototype.getLengthSync=function(){var t=this._overheadLength+this._valueLength;return this._streams.length&&(t+=this._lastBoundary().length),this._lengthRetrievers.length&&this._error(new Error("Cannot calculate proper length in synchronous way.")),t},FormData.prototype.getLength=function(t){var e=this._overheadLength+this._valueLength;return this._streams.length&&(e+=this._lastBoundary().length),this._lengthRetrievers.length?void async.parallel(this._lengthRetrievers,function(r,n){return r?void t(r):(n.forEach(function(t){e+=t}),void t(null,e))}):void process.nextTick(t.bind(this,null,e))},FormData.prototype.submit=function(t,e){var r,n,a={method:"post"};return"string"==typeof t?(t=parseUrl(t),n=populate({port:t.port,path:t.pathname,host:t.hostname},a)):(n=populate(t,a),n.port||(n.port="https:"==n.protocol?443:80)),n.headers=this.getHeaders(t.headers),r="https:"==t.protocol?https.request(n):http.request(n),this.getLength(function(t,n){r.setHeader("Content-Length",n),this.pipe(r),e&&(r.on("error",e),r.on("response",e.bind(this,null)))}.bind(this)),r},FormData.prototype._error=function(t){this.error||(this.error=t,this.pause(),this.emit("error",t))};


}).call(this,require('_process'),require("buffer").Buffer)

},{"_process":164,"async":292,"buffer":17,"combined-stream":288,"fs":undefined,"http":157,"https":161,"mime-types":311,"path":undefined,"url":182,"util":184}],292:[function(require,module,exports){
(function (process){
!function(){function n(n){var e=!1;return function(){if(e)throw new Error("Callback was already called.");e=!0,n.apply(t,arguments)}}var t,e,r={};t=this,null!=t&&(e=t.async),r.noConflict=function(){return t.async=e,r};var u=Object.prototype.toString,i=Array.isArray||function(n){return"[object Array]"===u.call(n)},c=function(n,t){if(n.forEach)return n.forEach(t);for(var e=0;e<n.length;e+=1)t(n[e],e,n)},a=function(n,t){if(n.map)return n.map(t);var e=[];return c(n,function(n,r,u){e.push(t(n,r,u))}),e},o=function(n,t,e){return n.reduce?n.reduce(t,e):(c(n,function(n,r,u){e=t(e,n,r,u)}),e)},l=function(n){if(Object.keys)return Object.keys(n);var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t};"undefined"!=typeof process&&process.nextTick?(r.nextTick=process.nextTick,r.setImmediate="undefined"!=typeof setImmediate?function(n){setImmediate(n)}:r.nextTick):"function"==typeof setImmediate?(r.nextTick=function(n){setImmediate(n)},r.setImmediate=r.nextTick):(r.nextTick=function(n){setTimeout(n,0)},r.setImmediate=r.nextTick),r.each=function(t,e,r){function u(n){n?(r(n),r=function(){}):(i+=1,i>=t.length&&r())}if(r=r||function(){},!t.length)return r();var i=0;c(t,function(t){e(t,n(u))})},r.forEach=r.each,r.eachSeries=function(n,t,e){if(e=e||function(){},!n.length)return e();var r=0,u=function(){t(n[r],function(t){t?(e(t),e=function(){}):(r+=1,r>=n.length?e():u())})};u()},r.forEachSeries=r.eachSeries,r.eachLimit=function(n,t,e,r){var u=f(t);u.apply(null,[n,e,r])},r.forEachLimit=r.eachLimit;var f=function(n){return function(t,e,r){if(r=r||function(){},!t.length||0>=n)return r();var u=0,i=0,c=0;!function a(){if(u>=t.length)return r();for(;n>c&&i<t.length;)i+=1,c+=1,e(t[i-1],function(n){n?(r(n),r=function(){}):(u+=1,c-=1,u>=t.length?r():a())})}()}},s=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[r.each].concat(t))}},p=function(n,t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[f(n)].concat(e))}},d=function(n){return function(){var t=Array.prototype.slice.call(arguments);return n.apply(null,[r.eachSeries].concat(t))}},y=function(n,t,e,r){if(t=a(t,function(n,t){return{index:t,value:n}}),r){var u=[];n(t,function(n,t){e(n.value,function(e,r){u[n.index]=r,t(e)})},function(n){r(n,u)})}else n(t,function(n,t){e(n.value,function(n){t(n)})})};r.map=s(y),r.mapSeries=d(y),r.mapLimit=function(n,t,e,r){return m(t)(n,e,r)};var m=function(n){return p(n,y)};r.reduce=function(n,t,e,u){r.eachSeries(n,function(n,r){e(t,n,function(n,e){t=e,r(n)})},function(n){u(n,t)})},r.inject=r.reduce,r.foldl=r.reduce,r.reduceRight=function(n,t,e,u){var i=a(n,function(n){return n}).reverse();r.reduce(i,t,e,u)},r.foldr=r.reduceRight;var v=function(n,t,e,r){var u=[];t=a(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e&&u.push(n),t()})},function(){r(a(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};r.filter=s(v),r.filterSeries=d(v),r.select=r.filter,r.selectSeries=r.filterSeries;var h=function(n,t,e,r){var u=[];t=a(t,function(n,t){return{index:t,value:n}}),n(t,function(n,t){e(n.value,function(e){e||u.push(n),t()})},function(){r(a(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})};r.reject=s(h),r.rejectSeries=d(h);var g=function(n,t,e,r){n(t,function(n,t){e(n,function(e){e?(r(n),r=function(){}):t()})},function(){r()})};r.detect=s(g),r.detectSeries=d(g),r.some=function(n,t,e){r.each(n,function(n,r){t(n,function(n){n&&(e(!0),e=function(){}),r()})},function(){e(!1)})},r.any=r.some,r.every=function(n,t,e){r.each(n,function(n,r){t(n,function(n){n||(e(!1),e=function(){}),r()})},function(){e(!0)})},r.all=r.every,r.sortBy=function(n,t,e){r.map(n,function(n,e){t(n,function(t,r){t?e(t):e(null,{value:n,criteria:r})})},function(n,t){if(n)return e(n);var r=function(n,t){var e=n.criteria,r=t.criteria;return r>e?-1:e>r?1:0};e(null,a(t.sort(r),function(n){return n.value}))})},r.auto=function(n,t){t=t||function(){};var e=l(n),u=e.length;if(!u)return t();var a={},f=[],s=function(n){f.unshift(n)},p=function(n){for(var t=0;t<f.length;t+=1)if(f[t]===n)return void f.splice(t,1)},d=function(){u--,c(f.slice(0),function(n){n()})};s(function(){if(!u){var n=t;t=function(){},n(null,a)}}),c(e,function(e){var u=i(n[e])?n[e]:[n[e]],f=function(n){var u=Array.prototype.slice.call(arguments,1);if(u.length<=1&&(u=u[0]),n){var i={};c(l(a),function(n){i[n]=a[n]}),i[e]=u,t(n,i),t=function(){}}else a[e]=u,r.setImmediate(d)},y=u.slice(0,Math.abs(u.length-1))||[],m=function(){return o(y,function(n,t){return n&&a.hasOwnProperty(t)},!0)&&!a.hasOwnProperty(e)};if(m())u[u.length-1](f,a);else{var v=function(){m()&&(p(v),u[u.length-1](f,a))};s(v)}})},r.retry=function(n,t,e){var u=5,i=[];"function"==typeof n&&(e=t,t=n,n=u),n=parseInt(n,10)||u;var c=function(u,c){for(var a=function(n,t){return function(e){n(function(n,r){e(!n||t,{err:n,result:r})},c)}};n;)i.push(a(t,!(n-=1)));r.series(i,function(n,t){t=t[t.length-1],(u||e)(t.err,t.result)})};return e?c():c},r.waterfall=function(n,t){if(t=t||function(){},!i(n)){var e=new Error("First argument to waterfall must be an array of functions");return t(e)}if(!n.length)return t();var u=function(n){return function(e){if(e)t.apply(null,arguments),t=function(){};else{var i=Array.prototype.slice.call(arguments,1),c=n.next();i.push(c?u(c):t),r.setImmediate(function(){n.apply(null,i)})}}};u(r.iterator(n))()};var k=function(n,t,e){if(e=e||function(){},i(t))n.map(t,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e)})},e);else{var r={};n.each(l(t),function(n,e){t[n](function(t){var u=Array.prototype.slice.call(arguments,1);u.length<=1&&(u=u[0]),r[n]=u,e(t)})},function(n){e(n,r)})}};r.parallel=function(n,t){k({map:r.map,each:r.each},n,t)},r.parallelLimit=function(n,t,e){k({map:m(t),each:f(t)},n,e)},r.series=function(n,t){if(t=t||function(){},i(n))r.mapSeries(n,function(n,t){n&&n(function(n){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),t.call(null,n,e)})},t);else{var e={};r.eachSeries(l(n),function(t,r){n[t](function(n){var u=Array.prototype.slice.call(arguments,1);u.length<=1&&(u=u[0]),e[t]=u,r(n)})},function(n){t(n,e)})}},r.iterator=function(n){var t=function(e){var r=function(){return n.length&&n[e].apply(null,arguments),r.next()};return r.next=function(){return e<n.length-1?t(e+1):null},r};return t(0)},r.apply=function(n){var t=Array.prototype.slice.call(arguments,1);return function(){return n.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var A=function(n,t,e,r){var u=[];n(t,function(n,t){e(n,function(n,e){u=u.concat(e||[]),t(n)})},function(n){r(n,u)})};r.concat=s(A),r.concatSeries=d(A),r.whilst=function(n,t,e){n()?t(function(u){return u?e(u):void r.whilst(n,t,e)}):e()},r.doWhilst=function(n,t,e){n(function(u){if(u)return e(u);var i=Array.prototype.slice.call(arguments,1);t.apply(null,i)?r.doWhilst(n,t,e):e()})},r.until=function(n,t,e){n()?e():t(function(u){return u?e(u):void r.until(n,t,e)})},r.doUntil=function(n,t,e){n(function(u){if(u)return e(u);var i=Array.prototype.slice.call(arguments,1);t.apply(null,i)?e():r.doUntil(n,t,e)})},r.queue=function(t,e){function u(n,t,e,u){return n.started||(n.started=!0),i(t)||(t=[t]),0==t.length?r.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var i={data:t,callback:"function"==typeof u?u:null};e?n.tasks.unshift(i):n.tasks.push(i),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),r.setImmediate(n.process)})}void 0===e&&(e=1);var a=0,o={tasks:[],concurrency:e,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(n,t){u(o,n,!1,t)},kill:function(){o.drain=null,o.tasks=[]},unshift:function(n,t){u(o,n,!0,t)},process:function(){if(!o.paused&&a<o.concurrency&&o.tasks.length){var e=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),a+=1;var r=function(){a-=1,e.callback&&e.callback.apply(e,arguments),o.drain&&o.tasks.length+a===0&&o.drain(),o.process()},u=n(r);t(e.data,u)}},length:function(){return o.tasks.length},running:function(){return a},idle:function(){return o.tasks.length+a===0},pause:function(){o.paused!==!0&&(o.paused=!0,o.process())},resume:function(){o.paused!==!1&&(o.paused=!1,o.process())}};return o},r.priorityQueue=function(n,t){function e(n,t){return n.priority-t.priority}function u(n,t,e){for(var r=-1,u=n.length-1;u>r;){var i=r+(u-r+1>>>1);e(t,n[i])>=0?r=i:u=i-1}return r}function a(n,t,a,o){return n.started||(n.started=!0),i(t)||(t=[t]),0==t.length?r.setImmediate(function(){n.drain&&n.drain()}):void c(t,function(t){var i={data:t,priority:a,callback:"function"==typeof o?o:null};n.tasks.splice(u(n.tasks,i,e)+1,0,i),n.saturated&&n.tasks.length===n.concurrency&&n.saturated(),r.setImmediate(n.process)})}var o=r.queue(n,t);return o.push=function(n,t,e){a(o,n,t,e)},delete o.unshift,o},r.cargo=function(n,t){var e=!1,u=[],o={tasks:u,payload:t,saturated:null,empty:null,drain:null,drained:!0,push:function(n,e){i(n)||(n=[n]),c(n,function(n){u.push({data:n,callback:"function"==typeof e?e:null}),o.drained=!1,o.saturated&&u.length===t&&o.saturated()}),r.setImmediate(o.process)},process:function l(){if(!e){if(0===u.length)return o.drain&&!o.drained&&o.drain(),void(o.drained=!0);var r="number"==typeof t?u.splice(0,t):u.splice(0,u.length),i=a(r,function(n){return n.data});o.empty&&o.empty(),e=!0,n(i,function(){e=!1;var n=arguments;c(r,function(t){t.callback&&t.callback.apply(null,n)}),l()})}},length:function(){return u.length},running:function(){return e}};return o};var x=function(n){return function(t){var e=Array.prototype.slice.call(arguments,1);t.apply(null,e.concat([function(t){var e=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(t?console.error&&console.error(t):console[n]&&c(e,function(t){console[n](t)}))}]))}};r.log=x("log"),r.dir=x("dir"),r.memoize=function(n,t){var e={},u={};t=t||function(n){return n};var i=function(){var i=Array.prototype.slice.call(arguments),c=i.pop(),a=t.apply(null,i);a in e?r.nextTick(function(){c.apply(null,e[a])}):a in u?u[a].push(c):(u[a]=[c],n.apply(null,i.concat([function(){e[a]=arguments;var n=u[a];delete u[a];for(var t=0,r=n.length;r>t;t++)n[t].apply(null,arguments)}])))};return i.memo=e,i.unmemoized=n,i},r.unmemoize=function(n){return function(){return(n.unmemoized||n).apply(null,arguments)}},r.times=function(n,t,e){for(var u=[],i=0;n>i;i++)u.push(i);return r.map(u,t,e)},r.timesSeries=function(n,t,e){for(var u=[],i=0;n>i;i++)u.push(i);return r.mapSeries(u,t,e)},r.seq=function(){var n=arguments;return function(){var t=this,e=Array.prototype.slice.call(arguments),u=e.pop();r.reduce(n,e,function(n,e,r){e.apply(t,n.concat([function(){var n=arguments[0],t=Array.prototype.slice.call(arguments,1);r(n,t)}]))},function(n,e){u.apply(t,[n].concat(e))})}},r.compose=function(){return r.seq.apply(null,Array.prototype.reverse.call(arguments))};var S=function(n,t){var e=function(){var e=this,r=Array.prototype.slice.call(arguments),u=r.pop();return n(t,function(n,t){n.apply(e,r.concat([t]))},u)};if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return e.apply(this,r)}return e};r.applyEach=s(S),r.applyEachSeries=d(S),r.forever=function(n,t){function e(r){if(r){if(t)return t(r);throw r}n(e)}e()},"undefined"!=typeof module&&module.exports?module.exports=r:"undefined"!=typeof define&&define.amd?define([],function(){return r}):t.async=r}();


}).call(this,require('_process'))

},{"_process":164}],293:[function(require,module,exports){
var hawk={internals:{}};hawk.client={header:function(t,e,r){var n={field:"",artifacts:{}};if(!t||"string"!=typeof t&&"object"!=typeof t||!e||"string"!=typeof e||!r||"object"!=typeof r)return n.err="Invalid argument type",n;var a=r.timestamp||hawk.utils.now(r.localtimeOffsetMsec),i=r.credentials;if(!(i&&i.id&&i.key&&i.algorithm))return n.err="Invalid credentials object",n;if(-1===hawk.crypto.algorithms.indexOf(i.algorithm))return n.err="Unknown algorithm",n;"string"==typeof t&&(t=hawk.utils.parseUri(t));var o={ts:a,nonce:r.nonce||hawk.utils.randomString(6),method:e,resource:t.relative,host:t.hostname,port:t.port,hash:r.hash,ext:r.ext,app:r.app,dlg:r.dlg};n.artifacts=o,o.hash||!r.payload&&""!==r.payload||(o.hash=hawk.crypto.calculatePayloadHash(r.payload,i.algorithm,r.contentType));var s=hawk.crypto.calculateMac("header",i,o),h=null!==o.ext&&void 0!==o.ext&&""!==o.ext,c='Hawk id="'+i.id+'", ts="'+o.ts+'", nonce="'+o.nonce+(o.hash?'", hash="'+o.hash:"")+(h?'", ext="'+hawk.utils.escapeHeaderAttribute(o.ext):"")+'", mac="'+s+'"';return o.app&&(c+=', app="'+o.app+(o.dlg?'", dlg="'+o.dlg:"")+'"'),n.field=c,n},bewit:function(t,e){if(!t||"string"!=typeof t||!e||"object"!=typeof e||!e.ttlSec)return"";e.ext=null===e.ext||void 0===e.ext?"":e.ext;var r=hawk.utils.now(e.localtimeOffsetMsec),n=e.credentials;if(!(n&&n.id&&n.key&&n.algorithm))return"";if(-1===hawk.crypto.algorithms.indexOf(n.algorithm))return"";t=hawk.utils.parseUri(t);var a=r+e.ttlSec,i=hawk.crypto.calculateMac("bewit",n,{ts:a,nonce:"",method:"GET",resource:t.relative,host:t.hostname,port:t.port,ext:e.ext}),o=n.id+"\\"+a+"\\"+i+"\\"+e.ext;return hawk.utils.base64urlEncode(o)},authenticate:function(t,e,r,n){n=n||{};var a=function(e){return t.getResponseHeader?t.getResponseHeader(e):t.getHeader(e)},i=a("www-authenticate");if(i){var o=hawk.utils.parseAuthorizationHeader(i,["ts","tsm","error"]);if(!o)return!1;if(o.ts){var s=hawk.crypto.calculateTsMac(o.ts,e);if(s!==o.tsm)return!1;hawk.utils.setNtpOffset(o.ts-Math.floor((new Date).getTime()/1e3))}}var h=a("server-authorization");if(!h&&!n.required)return!0;var o=hawk.utils.parseAuthorizationHeader(h,["mac","ext","hash"]);if(!o)return!1;var c={ts:r.ts,nonce:r.nonce,method:r.method,resource:r.resource,host:r.host,port:r.port,hash:o.hash,ext:o.ext,app:r.app,dlg:r.dlg},l=hawk.crypto.calculateMac("response",e,c);if(l!==o.mac)return!1;if(!n.payload&&""!==n.payload)return!0;if(!o.hash)return!1;var u=hawk.crypto.calculatePayloadHash(n.payload,e.algorithm,a("content-type"));return u===o.hash},message:function(t,e,r,n){if(!t||"string"!=typeof t||!e||"number"!=typeof e||null===r||void 0===r||"string"!=typeof r||!n||"object"!=typeof n)return null;var a=n.timestamp||hawk.utils.now(n.localtimeOffsetMsec),i=n.credentials;if(!(i&&i.id&&i.key&&i.algorithm))return null;if(-1===hawk.crypto.algorithms.indexOf(i.algorithm))return null;var o={ts:a,nonce:n.nonce||hawk.utils.randomString(6),host:t,port:e,hash:hawk.crypto.calculatePayloadHash(r,i.algorithm)},s={id:i.id,ts:o.ts,nonce:o.nonce,hash:o.hash,mac:hawk.crypto.calculateMac("message",i,o)};return s},authenticateTimestamp:function(t,e,r){var n=hawk.crypto.calculateTsMac(t.ts,e);return n!==t.tsm?!1:(r!==!1&&hawk.utils.setNtpOffset(t.ts-Math.floor((new Date).getTime()/1e3)),!0)}},hawk.crypto={headerVersion:"1",algorithms:["sha1","sha256"],calculateMac:function(t,e,r){var n=hawk.crypto.generateNormalizedString(t,r),a=CryptoJS["Hmac"+e.algorithm.toUpperCase()](n,e.key);return a.toString(CryptoJS.enc.Base64)},generateNormalizedString:function(t,e){var r="hawk."+hawk.crypto.headerVersion+"."+t+"\n"+e.ts+"\n"+e.nonce+"\n"+(e.method||"").toUpperCase()+"\n"+(e.resource||"")+"\n"+e.host.toLowerCase()+"\n"+e.port+"\n"+(e.hash||"")+"\n";return e.ext&&(r+=e.ext.replace("\\","\\\\").replace("\n","\\n")),r+="\n",e.app&&(r+=e.app+"\n"+(e.dlg||"")+"\n"),r},calculatePayloadHash:function(t,e,r){var n=CryptoJS.algo[e.toUpperCase()].create();return n.update("hawk."+hawk.crypto.headerVersion+".payload\n"),n.update(hawk.utils.parseContentType(r)+"\n"),n.update(t),n.update("\n"),n.finalize().toString(CryptoJS.enc.Base64)},calculateTsMac:function(t,e){var r=CryptoJS["Hmac"+e.algorithm.toUpperCase()]("hawk."+hawk.crypto.headerVersion+".ts\n"+t+"\n",e.key);return r.toString(CryptoJS.enc.Base64)}},hawk.internals.LocalStorage=function(){this._cache={},this.length=0,this.getItem=function(t){return this._cache.hasOwnProperty(t)?String(this._cache[t]):null},this.setItem=function(t,e){this._cache[t]=String(e),this.length=Object.keys(this._cache).length},this.removeItem=function(t){delete this._cache[t],this.length=Object.keys(this._cache).length},this.clear=function(){this._cache={},this.length=0},this.key=function(t){return Object.keys(this._cache)[t||0]}},hawk.utils={storage:new hawk.internals.LocalStorage,setStorage:function(t){var e=hawk.utils.storage.getItem("hawk_ntp_offset");hawk.utils.storage=t,e&&hawk.utils.setNtpOffset(e)},setNtpOffset:function(t){try{hawk.utils.storage.setItem("hawk_ntp_offset",t)}catch(e){console.error("[hawk] could not write to storage."),console.error(e)}},getNtpOffset:function(){var t=hawk.utils.storage.getItem("hawk_ntp_offset");return t?parseInt(t,10):0},now:function(t){return Math.floor(((new Date).getTime()+(t||0))/1e3)+hawk.utils.getNtpOffset()},escapeHeaderAttribute:function(t){return t.replace(/\\/g,"\\\\").replace(/\"/g,'\\"')},parseContentType:function(t){return t?t.split(";")[0].replace(/^\s+|\s+$/g,"").toLowerCase():""},parseAuthorizationHeader:function(t,e){if(!t)return null;var r=t.match(/^(\w+)(?:\s+(.*))?$/);if(!r)return null;var n=r[1];if("hawk"!==n.toLowerCase())return null;var a=r[2];if(!a)return null;var i={},o=a.replace(/(\w+)="([^"\\]*)"\s*(?:,\s*|$)/g,function(t,r,n){return-1===e.indexOf(r)||null===n.match(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~]+$/)||i.hasOwnProperty(r)?void 0:(i[r]=n,"")});return""!==o?null:i},randomString:function(t){for(var e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",r=e.length,n=[],a=0;t>a;++a)n[a]=e[Math.floor(Math.random()*r)];return n.join("")},parseUri:function(t){for(var e=["source","protocol","authority","userInfo","user","password","hostname","port","resource","relative","pathname","directory","file","query","fragment"],r=/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?)(?:#(.*))?)/,n=t.match(r),a={},i=0,o=e.length;o>i;++i)a[e[i]]=n[i]||"";return""===a.port&&(a.port="http"===a.protocol.toLowerCase()?"80":"https"===a.protocol.toLowerCase()?"443":""),a},base64urlEncode:function(t){var e=CryptoJS.enc.Utf8.parse(t),r=CryptoJS.enc.Base64.stringify(e);return r.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}};var CryptoJS=CryptoJS||function(t,e){var r={},n=r.lib={},a=function(){},i=n.Base={extend:function(t){a.prototype=this;var e=new a;return t&&e.mixIn(t),e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},o=n.WordArray=i.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length},toString:function(t){return(t||h).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes;if(t=t.sigBytes,this.clamp(),n%4)for(var a=0;t>a;a++)e[n+a>>>2]|=(r[a>>>2]>>>24-8*(a%4)&255)<<24-8*((n+a)%4);else if(65535<r.length)for(a=0;t>a;a+=4)e[n+a>>>2]=r[a>>>2];else e.push.apply(e,r);return this.sigBytes+=t,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-8*(r%4),e.length=t.ceil(r/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r=[],n=0;e>n;n+=4)r.push(4294967296*t.random()|0);return new o.init(r,e)}}),s=r.enc={},h=s.Hex={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],n=0;t>n;n++){var a=e[n>>>2]>>>24-8*(n%4)&255;r.push((a>>>4).toString(16)),r.push((15&a).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,r=[],n=0;e>n;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-4*(n%8);return new o.init(r,e/2)}},c=s.Latin1={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],n=0;t>n;n++)r.push(String.fromCharCode(e[n>>>2]>>>24-8*(n%4)&255));return r.join("")},parse:function(t){for(var e=t.length,r=[],n=0;e>n;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-8*(n%4);return new o.init(r,e)}},l=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},u=n.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,n=r.words,a=r.sigBytes,i=this.blockSize,s=a/(4*i),s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0);if(e=s*i,a=t.min(4*e,a),e){for(var h=0;e>h;h+=i)this._doProcessBlock(n,h);h=n.splice(0,e),r.sigBytes-=a}return new o.init(h,a)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});n.Hasher=u.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new f.HMAC.init(t,r).finalize(e)}}});var f=r.algo={};return r}(Math);!function(){var t=CryptoJS,e=t.lib,r=e.WordArray,n=e.Hasher,a=[],e=t.algo.SHA1=n.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],s=r[3],h=r[4],c=0;80>c;c++){if(16>c)a[c]=0|t[e+c];else{var l=a[c-3]^a[c-8]^a[c-14]^a[c-16];a[c]=l<<1|l>>>31}l=(n<<5|n>>>27)+h+a[c],l=20>c?l+((i&o|~i&s)+1518500249):40>c?l+((i^o^s)+1859775393):60>c?l+((i&o|i&s|o&s)-1894007588):l+((i^o^s)-899497514),h=s,s=o,o=i<<30|i>>>2,i=n,n=l}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+h|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,n=8*t.sigBytes;return e[n>>>5]|=128<<24-n%32,e[(n+64>>>9<<4)+14]=Math.floor(r/4294967296),e[(n+64>>>9<<4)+15]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=n.clone.call(this);return t._hash=this._hash.clone(),t}});t.SHA1=n._createHelper(e),t.HmacSHA1=n._createHmacHelper(e)}(),function(t){for(var e=CryptoJS,r=e.lib,n=r.WordArray,a=r.Hasher,r=e.algo,i=[],o=[],s=function(t){return 4294967296*(t-(0|t))|0},h=2,c=0;64>c;){var l;t:{l=h;for(var u=t.sqrt(l),f=2;u>=f;f++)if(!(l%f)){l=!1;break t}l=!0}l&&(8>c&&(i[c]=s(t.pow(h,.5))),o[c]=s(t.pow(h,1/3)),c++),h++}var p=[],r=r.SHA256=a.extend({_doReset:function(){this._hash=new n.init(i.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],a=r[1],i=r[2],s=r[3],h=r[4],c=r[5],l=r[6],u=r[7],f=0;64>f;f++){if(16>f)p[f]=0|t[e+f];else{var d=p[f-15],g=p[f-2];p[f]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+p[f-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+p[f-16]}d=u+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&c^~h&l)+o[f]+p[f],g=((n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22))+(n&a^n&i^a&i),u=l,l=c,c=h,h=s+d|0,s=i,i=a,a=n,n=d+g|0}r[0]=r[0]+n|0,r[1]=r[1]+a|0,r[2]=r[2]+i|0,r[3]=r[3]+s|0,r[4]=r[4]+h|0,r[5]=r[5]+c|0,r[6]=r[6]+l|0,r[7]=r[7]+u|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,a=8*e.sigBytes;return r[a>>>5]|=128<<24-a%32,r[(a+64>>>9<<4)+14]=t.floor(n/4294967296),r[(a+64>>>9<<4)+15]=n,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=a.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=a._createHelper(r),e.HmacSHA256=a._createHmacHelper(r)}(Math),function(){var t=CryptoJS,e=t.enc.Utf8;t.algo.HMAC=t.lib.Base.extend({init:function(t,r){t=this._hasher=new t.init,"string"==typeof r&&(r=e.parse(r));var n=t.blockSize,a=4*n;r.sigBytes>a&&(r=t.finalize(r)),r.clamp();for(var i=this._oKey=r.clone(),o=this._iKey=r.clone(),s=i.words,h=o.words,c=0;n>c;c++)s[c]^=1549556828,h[c]^=909522486;i.sigBytes=o.sigBytes=a,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher;return t=e.finalize(t),e.reset(),e.finalize(this._oKey.clone().concat(t))}})}(),function(){var t=CryptoJS,e=t.lib.WordArray;t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp(),t=[];for(var a=0;r>a;a+=3)for(var i=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,o=0;4>o&&r>a+.75*o;o++)t.push(n.charAt(i>>>6*(3-o)&63));if(e=n.charAt(64))for(;t.length%4;)t.push(e);return t.join("")},parse:function(t){var r=t.length,n=this._map,a=n.charAt(64);a&&(a=t.indexOf(a),-1!=a&&(r=a));for(var a=[],i=0,o=0;r>o;o++)if(o%4){var s=n.indexOf(t.charAt(o-1))<<2*(o%4),h=n.indexOf(t.charAt(o))>>>6-2*(o%4);a[i>>>2]|=(s|h)<<24-8*(i%4),i++}return e.create(a,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),hawk.crypto.internals=CryptoJS,"undefined"!=typeof module&&module.exports&&(module.exports=hawk);


},{}],294:[function(require,module,exports){
var parser=require("./parser"),signer=require("./signer"),verify=require("./verify"),util=require("./util");module.exports={parse:parser.parseRequest,parseRequest:parser.parseRequest,sign:signer.signRequest,signRequest:signer.signRequest,sshKeyToPEM:util.sshKeyToPEM,sshKeyFingerprint:util.fingerprint,pemToRsaSSHKey:util.pemToRsaSSHKey,verify:verify.verifySignature,verifySignature:verify.verifySignature};


},{"./parser":295,"./signer":296,"./util":297,"./verify":298}],295:[function(require,module,exports){
function HttpSignatureError(r,a){Error.captureStackTrace&&Error.captureStackTrace(this,a||HttpSignatureError),this.message=r,this.name=a.name}function ExpiredRequestError(r){HttpSignatureError.call(this,r,ExpiredRequestError)}function InvalidHeaderError(r){HttpSignatureError.call(this,r,InvalidHeaderError)}function InvalidParamsError(r){HttpSignatureError.call(this,r,InvalidParamsError)}function MissingHeaderError(r){HttpSignatureError.call(this,r,MissingHeaderError)}var assert=require("assert-plus"),util=require("util"),Algorithms={"rsa-sha1":!0,"rsa-sha256":!0,"rsa-sha512":!0,"dsa-sha1":!0,"hmac-sha1":!0,"hmac-sha256":!0,"hmac-sha512":!0},State={New:0,Params:1},ParamsState={Name:0,Quote:1,Value:2,Comma:3};util.inherits(HttpSignatureError,Error),util.inherits(ExpiredRequestError,HttpSignatureError),util.inherits(InvalidHeaderError,HttpSignatureError),util.inherits(InvalidParamsError,HttpSignatureError),util.inherits(MissingHeaderError,HttpSignatureError),module.exports={parseRequest:function(r,a){if(assert.object(r,"request"),assert.object(r.headers,"request.headers"),void 0===a&&(a={}),void 0===a.headers&&(a.headers=[r.headers["x-date"]?"x-date":"date"]),assert.object(a,"options"),assert.arrayOfString(a.headers,"options.headers"),assert.optionalNumber(a.clockSkew,"options.clockSkew"),!r.headers.authorization)throw new MissingHeaderError("no authorization header present in the request");a.clockSkew=a.clockSkew||300;var e=0,t=State.New,s=ParamsState.Name,i="",o="",n={scheme:"",params:{},signingString:"",get algorithm(){return this.params.algorithm.toUpperCase()},get keyId(){return this.params.keyId}},h=r.headers.authorization;for(e=0;e<h.length;e++){var d=h.charAt(e);switch(Number(t)){case State.New:" "!==d?n.scheme+=d:t=State.Params;break;case State.Params:switch(Number(s)){case ParamsState.Name:var m=d.charCodeAt(0);if(m>=65&&90>=m||m>=97&&122>=m)i+=d;else{if("="!==d)throw new InvalidHeaderError("bad param format");if(0===i.length)throw new InvalidHeaderError("bad param format");s=ParamsState.Quote}break;case ParamsState.Quote:if('"'!==d)throw new InvalidHeaderError("bad param format");o="",s=ParamsState.Value;break;case ParamsState.Value:'"'===d?(n.params[i]=o,s=ParamsState.Comma):o+=d;break;case ParamsState.Comma:if(","!==d)throw new InvalidHeaderError("bad param format");i="",s=ParamsState.Name;break;default:throw new Error("Invalid substate")}break;default:throw new Error("Invalid substate")}}if(n.params.headers=n.params.headers&&""!==n.params.headers?n.params.headers.split(" "):r.headers["x-date"]?["x-date"]:["date"],!n.scheme||"Signature"!==n.scheme)throw new InvalidHeaderError('scheme was not "Signature"');if(!n.params.keyId)throw new InvalidHeaderError("keyId was not specified");if(!n.params.algorithm)throw new InvalidHeaderError("algorithm was not specified");if(!n.params.signature)throw new InvalidHeaderError("signature was not specified");if(n.params.algorithm=n.params.algorithm.toLowerCase(),!Algorithms[n.params.algorithm])throw new InvalidParamsError(n.params.algorithm+" is not supported");for(e=0;e<n.params.headers.length;e++){var l=n.params.headers[e].toLowerCase();if(n.params.headers[e]=l,"request-line"!==l){var u=r.headers[l];if(!u)throw new MissingHeaderError(l+" was not in the request");n.signingString+=l+": "+u}else n.signingString+=r.method+" "+r.url+" HTTP/"+r.httpVersion;e+1<n.params.headers.length&&(n.signingString+="\n")}var c;if(r.headers.date||r.headers["x-date"]){c=new Date(r.headers["x-date"]?r.headers["x-date"]:r.headers.date);var p=new Date,g=Math.abs(p.getTime()-c.getTime());if(g>1e3*a.clockSkew)throw new ExpiredRequestError("clock skew of "+g/1e3+"s was greater than "+a.clockSkew+"s")}if(a.headers.forEach(function(r){if(n.params.headers.indexOf(r)<0)throw new MissingHeaderError(r+" was not a signed header")}),a.algorithms&&-1===a.algorithms.indexOf(n.params.algorithm))throw new InvalidParamsError(n.params.algorithm+" is not a supported algorithm");return n}};


},{"assert-plus":305,"util":184}],296:[function(require,module,exports){
function MissingHeaderError(r){this.name="MissingHeaderError",this.message=r,this.stack=(new Error).stack}function InvalidAlgorithmError(r){this.name="InvalidAlgorithmError",this.message=r,this.stack=(new Error).stack}function _pad(r){return parseInt(r,10)<10&&(r="0"+r),r}function _rfc1123(){var r=new Date,e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return t[r.getUTCDay()]+", "+_pad(r.getUTCDate())+" "+e[r.getUTCMonth()]+" "+r.getUTCFullYear()+" "+_pad(r.getUTCHours())+":"+_pad(r.getUTCMinutes())+":"+_pad(r.getUTCSeconds())+" GMT"}var assert=require("assert-plus"),crypto=require("crypto"),http=require("http"),sprintf=require("util").format,Algorithms={"rsa-sha1":!0,"rsa-sha256":!0,"rsa-sha512":!0,"dsa-sha1":!0,"hmac-sha1":!0,"hmac-sha256":!0,"hmac-sha512":!0},Authorization='Signature keyId="%s",algorithm="%s",headers="%s",signature="%s"';MissingHeaderError.prototype=new Error,InvalidAlgorithmError.prototype=new Error,module.exports={signRequest:function(r,e){if(assert.object(r,"request"),assert.object(e,"options"),assert.optionalString(e.algorithm,"options.algorithm"),assert.string(e.keyId,"options.keyId"),assert.optionalArrayOfString(e.headers,"options.headers"),assert.optionalString(e.httpVersion,"options.httpVersion"),r.getHeader("Date")||r.setHeader("Date",_rfc1123()),e.headers||(e.headers=["date"]),e.algorithm||(e.algorithm="rsa-sha256"),e.httpVersion||(e.httpVersion="1.1"),e.algorithm=e.algorithm.toLowerCase(),!Algorithms[e.algorithm])throw new InvalidAlgorithmError(e.algorithm+" is not supported");var t,a="";for(t=0;t<e.headers.length;t++){if("string"!=typeof e.headers[t])throw new TypeError("options.headers must be an array of Strings");var s=e.headers[t].toLowerCase();if("request-line"!==s){var o=r.getHeader(s);if(!o)throw new MissingHeaderError(s+" was not in the request");a+=s+": "+o}else a+=r.method+" "+r.path+" HTTP/"+e.httpVersion;t+1<e.headers.length&&(a+="\n")}var i,n=e.algorithm.match(/(hmac|rsa)-(\w+)/);if("hmac"===n[1]){var h=crypto.createHmac(n[2].toUpperCase(),e.key);h.update(a),i=h.digest("base64")}else{var g=crypto.createSign(e.algorithm.toUpperCase());g.update(a),i=g.sign(e.key,"base64")}return r.setHeader("Authorization",sprintf(Authorization,e.keyId,e.algorithm,e.headers.join(" "),i)),!0}};


},{"assert-plus":305,"crypto":21,"http":157,"util":184}],297:[function(require,module,exports){
(function (Buffer){
function readNext(e,t){var r=ctype.ruint32(e,"big",t);t+=4;var n=t+r;return{data:e.slice(t,n),offset:n}}function writeInt(e,t){e.writeByte(2),e.writeLength(t.length);for(var r=0;r<t.length;r++)e.writeByte(t[r]);return e}function rsaToPEM(e){var t,r,n,a,s,o,f,i="",u=0;try{if(t=new Buffer(e.split(" ")[1],"base64"),f=readNext(t,u),o=f.data.toString(),u=f.offset,"ssh-rsa"!==o)throw new Error("Invalid ssh key type: "+o);f=readNext(t,u),n=f.data,u=f.offset,f=readNext(t,u),s=f.data}catch(d){throw new Error("Invalid ssh key: "+e)}for(r=new asn1.BerWriter,r.startSequence(),r.startSequence(),r.writeOID("1.2.840.113549.1.1.1"),r.writeNull(),r.endSequence(),r.startSequence(3),r.writeByte(0),r.startSequence(),writeInt(r,s),writeInt(r,n),r.endSequence(),r.endSequence(),r.endSequence(),f=r.buffer.toString("base64"),a=0;a<f.length;a++)a%64===0&&(i+="\n"),i+=f.charAt(a);return/\\n$/.test(i)||(i+="\n"),"-----BEGIN PUBLIC KEY-----"+i+"-----END PUBLIC KEY-----\n"}function dsaToPEM(e){var t,r,n,a,s,o,f,i,u=0,d="";try{if(t=new Buffer(e.split(" ")[1],"base64"),r=readNext(t,u),a=r.data.toString(),u=r.offset,!/^ssh-ds[as].*/.test(a))throw new Error("Invalid ssh key type: "+a);r=readNext(t,u),s=r.data,u=r.offset,r=readNext(t,u),o=r.data,u=r.offset,r=readNext(t,u),f=r.data,u=r.offset,r=readNext(t,u),i=r.data}catch(c){throw console.log(c.stack),new Error("Invalid ssh key: "+e)}n=new asn1.BerWriter,n.startSequence(),n.startSequence(),n.writeOID("1.2.840.10040.4.1"),n.startSequence(),writeInt(n,s),writeInt(n,o),writeInt(n,f),n.endSequence(),n.endSequence(),n.startSequence(3),n.writeByte(0),writeInt(n,i),n.endSequence(),n.endSequence(),r=n.buffer.toString("base64");for(var h=0;h<r.length;h++)h%64===0&&(d+="\n"),d+=r.charAt(h);return/\\n$/.test(d)||(d+="\n"),"-----BEGIN PUBLIC KEY-----"+d+"-----END PUBLIC KEY-----\n"}var assert=require("assert-plus"),crypto=require("crypto"),asn1=require("asn1"),ctype=require("ctype");module.exports={sshKeyToPEM:function(e){if(assert.string(e,"ssh_key"),/^ssh-rsa.*/.test(e))return rsaToPEM(e);if(/^ssh-ds[as].*/.test(e))return dsaToPEM(e);throw new Error("Only RSA and DSA public keys are allowed")},fingerprint:function(e){assert.string(e,"ssh_key");var t=e.split(" ");if(!t||!t.length||t.length<2)throw new Error("invalid ssh key");var r=new Buffer(t[1],"base64"),n=crypto.createHash("md5");n.update(r);for(var a=n.digest("hex"),s="",o=0;o<a.length;o++)o&&o%2===0&&(s+=":"),s+=a[o];return s},pemToRsaSSHKey:function(e,t){assert.equal("string",typeof e,"typeof pem");var r=e.split("\n").slice(1,-2).join(""),n=new Buffer(r,"base64"),a=new asn1.BerReader(n);a.readSequence(),a.readSequence();var s=a.readOID();assert.equal(s,"1.2.840.113549.1.1.1","pem not in RSA format"),a.readByte(),a.readByte(),a.readSequence(3),a.readByte(),a.readSequence(),assert.equal(a.peek(),asn1.Ber.Integer,"modulus not an integer"),a._offset=a.readLength(a.offset+1);var o=a._buf.slice(a.offset,a.offset+a.length);a._offset+=a.length,assert.equal(a.peek(),asn1.Ber.Integer,"exponent not an integer"),a._offset=a.readLength(a.offset+1);var f=a._buf.slice(a.offset,a.offset+a.length);a._offset+=a.length;var i=new Buffer("ssh-rsa"),u=new Buffer(4+i.length+4+o.length+4+f.length),d=0;u.writeUInt32BE(i.length,d),d+=4,i.copy(u,d),d+=i.length,u.writeUInt32BE(f.length,d),d+=4,f.copy(u,d),d+=f.length,u.writeUInt32BE(o.length,d),d+=4,o.copy(u,d),d+=o.length;var c=i.toString()+" "+u.toString("base64")+" "+(t||"");return c}};


}).call(this,require("buffer").Buffer)

},{"asn1":304,"assert-plus":305,"buffer":17,"crypto":21,"ctype":308}],298:[function(require,module,exports){
var assert=require("assert-plus"),crypto=require("crypto");module.exports={verifySignature:function(r,e){assert.object(r,"parsedSignature"),assert.string(e,"key");var t=r.algorithm.match(/(HMAC|RSA|DSA)-(\w+)/);if(!t||3!==t.length)throw new TypeError("parsedSignature: unsupported algorithm "+r.algorithm);if("HMAC"===t[1]){var a=crypto.createHmac(t[2].toUpperCase(),e);return a.update(r.signingString),a.digest("base64")===r.params.signature}var i=crypto.createVerify(t[0]);return i.update(r.signingString),i.verify(e,r.params.signature,"base64")}};


},{"assert-plus":305,"crypto":21}],299:[function(require,module,exports){
module.exports={newInvalidAsn1Error:function(r){var n=new Error;return n.name="InvalidAsn1Error",n.message=r||"",n}};


},{}],300:[function(require,module,exports){
var errors=require("./errors"),types=require("./types"),Reader=require("./reader"),Writer=require("./writer");module.exports={Reader:Reader,Writer:Writer};for(var t in types)types.hasOwnProperty(t)&&(module.exports[t]=types[t]);for(var e in errors)errors.hasOwnProperty(e)&&(module.exports[e]=errors[e]);


},{"./errors":299,"./reader":301,"./types":302,"./writer":303}],301:[function(require,module,exports){
(function (Buffer){
function Reader(t){if(!t||!Buffer.isBuffer(t))throw new TypeError("data must be a node Buffer");this._buf=t,this._size=t.length,this._len=0,this._offset=0;var e=this;this.__defineGetter__("length",function(){return e._len}),this.__defineGetter__("offset",function(){return e._offset}),this.__defineGetter__("remain",function(){return e._size-e._offset}),this.__defineGetter__("buffer",function(){return e._buf.slice(e._offset)})}var assert=require("assert"),ASN1=require("./types"),errors=require("./errors"),newInvalidAsn1Error=errors.newInvalidAsn1Error;Reader.prototype.readByte=function(t){if(this._size-this._offset<1)return null;var e=255&this._buf[this._offset];return t||(this._offset+=1),e},Reader.prototype.peek=function(){return this.readByte(!0)},Reader.prototype.readLength=function(t){if(void 0===t&&(t=this._offset),t>=this._size)return null;var e=255&this._buf[t++];if(null===e)return null;if(128==(128&e)){if(e&=127,0==e)throw newInvalidAsn1Error("Indefinite length not supported");if(e>4)throw newInvalidAsn1Error("encoding too long");if(this._size-t<e)return null;this._len=0;for(var r=0;e>r;r++)this._len=(this._len<<8)+(255&this._buf[t++])}else this._len=e;return t},Reader.prototype.readSequence=function(t){var e=this.peek();if(null===e)return null;if(void 0!==t&&t!==e)throw newInvalidAsn1Error("Expected 0x"+t.toString(16)+": got 0x"+e.toString(16));var r=this.readLength(this._offset+1);return null===r?null:(this._offset=r,e)},Reader.prototype.readInt=function(){return this._readTag(ASN1.Integer)},Reader.prototype.readBoolean=function(){return 0===this._readTag(ASN1.Boolean)?!1:!0},Reader.prototype.readEnumeration=function(){return this._readTag(ASN1.Enumeration)},Reader.prototype.readString=function(t,e){t||(t=ASN1.OctetString);var r=this.peek();if(null===r)return null;if(r!==t)throw newInvalidAsn1Error("Expected 0x"+t.toString(16)+": got 0x"+r.toString(16));var n=this.readLength(this._offset+1);if(null===n)return null;if(this.length>this._size-n)return null;if(this._offset=n,0===this.length)return"";var i=this._buf.slice(this._offset,this._offset+this.length);return this._offset+=this.length,e?i:i.toString("utf8")},Reader.prototype.readOID=function(t){t||(t=ASN1.OID);var e=this.peek();if(null===e)return null;if(e!==t)throw newInvalidAsn1Error("Expected 0x"+t.toString(16)+": got 0x"+e.toString(16));var r=this.readLength(this._offset+1);if(null===r)return null;if(this.length>this._size-r)return null;this._offset=r;for(var n=[],i=0,s=0;s<this.length;s++){var o=255&this._buf[this._offset++];i<<=7,i+=127&o,0==(128&o)&&(n.push(i),i=0)}return i=n.shift(),n.unshift(i%40),n.unshift(i/40>>0),n.join(".")},Reader.prototype._readTag=function(t){assert.ok(void 0!==t);var e=this.peek();if(null===e)return null;if(e!==t)throw newInvalidAsn1Error("Expected 0x"+t.toString(16)+": got 0x"+e.toString(16));var r=this.readLength(this._offset+1);if(null===r)return null;if(this.length>4)throw newInvalidAsn1Error("Integer too long: "+this.length);if(this.length>this._size-r)return null;this._offset=r;var n=this._buf[this._offset++],i=0;i=127&n;for(var s=1;s<this.length;s++)i<<=8,i|=255&this._buf[this._offset++];return 128==(128&n)&&(i=-i),i},module.exports=Reader;


}).call(this,require("buffer").Buffer)

},{"./errors":299,"./types":302,"assert":2,"buffer":17}],302:[function(require,module,exports){
module.exports={EOC:0,Boolean:1,Integer:2,BitString:3,OctetString:4,Null:5,OID:6,ObjectDescriptor:7,External:8,Real:9,Enumeration:10,PDV:11,Utf8String:12,RelativeOID:13,Sequence:16,Set:17,NumericString:18,PrintableString:19,T61String:20,VideotexString:21,IA5String:22,UTCTime:23,GeneralizedTime:24,GraphicString:25,VisibleString:26,GeneralString:28,UniversalString:29,CharacterString:30,BMPString:31,Constructor:32,Context:128};


},{}],303:[function(require,module,exports){
(function (Buffer){
function merge(t,e){assert.ok(t),assert.equal(typeof t,"object"),assert.ok(e),assert.equal(typeof e,"object");var r=Object.getOwnPropertyNames(t);return r.forEach(function(r){if(!e[r]){var s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,s)}}),e}function Writer(t){t=merge(DEFAULT_OPTS,t||{}),this._buf=new Buffer(t.size||1024),this._size=this._buf.length,this._offset=0,this._options=t,this._seq=[];var e=this;this.__defineGetter__("buffer",function(){if(e._seq.length)throw new InvalidAsn1Error(e._seq.length+" unended sequence(s)");return e._buf.slice(0,e._offset)})}var assert=require("assert"),ASN1=require("./types"),errors=require("./errors"),newInvalidAsn1Error=errors.newInvalidAsn1Error,DEFAULT_OPTS={size:1024,growthFactor:8};Writer.prototype.writeByte=function(t){if("number"!=typeof t)throw new TypeError("argument must be a Number");this._ensure(1),this._buf[this._offset++]=t},Writer.prototype.writeInt=function(t,e){if("number"!=typeof t)throw new TypeError("argument must be a Number");"number"!=typeof e&&(e=ASN1.Integer);for(var r=4;(0===(4286578688&t)||4286578688===(4286578688&t))&&r>1;)r--,t<<=8;if(r>4)throw new InvalidAsn1Error("BER ints cannot be > 0xffffffff");for(this._ensure(2+r),this._buf[this._offset++]=e,this._buf[this._offset++]=r;r-->0;)this._buf[this._offset++]=(4278190080&t)>>24,t<<=8},Writer.prototype.writeNull=function(){this.writeByte(ASN1.Null),this.writeByte(0)},Writer.prototype.writeEnumeration=function(t,e){if("number"!=typeof t)throw new TypeError("argument must be a Number");return"number"!=typeof e&&(e=ASN1.Enumeration),this.writeInt(t,e)},Writer.prototype.writeBoolean=function(t,e){if("boolean"!=typeof t)throw new TypeError("argument must be a Boolean");"number"!=typeof e&&(e=ASN1.Boolean),this._ensure(3),this._buf[this._offset++]=e,this._buf[this._offset++]=1,this._buf[this._offset++]=t?255:0},Writer.prototype.writeString=function(t,e){if("string"!=typeof t)throw new TypeError("argument must be a string (was: "+typeof t+")");"number"!=typeof e&&(e=ASN1.OctetString);var r=Buffer.byteLength(t);this.writeByte(e),this.writeLength(r),r&&(this._ensure(r),this._buf.write(t,this._offset),this._offset+=r)},Writer.prototype.writeBuffer=function(t,e){if("number"!=typeof e)throw new TypeError("tag must be a number");if(!Buffer.isBuffer(t))throw new TypeError("argument must be a buffer");this.writeByte(e),this.writeLength(t.length),this._ensure(t.length),t.copy(this._buf,this._offset,0,t.length),this._offset+=t.length},Writer.prototype.writeStringArray=function(t){if(!t instanceof Array)throw new TypeError("argument must be an Array[String]");var e=this;t.forEach(function(t){e.writeString(t)})},Writer.prototype.writeOID=function(t,e){function r(t,e){128>e?t.push(e):16384>e?(t.push(e>>>7|128),t.push(127&e)):2097152>e?(t.push(e>>>14|128),t.push(255&(e>>>7|128)),t.push(127&e)):268435456>e?(t.push(e>>>21|128),t.push(255&(e>>>14|128)),t.push(255&(e>>>7|128)),t.push(127&e)):(t.push(255&(e>>>28|128)),t.push(255&(e>>>21|128)),t.push(255&(e>>>14|128)),t.push(255&(e>>>7|128)),t.push(127&e))}if("string"!=typeof t)throw new TypeError("argument must be a string");if("number"!=typeof e&&(e=ASN1.OID),!/^([0-9]+\.){3,}[0-9]+$/.test(t))throw new Error("argument is not a valid OID string");var s=t.split("."),i=[];i.push(40*parseInt(s[0],10)+parseInt(s[1],10)),s.slice(2).forEach(function(t){r(i,parseInt(t,10))});var f=this;this._ensure(2+i.length),this.writeByte(e),this.writeLength(i.length),i.forEach(function(t){f.writeByte(t)})},Writer.prototype.writeLength=function(t){if("number"!=typeof t)throw new TypeError("argument must be a Number");if(this._ensure(4),127>=t)this._buf[this._offset++]=t;else if(255>=t)this._buf[this._offset++]=129,this._buf[this._offset++]=t;else if(65535>=t)this._buf[this._offset++]=130,this._buf[this._offset++]=t>>8,this._buf[this._offset++]=t;else{if(!(16777215>=t))throw new InvalidAsn1ERror("Length too long (> 4 bytes)");this._shift(start,t,1),this._buf[this._offset++]=131,this._buf[this._offset++]=t>>16,this._buf[this._offset++]=t>>8,this._buf[this._offset++]=t}},Writer.prototype.startSequence=function(t){"number"!=typeof t&&(t=ASN1.Sequence|ASN1.Constructor),this.writeByte(t),this._seq.push(this._offset),this._ensure(3),this._offset+=3},Writer.prototype.endSequence=function(){var t=this._seq.pop(),e=t+3,r=this._offset-e;if(127>=r)this._shift(e,r,-2),this._buf[t]=r;else if(255>=r)this._shift(e,r,-1),this._buf[t]=129,this._buf[t+1]=r;else if(65535>=r)this._buf[t]=130,this._buf[t+1]=r>>8,this._buf[t+2]=r;else{if(!(16777215>=r))throw new InvalidAsn1Error("Sequence too long");this._shift(e,r,1),this._buf[t]=131,this._buf[t+1]=r>>16,this._buf[t+2]=r>>8,this._buf[t+3]=r}},Writer.prototype._shift=function(t,e,r){assert.ok(void 0!==t),assert.ok(void 0!==e),assert.ok(r),this._buf.copy(this._buf,t+r,t,t+e),this._offset+=r},Writer.prototype._ensure=function(t){if(assert.ok(t),this._size-this._offset<t){var e=this._size*this._options.growthFactor;e-this._offset<t&&(e+=t);var r=new Buffer(e);this._buf.copy(r,0,0,this._offset),this._buf=r,this._size=e}},module.exports=Writer;


}).call(this,require("buffer").Buffer)

},{"./errors":299,"./types":302,"assert":2,"buffer":17}],304:[function(require,module,exports){
var Ber=require("./ber/index");module.exports={Ber:Ber,BerReader:Ber.Reader,BerWriter:Ber.Writer};


},{"./ber/index":300}],305:[function(require,module,exports){
(function (process,Buffer){
function capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}function uncapitalize(e){return e.charAt(0).toLowerCase()+e.slice(1)}function _(){return util.format.apply(util,arguments)}function _assert(e,r,t,a){if(!NDEBUG){t=t||r,a=a||_assert.caller;var n=typeof e;if(n!==r)throw new assert.AssertionError({message:_(TYPE_REQUIRED,t,r),actual:n,expected:r,operator:"===",stackStartFunction:a})}}function _instanceof(e,r,t,a){if(!(NDEBUG||(t=t||r,a=a||_instanceof.caller,e instanceof r)))throw new assert.AssertionError({message:_(TYPE_REQUIRED,t,r.name),actual:_getClass(e),expected:r.name,operator:"instanceof",stackStartFunction:a})}function _getClass(e){return Object.prototype.toString.call(e).slice(8,-1)}function array(e,r,t){if(!NDEBUG){if(t=t||r,!Array.isArray(e))throw new assert.AssertionError({message:_(ARRAY_TYPE_REQUIRED,t,r),actual:typeof e,expected:"array",operator:"Array.isArray",stackStartFunction:array.caller});for(var a=0;a<e.length;a++)_assert(e[a],r,t,array)}}function bool(e,r){_assert(e,"boolean",r,bool)}function buffer(e,r){if(!Buffer.isBuffer(e))throw new assert.AssertionError({message:_(TYPE_REQUIRED,r||"","Buffer"),actual:typeof e,expected:"buffer",operator:"Buffer.isBuffer",stackStartFunction:buffer})}function func(e,r){_assert(e,"function",r)}function number(e,r){if(_assert(e,"number",r),!NDEBUG&&(isNaN(e)||!isFinite(e)))throw new assert.AssertionError({message:_(TYPE_REQUIRED,r,"number"),actual:e,expected:"number",operator:"isNaN",stackStartFunction:number})}function object(e,r){_assert(e,"object",r)}function stream(e,r){_instanceof(e,Stream,r)}function date(e,r){_instanceof(e,Date,r)}function regexp(e,r){_instanceof(e,RegExp,r)}function string(e,r){_assert(e,"string",r)}function uuid(e,r){if(string(e,r),!NDEBUG&&!UUID_REGEXP.test(e))throw new assert.AssertionError({message:_(TYPE_REQUIRED,r,"uuid"),actual:"string",expected:"uuid",operator:"test",stackStartFunction:uuid})}var assert=require("assert"),Stream=require("stream").Stream,util=require("util"),NDEBUG=process.env.NODE_NDEBUG||!1,UUID_REGEXP=/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,ARRAY_TYPE_REQUIRED="%s ([%s]) required",TYPE_REQUIRED="%s (%s) is required";module.exports={bool:bool,buffer:buffer,date:date,func:func,number:number,object:object,regexp:regexp,stream:stream,string:string,uuid:uuid},Object.keys(module.exports).forEach(function(e){if("buffer"!==e){var r="arrayOf"+capitalize(e);"bool"===e&&(e="boolean"),"func"===e&&(e="function"),module.exports[r]=function(r,t){array(r,e,t)}}}),Object.keys(module.exports).forEach(function(e){var r="optional"+capitalize(e),t=uncapitalize(e.replace("arrayOf",""));"bool"===t&&(t="boolean"),"func"===t&&(t="function"),module.exports[r]=-1!==e.indexOf("arrayOf")?function(e,r){NDEBUG||void 0===e||array(e,t,r)}:function(e,r){NDEBUG||void 0===e||_assert(e,t,r)}}),Object.keys(assert).forEach(function(e){return"AssertionError"===e?void(module.exports[e]=assert[e]):void(module.exports[e]=function(){NDEBUG||assert[e].apply(assert[e],arguments)})});


}).call(this,require('_process'),require("buffer").Buffer)

},{"_process":164,"assert":2,"buffer":17,"stream":180,"util":184}],306:[function(require,module,exports){
function ctfParseInteger(t,e){var r,n,i,o;if(r=t.name,!("signed"in t.integer))throw new Error("Malformed CTF JSON: integer missing signed value");if(!("length"in t.integer))throw new Error("Malformed CTF JSON: integer missing length value");if(n=t.integer.signed,i=t.integer.length,o=null,n&&1==i?o="int8_t":1==i?o="uint8_t":n&&2==i?o="int16_t":2==i?o="uint16_t":n&&4==i?o="int32_t":4==i?o="uint32_t":n&&8==i?o="int64_t":8==i&&(o="uint64_t"),null===o)throw new Error("Malformed CTF JSON: integer has unsupported length and sign - "+i+"/"+n);return r!=o?"char"==r?void ASSERT("int8_t"==o):void e.typedef(r,o):void 0}function ctfParseFloat(t,e){var r,n;if(r=t.name,!("length"in t["float"]))throw new Error("Malformed CTF JSON: float missing length value");if(n=t["float"].length,4!=n&&8!=n)throw new Error("Malformed CTF JSON: float has invalid length value");if(4==n){if("float"==r)return;e.typedef(r,"float")}else if(8==n){if("double"==r)return;e.typedef(r,"double")}}function ctfParseTypedef(t,e){var r,n,i;if(r=t.name,"string"!=typeof t.typedef)throw new Error("Malformed CTF JSON: typedef value in not a string");for(n=t.typedef,i=0;i<ctf_deftypes.length;i++)if(r==ctf_deftypes[i])return;e.typedef(r,n)}function ctfParseStruct(t,e){var r,n,i,o,a,f,s;if(f=[],!Array.isArray(t.struct))throw new Error("Malformed CTF JSON: struct value is not an array");for(i=0;i<t.struct.length;i++){if(o=t.struct[i],!("name"in o))throw new Error("Malformed CTF JSON: struct member missing name");if(!("type"in o))throw new Error("Malformed CTF JSON: struct member missing type");if("string"!=typeof o.name)throw new Error("Malformed CTF JSON: struct member name isn't a string");if("string"!=typeof o.type)throw new Error("Malformed CTF JSON: struct member type isn't a string");r=o.name,n=o.type,a=n.indexOf(" ["),-1!=a&&(n=n.substring(0,a)+n.substring(a+1,n.length)),s={},s[r]={type:n},f.push(s)}r=t.name,e.typedef(r,f)}function ctfParseEntry(t,e){var r,n;if(!("name"in t))throw new Error('Malformed CTF JSON: entry missing "name" section');for(r=0;r<ctf_entries.length;r++)ctf_entries[r]in t&&n++;if(0===n)throw new Error("Malformed CTF JSON: found no entries");if(n>=2)throw new Error("Malformed CTF JSON: found more than one entry");return"integer"in t?void ctfParseInteger(t,e):"float"in t?void ctfParseFloat(t,e):"typedef"in t?void ctfParseTypedef(t,e):"struct"in t?void ctfParseStruct(t,e):void ASSERT(!1,"shouldn't reach here")}function ctfParseJson(t,e){var r,n;if(ASSERT(t),ASSERT(e),!("metadata"in t))throw new Error("Invalid CTF JSON: missing metadata section");if(!("ctf2json_version"in t.metadata))throw new Error("Invalid CTF JSON: missing ctf2json_version");for(r=t.metadata.ctf2json_version,n=0;n<ctf_versions.length&&ctf_versions[n]!=r;n++);if(n==ctf_versions.length)throw new Error("Unsuported ctf2json_version: "+r);if(!("data"in t))throw new Error("Invalid CTF JSON: missing data section");if(!Array.isArray(t.data))throw new Error("Malformed CTF JSON: data section is not an array");for(n=0;n<t.data.length;n++)ctfParseEntry(t.data[n],e)}var mod_assert=require("assert"),ASSERT=mod_assert.ok,ctf_versions=["1.0"],ctf_entries=["integer","float","typedef","struct"],ctf_deftypes=["int8_t","uint8_t","int16_t","uint16_t","int32_t","uint32_t","float","double"];exports.ctfParseJson=ctfParseJson;


},{"assert":2}],307:[function(require,module,exports){
function ruint8(r,n,i){if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i>=r.length)throw new Error("Trying to read beyond buffer length");return r[i]}function rgint16(r,n,i){var o=0;return"big"==n?(o=r[i]<<8,o|=r[i+1]):(o=r[i],o|=r[i+1]<<8),o}function ruint16(r,n,i){if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+1>=r.length)throw new Error("Trying to read beyond buffer length");return rgint16(r,n,i)}function rgint32(r,n,i){var o=0;return"big"==n?(o=r[i+1]<<16,o|=r[i+2]<<8,o|=r[i+3],o+=r[i]<<24>>>0):(o=r[i+2]<<16,o|=r[i+1]<<8,o|=r[i],o+=r[i+3]<<24>>>0),o}function ruint32(r,n,i){if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+3>=r.length)throw new Error("Trying to read beyond buffer length");return rgint32(r,n,i)}function rgint64(r,n,i){var o=new Array(2);return"big"==n?(o[0]=ruint32(r,n,i),o[1]=ruint32(r,n,i+4)):(o[0]=ruint32(r,n,i+4),o[1]=ruint32(r,n,i)),o}function ruint64(r,n,i){if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+7>=r.length)throw new Error("Trying to read beyond buffer length");return rgint64(r,n,i)}function rsint8(r,n,i){var o;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i>=r.length)throw new Error("Trying to read beyond buffer length");return o=128&r[i],o?-1*(255-r[i]+1):r[i]}function rsint16(r,n,i){var o,e;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+1>=r.length)throw new Error("Trying to read beyond buffer length");return e=rgint16(r,n,i),o=32768&e,o?-1*(65535-e+1):e}function rsint32(r,n,i){var o,e;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+3>=r.length)throw new Error("Trying to read beyond buffer length");return e=rgint32(r,n,i),o=2147483648&e,o?-1*(4294967295-e+1):e}function rsint64(r,n,i){var o,e;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+3>=r.length)throw new Error("Trying to read beyond buffer length");return e=rgint64(r,n,i),(o=2147483648&e[0])?(e[0]=-1*(4294967295-e[0]),e[1]=-1*(4294967295-e[1]+1),mod_assert.ok(e[1]<=4294967296),-4294967296==e[1]&&(e[1]=0,e[0]--),e):e}function rfloat(r,n,i){var o,e,t,f,w=[],s=127,u=255;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+3>=r.length)throw new Error("Trying to read beyond buffer length");return"big"==n?(w[0]=r[i],w[1]=r[i+1],w[2]=r[i+2],w[3]=r[i+3]):(w[3]=r[i],w[2]=r[i+1],w[1]=r[i+2],w[0]=r[i+3]),o=128&w[0],e=(127&w[0])<<1,e|=(128&w[1])>>>7,t=(127&w[1])<<16,t|=w[2]<<8,t|=w[3],o||e!=u||0!==t?o&&e==u&&0===t?Number.NEGATIVE_INFINITY:e==u&&0!==t?Number.NaN:0===e&&0===t?0:(e-=s,e==-s?(e++,f=0):f=1,f=(f+t*Math.pow(2,-23))*Math.pow(2,e),o&&(f*=-1),f):Number.POSITIVE_INFINITY}function rdouble(r,n,i){var o,e,t,f,w,s=[],u=1023,a=2047;if(void 0===n)throw new Error("missing endian");if(void 0===r)throw new Error("missing buffer");if(void 0===i)throw new Error("missing offset");if(i+7>=r.length)throw new Error("Trying to read beyond buffer length");return"big"==n?(s[0]=r[i],s[1]=r[i+1],s[2]=r[i+2],s[3]=r[i+3],s[4]=r[i+4],s[5]=r[i+5],s[6]=r[i+6],s[7]=r[i+7]):(s[7]=r[i],s[6]=r[i+1],s[5]=r[i+2],s[4]=r[i+3],s[3]=r[i+4],s[2]=r[i+5],s[1]=r[i+6],s[0]=r[i+7]),o=128&s[0],e=(127&s[0])<<4,e|=(240&s[1])>>>4,w=s[7],w|=s[6]<<8,w|=s[5]<<16,t=s[4],t|=s[3]<<8,t|=s[2]<<16,t|=(15&s[1])<<24,t*=Math.pow(2,24),t+=w,o||e!=a||0!==t?o&&e==a&&0===t?Number.NEGATIVE_INFINITY:e==a&&0!==t?Number.NaN:0===e&&0===t?0:(e-=u,e==-u?(e++,f=0):f=1,f=(f+t*Math.pow(2,-52))*Math.pow(2,e),o&&(f*=-1),f):Number.POSITIVE_INFINITY}function prepuint(r,n){if("number"!=typeof r)throw new(Error("cannot write a non-number as a number"));if(0>r)throw new Error("specified a negative value for writing an unsigned value");if(r>n)throw new Error("value is larger than maximum value for type");if(Math.floor(r)!==r)throw new Error("value has a fractional component");return r}function wuint8(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o>=i.length)throw new Error("Trying to read beyond buffer length");e=prepuint(r,255),i[o]=e}function wgint16(r,n,i,o){"big"==n?(i[o]=(65280&r)>>>8,i[o+1]=255&r):(i[o+1]=(65280&r)>>>8,i[o]=255&r)}function wuint16(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+1>=i.length)throw new Error("Trying to read beyond buffer length");e=prepuint(r,65535),wgint16(e,n,i,o)}function wgint32(r,n,i,o){"big"==n?(i[o]=(r-(16777215&r))/Math.pow(2,24),i[o+1]=r>>>16&255,i[o+2]=r>>>8&255,i[o+3]=255&r):(i[o+3]=(r-(16777215&r))/Math.pow(2,24),i[o+2]=r>>>16&255,i[o+1]=r>>>8&255,i[o]=255&r)}function wuint32(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+3>=i.length)throw new Error("Trying to read beyond buffer length");e=prepuint(r,4294967295),wgint32(e,n,i,o)}function wgint64(r,n,i,o){"big"==n?(wgint32(r[0],n,i,o),wgint32(r[1],n,i,o+4)):(wgint32(r[0],n,i,o+4),wgint32(r[1],n,i,o))}function wuint64(r,n,i,o){if(void 0===r)throw new Error("missing value");if(!(r instanceof Array))throw new Error("value must be an array");if(2!=r.length)throw new Error("value must be an array of length 2");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+7>=i.length)throw new Error("Trying to read beyond buffer length");prepuint(r[0],4294967295),prepuint(r[1],4294967295),wgint64(r,n,i,o)}function prepsint(r,n,i){if("number"!=typeof r)throw new(Error("cannot write a non-number as a number"));if(r>n)throw new Error("value larger than maximum allowed value");if(i>r)throw new Error("value smaller than minimum allowed value");if(Math.floor(r)!==r)throw new Error("value has a fractional component");return r}function wsint8(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o>=i.length)throw new Error("Trying to read beyond buffer length");e=prepsint(r,127,-128),e>=0?wuint8(e,n,i,o):wuint8(255+e+1,n,i,o)}function wsint16(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+1>=i.length)throw new Error("Trying to read beyond buffer length");e=prepsint(r,32767,-32768),e>=0?wgint16(e,n,i,o):wgint16(65535+e+1,n,i,o)}function wsint32(r,n,i,o){var e;if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+3>=i.length)throw new Error("Trying to read beyond buffer length");e=prepsint(r,2147483647,-2147483648),e>=0?wgint32(e,n,i,o):wgint32(4294967295+e+1,n,i,o)}function wsint64(r,n,i,o){var e,t,f=new Array(2);if(void 0===r)throw new Error("missing value");if(!(r instanceof Array))throw new Error("value must be an array");if(2!=r.length)throw new Error("value must be an array of length 2");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+7>=i.length)throw new Error("Trying to read beyond buffer length");if(e=r[0]*Number.POSITIVE_INFINITY==Number.POSITIVE_INFINITY,t=r[1]*Number.POSITIVE_INFINITY==Number.POSITIVE_INFINITY,0!=r[0]&&0!=r[1]&&e!=t)throw new Error("Both entries in the array must have the same sign");if(e)prepuint(r[0],2147483647),prepuint(r[1],4294967295);else if(prepsint(r[0],0,-2147483648),prepsint(r[1],0,-4294967295),-2147483648==r[0]&&0!=r[1])throw new Error("value smaller than minimum allowed value");r[0]<0||r[1]<0?(f[0]=4294967295-Math.abs(r[0]),f[1]=4294967296-Math.abs(r[1]),4294967296==f[1]&&(f[1]=0,f[0]++)):(f[0]=r[0],f[1]=r[1]),wgint64(f,n,i,o)}function log2(r){return Math.log(r)/Math.log(2)}function intexp(r){return Math.floor(log2(r))}function fracexp(r){return Math.floor(log2(r))}function wfloat(r,n,i,o){var e,t,f,w,s=[];if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+3>=i.length)throw new Error("Trying to read beyond buffer length");isNaN(r)?(e=0,t=255,f=23):r==Number.POSITIVE_INFINITY?(e=0,t=255,f=0):r==Number.NEGATIVE_INFINITY?(e=1,t=255,f=0):(0>r?(e=1,r=Math.abs(r)):e=0,w=1>r?fracexp(r):intexp(r),-127>=w?(t=0,f=r*Math.pow(2,149)&8388607):(t=127+w,f=r*Math.pow(2,23-w),f&=8388607)),s[0]=e<<7|(254&t)>>>1,s[1]=(1&t)<<7|(8323072&f)>>>16,s[2]=(65280&f)>>>8,s[3]=255&f,"big"==n?(i[o]=s[0],i[o+1]=s[1],i[o+2]=s[2],i[o+3]=s[3]):(i[o]=s[3],i[o+1]=s[2],i[o+2]=s[1],i[o+3]=s[0])}function wdouble(r,n,i,o){var e,t,f,w,s=[];if(void 0===r)throw new Error("missing value");if(void 0===n)throw new Error("missing endian");if(void 0===i)throw new Error("missing buffer");if(void 0===o)throw new Error("missing offset");if(o+7>=i.length)throw new Error("Trying to read beyond buffer length");isNaN(r)?(e=0,t=2047,f=23):r==Number.POSITIVE_INFINITY?(e=0,t=2047,f=0):r==Number.NEGATIVE_INFINITY?(e=1,t=2047,f=0):(0>r?(e=1,r=Math.abs(r)):e=0,w=1>r?fracexp(r):intexp(r),2.225073858507201e-308>=r||-1023>=w?(t=0,f=r*Math.pow(2,1023)*Math.pow(2,51),f%=Math.pow(2,52)):(w>1023&&(w=1023),t=1023+w,f=r*Math.pow(2,-w),f*=Math.pow(2,52),f%=Math.pow(2,52))),s[7]=255&f,s[6]=f>>>8&255,s[5]=f>>>16&255,f=(f-(16777215&f))/Math.pow(2,24),s[4]=255&f,s[3]=f>>>8&255,s[2]=f>>>16&255,s[1]=(15&t)<<4|f>>>24,s[0]=e<<7|(2032&t)>>>4,"big"==n?(i[o]=s[0],i[o+1]=s[1],i[o+2]=s[2],i[o+3]=s[3],i[o+4]=s[4],i[o+5]=s[5],i[o+6]=s[6],i[o+7]=s[7]):(i[o+7]=s[0],i[o+6]=s[1],i[o+5]=s[2],i[o+4]=s[3],i[o+3]=s[4],i[o+2]=s[5],i[o+1]=s[6],i[o]=s[7])}var mod_assert=require("assert");exports.ruint8=ruint8,exports.ruint16=ruint16,exports.ruint32=ruint32,exports.ruint64=ruint64,exports.wuint8=wuint8,exports.wuint16=wuint16,exports.wuint32=wuint32,exports.wuint64=wuint64,exports.rsint8=rsint8,exports.rsint16=rsint16,exports.rsint32=rsint32,exports.rsint64=rsint64,exports.wsint8=wsint8,exports.wsint16=wsint16,exports.wsint32=wsint32,exports.wsint64=wsint64,exports.rfloat=rfloat,exports.rdouble=rdouble,exports.wfloat=wfloat,exports.wdouble=wdouble;


},{"assert":2}],308:[function(require,module,exports){
(function (Buffer){
function ctReadUint8(t,r,e){var i=mod_ctio.ruint8(r,t,e);return{value:i,size:1}}function ctReadUint16(t,r,e){var i=mod_ctio.ruint16(r,t,e);return{value:i,size:2}}function ctReadUint32(t,r,e){var i=mod_ctio.ruint32(r,t,e);return{value:i,size:4}}function ctReadUint64(t,r,e){var i=mod_ctio.ruint64(r,t,e);return{value:i,size:8}}function ctReadSint8(t,r,e){var i=mod_ctio.rsint8(r,t,e);return{value:i,size:1}}function ctReadSint16(t,r,e){var i=mod_ctio.rsint16(r,t,e);return{value:i,size:2}}function ctReadSint32(t,r,e){var i=mod_ctio.rsint32(r,t,e);return{value:i,size:4}}function ctReadSint64(t,r,e){var i=mod_ctio.rsint64(r,t,e);return{value:i,size:8}}function ctReadFloat(t,r,e){var i=mod_ctio.rfloat(r,t,e);return{value:i,size:4}}function ctReadDouble(t,r,e){var i=mod_ctio.rdouble(r,t,e);return{value:i,size:8}}function ctReadChar(t,r,e){var i=new Buffer(1);return i[0]=mod_ctio.ruint8(r,t,e),{value:i,size:1}}function ctReadCharArray(t,r,e,i){var n,o=new Buffer(t);for(n=0;t>n;n++)o[n]=mod_ctio.ruint8(e,r,i+n);return{value:o,size:t}}function ctWriteUint8(t,r,e,i){return mod_ctio.wuint8(t,r,e,i),1}function ctWriteUint16(t,r,e,i){return mod_ctio.wuint16(t,r,e,i),2}function ctWriteUint32(t,r,e,i){return mod_ctio.wuint32(t,r,e,i),4}function ctWriteUint64(t,r,e,i){return mod_ctio.wuint64(t,r,e,i),8}function ctWriteSint8(t,r,e,i){return mod_ctio.wsint8(t,r,e,i),1}function ctWriteSint16(t,r,e,i){return mod_ctio.wsint16(t,r,e,i),2}function ctWriteSint32(t,r,e,i){return mod_ctio.wsint32(t,r,e,i),4}function ctWriteSint64(t,r,e,i){return mod_ctio.wsint64(t,r,e,i),8}function ctWriteFloat(t,r,e,i){return mod_ctio.wfloat(t,r,e,i),4}function ctWriteDouble(t,r,e,i){return mod_ctio.wdouble(t,r,e,i),8}function ctWriteChar(t,r,e,i){if(!(t instanceof Buffer))throw new Error("Input must be a buffer");return mod_ctio.ruint8(t[0],r,e,i),1}function ctWriteCharArray(t,r,e,i,n){var o;if(!(t instanceof Buffer))throw new Error("Input must be a buffer");if(t.length>r)throw new Error("value length greater than array length");for(o=0;o<t.length&&r>o;o++)mod_ctio.wuint8(t[o],e,i,n+o);for(;r>o;o++)mod_ctio.wuint8(0,e,n+o);return r}function ctGetBasicTypes(){var t,r={};for(t in deftypes)r[t]=deftypes[t];return r}function ctParseType(t){var r,e,i,n;if("string"!=typeof t)throw new Error("type must be a Javascript string");if(e=t.lastIndexOf("]"),-1==e){if(-1!=t.lastIndexOf("["))throw new Error("found invalid type with '[' but no corresponding ']'");return{type:t}}if(r=t.lastIndexOf("["),-1==r)throw new Error("found invalid type with ']' but no corresponding '['");if(r>=e)throw new Error("malformed type, ']' appears before '['");return i=t.substring(0,r),n=t.substring(r+1,e),{type:i,len:n}}function ctCheckReq(t,r,e){var i,n,o,a,s,u={};if(!(t instanceof Array))throw new Error("definition is not an array");if(0===t.length)throw new Error("definition must have at least one element");for(i=0;i<t.length;i++){if(o=t[i],!(o instanceof Object))throw new Error("definition must be an array ofobjects");if(a=Object.keys(o),1!=a.length)throw new Error("definition entry must only have one key");if(a[0]in u)throw new Error("Specified name already specified: "+a[0]);if(!("type"in o[a[0]]))throw new Error("missing required type definition");for(s=ctParseType(o[a[0]].type);void 0!==s.len;){if(isNaN(parseInt(s.len,10))&&!(s.len in u))throw new Error("Given an array length without a matching type");s=ctParseType(s.type)}if(!(s.type in r))throw new Error("type not found or typdefed: "+s.type);if(void 0!==e)for(n=0;n<e.length;n++)if(!(e[n]in o[a[0]]))throw new Error("Missing required field: "+e[n]);u[a[0]]=!0}}function CTypeParser(t){if(!t)throw new Error("missing required argument");if(!("endian"in t))throw new Error("missing required endian value");if("big"!=t.endian&&"little"!=t.endian)throw new Error("Invalid endian type");if("char-type"in t&&"uint8"!=t["char-type"]&&"int8"!=t["char-type"])throw new Error("invalid option for char-type: "+t["char-type"]);this.endian=t.endian,this.types=ctGetBasicTypes(),"char-type"in t&&"uint8"==t["char-type"]&&(this.types["char"]=this.types.uint8_t),"char-type"in t&&"int8"==t["char-type"]&&(this.types["char"]=this.types.int8_t)}function ctResolveArray(t,r){for(var e="",i=ctParseType(t);void 0!==i.len;){if(isNaN(parseInt(i.len,10))){if("number"!=typeof r[i.len])throw new Error("cannot sawp in non-number for array value");e="["+r[i.len]+"]"+e}else e="["+i.len+"]"+e;i=ctParseType(i.type)}return e=i.type+e}function getValues(t){var r,e,i;for(e=[],r=0;r<t.length;r++)i=Object.keys(t[r])[0],mod_assert.ok("value"in t[r][i]),e.push(t[r][i].value);return e}function toAbs64(t){if(void 0===t)throw new Error("missing required arg: value");if(!Array.isArray(t))throw new Error("value must be an array");if(2!=t.length)throw new Error("value must be an array of length 2");if(t[0]>=1048576)throw new Error("value would become approximated");return t[0]*Math.pow(2,32)+t[1]}function toApprox64(t){if(void 0===t)throw new Error("missing required arg: value");if(!Array.isArray(t))throw new Error("value must be an array");if(2!=t.length)throw new Error("value must be an array of length 2");return Math.pow(2,32)*t[0]+t[1]}function parseCTF(t,r){var e=new CTypeParser(r);return mod_ctf.ctfParseJson(t,e),e}var mod_ctf=require("./ctf.js"),mod_ctio=require("./ctio.js"),mod_assert=require("assert"),deftypes={uint8_t:{read:ctReadUint8,write:ctWriteUint8},uint16_t:{read:ctReadUint16,write:ctWriteUint16},uint32_t:{read:ctReadUint32,write:ctWriteUint32},uint64_t:{read:ctReadUint64,write:ctWriteUint64},int8_t:{read:ctReadSint8,write:ctWriteSint8},int16_t:{read:ctReadSint16,write:ctWriteSint16},int32_t:{read:ctReadSint32,write:ctWriteSint32},int64_t:{read:ctReadSint64,write:ctWriteSint64},"float":{read:ctReadFloat,write:ctWriteFloat},"double":{read:ctReadDouble,write:ctWriteDouble},"char":{read:ctReadChar,write:ctWriteChar},"char[]":{read:ctReadCharArray,write:ctWriteCharArray}};CTypeParser.prototype.setEndian=function(t){if("big"!=t&&"little"!=t)throw new Error("invalid endian type, must be big or little");this.endian=t},CTypeParser.prototype.getEndian=function(){return this.endian},CTypeParser.prototype.typedef=function(t,r){var e;if(void 0===t)throw new(Error("missing required typedef argument: name"));if(void 0===r)throw new(Error("missing required typedef argument: value"));if("string"!=typeof t)throw new(Error("the name of a type must be a string"));if(e=ctParseType(t),void 0!==e.len)throw new Error("Cannot have an array in the typedef name");if(t in this.types)throw new Error("typedef name already present: "+t);if("string"!=typeof r&&!(r instanceof Array))throw new Error("typedef value must either be a string or struct");if("string"==typeof r){if(e=ctParseType(r),void 0!==e.len&&isNaN(parseInt(e.len,10)))throw new(Error("typedef value must use fixed size array when outside of a struct"));this.types[t]=r}else ctCheckReq(r,this.types),this.types[t]=r},CTypeParser.prototype.lstypes=function(){var t,r={};for(t in this.types)t in deftypes||(r[t]=this.types[t]);return r},CTypeParser.prototype.resolveTypedef=function(t,r,e,i,n){var o;if(mod_assert.ok(t in this.types),"string"==typeof this.types[t]){if(o=ctParseType(this.types[t]),"read"==r)return this.readEntry(o,e,i);if("write"==r)return this.writeEntry(n,o,e,i);throw new Error("invalid dispatch type to resolveTypedef")}if("read"==r)return this.readStruct(this.types[t],e,i);if("write"==r)return this.writeStruct(n,this.types[t],e,i);throw new Error("invalid dispatch type to resolveTypedef")},CTypeParser.prototype.readEntry=function(t,r,e){var i,n;if(void 0!==t.len){if(n=parseInt(t.len,10),isNaN(n))throw new Error("somehow got a non-numeric length");i="char"==t.type?this.types["char[]"].read(n,this.endian,r,e):this.readArray(t.type,n,r,e)}else i=t.type in deftypes?this.types[t.type].read(this.endian,r,e):this.resolveTypedef(t.type,"read",r,e);return i},CTypeParser.prototype.readArray=function(t,r,e,i){var n,o,a,s=i,u=new Array(r);for(a=ctParseType(t),n=0;r>n;n++)o=this.readEntry(a,e,i),i+=o.size,u[n]=o.value;return{value:u,size:i-s}},CTypeParser.prototype.readStruct=function(t,r,e){var i,n,o,a,s,u=e,c={};for(n=0;n<t.length;n++)s=Object.keys(t[n])[0],a=t[n][s],o=ctParseType(ctResolveArray(a.type,c)),"offset"in a&&(e=u+a.offset),i=this.readEntry(o,r,e),e+=i.size,c[s]=i.value;return{value:c,size:e-u}},CTypeParser.prototype.readData=function(t,r,e){if(void 0===t)throw new Error("missing definition for what we should beparsing");if(void 0===r)throw new Error("missing buffer for what we should be parsing");if(void 0===e)throw new Error("missing offset for what we should be parsing");return ctCheckReq(t,this.types),this.readStruct(t,r,e).value},CTypeParser.prototype.writeArray=function(t,r,e,i,n){var o,a,s=n;if(!(t instanceof Array))throw new Error("asked to write an array, but value is not an array");if(t.length!=e)throw new Error("asked to write array of length "+e+" but that does not match value length: "+t.length);for(a=ctParseType(r),o=0;e>o;o++)n+=this.writeEntry(t[o],a,i,n);return n-s},CTypeParser.prototype.writeEntry=function(t,r,e,i){var n,o;if(void 0!==r.len){if(n=parseInt(r.len,10),isNaN(n))throw new Error("somehow got a non-numeric length");o="char"==r.type?this.types["char[]"].write(t,n,this.endian,e,i):this.writeArray(t,r.type,n,e,i)}else o=r.type in deftypes?this.types[r.type].write(t,this.endian,e,i):this.resolveTypedef(r.type,"write",e,i,t);return o},CTypeParser.prototype.writeStruct=function(t,r,e,i){var n,o,a,s,u=i,c={};for(n=0;n<r.length;n++)s=Object.keys(r[n])[0],o=r[n][s],a=ctParseType(ctResolveArray(o.type,c)),"offset"in o&&(i=u+o.offset),i+=this.writeEntry(t[n],a,e,i),c[s]=t[n];return i},CTypeParser.prototype.writeData=function(t,r,e,i){var n;if(void 0===t)throw new Error("missing definition for what we should beparsing");if(void 0===r)throw new Error("missing buffer for what we should be parsing");if(void 0===e)throw new Error("missing offset for what we should be parsing");if(n=null!=i&&void 0!=i){if(!Array.isArray(i))throw new Error("missing values for writing");ctCheckReq(t,this.types)}else ctCheckReq(t,this.types,["value"]);this.writeStruct(n?i:getValues(t),t,r,e)},exports.Parser=CTypeParser,exports.toAbs64=toAbs64,exports.toApprox64=toApprox64,exports.parseCTF=parseCTF,exports.ruint8=mod_ctio.ruint8,exports.ruint16=mod_ctio.ruint16,exports.ruint32=mod_ctio.ruint32,exports.ruint64=mod_ctio.ruint64,exports.wuint8=mod_ctio.wuint8,exports.wuint16=mod_ctio.wuint16,exports.wuint32=mod_ctio.wuint32,exports.wuint64=mod_ctio.wuint64,exports.rsint8=mod_ctio.rsint8,exports.rsint16=mod_ctio.rsint16,exports.rsint32=mod_ctio.rsint32,exports.rsint64=mod_ctio.rsint64,exports.wsint8=mod_ctio.wsint8,exports.wsint16=mod_ctio.wsint16,exports.wsint32=mod_ctio.wsint32,exports.wsint64=mod_ctio.wsint64,exports.rfloat=mod_ctio.rfloat,exports.rdouble=mod_ctio.rdouble,exports.wfloat=mod_ctio.wfloat,exports.wdouble=mod_ctio.wdouble;


}).call(this,require("buffer").Buffer)

},{"./ctf.js":306,"./ctio.js":307,"assert":2,"buffer":17}],309:[function(require,module,exports){
function isStream(e){return e instanceof stream.Stream}function isReadable(e){return isStream(e)&&"function"==typeof e._read&&"object"==typeof e._readableState}function isWritable(e){return isStream(e)&&"function"==typeof e._write&&"object"==typeof e._writableState}function isDuplex(e){return isReadable(e)&&isWritable(e)}var stream=require("stream");module.exports=isStream,module.exports.isReadable=isReadable,module.exports.isWritable=isWritable,module.exports.isDuplex=isDuplex;


},{"stream":180}],310:[function(require,module,exports){
function getSerialize(i,t){var e=[],r=[];return t=t||function(i,t){return"[Circular "+getPath(t,e,r)+"]"},function(n,u){var f=u;return"object"==typeof u&&u&&(-1!==e.indexOf(u)?f=t(n,u):(e.push(u),r.push(n))),i&&(f=i(n,f)),f}}function getPath(i,t,e){var r=t.indexOf(i),n=[e[r]];for(r--;r>=0;r--)t[r][n[0]]===i&&(i=t[r],n.unshift(e[r]));return"~"+n.join(".")}function stringify(i,t,e,r){return JSON.stringify(i,getSerialize(t,r),e)}module.exports=stringify,stringify.getSerialize=getSerialize;


},{}],311:[function(require,module,exports){
var db=require("mime-db");exports.types=Object.create(null),exports.extensions=Object.create(null),Object.keys(db).forEach(function(e){var t=db[e],r=t.extensions;r&&r.length&&(exports.extensions[e]=r,r.forEach(function(t){exports.types[t]=e}))}),exports.lookup=function(e){return e&&"string"==typeof e?(e=e.replace(/.*[\.\/\\]/,"").toLowerCase(),e?exports.types[e]||!1:!1):!1},exports.extension=function(e){if(!e||"string"!=typeof e)return!1;if(e=e.match(/^\s*([^;\s]*)(?:;|\s|$)/),!e)return!1;var t=exports.extensions[e[1].toLowerCase()];return t&&t.length?t[0]:!1},exports.charset=function(e){var t=db[e];return t&&t.charset?t.charset:/^text\//.test(e)?"UTF-8":!1},exports.charsets={lookup:exports.charset},exports.contentType=function(e){if(!e||"string"!=typeof e)return!1;if(~e.indexOf("/")||(e=exports.lookup(e)),!e)return!1;if(!~e.indexOf("charset")){var t=exports.charset(e);t&&(e+="; charset="+t.toLowerCase())}return e};


},{"mime-db":313}],312:[function(require,module,exports){
module.exports={
  "application/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    "source": "iana"
  },
  "application/3gpp-ims+xml": {
    "source": "iana"
  },
  "application/a2l": {
    "source": "iana"
  },
  "application/activemessage": {
    "source": "iana"
  },
  "application/alto-costmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-costmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-directory+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcost+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointcostparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointprop+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-endpointpropparams+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-error+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/alto-networkmapfilter+json": {
    "source": "iana",
    "compressible": true
  },
  "application/aml": {
    "source": "iana"
  },
  "application/andrew-inset": {
    "source": "iana",
    "extensions": ["ez"]
  },
  "application/applefile": {
    "source": "iana"
  },
  "application/applixware": {
    "source": "apache",
    "extensions": ["aw"]
  },
  "application/atf": {
    "source": "iana"
  },
  "application/atfx": {
    "source": "iana"
  },
  "application/atom+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atom"]
  },
  "application/atomcat+xml": {
    "source": "iana",
    "extensions": ["atomcat"]
  },
  "application/atomdeleted+xml": {
    "source": "iana"
  },
  "application/atomicmail": {
    "source": "iana"
  },
  "application/atomsvc+xml": {
    "source": "iana",
    "extensions": ["atomsvc"]
  },
  "application/atxml": {
    "source": "iana"
  },
  "application/auth-policy+xml": {
    "source": "iana"
  },
  "application/bacnet-xdd+zip": {
    "source": "iana"
  },
  "application/batch-smtp": {
    "source": "iana"
  },
  "application/beep+xml": {
    "source": "iana"
  },
  "application/calendar+json": {
    "source": "iana",
    "compressible": true
  },
  "application/calendar+xml": {
    "source": "iana"
  },
  "application/call-completion": {
    "source": "iana"
  },
  "application/cals-1840": {
    "source": "iana"
  },
  "application/cbor": {
    "source": "iana"
  },
  "application/ccmp+xml": {
    "source": "iana"
  },
  "application/ccxml+xml": {
    "source": "iana",
    "extensions": ["ccxml"]
  },
  "application/cdfx+xml": {
    "source": "iana"
  },
  "application/cdmi-capability": {
    "source": "iana",
    "extensions": ["cdmia"]
  },
  "application/cdmi-container": {
    "source": "iana",
    "extensions": ["cdmic"]
  },
  "application/cdmi-domain": {
    "source": "iana",
    "extensions": ["cdmid"]
  },
  "application/cdmi-object": {
    "source": "iana",
    "extensions": ["cdmio"]
  },
  "application/cdmi-queue": {
    "source": "iana",
    "extensions": ["cdmiq"]
  },
  "application/cea": {
    "source": "iana"
  },
  "application/cea-2018+xml": {
    "source": "iana"
  },
  "application/cellml+xml": {
    "source": "iana"
  },
  "application/cfw": {
    "source": "iana"
  },
  "application/cms": {
    "source": "iana"
  },
  "application/cnrp+xml": {
    "source": "iana"
  },
  "application/coap-group+json": {
    "source": "iana",
    "compressible": true
  },
  "application/commonground": {
    "source": "iana"
  },
  "application/conference-info+xml": {
    "source": "iana"
  },
  "application/cpl+xml": {
    "source": "iana"
  },
  "application/csrattrs": {
    "source": "iana"
  },
  "application/csta+xml": {
    "source": "iana"
  },
  "application/cstadata+xml": {
    "source": "iana"
  },
  "application/cu-seeme": {
    "source": "apache",
    "extensions": ["cu"]
  },
  "application/cybercash": {
    "source": "iana"
  },
  "application/dart": {
    "compressible": true
  },
  "application/dash+xml": {
    "source": "iana",
    "extensions": ["mdp"]
  },
  "application/dashdelta": {
    "source": "iana"
  },
  "application/davmount+xml": {
    "source": "iana",
    "extensions": ["davmount"]
  },
  "application/dca-rft": {
    "source": "iana"
  },
  "application/dcd": {
    "source": "iana"
  },
  "application/dec-dx": {
    "source": "iana"
  },
  "application/dialog-info+xml": {
    "source": "iana"
  },
  "application/dicom": {
    "source": "iana"
  },
  "application/dii": {
    "source": "iana"
  },
  "application/dit": {
    "source": "iana"
  },
  "application/dns": {
    "source": "iana"
  },
  "application/docbook+xml": {
    "source": "apache",
    "extensions": ["dbk"]
  },
  "application/dskpp+xml": {
    "source": "iana"
  },
  "application/dssc+der": {
    "source": "iana",
    "extensions": ["dssc"]
  },
  "application/dssc+xml": {
    "source": "iana",
    "extensions": ["xdssc"]
  },
  "application/dvcs": {
    "source": "iana"
  },
  "application/ecmascript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ecma"]
  },
  "application/edi-consent": {
    "source": "iana"
  },
  "application/edi-x12": {
    "source": "iana",
    "compressible": false
  },
  "application/edifact": {
    "source": "iana",
    "compressible": false
  },
  "application/emma+xml": {
    "source": "iana",
    "extensions": ["emma"]
  },
  "application/emotionml+xml": {
    "source": "iana"
  },
  "application/encaprtp": {
    "source": "iana"
  },
  "application/epp+xml": {
    "source": "iana"
  },
  "application/epub+zip": {
    "source": "iana",
    "extensions": ["epub"]
  },
  "application/eshop": {
    "source": "iana"
  },
  "application/exi": {
    "source": "iana",
    "extensions": ["exi"]
  },
  "application/fastinfoset": {
    "source": "iana"
  },
  "application/fastsoap": {
    "source": "iana"
  },
  "application/fdt+xml": {
    "source": "iana"
  },
  "application/fits": {
    "source": "iana"
  },
  "application/font-sfnt": {
    "source": "iana"
  },
  "application/font-tdpfr": {
    "source": "iana",
    "extensions": ["pfr"]
  },
  "application/font-woff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["woff"]
  },
  "application/font-woff2": {
    "compressible": false,
    "extensions": ["woff2"]
  },
  "application/framework-attributes+xml": {
    "source": "iana"
  },
  "application/gml+xml": {
    "source": "apache",
    "extensions": ["gml"]
  },
  "application/gpx+xml": {
    "source": "apache",
    "extensions": ["gpx"]
  },
  "application/gxf": {
    "source": "apache",
    "extensions": ["gxf"]
  },
  "application/gzip": {
    "source": "iana",
    "compressible": false
  },
  "application/h224": {
    "source": "iana"
  },
  "application/held+xml": {
    "source": "iana"
  },
  "application/http": {
    "source": "iana"
  },
  "application/hyperstudio": {
    "source": "iana",
    "extensions": ["stk"]
  },
  "application/ibe-key-request+xml": {
    "source": "iana"
  },
  "application/ibe-pkg-reply+xml": {
    "source": "iana"
  },
  "application/ibe-pp-data": {
    "source": "iana"
  },
  "application/iges": {
    "source": "iana"
  },
  "application/im-iscomposing+xml": {
    "source": "iana"
  },
  "application/index": {
    "source": "iana"
  },
  "application/index.cmd": {
    "source": "iana"
  },
  "application/index.obj": {
    "source": "iana"
  },
  "application/index.response": {
    "source": "iana"
  },
  "application/index.vnd": {
    "source": "iana"
  },
  "application/inkml+xml": {
    "source": "iana",
    "extensions": ["ink","inkml"]
  },
  "application/iotp": {
    "source": "iana"
  },
  "application/ipfix": {
    "source": "iana",
    "extensions": ["ipfix"]
  },
  "application/ipp": {
    "source": "iana"
  },
  "application/isup": {
    "source": "iana"
  },
  "application/its+xml": {
    "source": "iana"
  },
  "application/java-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jar"]
  },
  "application/java-serialized-object": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ser"]
  },
  "application/java-vm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["class"]
  },
  "application/javascript": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["js"]
  },
  "application/jose": {
    "source": "iana"
  },
  "application/jose+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jrd+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["json","map"]
  },
  "application/json-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/json-seq": {
    "source": "iana"
  },
  "application/json5": {
    "extensions": ["json5"]
  },
  "application/jsonml+json": {
    "source": "apache",
    "compressible": true,
    "extensions": ["jsonml"]
  },
  "application/jwk+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwk-set+json": {
    "source": "iana",
    "compressible": true
  },
  "application/jwt": {
    "source": "iana"
  },
  "application/kpml-request+xml": {
    "source": "iana"
  },
  "application/kpml-response+xml": {
    "source": "iana"
  },
  "application/ld+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["jsonld"]
  },
  "application/link-format": {
    "source": "iana"
  },
  "application/load-control+xml": {
    "source": "iana"
  },
  "application/lost+xml": {
    "source": "iana",
    "extensions": ["lostxml"]
  },
  "application/lostsync+xml": {
    "source": "iana"
  },
  "application/lxf": {
    "source": "iana"
  },
  "application/mac-binhex40": {
    "source": "iana",
    "extensions": ["hqx"]
  },
  "application/mac-compactpro": {
    "source": "apache",
    "extensions": ["cpt"]
  },
  "application/macwriteii": {
    "source": "iana"
  },
  "application/mads+xml": {
    "source": "iana",
    "extensions": ["mads"]
  },
  "application/marc": {
    "source": "iana",
    "extensions": ["mrc"]
  },
  "application/marcxml+xml": {
    "source": "iana",
    "extensions": ["mrcx"]
  },
  "application/mathematica": {
    "source": "iana",
    "extensions": ["ma","nb","mb"]
  },
  "application/mathml+xml": {
    "source": "iana",
    "extensions": ["mathml"]
  },
  "application/mathml-content+xml": {
    "source": "iana"
  },
  "application/mathml-presentation+xml": {
    "source": "iana"
  },
  "application/mbms-associated-procedure-description+xml": {
    "source": "iana"
  },
  "application/mbms-deregister+xml": {
    "source": "iana"
  },
  "application/mbms-envelope+xml": {
    "source": "iana"
  },
  "application/mbms-msk+xml": {
    "source": "iana"
  },
  "application/mbms-msk-response+xml": {
    "source": "iana"
  },
  "application/mbms-protection-description+xml": {
    "source": "iana"
  },
  "application/mbms-reception-report+xml": {
    "source": "iana"
  },
  "application/mbms-register+xml": {
    "source": "iana"
  },
  "application/mbms-register-response+xml": {
    "source": "iana"
  },
  "application/mbms-schedule+xml": {
    "source": "iana"
  },
  "application/mbms-user-service-description+xml": {
    "source": "iana"
  },
  "application/mbox": {
    "source": "iana",
    "extensions": ["mbox"]
  },
  "application/media-policy-dataset+xml": {
    "source": "iana"
  },
  "application/media_control+xml": {
    "source": "iana"
  },
  "application/mediaservercontrol+xml": {
    "source": "iana",
    "extensions": ["mscml"]
  },
  "application/merge-patch+json": {
    "source": "iana",
    "compressible": true
  },
  "application/metalink+xml": {
    "source": "apache",
    "extensions": ["metalink"]
  },
  "application/metalink4+xml": {
    "source": "iana",
    "extensions": ["meta4"]
  },
  "application/mets+xml": {
    "source": "iana",
    "extensions": ["mets"]
  },
  "application/mf4": {
    "source": "iana"
  },
  "application/mikey": {
    "source": "iana"
  },
  "application/mods+xml": {
    "source": "iana",
    "extensions": ["mods"]
  },
  "application/moss-keys": {
    "source": "iana"
  },
  "application/moss-signature": {
    "source": "iana"
  },
  "application/mosskey-data": {
    "source": "iana"
  },
  "application/mosskey-request": {
    "source": "iana"
  },
  "application/mp21": {
    "source": "iana",
    "extensions": ["m21","mp21"]
  },
  "application/mp4": {
    "source": "iana",
    "extensions": ["mp4s","m4p"]
  },
  "application/mpeg4-generic": {
    "source": "iana"
  },
  "application/mpeg4-iod": {
    "source": "iana"
  },
  "application/mpeg4-iod-xmt": {
    "source": "iana"
  },
  "application/mrb-consumer+xml": {
    "source": "iana"
  },
  "application/mrb-publish+xml": {
    "source": "iana"
  },
  "application/msc-ivr+xml": {
    "source": "iana"
  },
  "application/msc-mixer+xml": {
    "source": "iana"
  },
  "application/msword": {
    "source": "iana",
    "compressible": false,
    "extensions": ["doc","dot"]
  },
  "application/mxf": {
    "source": "iana",
    "extensions": ["mxf"]
  },
  "application/nasdata": {
    "source": "iana"
  },
  "application/news-checkgroups": {
    "source": "iana"
  },
  "application/news-groupinfo": {
    "source": "iana"
  },
  "application/news-transmission": {
    "source": "iana"
  },
  "application/nlsml+xml": {
    "source": "iana"
  },
  "application/nss": {
    "source": "iana"
  },
  "application/ocsp-request": {
    "source": "iana"
  },
  "application/ocsp-response": {
    "source": "iana"
  },
  "application/octet-stream": {
    "source": "iana",
    "compressible": false,
    "extensions": ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"]
  },
  "application/oda": {
    "source": "iana",
    "extensions": ["oda"]
  },
  "application/odx": {
    "source": "iana"
  },
  "application/oebps-package+xml": {
    "source": "iana",
    "extensions": ["opf"]
  },
  "application/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogx"]
  },
  "application/omdoc+xml": {
    "source": "apache",
    "extensions": ["omdoc"]
  },
  "application/onenote": {
    "source": "apache",
    "extensions": ["onetoc","onetoc2","onetmp","onepkg"]
  },
  "application/oxps": {
    "source": "iana",
    "extensions": ["oxps"]
  },
  "application/p2p-overlay+xml": {
    "source": "iana"
  },
  "application/parityfec": {
    "source": "iana"
  },
  "application/patch-ops-error+xml": {
    "source": "iana",
    "extensions": ["xer"]
  },
  "application/pdf": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pdf"]
  },
  "application/pdx": {
    "source": "iana"
  },
  "application/pgp-encrypted": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pgp"]
  },
  "application/pgp-keys": {
    "source": "iana"
  },
  "application/pgp-signature": {
    "source": "iana",
    "extensions": ["asc","sig"]
  },
  "application/pics-rules": {
    "source": "apache",
    "extensions": ["prf"]
  },
  "application/pidf+xml": {
    "source": "iana"
  },
  "application/pidf-diff+xml": {
    "source": "iana"
  },
  "application/pkcs10": {
    "source": "iana",
    "extensions": ["p10"]
  },
  "application/pkcs7-mime": {
    "source": "iana",
    "extensions": ["p7m","p7c"]
  },
  "application/pkcs7-signature": {
    "source": "iana",
    "extensions": ["p7s"]
  },
  "application/pkcs8": {
    "source": "iana",
    "extensions": ["p8"]
  },
  "application/pkix-attr-cert": {
    "source": "iana",
    "extensions": ["ac"]
  },
  "application/pkix-cert": {
    "source": "iana",
    "extensions": ["cer"]
  },
  "application/pkix-crl": {
    "source": "iana",
    "extensions": ["crl"]
  },
  "application/pkix-pkipath": {
    "source": "iana",
    "extensions": ["pkipath"]
  },
  "application/pkixcmp": {
    "source": "iana",
    "extensions": ["pki"]
  },
  "application/pls+xml": {
    "source": "iana",
    "extensions": ["pls"]
  },
  "application/poc-settings+xml": {
    "source": "iana"
  },
  "application/postscript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ai","eps","ps"]
  },
  "application/provenance+xml": {
    "source": "iana"
  },
  "application/prs.alvestrand.titrax-sheet": {
    "source": "iana"
  },
  "application/prs.cww": {
    "source": "iana",
    "extensions": ["cww"]
  },
  "application/prs.hpub+zip": {
    "source": "iana"
  },
  "application/prs.nprend": {
    "source": "iana"
  },
  "application/prs.plucker": {
    "source": "iana"
  },
  "application/prs.rdf-xml-crypt": {
    "source": "iana"
  },
  "application/prs.xsf+xml": {
    "source": "iana"
  },
  "application/pskc+xml": {
    "source": "iana",
    "extensions": ["pskcxml"]
  },
  "application/qsig": {
    "source": "iana"
  },
  "application/raptorfec": {
    "source": "iana"
  },
  "application/rdap+json": {
    "source": "iana",
    "compressible": true
  },
  "application/rdf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rdf"]
  },
  "application/reginfo+xml": {
    "source": "iana",
    "extensions": ["rif"]
  },
  "application/relax-ng-compact-syntax": {
    "source": "iana",
    "extensions": ["rnc"]
  },
  "application/remote-printing": {
    "source": "iana"
  },
  "application/reputon+json": {
    "source": "iana",
    "compressible": true
  },
  "application/resource-lists+xml": {
    "source": "iana",
    "extensions": ["rl"]
  },
  "application/resource-lists-diff+xml": {
    "source": "iana",
    "extensions": ["rld"]
  },
  "application/riscos": {
    "source": "iana"
  },
  "application/rlmi+xml": {
    "source": "iana"
  },
  "application/rls-services+xml": {
    "source": "iana",
    "extensions": ["rs"]
  },
  "application/rpki-ghostbusters": {
    "source": "iana",
    "extensions": ["gbr"]
  },
  "application/rpki-manifest": {
    "source": "iana",
    "extensions": ["mft"]
  },
  "application/rpki-roa": {
    "source": "iana",
    "extensions": ["roa"]
  },
  "application/rpki-updown": {
    "source": "iana"
  },
  "application/rsd+xml": {
    "source": "apache",
    "extensions": ["rsd"]
  },
  "application/rss+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rss"]
  },
  "application/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"]
  },
  "application/rtploopback": {
    "source": "iana"
  },
  "application/rtx": {
    "source": "iana"
  },
  "application/samlassertion+xml": {
    "source": "iana"
  },
  "application/samlmetadata+xml": {
    "source": "iana"
  },
  "application/sbml+xml": {
    "source": "iana",
    "extensions": ["sbml"]
  },
  "application/scaip+xml": {
    "source": "iana"
  },
  "application/scvp-cv-request": {
    "source": "iana",
    "extensions": ["scq"]
  },
  "application/scvp-cv-response": {
    "source": "iana",
    "extensions": ["scs"]
  },
  "application/scvp-vp-request": {
    "source": "iana",
    "extensions": ["spq"]
  },
  "application/scvp-vp-response": {
    "source": "iana",
    "extensions": ["spp"]
  },
  "application/sdp": {
    "source": "iana",
    "extensions": ["sdp"]
  },
  "application/sep+xml": {
    "source": "iana"
  },
  "application/sep-exi": {
    "source": "iana"
  },
  "application/session-info": {
    "source": "iana"
  },
  "application/set-payment": {
    "source": "iana"
  },
  "application/set-payment-initiation": {
    "source": "iana",
    "extensions": ["setpay"]
  },
  "application/set-registration": {
    "source": "iana"
  },
  "application/set-registration-initiation": {
    "source": "iana",
    "extensions": ["setreg"]
  },
  "application/sgml": {
    "source": "iana"
  },
  "application/sgml-open-catalog": {
    "source": "iana"
  },
  "application/shf+xml": {
    "source": "iana",
    "extensions": ["shf"]
  },
  "application/sieve": {
    "source": "iana"
  },
  "application/simple-filter+xml": {
    "source": "iana"
  },
  "application/simple-message-summary": {
    "source": "iana"
  },
  "application/simplesymbolcontainer": {
    "source": "iana"
  },
  "application/slate": {
    "source": "iana"
  },
  "application/smil": {
    "source": "iana"
  },
  "application/smil+xml": {
    "source": "iana",
    "extensions": ["smi","smil"]
  },
  "application/smpte336m": {
    "source": "iana"
  },
  "application/soap+fastinfoset": {
    "source": "iana"
  },
  "application/soap+xml": {
    "source": "iana",
    "compressible": true
  },
  "application/sparql-query": {
    "source": "iana",
    "extensions": ["rq"]
  },
  "application/sparql-results+xml": {
    "source": "iana",
    "extensions": ["srx"]
  },
  "application/spirits-event+xml": {
    "source": "iana"
  },
  "application/sql": {
    "source": "iana"
  },
  "application/srgs": {
    "source": "iana",
    "extensions": ["gram"]
  },
  "application/srgs+xml": {
    "source": "iana",
    "extensions": ["grxml"]
  },
  "application/sru+xml": {
    "source": "iana",
    "extensions": ["sru"]
  },
  "application/ssdl+xml": {
    "source": "apache",
    "extensions": ["ssdl"]
  },
  "application/ssml+xml": {
    "source": "iana",
    "extensions": ["ssml"]
  },
  "application/tamp-apex-update": {
    "source": "iana"
  },
  "application/tamp-apex-update-confirm": {
    "source": "iana"
  },
  "application/tamp-community-update": {
    "source": "iana"
  },
  "application/tamp-community-update-confirm": {
    "source": "iana"
  },
  "application/tamp-error": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust": {
    "source": "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    "source": "iana"
  },
  "application/tamp-status-query": {
    "source": "iana"
  },
  "application/tamp-status-response": {
    "source": "iana"
  },
  "application/tamp-update": {
    "source": "iana"
  },
  "application/tamp-update-confirm": {
    "source": "iana"
  },
  "application/tar": {
    "compressible": true
  },
  "application/tei+xml": {
    "source": "iana",
    "extensions": ["tei","teicorpus"]
  },
  "application/thraud+xml": {
    "source": "iana",
    "extensions": ["tfi"]
  },
  "application/timestamp-query": {
    "source": "iana"
  },
  "application/timestamp-reply": {
    "source": "iana"
  },
  "application/timestamped-data": {
    "source": "iana",
    "extensions": ["tsd"]
  },
  "application/ttml+xml": {
    "source": "iana"
  },
  "application/tve-trigger": {
    "source": "iana"
  },
  "application/ulpfec": {
    "source": "iana"
  },
  "application/urc-grpsheet+xml": {
    "source": "iana"
  },
  "application/urc-ressheet+xml": {
    "source": "iana"
  },
  "application/urc-targetdesc+xml": {
    "source": "iana"
  },
  "application/urc-uisocketdesc+xml": {
    "source": "iana"
  },
  "application/vcard+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vcard+xml": {
    "source": "iana"
  },
  "application/vemmi": {
    "source": "iana"
  },
  "application/vividence.scriptfile": {
    "source": "apache"
  },
  "application/vnd.3gpp.bsf+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    "source": "iana",
    "extensions": ["plb"]
  },
  "application/vnd.3gpp.pic-bw-small": {
    "source": "iana",
    "extensions": ["psb"]
  },
  "application/vnd.3gpp.pic-bw-var": {
    "source": "iana",
    "extensions": ["pvb"]
  },
  "application/vnd.3gpp.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    "source": "iana"
  },
  "application/vnd.3gpp2.sms": {
    "source": "iana"
  },
  "application/vnd.3gpp2.tcap": {
    "source": "iana",
    "extensions": ["tcap"]
  },
  "application/vnd.3m.post-it-notes": {
    "source": "iana",
    "extensions": ["pwn"]
  },
  "application/vnd.accpac.simply.aso": {
    "source": "iana",
    "extensions": ["aso"]
  },
  "application/vnd.accpac.simply.imp": {
    "source": "iana",
    "extensions": ["imp"]
  },
  "application/vnd.acucobol": {
    "source": "iana",
    "extensions": ["acu"]
  },
  "application/vnd.acucorp": {
    "source": "iana",
    "extensions": ["atc","acutc"]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    "source": "apache",
    "extensions": ["air"]
  },
  "application/vnd.adobe.flash.movie": {
    "source": "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    "source": "iana",
    "extensions": ["fcdt"]
  },
  "application/vnd.adobe.fxp": {
    "source": "iana",
    "extensions": ["fxp","fxpl"]
  },
  "application/vnd.adobe.partial-upload": {
    "source": "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    "source": "iana",
    "extensions": ["xdp"]
  },
  "application/vnd.adobe.xfdf": {
    "source": "iana",
    "extensions": ["xfdf"]
  },
  "application/vnd.aether.imp": {
    "source": "iana"
  },
  "application/vnd.ah-barcode": {
    "source": "iana"
  },
  "application/vnd.ahead.space": {
    "source": "iana",
    "extensions": ["ahead"]
  },
  "application/vnd.airzip.filesecure.azf": {
    "source": "iana",
    "extensions": ["azf"]
  },
  "application/vnd.airzip.filesecure.azs": {
    "source": "iana",
    "extensions": ["azs"]
  },
  "application/vnd.amazon.ebook": {
    "source": "apache",
    "extensions": ["azw"]
  },
  "application/vnd.americandynamics.acc": {
    "source": "iana",
    "extensions": ["acc"]
  },
  "application/vnd.amiga.ami": {
    "source": "iana",
    "extensions": ["ami"]
  },
  "application/vnd.amundsen.maze+xml": {
    "source": "iana"
  },
  "application/vnd.android.package-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["apk"]
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    "source": "iana",
    "extensions": ["cii"]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    "source": "apache",
    "extensions": ["fti"]
  },
  "application/vnd.antix.game-component": {
    "source": "iana",
    "extensions": ["atx"]
  },
  "application/vnd.apache.thrift.binary": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.compact": {
    "source": "iana"
  },
  "application/vnd.apache.thrift.json": {
    "source": "iana"
  },
  "application/vnd.api+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.apple.installer+xml": {
    "source": "iana",
    "extensions": ["mpkg"]
  },
  "application/vnd.apple.mpegurl": {
    "source": "iana",
    "extensions": ["m3u8"]
  },
  "application/vnd.arastra.swi": {
    "source": "iana"
  },
  "application/vnd.aristanetworks.swi": {
    "source": "iana",
    "extensions": ["swi"]
  },
  "application/vnd.artsquare": {
    "source": "iana"
  },
  "application/vnd.astraea-software.iota": {
    "source": "iana",
    "extensions": ["iota"]
  },
  "application/vnd.audiograph": {
    "source": "iana",
    "extensions": ["aep"]
  },
  "application/vnd.autopackage": {
    "source": "iana"
  },
  "application/vnd.avistar+xml": {
    "source": "iana"
  },
  "application/vnd.balsamiq.bmml+xml": {
    "source": "iana"
  },
  "application/vnd.bekitzur-stech+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.blueice.multipass": {
    "source": "iana",
    "extensions": ["mpm"]
  },
  "application/vnd.bluetooth.ep.oob": {
    "source": "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    "source": "iana"
  },
  "application/vnd.bmi": {
    "source": "iana",
    "extensions": ["bmi"]
  },
  "application/vnd.businessobjects": {
    "source": "iana",
    "extensions": ["rep"]
  },
  "application/vnd.cab-jscript": {
    "source": "iana"
  },
  "application/vnd.canon-cpdl": {
    "source": "iana"
  },
  "application/vnd.canon-lips": {
    "source": "iana"
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    "source": "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    "source": "iana"
  },
  "application/vnd.chemdraw+xml": {
    "source": "iana",
    "extensions": ["cdxml"]
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    "source": "iana",
    "extensions": ["mmd"]
  },
  "application/vnd.cinderella": {
    "source": "iana",
    "extensions": ["cdy"]
  },
  "application/vnd.cirpack.isdn-ext": {
    "source": "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    "source": "iana"
  },
  "application/vnd.claymore": {
    "source": "iana",
    "extensions": ["cla"]
  },
  "application/vnd.cloanto.rp9": {
    "source": "iana",
    "extensions": ["rp9"]
  },
  "application/vnd.clonk.c4group": {
    "source": "iana",
    "extensions": ["c4g","c4d","c4f","c4p","c4u"]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    "source": "iana",
    "extensions": ["c11amc"]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    "source": "iana",
    "extensions": ["c11amz"]
  },
  "application/vnd.coffeescript": {
    "source": "iana"
  },
  "application/vnd.collection+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.doc+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.collection.next+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.commerce-battelle": {
    "source": "iana"
  },
  "application/vnd.commonspace": {
    "source": "iana",
    "extensions": ["csp"]
  },
  "application/vnd.contact.cmsg": {
    "source": "iana",
    "extensions": ["cdbcmsg"]
  },
  "application/vnd.cosmocaller": {
    "source": "iana",
    "extensions": ["cmc"]
  },
  "application/vnd.crick.clicker": {
    "source": "iana",
    "extensions": ["clkx"]
  },
  "application/vnd.crick.clicker.keyboard": {
    "source": "iana",
    "extensions": ["clkk"]
  },
  "application/vnd.crick.clicker.palette": {
    "source": "iana",
    "extensions": ["clkp"]
  },
  "application/vnd.crick.clicker.template": {
    "source": "iana",
    "extensions": ["clkt"]
  },
  "application/vnd.crick.clicker.wordbank": {
    "source": "iana",
    "extensions": ["clkw"]
  },
  "application/vnd.criticaltools.wbs+xml": {
    "source": "iana",
    "extensions": ["wbs"]
  },
  "application/vnd.ctc-posml": {
    "source": "iana",
    "extensions": ["pml"]
  },
  "application/vnd.ctct.ws+xml": {
    "source": "iana"
  },
  "application/vnd.cups-pdf": {
    "source": "iana"
  },
  "application/vnd.cups-postscript": {
    "source": "iana"
  },
  "application/vnd.cups-ppd": {
    "source": "iana",
    "extensions": ["ppd"]
  },
  "application/vnd.cups-raster": {
    "source": "iana"
  },
  "application/vnd.cups-raw": {
    "source": "iana"
  },
  "application/vnd.curl": {
    "source": "iana"
  },
  "application/vnd.curl.car": {
    "source": "apache",
    "extensions": ["car"]
  },
  "application/vnd.curl.pcurl": {
    "source": "apache",
    "extensions": ["pcurl"]
  },
  "application/vnd.cyan.dean.root+xml": {
    "source": "iana"
  },
  "application/vnd.cybank": {
    "source": "iana"
  },
  "application/vnd.dart": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dart"]
  },
  "application/vnd.data-vision.rdz": {
    "source": "iana",
    "extensions": ["rdz"]
  },
  "application/vnd.debian.binary-package": {
    "source": "iana"
  },
  "application/vnd.dece.data": {
    "source": "iana",
    "extensions": ["uvf","uvvf","uvd","uvvd"]
  },
  "application/vnd.dece.ttml+xml": {
    "source": "iana",
    "extensions": ["uvt","uvvt"]
  },
  "application/vnd.dece.unspecified": {
    "source": "iana",
    "extensions": ["uvx","uvvx"]
  },
  "application/vnd.dece.zip": {
    "source": "iana",
    "extensions": ["uvz","uvvz"]
  },
  "application/vnd.denovo.fcselayout-link": {
    "source": "iana",
    "extensions": ["fe_launch"]
  },
  "application/vnd.desmume-movie": {
    "source": "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    "source": "iana"
  },
  "application/vnd.dm.delegation+xml": {
    "source": "iana"
  },
  "application/vnd.dna": {
    "source": "iana",
    "extensions": ["dna"]
  },
  "application/vnd.document+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.dolby.mlp": {
    "source": "apache",
    "extensions": ["mlp"]
  },
  "application/vnd.dolby.mobile.1": {
    "source": "iana"
  },
  "application/vnd.dolby.mobile.2": {
    "source": "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    "source": "iana"
  },
  "application/vnd.dpgraph": {
    "source": "iana",
    "extensions": ["dpg"]
  },
  "application/vnd.dreamfactory": {
    "source": "iana",
    "extensions": ["dfac"]
  },
  "application/vnd.ds-keypoint": {
    "source": "apache",
    "extensions": ["kpxx"]
  },
  "application/vnd.dtg.local": {
    "source": "iana"
  },
  "application/vnd.dtg.local.flash": {
    "source": "iana"
  },
  "application/vnd.dtg.local.html": {
    "source": "iana"
  },
  "application/vnd.dvb.ait": {
    "source": "iana",
    "extensions": ["ait"]
  },
  "application/vnd.dvb.dvbj": {
    "source": "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    "source": "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    "source": "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-container+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-generic+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.notif-init+xml": {
    "source": "iana"
  },
  "application/vnd.dvb.pfr": {
    "source": "iana"
  },
  "application/vnd.dvb.service": {
    "source": "iana",
    "extensions": ["svc"]
  },
  "application/vnd.dxr": {
    "source": "iana"
  },
  "application/vnd.dynageo": {
    "source": "iana",
    "extensions": ["geo"]
  },
  "application/vnd.dzr": {
    "source": "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    "source": "iana"
  },
  "application/vnd.ecdis-update": {
    "source": "iana"
  },
  "application/vnd.ecowin.chart": {
    "source": "iana",
    "extensions": ["mag"]
  },
  "application/vnd.ecowin.filerequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    "source": "iana"
  },
  "application/vnd.ecowin.series": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    "source": "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    "source": "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    "source": "iana"
  },
  "application/vnd.enliven": {
    "source": "iana",
    "extensions": ["nml"]
  },
  "application/vnd.enphase.envoy": {
    "source": "iana"
  },
  "application/vnd.eprints.data+xml": {
    "source": "iana"
  },
  "application/vnd.epson.esf": {
    "source": "iana",
    "extensions": ["esf"]
  },
  "application/vnd.epson.msf": {
    "source": "iana",
    "extensions": ["msf"]
  },
  "application/vnd.epson.quickanime": {
    "source": "iana",
    "extensions": ["qam"]
  },
  "application/vnd.epson.salt": {
    "source": "iana",
    "extensions": ["slt"]
  },
  "application/vnd.epson.ssf": {
    "source": "iana",
    "extensions": ["ssf"]
  },
  "application/vnd.ericsson.quickcall": {
    "source": "iana"
  },
  "application/vnd.eszigno3+xml": {
    "source": "iana",
    "extensions": ["es3","et3"]
  },
  "application/vnd.etsi.aoc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-e+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.asic-s+zip": {
    "source": "iana"
  },
  "application/vnd.etsi.cug+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvcommand+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvservice+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvsync+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mcid+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.mheg5": {
    "source": "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.pstn+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.sci+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.simservs+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.timestamp-token": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    "source": "iana"
  },
  "application/vnd.etsi.tsl.der": {
    "source": "iana"
  },
  "application/vnd.eudora.data": {
    "source": "iana"
  },
  "application/vnd.ezpix-album": {
    "source": "iana",
    "extensions": ["ez2"]
  },
  "application/vnd.ezpix-package": {
    "source": "iana",
    "extensions": ["ez3"]
  },
  "application/vnd.f-secure.mobile": {
    "source": "iana"
  },
  "application/vnd.fastcopy-disk-image": {
    "source": "iana"
  },
  "application/vnd.fdf": {
    "source": "iana",
    "extensions": ["fdf"]
  },
  "application/vnd.fdsn.mseed": {
    "source": "iana",
    "extensions": ["mseed"]
  },
  "application/vnd.fdsn.seed": {
    "source": "iana",
    "extensions": ["seed","dataless"]
  },
  "application/vnd.ffsns": {
    "source": "iana"
  },
  "application/vnd.fints": {
    "source": "iana"
  },
  "application/vnd.flographit": {
    "source": "iana",
    "extensions": ["gph"]
  },
  "application/vnd.fluxtime.clip": {
    "source": "iana",
    "extensions": ["ftc"]
  },
  "application/vnd.font-fontforge-sfd": {
    "source": "iana"
  },
  "application/vnd.framemaker": {
    "source": "iana",
    "extensions": ["fm","frame","maker","book"]
  },
  "application/vnd.frogans.fnc": {
    "source": "iana",
    "extensions": ["fnc"]
  },
  "application/vnd.frogans.ltf": {
    "source": "iana",
    "extensions": ["ltf"]
  },
  "application/vnd.fsc.weblaunch": {
    "source": "iana",
    "extensions": ["fsc"]
  },
  "application/vnd.fujitsu.oasys": {
    "source": "iana",
    "extensions": ["oas"]
  },
  "application/vnd.fujitsu.oasys2": {
    "source": "iana",
    "extensions": ["oa2"]
  },
  "application/vnd.fujitsu.oasys3": {
    "source": "iana",
    "extensions": ["oa3"]
  },
  "application/vnd.fujitsu.oasysgp": {
    "source": "iana",
    "extensions": ["fg5"]
  },
  "application/vnd.fujitsu.oasysprs": {
    "source": "iana",
    "extensions": ["bh2"]
  },
  "application/vnd.fujixerox.art-ex": {
    "source": "iana"
  },
  "application/vnd.fujixerox.art4": {
    "source": "iana"
  },
  "application/vnd.fujixerox.ddd": {
    "source": "iana",
    "extensions": ["ddd"]
  },
  "application/vnd.fujixerox.docuworks": {
    "source": "iana",
    "extensions": ["xdw"]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    "source": "iana",
    "extensions": ["xbd"]
  },
  "application/vnd.fujixerox.docuworks.container": {
    "source": "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    "source": "iana"
  },
  "application/vnd.fut-misnet": {
    "source": "iana"
  },
  "application/vnd.fuzzysheet": {
    "source": "iana",
    "extensions": ["fzs"]
  },
  "application/vnd.genomatix.tuxedo": {
    "source": "iana",
    "extensions": ["txd"]
  },
  "application/vnd.geo+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.geocube+xml": {
    "source": "iana"
  },
  "application/vnd.geogebra.file": {
    "source": "iana",
    "extensions": ["ggb"]
  },
  "application/vnd.geogebra.tool": {
    "source": "iana",
    "extensions": ["ggt"]
  },
  "application/vnd.geometry-explorer": {
    "source": "iana",
    "extensions": ["gex","gre"]
  },
  "application/vnd.geonext": {
    "source": "iana",
    "extensions": ["gxt"]
  },
  "application/vnd.geoplan": {
    "source": "iana",
    "extensions": ["g2w"]
  },
  "application/vnd.geospace": {
    "source": "iana",
    "extensions": ["g3w"]
  },
  "application/vnd.gerber": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    "source": "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    "source": "iana"
  },
  "application/vnd.gmx": {
    "source": "iana",
    "extensions": ["gmx"]
  },
  "application/vnd.google-earth.kml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["kml"]
  },
  "application/vnd.google-earth.kmz": {
    "source": "iana",
    "compressible": false,
    "extensions": ["kmz"]
  },
  "application/vnd.gov.sk.e-form+xml": {
    "source": "iana"
  },
  "application/vnd.gov.sk.e-form+zip": {
    "source": "iana"
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    "source": "iana"
  },
  "application/vnd.grafeq": {
    "source": "iana",
    "extensions": ["gqf","gqs"]
  },
  "application/vnd.gridmp": {
    "source": "iana"
  },
  "application/vnd.groove-account": {
    "source": "iana",
    "extensions": ["gac"]
  },
  "application/vnd.groove-help": {
    "source": "iana",
    "extensions": ["ghf"]
  },
  "application/vnd.groove-identity-message": {
    "source": "iana",
    "extensions": ["gim"]
  },
  "application/vnd.groove-injector": {
    "source": "iana",
    "extensions": ["grv"]
  },
  "application/vnd.groove-tool-message": {
    "source": "iana",
    "extensions": ["gtm"]
  },
  "application/vnd.groove-tool-template": {
    "source": "iana",
    "extensions": ["tpl"]
  },
  "application/vnd.groove-vcard": {
    "source": "iana",
    "extensions": ["vcg"]
  },
  "application/vnd.hal+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hal+xml": {
    "source": "iana",
    "extensions": ["hal"]
  },
  "application/vnd.handheld-entertainment+xml": {
    "source": "iana",
    "extensions": ["zmm"]
  },
  "application/vnd.hbci": {
    "source": "iana",
    "extensions": ["hbci"]
  },
  "application/vnd.hcl-bireports": {
    "source": "iana"
  },
  "application/vnd.heroku+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.hhe.lesson-player": {
    "source": "iana",
    "extensions": ["les"]
  },
  "application/vnd.hp-hpgl": {
    "source": "iana",
    "extensions": ["hpgl"]
  },
  "application/vnd.hp-hpid": {
    "source": "iana",
    "extensions": ["hpid"]
  },
  "application/vnd.hp-hps": {
    "source": "iana",
    "extensions": ["hps"]
  },
  "application/vnd.hp-jlyt": {
    "source": "iana",
    "extensions": ["jlt"]
  },
  "application/vnd.hp-pcl": {
    "source": "iana",
    "extensions": ["pcl"]
  },
  "application/vnd.hp-pclxl": {
    "source": "iana",
    "extensions": ["pclxl"]
  },
  "application/vnd.httphone": {
    "source": "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    "source": "iana"
  },
  "application/vnd.hzn-3d-crossword": {
    "source": "iana"
  },
  "application/vnd.ibm.afplinedata": {
    "source": "iana"
  },
  "application/vnd.ibm.electronic-media": {
    "source": "iana"
  },
  "application/vnd.ibm.minipay": {
    "source": "iana",
    "extensions": ["mpy"]
  },
  "application/vnd.ibm.modcap": {
    "source": "iana",
    "extensions": ["afp","listafp","list3820"]
  },
  "application/vnd.ibm.rights-management": {
    "source": "iana",
    "extensions": ["irm"]
  },
  "application/vnd.ibm.secure-container": {
    "source": "iana",
    "extensions": ["sc"]
  },
  "application/vnd.iccprofile": {
    "source": "iana",
    "extensions": ["icc","icm"]
  },
  "application/vnd.ieee.1905": {
    "source": "iana"
  },
  "application/vnd.igloader": {
    "source": "iana",
    "extensions": ["igl"]
  },
  "application/vnd.immervision-ivp": {
    "source": "iana",
    "extensions": ["ivp"]
  },
  "application/vnd.immervision-ivu": {
    "source": "iana",
    "extensions": ["ivu"]
  },
  "application/vnd.ims.imsccv1p1": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    "source": "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    "source": "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.informedcontrol.rms+xml": {
    "source": "iana"
  },
  "application/vnd.informix-visionary": {
    "source": "iana"
  },
  "application/vnd.infotech.project": {
    "source": "iana"
  },
  "application/vnd.infotech.project+xml": {
    "source": "iana"
  },
  "application/vnd.innopath.wamp.notification": {
    "source": "iana"
  },
  "application/vnd.insors.igm": {
    "source": "iana",
    "extensions": ["igm"]
  },
  "application/vnd.intercon.formnet": {
    "source": "iana",
    "extensions": ["xpw","xpx"]
  },
  "application/vnd.intergeo": {
    "source": "iana",
    "extensions": ["i2g"]
  },
  "application/vnd.intertrust.digibox": {
    "source": "iana"
  },
  "application/vnd.intertrust.nncp": {
    "source": "iana"
  },
  "application/vnd.intu.qbo": {
    "source": "iana",
    "extensions": ["qbo"]
  },
  "application/vnd.intu.qfx": {
    "source": "iana",
    "extensions": ["qfx"]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    "source": "iana"
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    "source": "iana"
  },
  "application/vnd.ipunplugged.rcprofile": {
    "source": "iana",
    "extensions": ["rcprofile"]
  },
  "application/vnd.irepository.package+xml": {
    "source": "iana",
    "extensions": ["irp"]
  },
  "application/vnd.is-xpr": {
    "source": "iana",
    "extensions": ["xpr"]
  },
  "application/vnd.isac.fcs": {
    "source": "iana",
    "extensions": ["fcs"]
  },
  "application/vnd.jam": {
    "source": "iana",
    "extensions": ["jam"]
  },
  "application/vnd.japannet-directory-service": {
    "source": "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-registration": {
    "source": "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    "source": "iana"
  },
  "application/vnd.japannet-verification": {
    "source": "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    "source": "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    "source": "iana",
    "extensions": ["rms"]
  },
  "application/vnd.jisp": {
    "source": "iana",
    "extensions": ["jisp"]
  },
  "application/vnd.joost.joda-archive": {
    "source": "iana",
    "extensions": ["joda"]
  },
  "application/vnd.jsk.isdn-ngn": {
    "source": "iana"
  },
  "application/vnd.kahootz": {
    "source": "iana",
    "extensions": ["ktz","ktr"]
  },
  "application/vnd.kde.karbon": {
    "source": "iana",
    "extensions": ["karbon"]
  },
  "application/vnd.kde.kchart": {
    "source": "iana",
    "extensions": ["chrt"]
  },
  "application/vnd.kde.kformula": {
    "source": "iana",
    "extensions": ["kfo"]
  },
  "application/vnd.kde.kivio": {
    "source": "iana",
    "extensions": ["flw"]
  },
  "application/vnd.kde.kontour": {
    "source": "iana",
    "extensions": ["kon"]
  },
  "application/vnd.kde.kpresenter": {
    "source": "iana",
    "extensions": ["kpr","kpt"]
  },
  "application/vnd.kde.kspread": {
    "source": "iana",
    "extensions": ["ksp"]
  },
  "application/vnd.kde.kword": {
    "source": "iana",
    "extensions": ["kwd","kwt"]
  },
  "application/vnd.kenameaapp": {
    "source": "iana",
    "extensions": ["htke"]
  },
  "application/vnd.kidspiration": {
    "source": "iana",
    "extensions": ["kia"]
  },
  "application/vnd.kinar": {
    "source": "iana",
    "extensions": ["kne","knp"]
  },
  "application/vnd.koan": {
    "source": "iana",
    "extensions": ["skp","skd","skt","skm"]
  },
  "application/vnd.kodak-descriptor": {
    "source": "iana",
    "extensions": ["sse"]
  },
  "application/vnd.las.las+xml": {
    "source": "iana",
    "extensions": ["lasxml"]
  },
  "application/vnd.liberty-request+xml": {
    "source": "iana"
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    "source": "iana",
    "extensions": ["lbd"]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    "source": "iana",
    "extensions": ["lbe"]
  },
  "application/vnd.lotus-1-2-3": {
    "source": "iana",
    "extensions": ["123"]
  },
  "application/vnd.lotus-approach": {
    "source": "iana",
    "extensions": ["apr"]
  },
  "application/vnd.lotus-freelance": {
    "source": "iana",
    "extensions": ["pre"]
  },
  "application/vnd.lotus-notes": {
    "source": "iana",
    "extensions": ["nsf"]
  },
  "application/vnd.lotus-organizer": {
    "source": "iana",
    "extensions": ["org"]
  },
  "application/vnd.lotus-screencam": {
    "source": "iana",
    "extensions": ["scm"]
  },
  "application/vnd.lotus-wordpro": {
    "source": "iana",
    "extensions": ["lwp"]
  },
  "application/vnd.macports.portpkg": {
    "source": "iana",
    "extensions": ["portpkg"]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.license+xml": {
    "source": "iana"
  },
  "application/vnd.marlin.drm.mdcf": {
    "source": "iana"
  },
  "application/vnd.mason+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.maxmind.maxmind-db": {
    "source": "iana"
  },
  "application/vnd.mcd": {
    "source": "iana",
    "extensions": ["mcd"]
  },
  "application/vnd.medcalcdata": {
    "source": "iana",
    "extensions": ["mc1"]
  },
  "application/vnd.mediastation.cdkey": {
    "source": "iana",
    "extensions": ["cdkey"]
  },
  "application/vnd.meridian-slingshot": {
    "source": "iana"
  },
  "application/vnd.mfer": {
    "source": "iana",
    "extensions": ["mwf"]
  },
  "application/vnd.mfmp": {
    "source": "iana",
    "extensions": ["mfm"]
  },
  "application/vnd.micrografx.flo": {
    "source": "iana",
    "extensions": ["flo"]
  },
  "application/vnd.micrografx.igx": {
    "source": "iana",
    "extensions": ["igx"]
  },
  "application/vnd.miele+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.mif": {
    "source": "iana",
    "extensions": ["mif"]
  },
  "application/vnd.minisoft-hp3000-save": {
    "source": "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    "source": "iana"
  },
  "application/vnd.mobius.daf": {
    "source": "iana",
    "extensions": ["daf"]
  },
  "application/vnd.mobius.dis": {
    "source": "iana",
    "extensions": ["dis"]
  },
  "application/vnd.mobius.mbk": {
    "source": "iana",
    "extensions": ["mbk"]
  },
  "application/vnd.mobius.mqy": {
    "source": "iana",
    "extensions": ["mqy"]
  },
  "application/vnd.mobius.msl": {
    "source": "iana",
    "extensions": ["msl"]
  },
  "application/vnd.mobius.plc": {
    "source": "iana",
    "extensions": ["plc"]
  },
  "application/vnd.mobius.txf": {
    "source": "iana",
    "extensions": ["txf"]
  },
  "application/vnd.mophun.application": {
    "source": "iana",
    "extensions": ["mpn"]
  },
  "application/vnd.mophun.certificate": {
    "source": "iana",
    "extensions": ["mpc"]
  },
  "application/vnd.motorola.flexsuite": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    "source": "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    "source": "iana"
  },
  "application/vnd.motorola.iprm": {
    "source": "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xul"]
  },
  "application/vnd.ms-3mfdocument": {
    "source": "iana"
  },
  "application/vnd.ms-artgalry": {
    "source": "iana",
    "extensions": ["cil"]
  },
  "application/vnd.ms-asf": {
    "source": "iana"
  },
  "application/vnd.ms-cab-compressed": {
    "source": "iana",
    "extensions": ["cab"]
  },
  "application/vnd.ms-color.iccprofile": {
    "source": "apache"
  },
  "application/vnd.ms-excel": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xls","xlm","xla","xlc","xlt","xlw"]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlam"]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsb"]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsm"]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["xltm"]
  },
  "application/vnd.ms-fontobject": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eot"]
  },
  "application/vnd.ms-htmlhelp": {
    "source": "iana",
    "extensions": ["chm"]
  },
  "application/vnd.ms-ims": {
    "source": "iana",
    "extensions": ["ims"]
  },
  "application/vnd.ms-lrm": {
    "source": "iana",
    "extensions": ["lrm"]
  },
  "application/vnd.ms-office.activex+xml": {
    "source": "iana"
  },
  "application/vnd.ms-officetheme": {
    "source": "iana",
    "extensions": ["thmx"]
  },
  "application/vnd.ms-opentype": {
    "source": "apache",
    "compressible": true
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    "source": "apache"
  },
  "application/vnd.ms-pki.seccat": {
    "source": "apache",
    "extensions": ["cat"]
  },
  "application/vnd.ms-pki.stl": {
    "source": "apache",
    "extensions": ["stl"]
  },
  "application/vnd.ms-playready.initiator+xml": {
    "source": "iana"
  },
  "application/vnd.ms-powerpoint": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ppt","pps","pot"]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppam"]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    "source": "iana",
    "extensions": ["pptm"]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    "source": "iana",
    "extensions": ["sldm"]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppsm"]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["potm"]
  },
  "application/vnd.ms-printing.printticket+xml": {
    "source": "apache"
  },
  "application/vnd.ms-project": {
    "source": "iana",
    "extensions": ["mpp","mpt"]
  },
  "application/vnd.ms-tnef": {
    "source": "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    "source": "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    "source": "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    "source": "iana",
    "extensions": ["docm"]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["dotm"]
  },
  "application/vnd.ms-works": {
    "source": "iana",
    "extensions": ["wps","wks","wcm","wdb"]
  },
  "application/vnd.ms-wpl": {
    "source": "iana",
    "extensions": ["wpl"]
  },
  "application/vnd.ms-xpsdocument": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xps"]
  },
  "application/vnd.msa-disk-image": {
    "source": "iana"
  },
  "application/vnd.mseq": {
    "source": "iana",
    "extensions": ["mseq"]
  },
  "application/vnd.msign": {
    "source": "iana"
  },
  "application/vnd.multiad.creator": {
    "source": "iana"
  },
  "application/vnd.multiad.creator.cif": {
    "source": "iana"
  },
  "application/vnd.music-niff": {
    "source": "iana"
  },
  "application/vnd.musician": {
    "source": "iana",
    "extensions": ["mus"]
  },
  "application/vnd.muvee.style": {
    "source": "iana",
    "extensions": ["msty"]
  },
  "application/vnd.mynfc": {
    "source": "iana",
    "extensions": ["taglet"]
  },
  "application/vnd.ncd.control": {
    "source": "iana"
  },
  "application/vnd.ncd.reference": {
    "source": "iana"
  },
  "application/vnd.nervana": {
    "source": "iana"
  },
  "application/vnd.netfpx": {
    "source": "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    "source": "iana",
    "extensions": ["nlu"]
  },
  "application/vnd.nintendo.nitro.rom": {
    "source": "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    "source": "iana"
  },
  "application/vnd.nitf": {
    "source": "iana",
    "extensions": ["ntf","nitf"]
  },
  "application/vnd.noblenet-directory": {
    "source": "iana",
    "extensions": ["nnd"]
  },
  "application/vnd.noblenet-sealer": {
    "source": "iana",
    "extensions": ["nns"]
  },
  "application/vnd.noblenet-web": {
    "source": "iana",
    "extensions": ["nnw"]
  },
  "application/vnd.nokia.catalogs": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.conml+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.iptv.config+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.isds-radio-presets": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.n-gage.data": {
    "source": "iana",
    "extensions": ["ngdat"]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    "source": "iana"
  },
  "application/vnd.nokia.ncd": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    "source": "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    "source": "iana"
  },
  "application/vnd.nokia.radio-preset": {
    "source": "iana",
    "extensions": ["rpst"]
  },
  "application/vnd.nokia.radio-presets": {
    "source": "iana",
    "extensions": ["rpss"]
  },
  "application/vnd.novadigm.edm": {
    "source": "iana",
    "extensions": ["edm"]
  },
  "application/vnd.novadigm.edx": {
    "source": "iana",
    "extensions": ["edx"]
  },
  "application/vnd.novadigm.ext": {
    "source": "iana",
    "extensions": ["ext"]
  },
  "application/vnd.ntt-local.content-share": {
    "source": "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    "source": "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    "source": "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    "source": "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    "source": "iana",
    "extensions": ["odc"]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    "source": "iana",
    "extensions": ["otc"]
  },
  "application/vnd.oasis.opendocument.database": {
    "source": "iana",
    "extensions": ["odb"]
  },
  "application/vnd.oasis.opendocument.formula": {
    "source": "iana",
    "extensions": ["odf"]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    "source": "iana",
    "extensions": ["odft"]
  },
  "application/vnd.oasis.opendocument.graphics": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odg"]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    "source": "iana",
    "extensions": ["otg"]
  },
  "application/vnd.oasis.opendocument.image": {
    "source": "iana",
    "extensions": ["odi"]
  },
  "application/vnd.oasis.opendocument.image-template": {
    "source": "iana",
    "extensions": ["oti"]
  },
  "application/vnd.oasis.opendocument.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odp"]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    "source": "iana",
    "extensions": ["otp"]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ods"]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    "source": "iana",
    "extensions": ["ots"]
  },
  "application/vnd.oasis.opendocument.text": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odt"]
  },
  "application/vnd.oasis.opendocument.text-master": {
    "source": "iana",
    "extensions": ["odm"]
  },
  "application/vnd.oasis.opendocument.text-template": {
    "source": "iana",
    "extensions": ["ott"]
  },
  "application/vnd.oasis.opendocument.text-web": {
    "source": "iana",
    "extensions": ["oth"]
  },
  "application/vnd.obn": {
    "source": "iana"
  },
  "application/vnd.oftn.l10n+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.cspg-hexbinary": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.pae.gem": {
    "source": "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.spdlist+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.ueprofile+xml": {
    "source": "iana"
  },
  "application/vnd.oipf.userprofile+xml": {
    "source": "iana"
  },
  "application/vnd.olpc-sugar": {
    "source": "iana",
    "extensions": ["xo"]
  },
  "application/vnd.oma-scws-config": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-request": {
    "source": "iana"
  },
  "application/vnd.oma-scws-http-response": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.imd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.ltkm": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sgdu": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.sprov+xml": {
    "source": "iana"
  },
  "application/vnd.oma.bcast.stkm": {
    "source": "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-pcc+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    "source": "iana"
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    "source": "iana"
  },
  "application/vnd.oma.dcd": {
    "source": "iana"
  },
  "application/vnd.oma.dcdc": {
    "source": "iana"
  },
  "application/vnd.oma.dd2+xml": {
    "source": "iana",
    "extensions": ["dd2"]
  },
  "application/vnd.oma.drm.risd+xml": {
    "source": "iana"
  },
  "application/vnd.oma.group-usage-list+xml": {
    "source": "iana"
  },
  "application/vnd.oma.pal+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.final-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.groups+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    "source": "iana"
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    "source": "iana"
  },
  "application/vnd.oma.push": {
    "source": "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    "source": "iana"
  },
  "application/vnd.oma.xcap-directory+xml": {
    "source": "iana"
  },
  "application/vnd.omads-email+xml": {
    "source": "iana"
  },
  "application/vnd.omads-file+xml": {
    "source": "iana"
  },
  "application/vnd.omads-folder+xml": {
    "source": "iana"
  },
  "application/vnd.omaloc-supl-init": {
    "source": "iana"
  },
  "application/vnd.openeye.oeb": {
    "source": "iana"
  },
  "application/vnd.openofficeorg.extension": {
    "source": "apache",
    "extensions": ["oxt"]
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pptx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    "source": "iana",
    "extensions": ["sldx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    "source": "iana",
    "extensions": ["ppsx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    "source": "apache",
    "extensions": ["potx"]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xlsx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    "source": "apache",
    "extensions": ["xltx"]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    "source": "iana",
    "compressible": false,
    "extensions": ["docx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    "source": "apache",
    "extensions": ["dotx"]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    "source": "iana"
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    "source": "iana"
  },
  "application/vnd.oracle.resource+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.orange.indata": {
    "source": "iana"
  },
  "application/vnd.osa.netdeploy": {
    "source": "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    "source": "iana",
    "extensions": ["mgp"]
  },
  "application/vnd.osgi.bundle": {
    "source": "iana"
  },
  "application/vnd.osgi.dp": {
    "source": "iana",
    "extensions": ["dp"]
  },
  "application/vnd.osgi.subsystem": {
    "source": "iana",
    "extensions": ["esa"]
  },
  "application/vnd.otps.ct-kip+xml": {
    "source": "iana"
  },
  "application/vnd.palm": {
    "source": "iana",
    "extensions": ["pdb","pqa","oprc"]
  },
  "application/vnd.panoply": {
    "source": "iana"
  },
  "application/vnd.paos+xml": {
    "source": "iana"
  },
  "application/vnd.paos.xml": {
    "source": "apache"
  },
  "application/vnd.pawaafile": {
    "source": "iana",
    "extensions": ["paw"]
  },
  "application/vnd.pcos": {
    "source": "iana"
  },
  "application/vnd.pg.format": {
    "source": "iana",
    "extensions": ["str"]
  },
  "application/vnd.pg.osasli": {
    "source": "iana",
    "extensions": ["ei6"]
  },
  "application/vnd.piaccess.application-licence": {
    "source": "iana"
  },
  "application/vnd.picsel": {
    "source": "iana",
    "extensions": ["efif"]
  },
  "application/vnd.pmi.widget": {
    "source": "iana",
    "extensions": ["wg"]
  },
  "application/vnd.poc.group-advertisement+xml": {
    "source": "iana"
  },
  "application/vnd.pocketlearn": {
    "source": "iana",
    "extensions": ["plf"]
  },
  "application/vnd.powerbuilder6": {
    "source": "iana",
    "extensions": ["pbd"]
  },
  "application/vnd.powerbuilder6-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7": {
    "source": "iana"
  },
  "application/vnd.powerbuilder7-s": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75": {
    "source": "iana"
  },
  "application/vnd.powerbuilder75-s": {
    "source": "iana"
  },
  "application/vnd.preminet": {
    "source": "iana"
  },
  "application/vnd.previewsystems.box": {
    "source": "iana",
    "extensions": ["box"]
  },
  "application/vnd.proteus.magazine": {
    "source": "iana",
    "extensions": ["mgz"]
  },
  "application/vnd.publishare-delta-tree": {
    "source": "iana",
    "extensions": ["qps"]
  },
  "application/vnd.pvi.ptid1": {
    "source": "iana",
    "extensions": ["ptid"]
  },
  "application/vnd.pwg-multiplexed": {
    "source": "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    "source": "iana"
  },
  "application/vnd.qualcomm.brew-app-res": {
    "source": "iana"
  },
  "application/vnd.quark.quarkxpress": {
    "source": "iana",
    "extensions": ["qxd","qxt","qwd","qwt","qxl","qxb"]
  },
  "application/vnd.quobject-quoxdocument": {
    "source": "iana"
  },
  "application/vnd.radisys.moml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-conf+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    "source": "iana"
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    "source": "iana"
  },
  "application/vnd.rainstor.data": {
    "source": "iana"
  },
  "application/vnd.rapid": {
    "source": "iana"
  },
  "application/vnd.realvnc.bed": {
    "source": "iana",
    "extensions": ["bed"]
  },
  "application/vnd.recordare.musicxml": {
    "source": "iana",
    "extensions": ["mxl"]
  },
  "application/vnd.recordare.musicxml+xml": {
    "source": "iana",
    "extensions": ["musicxml"]
  },
  "application/vnd.renlearn.rlprint": {
    "source": "iana"
  },
  "application/vnd.rig.cryptonote": {
    "source": "iana",
    "extensions": ["cryptonote"]
  },
  "application/vnd.rim.cod": {
    "source": "apache",
    "extensions": ["cod"]
  },
  "application/vnd.rn-realmedia": {
    "source": "apache",
    "extensions": ["rm"]
  },
  "application/vnd.rn-realmedia-vbr": {
    "source": "apache",
    "extensions": ["rmvb"]
  },
  "application/vnd.route66.link66+xml": {
    "source": "iana",
    "extensions": ["link66"]
  },
  "application/vnd.rs-274x": {
    "source": "iana"
  },
  "application/vnd.ruckus.download": {
    "source": "iana"
  },
  "application/vnd.s3sms": {
    "source": "iana"
  },
  "application/vnd.sailingtracker.track": {
    "source": "iana",
    "extensions": ["st"]
  },
  "application/vnd.sbm.cid": {
    "source": "iana"
  },
  "application/vnd.sbm.mid2": {
    "source": "iana"
  },
  "application/vnd.scribus": {
    "source": "iana"
  },
  "application/vnd.sealed.3df": {
    "source": "iana"
  },
  "application/vnd.sealed.csf": {
    "source": "iana"
  },
  "application/vnd.sealed.doc": {
    "source": "iana"
  },
  "application/vnd.sealed.eml": {
    "source": "iana"
  },
  "application/vnd.sealed.mht": {
    "source": "iana"
  },
  "application/vnd.sealed.net": {
    "source": "iana"
  },
  "application/vnd.sealed.ppt": {
    "source": "iana"
  },
  "application/vnd.sealed.tiff": {
    "source": "iana"
  },
  "application/vnd.sealed.xls": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    "source": "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    "source": "iana"
  },
  "application/vnd.seemail": {
    "source": "iana",
    "extensions": ["see"]
  },
  "application/vnd.sema": {
    "source": "iana",
    "extensions": ["sema"]
  },
  "application/vnd.semd": {
    "source": "iana",
    "extensions": ["semd"]
  },
  "application/vnd.semf": {
    "source": "iana",
    "extensions": ["semf"]
  },
  "application/vnd.shana.informed.formdata": {
    "source": "iana",
    "extensions": ["ifm"]
  },
  "application/vnd.shana.informed.formtemplate": {
    "source": "iana",
    "extensions": ["itp"]
  },
  "application/vnd.shana.informed.interchange": {
    "source": "iana",
    "extensions": ["iif"]
  },
  "application/vnd.shana.informed.package": {
    "source": "iana",
    "extensions": ["ipk"]
  },
  "application/vnd.simtech-mindmapper": {
    "source": "iana",
    "extensions": ["twd","twds"]
  },
  "application/vnd.siren+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.smaf": {
    "source": "iana",
    "extensions": ["mmf"]
  },
  "application/vnd.smart.notebook": {
    "source": "iana"
  },
  "application/vnd.smart.teacher": {
    "source": "iana",
    "extensions": ["teacher"]
  },
  "application/vnd.software602.filler.form+xml": {
    "source": "iana"
  },
  "application/vnd.software602.filler.form-xml-zip": {
    "source": "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    "source": "iana",
    "extensions": ["sdkm","sdkd"]
  },
  "application/vnd.spotfire.dxp": {
    "source": "iana",
    "extensions": ["dxp"]
  },
  "application/vnd.spotfire.sfs": {
    "source": "iana",
    "extensions": ["sfs"]
  },
  "application/vnd.sss-cod": {
    "source": "iana"
  },
  "application/vnd.sss-dtf": {
    "source": "iana"
  },
  "application/vnd.sss-ntf": {
    "source": "iana"
  },
  "application/vnd.stardivision.calc": {
    "source": "apache",
    "extensions": ["sdc"]
  },
  "application/vnd.stardivision.draw": {
    "source": "apache",
    "extensions": ["sda"]
  },
  "application/vnd.stardivision.impress": {
    "source": "apache",
    "extensions": ["sdd"]
  },
  "application/vnd.stardivision.math": {
    "source": "apache",
    "extensions": ["smf"]
  },
  "application/vnd.stardivision.writer": {
    "source": "apache",
    "extensions": ["sdw","vor"]
  },
  "application/vnd.stardivision.writer-global": {
    "source": "apache",
    "extensions": ["sgl"]
  },
  "application/vnd.stepmania.package": {
    "source": "iana",
    "extensions": ["smzip"]
  },
  "application/vnd.stepmania.stepchart": {
    "source": "iana",
    "extensions": ["sm"]
  },
  "application/vnd.street-stream": {
    "source": "iana"
  },
  "application/vnd.sun.wadl+xml": {
    "source": "iana"
  },
  "application/vnd.sun.xml.calc": {
    "source": "apache",
    "extensions": ["sxc"]
  },
  "application/vnd.sun.xml.calc.template": {
    "source": "apache",
    "extensions": ["stc"]
  },
  "application/vnd.sun.xml.draw": {
    "source": "apache",
    "extensions": ["sxd"]
  },
  "application/vnd.sun.xml.draw.template": {
    "source": "apache",
    "extensions": ["std"]
  },
  "application/vnd.sun.xml.impress": {
    "source": "apache",
    "extensions": ["sxi"]
  },
  "application/vnd.sun.xml.impress.template": {
    "source": "apache",
    "extensions": ["sti"]
  },
  "application/vnd.sun.xml.math": {
    "source": "apache",
    "extensions": ["sxm"]
  },
  "application/vnd.sun.xml.writer": {
    "source": "apache",
    "extensions": ["sxw"]
  },
  "application/vnd.sun.xml.writer.global": {
    "source": "apache",
    "extensions": ["sxg"]
  },
  "application/vnd.sun.xml.writer.template": {
    "source": "apache",
    "extensions": ["stw"]
  },
  "application/vnd.sus-calendar": {
    "source": "iana",
    "extensions": ["sus","susp"]
  },
  "application/vnd.svd": {
    "source": "iana",
    "extensions": ["svd"]
  },
  "application/vnd.swiftview-ics": {
    "source": "iana"
  },
  "application/vnd.symbian.install": {
    "source": "apache",
    "extensions": ["sis","sisx"]
  },
  "application/vnd.syncml+xml": {
    "source": "iana",
    "extensions": ["xsm"]
  },
  "application/vnd.syncml.dm+wbxml": {
    "source": "iana",
    "extensions": ["bdm"]
  },
  "application/vnd.syncml.dm+xml": {
    "source": "iana",
    "extensions": ["xdm"]
  },
  "application/vnd.syncml.dm.notification": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    "source": "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    "source": "iana"
  },
  "application/vnd.syncml.ds.notification": {
    "source": "iana"
  },
  "application/vnd.tao.intent-module-archive": {
    "source": "iana",
    "extensions": ["tao"]
  },
  "application/vnd.tcpdump.pcap": {
    "source": "iana",
    "extensions": ["pcap","cap","dmp"]
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    "source": "iana"
  },
  "application/vnd.tmobile-livetv": {
    "source": "iana",
    "extensions": ["tmo"]
  },
  "application/vnd.trid.tpt": {
    "source": "iana",
    "extensions": ["tpt"]
  },
  "application/vnd.triscape.mxs": {
    "source": "iana",
    "extensions": ["mxs"]
  },
  "application/vnd.trueapp": {
    "source": "iana",
    "extensions": ["tra"]
  },
  "application/vnd.truedoc": {
    "source": "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    "source": "iana"
  },
  "application/vnd.ufdl": {
    "source": "iana",
    "extensions": ["ufd","ufdl"]
  },
  "application/vnd.uiq.theme": {
    "source": "iana",
    "extensions": ["utz"]
  },
  "application/vnd.umajin": {
    "source": "iana",
    "extensions": ["umj"]
  },
  "application/vnd.unity": {
    "source": "iana",
    "extensions": ["unityweb"]
  },
  "application/vnd.uoml+xml": {
    "source": "iana",
    "extensions": ["uoml"]
  },
  "application/vnd.uplanet.alert": {
    "source": "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    "source": "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop": {
    "source": "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel": {
    "source": "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.list": {
    "source": "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd": {
    "source": "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    "source": "iana"
  },
  "application/vnd.uplanet.signal": {
    "source": "iana"
  },
  "application/vnd.valve.source.material": {
    "source": "iana"
  },
  "application/vnd.vcx": {
    "source": "iana",
    "extensions": ["vcx"]
  },
  "application/vnd.vd-study": {
    "source": "iana"
  },
  "application/vnd.vectorworks": {
    "source": "iana"
  },
  "application/vnd.verimatrix.vcas": {
    "source": "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    "source": "iana"
  },
  "application/vnd.visio": {
    "source": "iana",
    "extensions": ["vsd","vst","vss","vsw"]
  },
  "application/vnd.visionary": {
    "source": "iana",
    "extensions": ["vis"]
  },
  "application/vnd.vividence.scriptfile": {
    "source": "iana"
  },
  "application/vnd.vsf": {
    "source": "iana",
    "extensions": ["vsf"]
  },
  "application/vnd.wap.sic": {
    "source": "iana"
  },
  "application/vnd.wap.slc": {
    "source": "iana"
  },
  "application/vnd.wap.wbxml": {
    "source": "iana",
    "extensions": ["wbxml"]
  },
  "application/vnd.wap.wmlc": {
    "source": "iana",
    "extensions": ["wmlc"]
  },
  "application/vnd.wap.wmlscriptc": {
    "source": "iana",
    "extensions": ["wmlsc"]
  },
  "application/vnd.webturbo": {
    "source": "iana",
    "extensions": ["wtb"]
  },
  "application/vnd.wfa.p2p": {
    "source": "iana"
  },
  "application/vnd.wfa.wsc": {
    "source": "iana"
  },
  "application/vnd.windows.devicepairing": {
    "source": "iana"
  },
  "application/vnd.wmc": {
    "source": "iana"
  },
  "application/vnd.wmf.bootstrap": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica": {
    "source": "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    "source": "iana"
  },
  "application/vnd.wolfram.player": {
    "source": "iana",
    "extensions": ["nbp"]
  },
  "application/vnd.wordperfect": {
    "source": "iana",
    "extensions": ["wpd"]
  },
  "application/vnd.wqd": {
    "source": "iana",
    "extensions": ["wqd"]
  },
  "application/vnd.wrq-hp3000-labelled": {
    "source": "iana"
  },
  "application/vnd.wt.stf": {
    "source": "iana",
    "extensions": ["stf"]
  },
  "application/vnd.wv.csp+wbxml": {
    "source": "iana"
  },
  "application/vnd.wv.csp+xml": {
    "source": "iana"
  },
  "application/vnd.wv.ssp+xml": {
    "source": "iana"
  },
  "application/vnd.xacml+json": {
    "source": "iana",
    "compressible": true
  },
  "application/vnd.xara": {
    "source": "iana",
    "extensions": ["xar"]
  },
  "application/vnd.xfdl": {
    "source": "iana",
    "extensions": ["xfdl"]
  },
  "application/vnd.xfdl.webform": {
    "source": "iana"
  },
  "application/vnd.xmi+xml": {
    "source": "iana"
  },
  "application/vnd.xmpie.cpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.dpkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.plan": {
    "source": "iana"
  },
  "application/vnd.xmpie.ppkg": {
    "source": "iana"
  },
  "application/vnd.xmpie.xlim": {
    "source": "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    "source": "iana",
    "extensions": ["hvd"]
  },
  "application/vnd.yamaha.hv-script": {
    "source": "iana",
    "extensions": ["hvs"]
  },
  "application/vnd.yamaha.hv-voice": {
    "source": "iana",
    "extensions": ["hvp"]
  },
  "application/vnd.yamaha.openscoreformat": {
    "source": "iana",
    "extensions": ["osf"]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    "source": "iana",
    "extensions": ["osfpvg"]
  },
  "application/vnd.yamaha.remote-setup": {
    "source": "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    "source": "iana",
    "extensions": ["saf"]
  },
  "application/vnd.yamaha.smaf-phrase": {
    "source": "iana",
    "extensions": ["spf"]
  },
  "application/vnd.yamaha.through-ngn": {
    "source": "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    "source": "iana"
  },
  "application/vnd.yaoweme": {
    "source": "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    "source": "iana",
    "extensions": ["cmp"]
  },
  "application/vnd.zul": {
    "source": "iana",
    "extensions": ["zir","zirz"]
  },
  "application/vnd.zzazz.deck+xml": {
    "source": "iana",
    "extensions": ["zaz"]
  },
  "application/voicexml+xml": {
    "source": "iana",
    "extensions": ["vxml"]
  },
  "application/vq-rtcpxr": {
    "source": "iana"
  },
  "application/watcherinfo+xml": {
    "source": "iana"
  },
  "application/whoispp-query": {
    "source": "iana"
  },
  "application/whoispp-response": {
    "source": "iana"
  },
  "application/widget": {
    "source": "iana",
    "extensions": ["wgt"]
  },
  "application/winhlp": {
    "source": "apache",
    "extensions": ["hlp"]
  },
  "application/wita": {
    "source": "iana"
  },
  "application/wordperfect5.1": {
    "source": "iana"
  },
  "application/wsdl+xml": {
    "source": "iana",
    "extensions": ["wsdl"]
  },
  "application/wspolicy+xml": {
    "source": "iana",
    "extensions": ["wspolicy"]
  },
  "application/x-7z-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["7z"]
  },
  "application/x-abiword": {
    "source": "apache",
    "extensions": ["abw"]
  },
  "application/x-ace-compressed": {
    "source": "apache",
    "extensions": ["ace"]
  },
  "application/x-amf": {
    "source": "apache"
  },
  "application/x-apple-diskimage": {
    "source": "apache",
    "extensions": ["dmg"]
  },
  "application/x-authorware-bin": {
    "source": "apache",
    "extensions": ["aab","x32","u32","vox"]
  },
  "application/x-authorware-map": {
    "source": "apache",
    "extensions": ["aam"]
  },
  "application/x-authorware-seg": {
    "source": "apache",
    "extensions": ["aas"]
  },
  "application/x-bcpio": {
    "source": "apache",
    "extensions": ["bcpio"]
  },
  "application/x-bittorrent": {
    "source": "apache",
    "extensions": ["torrent"]
  },
  "application/x-blorb": {
    "source": "apache",
    "extensions": ["blb","blorb"]
  },
  "application/x-bzip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz"]
  },
  "application/x-bzip2": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz2","boz"]
  },
  "application/x-cbr": {
    "source": "apache",
    "extensions": ["cbr","cba","cbt","cbz","cb7"]
  },
  "application/x-cdlink": {
    "source": "apache",
    "extensions": ["vcd"]
  },
  "application/x-cfs-compressed": {
    "source": "apache",
    "extensions": ["cfs"]
  },
  "application/x-chat": {
    "source": "apache",
    "extensions": ["chat"]
  },
  "application/x-chess-pgn": {
    "source": "apache",
    "extensions": ["pgn"]
  },
  "application/x-chrome-extension": {
    "extensions": ["crx"]
  },
  "application/x-compress": {
    "source": "apache"
  },
  "application/x-conference": {
    "source": "apache",
    "extensions": ["nsc"]
  },
  "application/x-cpio": {
    "source": "apache",
    "extensions": ["cpio"]
  },
  "application/x-csh": {
    "source": "apache",
    "extensions": ["csh"]
  },
  "application/x-deb": {
    "compressible": false
  },
  "application/x-debian-package": {
    "source": "apache",
    "extensions": ["deb","udeb"]
  },
  "application/x-dgc-compressed": {
    "source": "apache",
    "extensions": ["dgc"]
  },
  "application/x-director": {
    "source": "apache",
    "extensions": ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]
  },
  "application/x-doom": {
    "source": "apache",
    "extensions": ["wad"]
  },
  "application/x-dtbncx+xml": {
    "source": "apache",
    "extensions": ["ncx"]
  },
  "application/x-dtbook+xml": {
    "source": "apache",
    "extensions": ["dtb"]
  },
  "application/x-dtbresource+xml": {
    "source": "apache",
    "extensions": ["res"]
  },
  "application/x-dvi": {
    "source": "apache",
    "compressible": false,
    "extensions": ["dvi"]
  },
  "application/x-envoy": {
    "source": "apache",
    "extensions": ["evy"]
  },
  "application/x-eva": {
    "source": "apache",
    "extensions": ["eva"]
  },
  "application/x-font-bdf": {
    "source": "apache",
    "extensions": ["bdf"]
  },
  "application/x-font-dos": {
    "source": "apache"
  },
  "application/x-font-framemaker": {
    "source": "apache"
  },
  "application/x-font-ghostscript": {
    "source": "apache",
    "extensions": ["gsf"]
  },
  "application/x-font-libgrx": {
    "source": "apache"
  },
  "application/x-font-linux-psf": {
    "source": "apache",
    "extensions": ["psf"]
  },
  "application/x-font-otf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["otf"]
  },
  "application/x-font-pcf": {
    "source": "apache",
    "extensions": ["pcf"]
  },
  "application/x-font-snf": {
    "source": "apache",
    "extensions": ["snf"]
  },
  "application/x-font-speedo": {
    "source": "apache"
  },
  "application/x-font-sunos-news": {
    "source": "apache"
  },
  "application/x-font-ttf": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ttf","ttc"]
  },
  "application/x-font-type1": {
    "source": "apache",
    "extensions": ["pfa","pfb","pfm","afm"]
  },
  "application/x-font-vfont": {
    "source": "apache"
  },
  "application/x-freearc": {
    "source": "apache",
    "extensions": ["arc"]
  },
  "application/x-futuresplash": {
    "source": "apache",
    "extensions": ["spl"]
  },
  "application/x-gca-compressed": {
    "source": "apache",
    "extensions": ["gca"]
  },
  "application/x-glulx": {
    "source": "apache",
    "extensions": ["ulx"]
  },
  "application/x-gnumeric": {
    "source": "apache",
    "extensions": ["gnumeric"]
  },
  "application/x-gramps-xml": {
    "source": "apache",
    "extensions": ["gramps"]
  },
  "application/x-gtar": {
    "source": "apache",
    "extensions": ["gtar"]
  },
  "application/x-gzip": {
    "source": "apache"
  },
  "application/x-hdf": {
    "source": "apache",
    "extensions": ["hdf"]
  },
  "application/x-install-instructions": {
    "source": "apache",
    "extensions": ["install"]
  },
  "application/x-iso9660-image": {
    "source": "apache",
    "extensions": ["iso"]
  },
  "application/x-java-jnlp-file": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jnlp"]
  },
  "application/x-javascript": {
    "compressible": true
  },
  "application/x-latex": {
    "source": "apache",
    "compressible": false,
    "extensions": ["latex"]
  },
  "application/x-lua-bytecode": {
    "extensions": ["luac"]
  },
  "application/x-lzh-compressed": {
    "source": "apache",
    "extensions": ["lzh","lha"]
  },
  "application/x-mie": {
    "source": "apache",
    "extensions": ["mie"]
  },
  "application/x-mobipocket-ebook": {
    "source": "apache",
    "extensions": ["prc","mobi"]
  },
  "application/x-mpegurl": {
    "compressible": false
  },
  "application/x-ms-application": {
    "source": "apache",
    "extensions": ["application"]
  },
  "application/x-ms-shortcut": {
    "source": "apache",
    "extensions": ["lnk"]
  },
  "application/x-ms-wmd": {
    "source": "apache",
    "extensions": ["wmd"]
  },
  "application/x-ms-wmz": {
    "source": "apache",
    "extensions": ["wmz"]
  },
  "application/x-ms-xbap": {
    "source": "apache",
    "extensions": ["xbap"]
  },
  "application/x-msaccess": {
    "source": "apache",
    "extensions": ["mdb"]
  },
  "application/x-msbinder": {
    "source": "apache",
    "extensions": ["obd"]
  },
  "application/x-mscardfile": {
    "source": "apache",
    "extensions": ["crd"]
  },
  "application/x-msclip": {
    "source": "apache",
    "extensions": ["clp"]
  },
  "application/x-msdownload": {
    "source": "apache",
    "extensions": ["exe","dll","com","bat","msi"]
  },
  "application/x-msmediaview": {
    "source": "apache",
    "extensions": ["mvb","m13","m14"]
  },
  "application/x-msmetafile": {
    "source": "apache",
    "extensions": ["wmf","wmz","emf","emz"]
  },
  "application/x-msmoney": {
    "source": "apache",
    "extensions": ["mny"]
  },
  "application/x-mspublisher": {
    "source": "apache",
    "extensions": ["pub"]
  },
  "application/x-msschedule": {
    "source": "apache",
    "extensions": ["scd"]
  },
  "application/x-msterminal": {
    "source": "apache",
    "extensions": ["trm"]
  },
  "application/x-mswrite": {
    "source": "apache",
    "extensions": ["wri"]
  },
  "application/x-netcdf": {
    "source": "apache",
    "extensions": ["nc","cdf"]
  },
  "application/x-nzb": {
    "source": "apache",
    "extensions": ["nzb"]
  },
  "application/x-pkcs12": {
    "source": "apache",
    "compressible": false,
    "extensions": ["p12","pfx"]
  },
  "application/x-pkcs7-certificates": {
    "source": "apache",
    "extensions": ["p7b","spc"]
  },
  "application/x-pkcs7-certreqresp": {
    "source": "apache",
    "extensions": ["p7r"]
  },
  "application/x-rar-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["rar"]
  },
  "application/x-research-info-systems": {
    "source": "apache",
    "extensions": ["ris"]
  },
  "application/x-sh": {
    "source": "apache",
    "compressible": true,
    "extensions": ["sh"]
  },
  "application/x-shar": {
    "source": "apache",
    "extensions": ["shar"]
  },
  "application/x-shockwave-flash": {
    "source": "apache",
    "compressible": false,
    "extensions": ["swf"]
  },
  "application/x-silverlight-app": {
    "source": "apache",
    "extensions": ["xap"]
  },
  "application/x-sql": {
    "source": "apache",
    "extensions": ["sql"]
  },
  "application/x-stuffit": {
    "source": "apache",
    "compressible": false,
    "extensions": ["sit"]
  },
  "application/x-stuffitx": {
    "source": "apache",
    "extensions": ["sitx"]
  },
  "application/x-subrip": {
    "source": "apache",
    "extensions": ["srt"]
  },
  "application/x-sv4cpio": {
    "source": "apache",
    "extensions": ["sv4cpio"]
  },
  "application/x-sv4crc": {
    "source": "apache",
    "extensions": ["sv4crc"]
  },
  "application/x-t3vm-image": {
    "source": "apache",
    "extensions": ["t3"]
  },
  "application/x-tads": {
    "source": "apache",
    "extensions": ["gam"]
  },
  "application/x-tar": {
    "source": "apache",
    "compressible": true,
    "extensions": ["tar"]
  },
  "application/x-tcl": {
    "source": "apache",
    "extensions": ["tcl"]
  },
  "application/x-tex": {
    "source": "apache",
    "extensions": ["tex"]
  },
  "application/x-tex-tfm": {
    "source": "apache",
    "extensions": ["tfm"]
  },
  "application/x-texinfo": {
    "source": "apache",
    "extensions": ["texinfo","texi"]
  },
  "application/x-tgif": {
    "source": "apache",
    "extensions": ["obj"]
  },
  "application/x-ustar": {
    "source": "apache",
    "extensions": ["ustar"]
  },
  "application/x-wais-source": {
    "source": "apache",
    "extensions": ["src"]
  },
  "application/x-web-app-manifest+json": {
    "compressible": true,
    "extensions": ["webapp"]
  },
  "application/x-www-form-urlencoded": {
    "source": "iana",
    "compressible": true
  },
  "application/x-x509-ca-cert": {
    "source": "apache",
    "extensions": ["der","crt"]
  },
  "application/x-xfig": {
    "source": "apache",
    "extensions": ["fig"]
  },
  "application/x-xliff+xml": {
    "source": "apache",
    "extensions": ["xlf"]
  },
  "application/x-xpinstall": {
    "source": "apache",
    "compressible": false,
    "extensions": ["xpi"]
  },
  "application/x-xz": {
    "source": "apache",
    "extensions": ["xz"]
  },
  "application/x-zmachine": {
    "source": "apache",
    "extensions": ["z1","z2","z3","z4","z5","z6","z7","z8"]
  },
  "application/x400-bp": {
    "source": "iana"
  },
  "application/xacml+xml": {
    "source": "iana"
  },
  "application/xaml+xml": {
    "source": "apache",
    "extensions": ["xaml"]
  },
  "application/xcap-att+xml": {
    "source": "iana"
  },
  "application/xcap-caps+xml": {
    "source": "iana"
  },
  "application/xcap-diff+xml": {
    "source": "iana",
    "extensions": ["xdf"]
  },
  "application/xcap-el+xml": {
    "source": "iana"
  },
  "application/xcap-error+xml": {
    "source": "iana"
  },
  "application/xcap-ns+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info+xml": {
    "source": "iana"
  },
  "application/xcon-conference-info-diff+xml": {
    "source": "iana"
  },
  "application/xenc+xml": {
    "source": "iana",
    "extensions": ["xenc"]
  },
  "application/xhtml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xhtml","xht"]
  },
  "application/xhtml-voice+xml": {
    "source": "iana"
  },
  "application/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml","xsl","xsd"]
  },
  "application/xml-dtd": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dtd"]
  },
  "application/xml-external-parsed-entity": {
    "source": "iana"
  },
  "application/xml-patch+xml": {
    "source": "iana"
  },
  "application/xmpp+xml": {
    "source": "iana"
  },
  "application/xop+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xop"]
  },
  "application/xproc+xml": {
    "source": "apache",
    "extensions": ["xpl"]
  },
  "application/xslt+xml": {
    "source": "iana",
    "extensions": ["xslt"]
  },
  "application/xspf+xml": {
    "source": "apache",
    "extensions": ["xspf"]
  },
  "application/xv+xml": {
    "source": "iana",
    "extensions": ["mxml","xhvml","xvml","xvm"]
  },
  "application/yang": {
    "source": "iana",
    "extensions": ["yang"]
  },
  "application/yin+xml": {
    "source": "iana",
    "extensions": ["yin"]
  },
  "application/zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["zip"]
  },
  "application/zlib": {
    "source": "iana"
  },
  "audio/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "audio/32kadpcm": {
    "source": "iana"
  },
  "audio/3gpp": {
    "source": "iana"
  },
  "audio/3gpp2": {
    "source": "iana"
  },
  "audio/ac3": {
    "source": "iana"
  },
  "audio/adpcm": {
    "source": "apache",
    "extensions": ["adp"]
  },
  "audio/amr": {
    "source": "iana"
  },
  "audio/amr-wb": {
    "source": "iana"
  },
  "audio/amr-wb+": {
    "source": "iana"
  },
  "audio/aptx": {
    "source": "iana"
  },
  "audio/asc": {
    "source": "iana"
  },
  "audio/atrac-advanced-lossless": {
    "source": "iana"
  },
  "audio/atrac-x": {
    "source": "iana"
  },
  "audio/atrac3": {
    "source": "iana"
  },
  "audio/basic": {
    "source": "iana",
    "compressible": false,
    "extensions": ["au","snd"]
  },
  "audio/bv16": {
    "source": "iana"
  },
  "audio/bv32": {
    "source": "iana"
  },
  "audio/clearmode": {
    "source": "iana"
  },
  "audio/cn": {
    "source": "iana"
  },
  "audio/dat12": {
    "source": "iana"
  },
  "audio/dls": {
    "source": "iana"
  },
  "audio/dsr-es201108": {
    "source": "iana"
  },
  "audio/dsr-es202050": {
    "source": "iana"
  },
  "audio/dsr-es202211": {
    "source": "iana"
  },
  "audio/dsr-es202212": {
    "source": "iana"
  },
  "audio/dv": {
    "source": "iana"
  },
  "audio/dvi4": {
    "source": "iana"
  },
  "audio/eac3": {
    "source": "iana"
  },
  "audio/encaprtp": {
    "source": "iana"
  },
  "audio/evrc": {
    "source": "iana"
  },
  "audio/evrc-qcp": {
    "source": "iana"
  },
  "audio/evrc0": {
    "source": "iana"
  },
  "audio/evrc1": {
    "source": "iana"
  },
  "audio/evrcb": {
    "source": "iana"
  },
  "audio/evrcb0": {
    "source": "iana"
  },
  "audio/evrcb1": {
    "source": "iana"
  },
  "audio/evrcnw": {
    "source": "iana"
  },
  "audio/evrcnw0": {
    "source": "iana"
  },
  "audio/evrcnw1": {
    "source": "iana"
  },
  "audio/evrcwb": {
    "source": "iana"
  },
  "audio/evrcwb0": {
    "source": "iana"
  },
  "audio/evrcwb1": {
    "source": "iana"
  },
  "audio/fwdred": {
    "source": "iana"
  },
  "audio/g719": {
    "source": "iana"
  },
  "audio/g722": {
    "source": "iana"
  },
  "audio/g7221": {
    "source": "iana"
  },
  "audio/g723": {
    "source": "iana"
  },
  "audio/g726-16": {
    "source": "iana"
  },
  "audio/g726-24": {
    "source": "iana"
  },
  "audio/g726-32": {
    "source": "iana"
  },
  "audio/g726-40": {
    "source": "iana"
  },
  "audio/g728": {
    "source": "iana"
  },
  "audio/g729": {
    "source": "iana"
  },
  "audio/g7291": {
    "source": "iana"
  },
  "audio/g729d": {
    "source": "iana"
  },
  "audio/g729e": {
    "source": "iana"
  },
  "audio/gsm": {
    "source": "iana"
  },
  "audio/gsm-efr": {
    "source": "iana"
  },
  "audio/gsm-hr-08": {
    "source": "iana"
  },
  "audio/ilbc": {
    "source": "iana"
  },
  "audio/ip-mr_v2.5": {
    "source": "iana"
  },
  "audio/isac": {
    "source": "apache"
  },
  "audio/l16": {
    "source": "iana"
  },
  "audio/l20": {
    "source": "iana"
  },
  "audio/l24": {
    "source": "iana",
    "compressible": false
  },
  "audio/l8": {
    "source": "iana"
  },
  "audio/lpc": {
    "source": "iana"
  },
  "audio/midi": {
    "source": "apache",
    "extensions": ["mid","midi","kar","rmi"]
  },
  "audio/mobile-xmf": {
    "source": "iana"
  },
  "audio/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mp4a","m4a"]
  },
  "audio/mp4a-latm": {
    "source": "iana"
  },
  "audio/mpa": {
    "source": "iana"
  },
  "audio/mpa-robust": {
    "source": "iana"
  },
  "audio/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpga","mp2","mp2a","mp3","m2a","m3a"]
  },
  "audio/mpeg4-generic": {
    "source": "iana"
  },
  "audio/musepack": {
    "source": "apache"
  },
  "audio/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["oga","ogg","spx"]
  },
  "audio/opus": {
    "source": "apache"
  },
  "audio/parityfec": {
    "source": "iana"
  },
  "audio/pcma": {
    "source": "iana"
  },
  "audio/pcma-wb": {
    "source": "iana"
  },
  "audio/pcmu": {
    "source": "iana"
  },
  "audio/pcmu-wb": {
    "source": "iana"
  },
  "audio/prs.sid": {
    "source": "iana"
  },
  "audio/qcelp": {
    "source": "iana"
  },
  "audio/raptorfec": {
    "source": "iana"
  },
  "audio/red": {
    "source": "iana"
  },
  "audio/rtp-enc-aescm128": {
    "source": "iana"
  },
  "audio/rtp-midi": {
    "source": "iana"
  },
  "audio/rtploopback": {
    "source": "iana"
  },
  "audio/rtx": {
    "source": "iana"
  },
  "audio/s3m": {
    "source": "apache",
    "extensions": ["s3m"]
  },
  "audio/silk": {
    "source": "apache",
    "extensions": ["sil"]
  },
  "audio/smv": {
    "source": "iana"
  },
  "audio/smv-qcp": {
    "source": "iana"
  },
  "audio/smv0": {
    "source": "iana"
  },
  "audio/sp-midi": {
    "source": "iana"
  },
  "audio/speex": {
    "source": "iana"
  },
  "audio/t140c": {
    "source": "iana"
  },
  "audio/t38": {
    "source": "iana"
  },
  "audio/telephone-event": {
    "source": "iana"
  },
  "audio/tone": {
    "source": "iana"
  },
  "audio/uemclip": {
    "source": "iana"
  },
  "audio/ulpfec": {
    "source": "iana"
  },
  "audio/vdvi": {
    "source": "iana"
  },
  "audio/vmr-wb": {
    "source": "iana"
  },
  "audio/vnd.3gpp.iufp": {
    "source": "iana"
  },
  "audio/vnd.4sb": {
    "source": "iana"
  },
  "audio/vnd.audiokoz": {
    "source": "iana"
  },
  "audio/vnd.celp": {
    "source": "iana"
  },
  "audio/vnd.cisco.nse": {
    "source": "iana"
  },
  "audio/vnd.cmles.radio-events": {
    "source": "iana"
  },
  "audio/vnd.cns.anp1": {
    "source": "iana"
  },
  "audio/vnd.cns.inf1": {
    "source": "iana"
  },
  "audio/vnd.dece.audio": {
    "source": "iana",
    "extensions": ["uva","uvva"]
  },
  "audio/vnd.digital-winds": {
    "source": "iana",
    "extensions": ["eol"]
  },
  "audio/vnd.dlna.adts": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    "source": "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    "source": "iana"
  },
  "audio/vnd.dolby.mlp": {
    "source": "iana"
  },
  "audio/vnd.dolby.mps": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2x": {
    "source": "iana"
  },
  "audio/vnd.dolby.pl2z": {
    "source": "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    "source": "iana"
  },
  "audio/vnd.dra": {
    "source": "iana",
    "extensions": ["dra"]
  },
  "audio/vnd.dts": {
    "source": "iana",
    "extensions": ["dts"]
  },
  "audio/vnd.dts.hd": {
    "source": "iana",
    "extensions": ["dtshd"]
  },
  "audio/vnd.dvb.file": {
    "source": "iana"
  },
  "audio/vnd.everad.plj": {
    "source": "iana"
  },
  "audio/vnd.hns.audio": {
    "source": "iana"
  },
  "audio/vnd.lucent.voice": {
    "source": "iana",
    "extensions": ["lvp"]
  },
  "audio/vnd.ms-playready.media.pya": {
    "source": "iana",
    "extensions": ["pya"]
  },
  "audio/vnd.nokia.mobile-xmf": {
    "source": "iana"
  },
  "audio/vnd.nortel.vbk": {
    "source": "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    "source": "iana",
    "extensions": ["ecelp4800"]
  },
  "audio/vnd.nuera.ecelp7470": {
    "source": "iana",
    "extensions": ["ecelp7470"]
  },
  "audio/vnd.nuera.ecelp9600": {
    "source": "iana",
    "extensions": ["ecelp9600"]
  },
  "audio/vnd.octel.sbc": {
    "source": "iana"
  },
  "audio/vnd.qcelp": {
    "source": "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    "source": "iana"
  },
  "audio/vnd.rip": {
    "source": "iana",
    "extensions": ["rip"]
  },
  "audio/vnd.rn-realaudio": {
    "compressible": false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    "source": "iana"
  },
  "audio/vnd.vmx.cvsd": {
    "source": "iana"
  },
  "audio/vnd.wave": {
    "compressible": false
  },
  "audio/vorbis": {
    "source": "iana",
    "compressible": false
  },
  "audio/vorbis-config": {
    "source": "iana"
  },
  "audio/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["weba"]
  },
  "audio/x-aac": {
    "source": "apache",
    "compressible": false,
    "extensions": ["aac"]
  },
  "audio/x-aiff": {
    "source": "apache",
    "extensions": ["aif","aiff","aifc"]
  },
  "audio/x-caf": {
    "source": "apache",
    "compressible": false,
    "extensions": ["caf"]
  },
  "audio/x-flac": {
    "source": "apache",
    "extensions": ["flac"]
  },
  "audio/x-matroska": {
    "source": "apache",
    "extensions": ["mka"]
  },
  "audio/x-mpegurl": {
    "source": "apache",
    "extensions": ["m3u"]
  },
  "audio/x-ms-wax": {
    "source": "apache",
    "extensions": ["wax"]
  },
  "audio/x-ms-wma": {
    "source": "apache",
    "extensions": ["wma"]
  },
  "audio/x-pn-realaudio": {
    "source": "apache",
    "extensions": ["ram","ra"]
  },
  "audio/x-pn-realaudio-plugin": {
    "source": "apache",
    "extensions": ["rmp"]
  },
  "audio/x-tta": {
    "source": "apache"
  },
  "audio/x-wav": {
    "source": "apache",
    "extensions": ["wav"]
  },
  "audio/xm": {
    "source": "apache",
    "extensions": ["xm"]
  },
  "chemical/x-cdx": {
    "source": "apache",
    "extensions": ["cdx"]
  },
  "chemical/x-cif": {
    "source": "apache",
    "extensions": ["cif"]
  },
  "chemical/x-cmdf": {
    "source": "apache",
    "extensions": ["cmdf"]
  },
  "chemical/x-cml": {
    "source": "apache",
    "extensions": ["cml"]
  },
  "chemical/x-csml": {
    "source": "apache",
    "extensions": ["csml"]
  },
  "chemical/x-pdb": {
    "source": "apache"
  },
  "chemical/x-xyz": {
    "source": "apache",
    "extensions": ["xyz"]
  },
  "font/opentype": {
    "compressible": true,
    "extensions": ["otf"]
  },
  "image/bmp": {
    "source": "apache",
    "compressible": true,
    "extensions": ["bmp"]
  },
  "image/cgm": {
    "source": "iana",
    "extensions": ["cgm"]
  },
  "image/fits": {
    "source": "iana"
  },
  "image/g3fax": {
    "source": "iana",
    "extensions": ["g3"]
  },
  "image/gif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gif"]
  },
  "image/ief": {
    "source": "iana",
    "extensions": ["ief"]
  },
  "image/jp2": {
    "source": "iana"
  },
  "image/jpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpeg","jpg","jpe"]
  },
  "image/jpm": {
    "source": "iana"
  },
  "image/jpx": {
    "source": "iana"
  },
  "image/ktx": {
    "source": "iana",
    "extensions": ["ktx"]
  },
  "image/naplps": {
    "source": "iana"
  },
  "image/pjpeg": {
    "compressible": false
  },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"]
  },
  "image/prs.btif": {
    "source": "iana",
    "extensions": ["btif"]
  },
  "image/prs.pti": {
    "source": "iana"
  },
  "image/pwg-raster": {
    "source": "iana"
  },
  "image/sgi": {
    "source": "apache",
    "extensions": ["sgi"]
  },
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg","svgz"]
  },
  "image/t38": {
    "source": "iana"
  },
  "image/tiff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["tiff","tif"]
  },
  "image/tiff-fx": {
    "source": "iana"
  },
  "image/vnd.adobe.photoshop": {
    "source": "iana",
    "compressible": true,
    "extensions": ["psd"]
  },
  "image/vnd.airzip.accelerator.azv": {
    "source": "iana"
  },
  "image/vnd.cns.inf2": {
    "source": "iana"
  },
  "image/vnd.dece.graphic": {
    "source": "iana",
    "extensions": ["uvi","uvvi","uvg","uvvg"]
  },
  "image/vnd.djvu": {
    "source": "iana",
    "extensions": ["djvu","djv"]
  },
  "image/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "image/vnd.dwg": {
    "source": "iana",
    "extensions": ["dwg"]
  },
  "image/vnd.dxf": {
    "source": "iana",
    "extensions": ["dxf"]
  },
  "image/vnd.fastbidsheet": {
    "source": "iana",
    "extensions": ["fbs"]
  },
  "image/vnd.fpx": {
    "source": "iana",
    "extensions": ["fpx"]
  },
  "image/vnd.fst": {
    "source": "iana",
    "extensions": ["fst"]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    "source": "iana",
    "extensions": ["mmr"]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    "source": "iana",
    "extensions": ["rlc"]
  },
  "image/vnd.globalgraphics.pgb": {
    "source": "iana"
  },
  "image/vnd.microsoft.icon": {
    "source": "iana"
  },
  "image/vnd.mix": {
    "source": "iana"
  },
  "image/vnd.ms-modi": {
    "source": "iana",
    "extensions": ["mdi"]
  },
  "image/vnd.ms-photo": {
    "source": "apache",
    "extensions": ["wdp"]
  },
  "image/vnd.net-fpx": {
    "source": "iana",
    "extensions": ["npx"]
  },
  "image/vnd.radiance": {
    "source": "iana"
  },
  "image/vnd.sealed.png": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    "source": "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    "source": "iana"
  },
  "image/vnd.svf": {
    "source": "iana"
  },
  "image/vnd.tencent.tap": {
    "source": "iana"
  },
  "image/vnd.valve.source.texture": {
    "source": "iana"
  },
  "image/vnd.wap.wbmp": {
    "source": "iana",
    "extensions": ["wbmp"]
  },
  "image/vnd.xiff": {
    "source": "iana",
    "extensions": ["xif"]
  },
  "image/webp": {
    "source": "apache",
    "extensions": ["webp"]
  },
  "image/x-3ds": {
    "source": "apache",
    "extensions": ["3ds"]
  },
  "image/x-cmu-raster": {
    "source": "apache",
    "extensions": ["ras"]
  },
  "image/x-cmx": {
    "source": "apache",
    "extensions": ["cmx"]
  },
  "image/x-freehand": {
    "source": "apache",
    "extensions": ["fh","fhc","fh4","fh5","fh7"]
  },
  "image/x-icon": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ico"]
  },
  "image/x-mrsid-image": {
    "source": "apache",
    "extensions": ["sid"]
  },
  "image/x-pcx": {
    "source": "apache",
    "extensions": ["pcx"]
  },
  "image/x-pict": {
    "source": "apache",
    "extensions": ["pic","pct"]
  },
  "image/x-portable-anymap": {
    "source": "apache",
    "extensions": ["pnm"]
  },
  "image/x-portable-bitmap": {
    "source": "apache",
    "extensions": ["pbm"]
  },
  "image/x-portable-graymap": {
    "source": "apache",
    "extensions": ["pgm"]
  },
  "image/x-portable-pixmap": {
    "source": "apache",
    "extensions": ["ppm"]
  },
  "image/x-rgb": {
    "source": "apache",
    "extensions": ["rgb"]
  },
  "image/x-tga": {
    "source": "apache",
    "extensions": ["tga"]
  },
  "image/x-xbitmap": {
    "source": "apache",
    "extensions": ["xbm"]
  },
  "image/x-xcf": {
    "compressible": false
  },
  "image/x-xpixmap": {
    "source": "apache",
    "extensions": ["xpm"]
  },
  "image/x-xwindowdump": {
    "source": "apache",
    "extensions": ["xwd"]
  },
  "message/cpim": {
    "source": "iana"
  },
  "message/delivery-status": {
    "source": "iana"
  },
  "message/disposition-notification": {
    "source": "iana"
  },
  "message/external-body": {
    "source": "iana"
  },
  "message/feedback-report": {
    "source": "iana"
  },
  "message/global": {
    "source": "iana"
  },
  "message/global-delivery-status": {
    "source": "iana"
  },
  "message/global-disposition-notification": {
    "source": "iana"
  },
  "message/global-headers": {
    "source": "iana"
  },
  "message/http": {
    "source": "iana",
    "compressible": false
  },
  "message/imdn+xml": {
    "source": "iana",
    "compressible": true
  },
  "message/news": {
    "source": "iana"
  },
  "message/partial": {
    "source": "iana",
    "compressible": false
  },
  "message/rfc822": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eml","mime"]
  },
  "message/s-http": {
    "source": "iana"
  },
  "message/sip": {
    "source": "iana"
  },
  "message/sipfrag": {
    "source": "iana"
  },
  "message/tracking-status": {
    "source": "iana"
  },
  "message/vnd.si.simp": {
    "source": "iana"
  },
  "message/vnd.wfa.wsc": {
    "source": "iana"
  },
  "model/iges": {
    "source": "iana",
    "compressible": false,
    "extensions": ["igs","iges"]
  },
  "model/mesh": {
    "source": "iana",
    "compressible": false,
    "extensions": ["msh","mesh","silo"]
  },
  "model/vnd.collada+xml": {
    "source": "iana",
    "extensions": ["dae"]
  },
  "model/vnd.dwf": {
    "source": "iana",
    "extensions": ["dwf"]
  },
  "model/vnd.flatland.3dml": {
    "source": "iana"
  },
  "model/vnd.gdl": {
    "source": "iana",
    "extensions": ["gdl"]
  },
  "model/vnd.gs-gdl": {
    "source": "apache"
  },
  "model/vnd.gs.gdl": {
    "source": "iana"
  },
  "model/vnd.gtw": {
    "source": "iana",
    "extensions": ["gtw"]
  },
  "model/vnd.moml+xml": {
    "source": "iana"
  },
  "model/vnd.mts": {
    "source": "iana",
    "extensions": ["mts"]
  },
  "model/vnd.opengex": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.binary": {
    "source": "iana"
  },
  "model/vnd.parasolid.transmit.text": {
    "source": "iana"
  },
  "model/vnd.valve.source.compiled-map": {
    "source": "iana"
  },
  "model/vnd.vtu": {
    "source": "iana",
    "extensions": ["vtu"]
  },
  "model/vrml": {
    "source": "iana",
    "compressible": false,
    "extensions": ["wrl","vrml"]
  },
  "model/x3d+binary": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3db","x3dbz"]
  },
  "model/x3d+fastinfoset": {
    "source": "iana"
  },
  "model/x3d+vrml": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3dv","x3dvz"]
  },
  "model/x3d+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["x3d","x3dz"]
  },
  "model/x3d-vrml": {
    "source": "iana"
  },
  "multipart/alternative": {
    "source": "iana",
    "compressible": false
  },
  "multipart/appledouble": {
    "source": "iana"
  },
  "multipart/byteranges": {
    "source": "iana"
  },
  "multipart/digest": {
    "source": "iana"
  },
  "multipart/encrypted": {
    "source": "iana",
    "compressible": false
  },
  "multipart/form-data": {
    "source": "iana",
    "compressible": false
  },
  "multipart/header-set": {
    "source": "iana"
  },
  "multipart/mixed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/parallel": {
    "source": "iana"
  },
  "multipart/related": {
    "source": "iana",
    "compressible": false
  },
  "multipart/report": {
    "source": "iana"
  },
  "multipart/signed": {
    "source": "iana",
    "compressible": false
  },
  "multipart/voice-message": {
    "source": "iana"
  },
  "multipart/x-mixed-replace": {
    "source": "iana"
  },
  "text/1d-interleaved-parityfec": {
    "source": "iana"
  },
  "text/cache-manifest": {
    "source": "iana",
    "compressible": true,
    "extensions": ["appcache","manifest"]
  },
  "text/calendar": {
    "source": "iana",
    "extensions": ["ics","ifb"]
  },
  "text/calender": {
    "compressible": true
  },
  "text/cmd": {
    "compressible": true
  },
  "text/coffeescript": {
    "extensions": ["coffee"]
  },
  "text/css": {
    "source": "iana",
    "compressible": true,
    "extensions": ["css"]
  },
  "text/csv": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csv"]
  },
  "text/csv-schema": {
    "source": "iana"
  },
  "text/directory": {
    "source": "iana"
  },
  "text/dns": {
    "source": "iana"
  },
  "text/ecmascript": {
    "source": "iana"
  },
  "text/encaprtp": {
    "source": "iana"
  },
  "text/enriched": {
    "source": "iana"
  },
  "text/fwdred": {
    "source": "iana"
  },
  "text/grammar-ref-list": {
    "source": "iana"
  },
  "text/hjson": {
    "extensions": ["hjson"]
  },
  "text/html": {
    "source": "iana",
    "compressible": true,
    "extensions": ["html","htm"]
  },
  "text/jade": {
    "extensions": ["jade"]
  },
  "text/javascript": {
    "source": "iana",
    "compressible": true
  },
  "text/jcr-cnd": {
    "source": "iana"
  },
  "text/jsx": {
    "compressible": true,
    "extensions": ["jsx"]
  },
  "text/less": {
    "extensions": ["less"]
  },
  "text/markdown": {
    "source": "iana"
  },
  "text/mizar": {
    "source": "iana"
  },
  "text/n3": {
    "source": "iana",
    "compressible": true,
    "extensions": ["n3"]
  },
  "text/parameters": {
    "source": "iana"
  },
  "text/parityfec": {
    "source": "iana"
  },
  "text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt","text","conf","def","list","log","in","ini"]
  },
  "text/provenance-notation": {
    "source": "iana"
  },
  "text/prs.fallenstein.rst": {
    "source": "iana"
  },
  "text/prs.lines.tag": {
    "source": "iana",
    "extensions": ["dsc"]
  },
  "text/raptorfec": {
    "source": "iana"
  },
  "text/red": {
    "source": "iana"
  },
  "text/rfc822-headers": {
    "source": "iana"
  },
  "text/richtext": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtx"]
  },
  "text/rtf": {
    "source": "iana"
  },
  "text/rtp-enc-aescm128": {
    "source": "iana"
  },
  "text/rtploopback": {
    "source": "iana"
  },
  "text/rtx": {
    "source": "iana"
  },
  "text/sgml": {
    "source": "iana",
    "extensions": ["sgml","sgm"]
  },
  "text/stylus": {
    "extensions": ["stylus","styl"]
  },
  "text/t140": {
    "source": "iana"
  },
  "text/tab-separated-values": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tsv"]
  },
  "text/troff": {
    "source": "iana",
    "extensions": ["t","tr","roff","man","me","ms"]
  },
  "text/turtle": {
    "source": "iana",
    "extensions": ["ttl"]
  },
  "text/ulpfec": {
    "source": "iana"
  },
  "text/uri-list": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uri","uris","urls"]
  },
  "text/vcard": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vcard"]
  },
  "text/vnd.a": {
    "source": "iana"
  },
  "text/vnd.abc": {
    "source": "iana"
  },
  "text/vnd.curl": {
    "source": "iana",
    "extensions": ["curl"]
  },
  "text/vnd.curl.dcurl": {
    "source": "apache",
    "extensions": ["dcurl"]
  },
  "text/vnd.curl.mcurl": {
    "source": "apache",
    "extensions": ["mcurl"]
  },
  "text/vnd.curl.scurl": {
    "source": "apache",
    "extensions": ["scurl"]
  },
  "text/vnd.debian.copyright": {
    "source": "iana"
  },
  "text/vnd.dmclientscript": {
    "source": "iana"
  },
  "text/vnd.dvb.subtitle": {
    "source": "iana",
    "extensions": ["sub"]
  },
  "text/vnd.esmertec.theme-descriptor": {
    "source": "iana"
  },
  "text/vnd.fly": {
    "source": "iana",
    "extensions": ["fly"]
  },
  "text/vnd.fmi.flexstor": {
    "source": "iana",
    "extensions": ["flx"]
  },
  "text/vnd.graphviz": {
    "source": "iana",
    "extensions": ["gv"]
  },
  "text/vnd.in3d.3dml": {
    "source": "iana",
    "extensions": ["3dml"]
  },
  "text/vnd.in3d.spot": {
    "source": "iana",
    "extensions": ["spot"]
  },
  "text/vnd.iptc.newsml": {
    "source": "iana"
  },
  "text/vnd.iptc.nitf": {
    "source": "iana"
  },
  "text/vnd.latex-z": {
    "source": "iana"
  },
  "text/vnd.motorola.reflex": {
    "source": "iana"
  },
  "text/vnd.ms-mediapackage": {
    "source": "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    "source": "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    "source": "iana"
  },
  "text/vnd.si.uricatalogue": {
    "source": "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    "source": "iana",
    "extensions": ["jad"]
  },
  "text/vnd.trolltech.linguist": {
    "source": "iana"
  },
  "text/vnd.wap.si": {
    "source": "iana"
  },
  "text/vnd.wap.sl": {
    "source": "iana"
  },
  "text/vnd.wap.wml": {
    "source": "iana",
    "extensions": ["wml"]
  },
  "text/vnd.wap.wmlscript": {
    "source": "iana",
    "extensions": ["wmls"]
  },
  "text/vtt": {
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["vtt"]
  },
  "text/x-asm": {
    "source": "apache",
    "extensions": ["s","asm"]
  },
  "text/x-c": {
    "source": "apache",
    "extensions": ["c","cc","cxx","cpp","h","hh","dic"]
  },
  "text/x-component": {
    "extensions": ["htc"]
  },
  "text/x-fortran": {
    "source": "apache",
    "extensions": ["f","for","f77","f90"]
  },
  "text/x-gwt-rpc": {
    "compressible": true
  },
  "text/x-handlebars-template": {
    "extensions": ["hbs"]
  },
  "text/x-java-source": {
    "source": "apache",
    "extensions": ["java"]
  },
  "text/x-jquery-tmpl": {
    "compressible": true
  },
  "text/x-lua": {
    "extensions": ["lua"]
  },
  "text/x-markdown": {
    "compressible": true,
    "extensions": ["markdown","md","mkd"]
  },
  "text/x-nfo": {
    "source": "apache",
    "extensions": ["nfo"]
  },
  "text/x-opml": {
    "source": "apache",
    "extensions": ["opml"]
  },
  "text/x-pascal": {
    "source": "apache",
    "extensions": ["p","pas"]
  },
  "text/x-sass": {
    "extensions": ["sass"]
  },
  "text/x-scss": {
    "extensions": ["scss"]
  },
  "text/x-setext": {
    "source": "apache",
    "extensions": ["etx"]
  },
  "text/x-sfv": {
    "source": "apache",
    "extensions": ["sfv"]
  },
  "text/x-uuencode": {
    "source": "apache",
    "extensions": ["uu"]
  },
  "text/x-vcalendar": {
    "source": "apache",
    "extensions": ["vcs"]
  },
  "text/x-vcard": {
    "source": "apache",
    "extensions": ["vcf"]
  },
  "text/xml": {
    "source": "iana",
    "compressible": true
  },
  "text/xml-external-parsed-entity": {
    "source": "iana"
  },
  "text/yaml": {
    "extensions": ["yaml","yml"]
  },
  "video/1d-interleaved-parityfec": {
    "source": "apache"
  },
  "video/3gpp": {
    "source": "apache",
    "extensions": ["3gp"]
  },
  "video/3gpp-tt": {
    "source": "apache"
  },
  "video/3gpp2": {
    "source": "apache",
    "extensions": ["3g2"]
  },
  "video/bmpeg": {
    "source": "apache"
  },
  "video/bt656": {
    "source": "apache"
  },
  "video/celb": {
    "source": "apache"
  },
  "video/dv": {
    "source": "apache"
  },
  "video/h261": {
    "source": "apache",
    "extensions": ["h261"]
  },
  "video/h263": {
    "source": "apache",
    "extensions": ["h263"]
  },
  "video/h263-1998": {
    "source": "apache"
  },
  "video/h263-2000": {
    "source": "apache"
  },
  "video/h264": {
    "source": "apache",
    "extensions": ["h264"]
  },
  "video/h264-rcdo": {
    "source": "apache"
  },
  "video/h264-svc": {
    "source": "apache"
  },
  "video/jpeg": {
    "source": "apache",
    "extensions": ["jpgv"]
  },
  "video/jpeg2000": {
    "source": "apache"
  },
  "video/jpm": {
    "source": "apache",
    "extensions": ["jpm","jpgm"]
  },
  "video/mj2": {
    "source": "apache",
    "extensions": ["mj2","mjp2"]
  },
  "video/mp1s": {
    "source": "apache"
  },
  "video/mp2p": {
    "source": "apache"
  },
  "video/mp2t": {
    "source": "apache",
    "extensions": ["ts"]
  },
  "video/mp4": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mp4","mp4v","mpg4"]
  },
  "video/mp4v-es": {
    "source": "apache"
  },
  "video/mpeg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mpeg","mpg","mpe","m1v","m2v"]
  },
  "video/mpeg4-generic": {
    "source": "apache"
  },
  "video/mpv": {
    "source": "apache"
  },
  "video/nv": {
    "source": "apache"
  },
  "video/ogg": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ogv"]
  },
  "video/parityfec": {
    "source": "apache"
  },
  "video/pointer": {
    "source": "apache"
  },
  "video/quicktime": {
    "source": "apache",
    "compressible": false,
    "extensions": ["qt","mov"]
  },
  "video/raw": {
    "source": "apache"
  },
  "video/rtp-enc-aescm128": {
    "source": "apache"
  },
  "video/rtx": {
    "source": "apache"
  },
  "video/smpte292m": {
    "source": "apache"
  },
  "video/ulpfec": {
    "source": "apache"
  },
  "video/vc1": {
    "source": "apache"
  },
  "video/vnd.cctv": {
    "source": "apache"
  },
  "video/vnd.dece.hd": {
    "source": "apache",
    "extensions": ["uvh","uvvh"]
  },
  "video/vnd.dece.mobile": {
    "source": "apache",
    "extensions": ["uvm","uvvm"]
  },
  "video/vnd.dece.mp4": {
    "source": "apache"
  },
  "video/vnd.dece.pd": {
    "source": "apache",
    "extensions": ["uvp","uvvp"]
  },
  "video/vnd.dece.sd": {
    "source": "apache",
    "extensions": ["uvs","uvvs"]
  },
  "video/vnd.dece.video": {
    "source": "apache",
    "extensions": ["uvv","uvvv"]
  },
  "video/vnd.directv.mpeg": {
    "source": "apache"
  },
  "video/vnd.directv.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dlna.mpeg-tts": {
    "source": "apache"
  },
  "video/vnd.dvb.file": {
    "source": "apache",
    "extensions": ["dvb"]
  },
  "video/vnd.fvt": {
    "source": "apache",
    "extensions": ["fvt"]
  },
  "video/vnd.hns.video": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    "source": "apache"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsavc": {
    "source": "apache"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    "source": "apache"
  },
  "video/vnd.motorola.video": {
    "source": "apache"
  },
  "video/vnd.motorola.videop": {
    "source": "apache"
  },
  "video/vnd.mpegurl": {
    "source": "apache",
    "extensions": ["mxu","m4u"]
  },
  "video/vnd.ms-playready.media.pyv": {
    "source": "apache",
    "extensions": ["pyv"]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    "source": "apache"
  },
  "video/vnd.nokia.videovoip": {
    "source": "apache"
  },
  "video/vnd.objectvideo": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg1": {
    "source": "apache"
  },
  "video/vnd.sealed.mpeg4": {
    "source": "apache"
  },
  "video/vnd.sealed.swf": {
    "source": "apache"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    "source": "apache"
  },
  "video/vnd.uvvu.mp4": {
    "source": "apache",
    "extensions": ["uvu","uvvu"]
  },
  "video/vnd.vivo": {
    "source": "apache",
    "extensions": ["viv"]
  },
  "video/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["webm"]
  },
  "video/x-f4v": {
    "source": "apache",
    "extensions": ["f4v"]
  },
  "video/x-fli": {
    "source": "apache",
    "extensions": ["fli"]
  },
  "video/x-flv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["flv"]
  },
  "video/x-m4v": {
    "source": "apache",
    "extensions": ["m4v"]
  },
  "video/x-matroska": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mkv","mk3d","mks"]
  },
  "video/x-mng": {
    "source": "apache",
    "extensions": ["mng"]
  },
  "video/x-ms-asf": {
    "source": "apache",
    "extensions": ["asf","asx"]
  },
  "video/x-ms-vob": {
    "source": "apache",
    "extensions": ["vob"]
  },
  "video/x-ms-wm": {
    "source": "apache",
    "extensions": ["wm"]
  },
  "video/x-ms-wmv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["wmv"]
  },
  "video/x-ms-wmx": {
    "source": "apache",
    "extensions": ["wmx"]
  },
  "video/x-ms-wvx": {
    "source": "apache",
    "extensions": ["wvx"]
  },
  "video/x-msvideo": {
    "source": "apache",
    "extensions": ["avi"]
  },
  "video/x-sgi-movie": {
    "source": "apache",
    "extensions": ["movie"]
  },
  "video/x-smv": {
    "source": "apache",
    "extensions": ["smv"]
  },
  "x-conference/x-cooltalk": {
    "source": "apache",
    "extensions": ["ice"]
  },
  "x-shader/x-fragment": {
    "compressible": true
  },
  "x-shader/x-vertex": {
    "compressible": true
  }
}

},{}],313:[function(require,module,exports){
module.exports=require("./db.json");


},{"./db.json":312}],314:[function(require,module,exports){
(function(){function r(r,e,n){var t=e&&n||0,u=0;for(e=e||[],r.toLowerCase().replace(/[0-9a-f]{2}/g,function(r){16>u&&(e[t+u++]=v[r])});16>u;)e[t+u++]=0;return e}function e(r,e){var n=e||0,t=l;return t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]}function n(r,n,t){var u=n&&t||0,o=n||[];r=r||{};var a=null!=r.clockseq?r.clockseq:m,f=null!=r.msecs?r.msecs:(new Date).getTime(),i=null!=r.nsecs?r.nsecs:w+1,c=f-g+(i-w)/1e4;if(0>c&&null==r.clockseq&&(a=a+1&16383),(0>c||f>g)&&null==r.nsecs&&(i=0),i>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=f,w=i,m=a,f+=122192928e5;var s=(1e4*(268435455&f)+i)%4294967296;o[u++]=s>>>24&255,o[u++]=s>>>16&255,o[u++]=s>>>8&255,o[u++]=255&s;var l=f/4294967296*1e4&268435455;o[u++]=l>>>8&255,o[u++]=255&l,o[u++]=l>>>24&15|16,o[u++]=l>>>16&255,o[u++]=a>>>8|128,o[u++]=255&a;for(var v=r.node||p,d=0;6>d;d++)o[u+d]=v[d];return n?n:e(o)}function t(r,n,t){var o=n&&t||0;"string"==typeof r&&(n="binary"==r?new s(16):null,r=null),r=r||{};var a=r.random||(r.rng||u)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,n)for(var f=0;16>f;f++)n[o+f]=a[f];return n||e(a)}var u,o=this;if("function"==typeof o.require)try{var a=o.require("crypto").randomBytes;u=a&&function(){return a(16)}}catch(f){}if(!u&&o.crypto&&crypto.getRandomValues){var i=new Uint8Array(16);u=function(){return crypto.getRandomValues(i),i}}if(!u){var c=new Array(16);u=function(){for(var r,e=0;16>e;e++)0===(3&e)&&(r=4294967296*Math.random()),c[e]=r>>>((3&e)<<3)&255;return c}}for(var s="function"==typeof o.Buffer?o.Buffer:Array,l=[],v={},d=0;256>d;d++)l[d]=(d+256).toString(16).substr(1),v[l[d]]=d;var y=u(),p=[1|y[0],y[1],y[2],y[3],y[4],y[5]],m=16383&(y[6]<<8|y[7]),g=0,w=0,h=t;if(h.v1=n,h.v4=t,h.parse=r,h.unparse=e,h.BufferClass=s,"undefined"!=typeof module&&module.exports)module.exports=h;else if("function"==typeof define&&define.amd)define(function(){return h});else{var q=o.uuid;h.noConflict=function(){return o.uuid=q,h},o.uuid=h}}).call(this);


},{}],315:[function(require,module,exports){
function sha1(r,e){return crypto.createHmac("sha1",r).update(e).digest("base64")}function rsa(r,e){return crypto.createSign("RSA-SHA1").update(e).sign(r,"base64")}function rfc3986(r){return encodeURIComponent(r).replace(/!/g,"%21").replace(/\*/g,"%2A").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/'/g,"%27")}function map(r){var e,n,a=[];for(e in r)if(n=r[e],Array.isArray(n))for(var t=0;t<n.length;t++)a.push([e,n[t]]);else a.push([e,n]);return a}function compare(r,e){return r>e?1:e>r?-1:0}function generateBase(r,e,n){var a=map(n).map(function(r){return[rfc3986(r[0]),rfc3986(r[1]||"")]}).sort(function(r,e){return compare(r[0],e[0])||compare(r[1],e[1])}).map(function(r){return r.join("=")}).join("&"),t=[rfc3986(r?r.toUpperCase():"GET"),rfc3986(e),rfc3986(a)].join("&");return t}function hmacsign(r,e,n,a,t){var c=generateBase(r,e,n),s=[a||"",t||""].map(rfc3986).join("&");return sha1(s,c)}function rsasign(r,e,n,a){var t=generateBase(r,e,n),c=a||"";return rsa(c,t)}function plaintext(r,e){var n=[r||"",e||""].map(rfc3986).join("&");return n}function sign(r){var e,n=1;switch(r){case"RSA-SHA1":e=rsasign;break;case"HMAC-SHA1":e=hmacsign;break;case"PLAINTEXT":e=plaintext,n=4;break;default:throw new Error("Signature method not supported: "+r)}return e.apply(null,[].slice.call(arguments,n))}var crypto=require("crypto"),qs=require("querystring");exports.hmacsign=hmacsign,exports.rsasign=rsasign,exports.plaintext=plaintext,exports.sign=sign,exports.rfc3986=rfc3986;


},{"crypto":21,"querystring":168}],316:[function(require,module,exports){
module.exports=require("./lib/");


},{"./lib/":317}],317:[function(require,module,exports){
var Stringify=require("./stringify"),Parse=require("./parse"),internals={};module.exports={stringify:Stringify,parse:Parse};


},{"./parse":318,"./stringify":319}],318:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3};internals.parseValues=function(e,r){for(var t={},i=e.split(r.delimiter,r.parameterLimit===1/0?void 0:r.parameterLimit),a=0,n=i.length;n>a;++a){var s=i[a],l=-1===s.indexOf("]=")?s.indexOf("="):s.indexOf("]=")+1;if(-1===l)t[Utils.decode(s)]="";else{var p=Utils.decode(s.slice(0,l)),m=Utils.decode(s.slice(l+1));t[p]=t.hasOwnProperty(p)?[].concat(t[p]).concat(m):m}}return t},internals.parseObject=function(e,r,t){if(!e.length)return r;var i=e.shift(),a={};if("[]"===i)a=[],a=a.concat(internals.parseObject(e,r,t));else{var n="["===i[0]&&"]"===i[i.length-1]?i.slice(1,i.length-1):i,s=parseInt(n,10),l=""+s;!isNaN(s)&&i!==n&&l===n&&s>=0&&s<=t.arrayLimit?(a=[],a[s]=internals.parseObject(e,r,t)):a[n]=internals.parseObject(e,r,t)}return a},internals.parseKeys=function(e,r,t){if(e){var i=/^([^\[\]]*)/,a=/(\[[^\[\]]*\])/g,n=i.exec(e);if(!Object.prototype.hasOwnProperty(n[1])){var s=[];n[1]&&s.push(n[1]);for(var l=0;null!==(n=a.exec(e))&&l<t.depth;)++l,Object.prototype.hasOwnProperty(n[1].replace(/\[|\]/g,""))||s.push(n[1]);return n&&s.push("["+e.slice(n.index)+"]"),internals.parseObject(s,r,t)}}},module.exports=function(e,r){if(""===e||null===e||"undefined"==typeof e)return{};r=r||{},r.delimiter="string"==typeof r.delimiter||Utils.isRegExp(r.delimiter)?r.delimiter:internals.delimiter,r.depth="number"==typeof r.depth?r.depth:internals.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:internals.arrayLimit,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:internals.parameterLimit;for(var t="string"==typeof e?internals.parseValues(e,r):e,i={},a=Object.keys(t),n=0,s=a.length;s>n;++n){var l=a[n],p=internals.parseKeys(l,t[l],r);i=Utils.merge(i,p)}return Utils.compact(i)};


},{"./utils":320}],319:[function(require,module,exports){
var Utils=require("./utils"),internals={delimiter:"&",indices:!0};internals.stringify=function(e,n,i){if(Utils.isBuffer(e)?e=e.toString():e instanceof Date?e=e.toISOString():null===e&&(e=""),"string"==typeof e||"number"==typeof e||"boolean"==typeof e)return[encodeURIComponent(n)+"="+encodeURIComponent(e)];var t=[];if("undefined"==typeof e)return t;for(var r=Object.keys(e),o=0,s=r.length;s>o;++o){var a=r[o];t=t.concat(!i.indices&&Array.isArray(e)?internals.stringify(e[a],n,i):internals.stringify(e[a],n+"["+a+"]",i))}return t},module.exports=function(e,n){n=n||{};var i="undefined"==typeof n.delimiter?internals.delimiter:n.delimiter;n.indices="boolean"==typeof n.indices?n.indices:internals.indices;var t=[];if("object"!=typeof e||null===e)return"";for(var r=Object.keys(e),o=0,s=r.length;s>o;++o){var a=r[o];t=t.concat(internals.stringify(e[a],a,n))}return t.join(i)};


},{"./utils":320}],320:[function(require,module,exports){
var internals={};exports.arrayToObject=function(r){for(var e={},t=0,n=r.length;n>t;++t)"undefined"!=typeof r[t]&&(e[t]=r[t]);return e},exports.merge=function(r,e){if(!e)return r;if("object"!=typeof e)return Array.isArray(r)?r.push(e):r[e]=!0,r;if("object"!=typeof r)return r=[r].concat(e);Array.isArray(r)&&!Array.isArray(e)&&(r=exports.arrayToObject(r));for(var t=Object.keys(e),n=0,o=t.length;o>n;++n){var c=t[n],u=e[c];r[c]=r[c]?exports.merge(r[c],u):u}return r},exports.decode=function(r){try{return decodeURIComponent(r.replace(/\+/g," "))}catch(e){return r}},exports.compact=function(r,e){if("object"!=typeof r||null===r)return r;e=e||[];var t=e.indexOf(r);if(-1!==t)return e[t];if(e.push(r),Array.isArray(r)){for(var n=[],o=0,c=r.length;c>o;++o)"undefined"!=typeof r[o]&&n.push(r[o]);return n}var u=Object.keys(r);for(o=0,c=u.length;c>o;++o){var f=u[o];r[f]=exports.compact(r[f],e)}return r},exports.isRegExp=function(r){return"[object RegExp]"===Object.prototype.toString.call(r)},exports.isBuffer=function(r){return null===r||"undefined"==typeof r?!1:!!(r.constructor&&r.constructor.isBuffer&&r.constructor.isBuffer(r))};


},{}],321:[function(require,module,exports){
(function (Buffer){
function StringStream(t,e){return this instanceof StringStream?(Stream.call(this),null==t&&(t="utf8"),this.readable=this.writable=!0,this.paused=!1,this.toEncoding=null==e?t:e,this.fromEncoding=null==e?"":t,void(this.decoder=new AlignedStringDecoder(this.toEncoding))):new StringStream(t,e)}function AlignedStringDecoder(t){switch(StringDecoder.call(this,t),this.encoding){case"base64":this.write=alignedWrite,this.alignedBuffer=new Buffer(3),this.alignedBytes=0}}function alignedWrite(t){var e=(this.alignedBytes+t.length)%this.alignedBuffer.length;if(!e&&!this.alignedBytes)return t.toString(this.encoding);var i=new Buffer(this.alignedBytes+t.length-e);return this.alignedBuffer.copy(i,0,0,this.alignedBytes),t.copy(i,this.alignedBytes,0,t.length-e),t.copy(this.alignedBuffer,0,t.length-e,t.length),this.alignedBytes=e,i.toString(this.encoding)}var util=require("util"),Stream=require("stream"),StringDecoder=require("string_decoder").StringDecoder;module.exports=StringStream,module.exports.AlignedStringDecoder=AlignedStringDecoder,util.inherits(StringStream,Stream),StringStream.prototype.write=function(t){if(!this.writable){var e=new Error("stream not writable");return e.code="EPIPE",this.emit("error",e),!1}this.fromEncoding&&(Buffer.isBuffer(t)&&(t=t.toString()),t=new Buffer(t,this.fromEncoding));var i=this.decoder.write(t);return i.length&&this.emit("data",i),!this.paused},StringStream.prototype.flush=function(){if(this.decoder.flush){var t=this.decoder.flush();t.length&&this.emit("data",t)}},StringStream.prototype.end=function(){(this.writable||this.readable)&&(this.flush(),this.emit("end"),this.writable=this.readable=!1,this.destroy())},StringStream.prototype.destroy=function(){this.decoder=null,this.writable=this.readable=!1,this.emit("close")},StringStream.prototype.pause=function(){this.paused=!0},StringStream.prototype.resume=function(){this.paused&&this.emit("drain"),this.paused=!1},util.inherits(AlignedStringDecoder,StringDecoder),AlignedStringDecoder.prototype.flush=function(){if(!this.alignedBuffer||!this.alignedBytes)return"";var t=this.alignedBuffer.toString(this.encoding,0,this.alignedBytes);return this.alignedBytes=0,t};


}).call(this,require("buffer").Buffer)

},{"buffer":17,"stream":180,"string_decoder":181,"util":184}],322:[function(require,module,exports){
"use strict";function parseDate(e,t){if(e){var o,r,i,n,a=e.split(DATE_DELIM);if(a){var s=new Date;s.setMilliseconds(0);for(var u=0;u<a.length;u++){var p=a[u].trim();if(p.length){var c;if(o||!(c=(t?STRICT_TIME:TIME).exec(p)))if(r||!(c=DAY_OF_MONTH.exec(p)))if(i||!(c=MONTH.exec(p)))if(n||!(c=YEAR.exec(p)));else{var l=c[0];if(l>=70&&99>=l?l+=1900:l>=0&&69>=l&&(l+=2e3),1601>l)return;n=!0,s.setUTCFullYear(l)}else i=!0,s.setUTCMonth(MONTH_TO_NUM[c[1].toLowerCase()]);else r=!0,s.setUTCDate(c[1]);else o=!0,s.setUTCHours(c[1]),s.setUTCMinutes(c[2]),s.setUTCSeconds(c[3])}}if(o&&r&&i&&n)return s}}}function formatDate(e){var t=e.getUTCDate();t=t>=10?t:"0"+t;var o=e.getUTCHours();o=o>=10?o:"0"+o;var r=e.getUTCMinutes();r=r>=10?r:"0"+r;var i=e.getUTCSeconds();return i=i>=10?i:"0"+i,NUM_TO_DAY[e.getUTCDay()]+", "+t+" "+NUM_TO_MONTH[e.getUTCMonth()]+" "+e.getUTCFullYear()+" "+o+":"+r+":"+i+" GMT"}function canonicalDomain(e){return null==e?null:(e=e.trim().replace(/^\./,""),punycode&&/[^\u0001-\u007f]/.test(e)&&(e=punycode.toASCII(e)),e.toLowerCase())}function domainMatch(e,t,o){if(null==e||null==t)return null;if(o!==!1&&(e=canonicalDomain(e),t=canonicalDomain(t)),e==t)return!0;if(net.isIP(e))return!1;var r=e.indexOf(t);return 0>=r?!1:e.length!==t.length+r?!1:"."!==e.substr(r-1,1)?!1:!0}function defaultPath(e){if(!e||"/"!==e.substr(0,1))return"/";if("/"===e)return e;var t=e.lastIndexOf("/");return 0===t?"/":e.slice(0,t)}function pathMatch(e,t){if(t===e)return!0;var o=e.indexOf(t);if(0===o){if("/"===t.substr(-1))return!0;if("/"===e.substr(t.length,1))return!0}return!1}function parse(e,t){e=e.trim();var o=TRAILING_SEMICOLON.exec(e);if(o){if(t)return;e=e.slice(0,o.index)}var r=e.indexOf(";"),i=t?COOKIE_PAIR_STRICT:COOKIE_PAIR,n=i.exec(-1===r?e:e.substr(0,r));if(n){var a=new Cookie;if(a.key=n[1],a.value=n[3],-1===r)return a;var s=e.slice(r).replace(/^\s*;\s*/,"").trim();if(0===s.length)return a;for(var u=s.split(/\s*;\s*/);u.length;){var p=u.shift();if(t&&!EXTENSION_AV.test(p))return;var c,l,f=p.indexOf("=");switch(-1===f?(c=p,l=null):(c=p.substr(0,f),l=p.substr(f+1)),c=c.trim().toLowerCase(),l&&(l=l.trim()),c){case"expires":if(!l){if(t)return;break}var h=parseDate(l,t);if(null==h){if(t)return;break}a.expires=h;break;case"max-age":if(!l){if(t)return;break}if(!/^-?[0-9]+$/.test(l)){if(t)return;break}var C=parseInt(l,10);if(t&&0>=C)return;a.setMaxAge(C);break;case"domain":if(!l){if(t)return;break}var m=l.trim().replace(/^\./,"");if(!m){if(t)return;break}a.domain=m.toLowerCase();break;case"path":if(!l||"/"!=l.substr(0,1)){if(t)return;break}a.path=l;break;case"secure":if(null!=l&&t)return;a.secure=!0;break;case"httponly":if(null!=l&&t)return;a.httpOnly=!0;break;default:a.extensions=a.extensions||[],a.extensions.push(p)}}return a.creation=new Date,a}}function fromJSON(e){if(!e)return null;var t;try{t=JSON.parse(e)}catch(o){return null}for(var r=new Cookie,i=0;numCookieProperties>i;i++){var n=cookieProperties[i];null!=t[n]&&(r[n]="expires"===n||"creation"===n||"lastAccessed"===n?"Infinity"==t[n]?"Infinity":new Date(t[n]):t[n])}return r.creation=r.creation||new Date,r}function cookieCompare(e,t){var o=(t.path?t.path.length:0)-(e.path?e.path.length:0);return 0!==o?o:(e.creation?e.creation.getTime():MAX_TIME)-(t.creation?t.creation.getTime():MAX_TIME)}function permuteDomain(e){var t=pubsuffix.getPublicSuffix(e);if(!t)return null;if(t==e)return[e];for(var o=e.slice(0,-(t.length+1)),r=o.split(".").reverse(),i=t,n=[i];r.length;)i=r.shift()+"."+i,n.push(i);return n}function permutePath(e){if("/"===e)return["/"];e.lastIndexOf("/")===e.length-1&&(e=e.substr(0,e.length-1));for(var t=[e];e.length>1;){var o=e.lastIndexOf("/");if(0===o)break;e=e.substr(0,o),t.push(e)}return t.push("/"),t}function Cookie(e){"object"==typeof e&&Object.keys(e).forEach(function(t){Cookie.prototype.hasOwnProperty(t)&&(this[t]=e[t]||Cookie.prototype[t])}.bind(this))}function CookieJar(e,t){null!=t&&(this.rejectPublicSuffixes=t),e||(memstore=memstore||require("./memstore"),e=new memstore.MemoryCookieStore),this.store=e}function syncWrap(e){return function(){if(!this.store.synchronous)throw new Error("CookieJar store is not synchronous; use async API instead.");var t,o,r=Array.prototype.slice.call(arguments);if(r.push(function(e,r){t=e,o=r}),this[e].apply(this,r),t)throw t;return o}}var net=require("net"),urlParse=require("url").parse,pubsuffix=require("./pubsuffix"),Store=require("./store").Store,punycode;try{punycode=require("punycode")}catch(e){console.warn("cookie: can't load punycode; won't use punycode for domain normalization")}var DATE_DELIM=/[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/,TOKEN=/[\x21\x23-\x26\x2A\x2B\x2D\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]/,COOKIE_OCTET=/[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]/,COOKIE_OCTETS=new RegExp("^"+COOKIE_OCTET.source+"$"),COOKIE_PAIR_STRICT=new RegExp("^("+TOKEN.source+'+)=("?)('+COOKIE_OCTET.source+"*)\\2$"),COOKIE_PAIR=/^([^=\s]+)\s*=\s*("?)\s*(.*)\s*\2\s*$/,NON_CTL_SEMICOLON=/[\x20-\x3A\x3C-\x7E]+/,EXTENSION_AV=NON_CTL_SEMICOLON,PATH_VALUE=NON_CTL_SEMICOLON,TRAILING_SEMICOLON=/;+$/,DAY_OF_MONTH=/^(0?[1-9]|[12][0-9]|3[01])$/,TIME=/(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/,STRICT_TIME=/^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,MONTH=/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i,MONTH_TO_NUM={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11},NUM_TO_MONTH=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],NUM_TO_DAY=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],YEAR=/^([1-9][0-9]{1,3})$/,MAX_TIME=2147483647e3,MIN_TIME=0;Cookie.parse=parse,Cookie.fromJSON=fromJSON,Cookie.prototype.key="",Cookie.prototype.value="",Cookie.prototype.expires="Infinity",Cookie.prototype.maxAge=null,Cookie.prototype.domain=null,Cookie.prototype.path=null,Cookie.prototype.secure=!1,Cookie.prototype.httpOnly=!1,Cookie.prototype.extensions=null,Cookie.prototype.hostOnly=null,Cookie.prototype.pathIsDefault=null,Cookie.prototype.creation=null,Cookie.prototype.lastAccessed=null;var cookieProperties=Object.freeze(Object.keys(Cookie.prototype).map(function(e){return e instanceof Function?void 0:e})),numCookieProperties=cookieProperties.length;Cookie.prototype.inspect=function(){var e=Date.now();return'Cookie="'+this.toString()+"; hostOnly="+(null!=this.hostOnly?this.hostOnly:"?")+"; aAge="+(this.lastAccessed?e-this.lastAccessed.getTime()+"ms":"?")+"; cAge="+(this.creation?e-this.creation.getTime()+"ms":"?")+'"'},Cookie.prototype.validate=function(){if(!COOKIE_OCTETS.test(this.value))return!1;if(!(this.expires==1/0||this.expires instanceof Date||parseDate(this.expires,!0)))return!1;if(null!=this.maxAge&&this.maxAge<=0)return!1;if(null!=this.path&&!PATH_VALUE.test(this.path))return!1;var e=this.cdomain();if(e){if(e.match(/\.$/))return!1;var t=pubsuffix.getPublicSuffix(e);if(null==t)return!1}return!0},Cookie.prototype.setExpires=function(e){this.expires=e instanceof Date?e:parseDate(e)||"Infinity"},Cookie.prototype.setMaxAge=function(e){this.maxAge=e===1/0||e===-(1/0)?e.toString():e},Cookie.prototype.cookieString=function(){var e=this.value;return null==e&&(e=""),this.key+"="+e},Cookie.prototype.toString=function(){var e=this.cookieString();return this.expires!=1/0&&(e+=this.expires instanceof Date?"; Expires="+formatDate(this.expires):"; Expires="+this.expires),null!=this.maxAge&&this.maxAge!=1/0&&(e+="; Max-Age="+this.maxAge),this.domain&&!this.hostOnly&&(e+="; Domain="+this.domain),this.path&&(e+="; Path="+this.path),this.secure&&(e+="; Secure"),this.httpOnly&&(e+="; HttpOnly"),this.extensions&&this.extensions.forEach(function(t){e+="; "+t}),e},Cookie.prototype.TTL=function(e){if(null!=this.maxAge)return this.maxAge<=0?0:1e3*this.maxAge;var t=this.expires;return t!=1/0?(t instanceof Date||(t=parseDate(t)||1/0),t==1/0?1/0:t.getTime()-(e||Date.now())):1/0},Cookie.prototype.expiryTime=function(e){if(null!=this.maxAge){var t=this.creation||e||new Date,o=this.maxAge<=0?-(1/0):1e3*this.maxAge;return t.getTime()+o}return this.expires==1/0?1/0:this.expires.getTime()},Cookie.prototype.expiryDate=function(e){var t=this.expiryTime(e);return new Date(t==1/0?MAX_TIME:t==-(1/0)?MIN_TIME:t)},Cookie.prototype.isPersistent=function(){return null!=this.maxAge||this.expires!=1/0},Cookie.prototype.cdomain=Cookie.prototype.canonicalizedDomain=function(){return null==this.domain?null:canonicalDomain(this.domain)};var memstore;CookieJar.prototype.store=null,CookieJar.prototype.rejectPublicSuffixes=!0;var CAN_BE_SYNC=[];CAN_BE_SYNC.push("setCookie"),CookieJar.prototype.setCookie=function(e,t,o,r){function i(t,i){if(t)return r(t);var n=function(t){return t?r(t):void r(null,e)};if(i){if(o.http===!1&&i.httpOnly)return t=new Error("old Cookie is HttpOnly and this isn't an HTTP API"),r(o.ignoreError?null:t);e.creation=i.creation,e.lastAccessed=u,c.updateCookie(i,e,n)}else e.creation=e.lastAccessed=u,c.putCookie(e,n)}var n,a=t instanceof Object?t:urlParse(t);o instanceof Function&&(r=o,o={});var s=canonicalDomain(a.hostname);if(e instanceof Cookie||(e=Cookie.parse(e,o.strict===!0)),!e)return n=new Error("Cookie failed to parse"),r(o.ignoreError?null:n);var u=o.now||new Date;if(this.rejectPublicSuffixes&&e.domain){var p=pubsuffix.getPublicSuffix(e.cdomain());if(null==p)return n=new Error("Cookie has domain set to a public suffix"),r(o.ignoreError?null:n)}if(e.domain){if(!domainMatch(s,e.cdomain(),!1))return n=new Error("Cookie not in this host's domain. Cookie:"+e.cdomain()+" Request:"+s),r(o.ignoreError?null:n);null==e.hostOnly&&(e.hostOnly=!1)}else e.hostOnly=!0,e.domain=s;if(e.path?e.path.length>1&&"/"==e.path.substr(-1)&&(e.path=e.path.slice(0,-1)):(e.path=defaultPath(a.pathname),e.pathIsDefault=!0),o.http===!1&&e.httpOnly)return n=new Error("Cookie is HttpOnly and this isn't an HTTP API"),r(o.ignoreError?null:n);var c=this.store;c.updateCookie||(c.updateCookie=function(e,t,o){this.putCookie(t,o)}),c.findCookie(e.domain,e.path,e.key,i)},CAN_BE_SYNC.push("getCookies"),CookieJar.prototype.getCookies=function(e,t,o){function r(e){if(e.hostOnly){if(e.domain!=n)return!1}else if(!domainMatch(n,e.domain,!1))return!1;return l||pathMatch(a,e.path)?e.secure&&!s?!1:e.httpOnly&&!u?!1:c&&e.expiryTime()<=p?(f.removeCookie(e.domain,e.path,e.key,function(){}),!1):!0:!1}var i=e instanceof Object?e:urlParse(e);t instanceof Function&&(o=t,t={});var n=canonicalDomain(i.hostname),a=i.pathname||"/",s=t.secure;null!=s||!i.protocol||"https:"!=i.protocol&&"wss:"!=i.protocol||(s=!0);var u=t.http;null==u&&(u=!0);var p=t.now||Date.now(),c=t.expire!==!1,l=!!t.allPaths,f=this.store;f.findCookies(n,l?null:a,function(e,i){if(e)return o(e);i=i.filter(r),t.sort!==!1&&(i=i.sort(cookieCompare));var n=new Date;i.forEach(function(e){e.lastAccessed=n}),o(null,i)})},CAN_BE_SYNC.push("getCookieString"),CookieJar.prototype.getCookieString=function(){var e=Array.prototype.slice.call(arguments,0),t=e.pop(),o=function(e,o){e?t(e):t(null,o.map(function(e){return e.cookieString()}).join("; "))};e.push(o),this.getCookies.apply(this,e)},CAN_BE_SYNC.push("getSetCookieStrings"),CookieJar.prototype.getSetCookieStrings=function(){var e=Array.prototype.slice.call(arguments,0),t=e.pop(),o=function(e,o){e?t(e):t(null,o.map(function(e){return e.toString()}))};e.push(o),this.getCookies.apply(this,e)},CAN_BE_SYNC.forEach(function(e){CookieJar.prototype[e+"Sync"]=syncWrap(e)}),module.exports={CookieJar:CookieJar,Cookie:Cookie,Store:Store,parseDate:parseDate,formatDate:formatDate,parse:parse,fromJSON:fromJSON,domainMatch:domainMatch,defaultPath:defaultPath,pathMatch:pathMatch,getPublicSuffix:pubsuffix.getPublicSuffix,cookieCompare:cookieCompare,permuteDomain:permuteDomain,permutePath:permutePath,canonicalDomain:canonicalDomain};


},{"./memstore":323,"./pubsuffix":324,"./store":325,"net":1,"punycode":165,"url":182}],323:[function(require,module,exports){
"use strict";function MemoryCookieStore(){Store.call(this),this.idx={}}var tough=require("./cookie"),Store=require("./store").Store,permuteDomain=tough.permuteDomain,permutePath=tough.permutePath,util=require("util");util.inherits(MemoryCookieStore,Store),exports.MemoryCookieStore=MemoryCookieStore,MemoryCookieStore.prototype.idx=null,MemoryCookieStore.prototype.synchronous=!0,MemoryCookieStore.prototype.inspect=function(){return"{ idx: "+util.inspect(this.idx,!1,2)+" }"},MemoryCookieStore.prototype.findCookie=function(o,e,i,t){return this.idx[o]&&this.idx[o][e]?t(null,this.idx[o][e][i]||null):t(null,void 0)},MemoryCookieStore.prototype.findCookies=function(o,e,i){var t=[];if(!o)return i(null,[]);var r;if(e)if("/"===e)r=function(o){var e=o["/"];if(e)for(var i in e)t.push(e[i])};else{var n=permutePath(e)||[e];r=function(o){n.forEach(function(e){var i=o[e];if(i)for(var r in i)t.push(i[r])})}}else r=function(o){for(var e in o){var i=o[e];for(var r in i)t.push(i[r])}};var u=permuteDomain(o)||[o],h=this.idx;u.forEach(function(o){var e=h[o];e&&r(e)}),i(null,t)},MemoryCookieStore.prototype.putCookie=function(o,e){this.idx[o.domain]||(this.idx[o.domain]={}),this.idx[o.domain][o.path]||(this.idx[o.domain][o.path]={}),this.idx[o.domain][o.path][o.key]=o,e(null)},MemoryCookieStore.prototype.updateCookie=function(o,e,i){this.putCookie(e,i)},MemoryCookieStore.prototype.removeCookie=function(o,e,i,t){this.idx[o]&&this.idx[o][e]&&this.idx[o][e][i]&&delete this.idx[o][e][i],t(null)},MemoryCookieStore.prototype.removeCookies=function(o,e,i){return this.idx[o]&&(e?delete this.idx[o][e]:delete this.idx[o]),i(null)};


},{"./cookie":322,"./store":325,"util":184}],324:[function(require,module,exports){
module.exports.getPublicSuffix=function(o){if(!o)return null;if(o.match(/^\./))return null;o=o.toLowerCase();for(var a=o.split(".").reverse(),n="",e=0,s=0;s<a.length;s++){var m=a[s],u="*"+n,r=m+n;index[u]?(e=s+1,index[r]===!1&&e--):index[r]&&(e=s+1),n="."+m+n}return index["*"+n]?null:e&&a.length>e?a.slice(0,e+1).reverse().join("."):null};var index=module.exports.index=Object.freeze({ac:!0,"com.ac":!0,"edu.ac":!0,"gov.ac":!0,"net.ac":!0,"mil.ac":!0,"org.ac":!0,ad:!0,"nom.ad":!0,ae:!0,"co.ae":!0,"net.ae":!0,"org.ae":!0,"sch.ae":!0,"ac.ae":!0,"gov.ae":!0,"mil.ae":!0,aero:!0,"accident-investigation.aero":!0,"accident-prevention.aero":!0,"aerobatic.aero":!0,"aeroclub.aero":!0,"aerodrome.aero":!0,"agents.aero":!0,"aircraft.aero":!0,"airline.aero":!0,"airport.aero":!0,"air-surveillance.aero":!0,"airtraffic.aero":!0,"air-traffic-control.aero":!0,"ambulance.aero":!0,"amusement.aero":!0,"association.aero":!0,"author.aero":!0,"ballooning.aero":!0,"broker.aero":!0,"caa.aero":!0,"cargo.aero":!0,"catering.aero":!0,"certification.aero":!0,"championship.aero":!0,"charter.aero":!0,"civilaviation.aero":!0,"club.aero":!0,"conference.aero":!0,"consultant.aero":!0,"consulting.aero":!0,"control.aero":!0,"council.aero":!0,"crew.aero":!0,"design.aero":!0,"dgca.aero":!0,"educator.aero":!0,"emergency.aero":!0,"engine.aero":!0,"engineer.aero":!0,"entertainment.aero":!0,"equipment.aero":!0,"exchange.aero":!0,"express.aero":!0,"federation.aero":!0,"flight.aero":!0,"freight.aero":!0,"fuel.aero":!0,"gliding.aero":!0,"government.aero":!0,"groundhandling.aero":!0,"group.aero":!0,"hanggliding.aero":!0,"homebuilt.aero":!0,"insurance.aero":!0,"journal.aero":!0,"journalist.aero":!0,"leasing.aero":!0,"logistics.aero":!0,"magazine.aero":!0,"maintenance.aero":!0,"marketplace.aero":!0,"media.aero":!0,"microlight.aero":!0,"modelling.aero":!0,"navigation.aero":!0,"parachuting.aero":!0,"paragliding.aero":!0,"passenger-association.aero":!0,"pilot.aero":!0,"press.aero":!0,"production.aero":!0,"recreation.aero":!0,"repbody.aero":!0,"res.aero":!0,"research.aero":!0,"rotorcraft.aero":!0,"safety.aero":!0,"scientist.aero":!0,"services.aero":!0,"show.aero":!0,"skydiving.aero":!0,"software.aero":!0,"student.aero":!0,"taxi.aero":!0,"trader.aero":!0,"trading.aero":!0,"trainer.aero":!0,"union.aero":!0,"workinggroup.aero":!0,"works.aero":!0,af:!0,"gov.af":!0,"com.af":!0,"org.af":!0,"net.af":!0,"edu.af":!0,ag:!0,"com.ag":!0,"org.ag":!0,"net.ag":!0,"co.ag":!0,"nom.ag":!0,ai:!0,"off.ai":!0,"com.ai":!0,"net.ai":!0,"org.ai":!0,al:!0,"com.al":!0,"edu.al":!0,"gov.al":!0,"mil.al":!0,"net.al":!0,"org.al":!0,am:!0,an:!0,"com.an":!0,"net.an":!0,"org.an":!0,"edu.an":!0,ao:!0,"ed.ao":!0,"gv.ao":!0,"og.ao":!0,"co.ao":!0,"pb.ao":!0,"it.ao":!0,aq:!0,"*.ar":!0,"congresodelalengua3.ar":!1,"educ.ar":!1,"gobiernoelectronico.ar":!1,"mecon.ar":!1,"nacion.ar":!1,"nic.ar":!1,"promocion.ar":!1,"retina.ar":!1,"uba.ar":!1,"e164.arpa":!0,"in-addr.arpa":!0,"ip6.arpa":!0,"iris.arpa":!0,"uri.arpa":!0,"urn.arpa":!0,as:!0,"gov.as":!0,asia:!0,at:!0,"ac.at":!0,"co.at":!0,"gv.at":!0,"or.at":!0,"com.au":!0,"net.au":!0,"org.au":!0,"edu.au":!0,"gov.au":!0,"csiro.au":!0,"asn.au":!0,"id.au":!0,"info.au":!0,"conf.au":!0,"oz.au":!0,"act.au":!0,"nsw.au":!0,"nt.au":!0,"qld.au":!0,"sa.au":!0,"tas.au":!0,"vic.au":!0,"wa.au":!0,"act.edu.au":!0,"nsw.edu.au":!0,"nt.edu.au":!0,"qld.edu.au":!0,"sa.edu.au":!0,"tas.edu.au":!0,"vic.edu.au":!0,"wa.edu.au":!0,"act.gov.au":!0,"nt.gov.au":!0,"qld.gov.au":!0,"sa.gov.au":!0,"tas.gov.au":!0,"vic.gov.au":!0,"wa.gov.au":!0,aw:!0,"com.aw":!0,ax:!0,az:!0,"com.az":!0,"net.az":!0,"int.az":!0,"gov.az":!0,"org.az":!0,"edu.az":!0,"info.az":!0,"pp.az":!0,"mil.az":!0,"name.az":!0,"pro.az":!0,"biz.az":!0,ba:!0,"org.ba":!0,"net.ba":!0,"edu.ba":!0,"gov.ba":!0,"mil.ba":!0,"unsa.ba":!0,"unbi.ba":!0,"co.ba":!0,"com.ba":!0,"rs.ba":!0,bb:!0,"biz.bb":!0,"com.bb":!0,"edu.bb":!0,"gov.bb":!0,"info.bb":!0,"net.bb":!0,"org.bb":!0,"store.bb":!0,"*.bd":!0,be:!0,"ac.be":!0,bf:!0,"gov.bf":!0,bg:!0,"a.bg":!0,"b.bg":!0,"c.bg":!0,"d.bg":!0,"e.bg":!0,"f.bg":!0,"g.bg":!0,"h.bg":!0,"i.bg":!0,"j.bg":!0,"k.bg":!0,"l.bg":!0,"m.bg":!0,"n.bg":!0,"o.bg":!0,"p.bg":!0,"q.bg":!0,"r.bg":!0,"s.bg":!0,"t.bg":!0,"u.bg":!0,"v.bg":!0,"w.bg":!0,"x.bg":!0,"y.bg":!0,"z.bg":!0,"0.bg":!0,"1.bg":!0,"2.bg":!0,"3.bg":!0,"4.bg":!0,"5.bg":!0,"6.bg":!0,"7.bg":!0,"8.bg":!0,"9.bg":!0,bh:!0,"com.bh":!0,"edu.bh":!0,"net.bh":!0,"org.bh":!0,"gov.bh":!0,bi:!0,"co.bi":!0,"com.bi":!0,"edu.bi":!0,"or.bi":!0,"org.bi":!0,biz:!0,bj:!0,"asso.bj":!0,"barreau.bj":!0,"gouv.bj":!0,bm:!0,"com.bm":!0,"edu.bm":!0,"gov.bm":!0,"net.bm":!0,"org.bm":!0,"*.bn":!0,bo:!0,"com.bo":!0,"edu.bo":!0,"gov.bo":!0,"gob.bo":!0,"int.bo":!0,"org.bo":!0,"net.bo":!0,"mil.bo":!0,"tv.bo":!0,br:!0,"adm.br":!0,"adv.br":!0,"agr.br":!0,"am.br":!0,"arq.br":!0,"art.br":!0,"ato.br":!0,"b.br":!0,"bio.br":!0,"blog.br":!0,"bmd.br":!0,"can.br":!0,"cim.br":!0,"cng.br":!0,"cnt.br":!0,"com.br":!0,"coop.br":!0,"ecn.br":!0,"edu.br":!0,"emp.br":!0,"eng.br":!0,"esp.br":!0,"etc.br":!0,"eti.br":!0,"far.br":!0,"flog.br":!0,"fm.br":!0,"fnd.br":!0,"fot.br":!0,"fst.br":!0,"g12.br":!0,"ggf.br":!0,"gov.br":!0,"imb.br":!0,"ind.br":!0,"inf.br":!0,"jor.br":!0,"jus.br":!0,"lel.br":!0,"mat.br":!0,"med.br":!0,"mil.br":!0,"mus.br":!0,"net.br":!0,"nom.br":!0,"not.br":!0,"ntr.br":!0,"odo.br":!0,"org.br":!0,"ppg.br":!0,"pro.br":!0,"psc.br":!0,"psi.br":!0,"qsl.br":!0,"radio.br":!0,"rec.br":!0,"slg.br":!0,"srv.br":!0,"taxi.br":!0,"teo.br":!0,"tmp.br":!0,"trd.br":!0,"tur.br":!0,"tv.br":!0,"vet.br":!0,"vlog.br":!0,"wiki.br":!0,"zlg.br":!0,bs:!0,"com.bs":!0,"net.bs":!0,"org.bs":!0,"edu.bs":!0,"gov.bs":!0,bt:!0,"com.bt":!0,"edu.bt":!0,"gov.bt":!0,"net.bt":!0,"org.bt":!0,bw:!0,"co.bw":!0,"org.bw":!0,by:!0,"gov.by":!0,"mil.by":!0,"com.by":!0,"of.by":!0,bz:!0,"com.bz":!0,"net.bz":!0,"org.bz":!0,"edu.bz":!0,"gov.bz":!0,ca:!0,"ab.ca":!0,"bc.ca":!0,"mb.ca":!0,"nb.ca":!0,"nf.ca":!0,"nl.ca":!0,"ns.ca":!0,"nt.ca":!0,"nu.ca":!0,"on.ca":!0,"pe.ca":!0,"qc.ca":!0,"sk.ca":!0,"yk.ca":!0,"gc.ca":!0,cat:!0,cc:!0,cd:!0,"gov.cd":!0,cf:!0,cg:!0,ch:!0,ci:!0,"org.ci":!0,"or.ci":!0,"com.ci":!0,"co.ci":!0,"edu.ci":!0,"ed.ci":!0,"ac.ci":!0,"net.ci":!0,"go.ci":!0,"asso.ci":!0,"xn--aroport-bya.ci":!0,"int.ci":!0,"presse.ci":!0,"md.ci":!0,"gouv.ci":!0,"*.ck":!0,"www.ck":!1,cl:!0,"gov.cl":!0,"gob.cl":!0,"co.cl":!0,"mil.cl":!0,cm:!0,"gov.cm":!0,cn:!0,"ac.cn":!0,"com.cn":!0,"edu.cn":!0,"gov.cn":!0,"net.cn":!0,"org.cn":!0,"mil.cn":!0,"xn--55qx5d.cn":!0,"xn--io0a7i.cn":!0,"xn--od0alg.cn":!0,"ah.cn":!0,"bj.cn":!0,"cq.cn":!0,"fj.cn":!0,"gd.cn":!0,"gs.cn":!0,"gz.cn":!0,"gx.cn":!0,"ha.cn":!0,"hb.cn":!0,"he.cn":!0,"hi.cn":!0,"hl.cn":!0,"hn.cn":!0,"jl.cn":!0,"js.cn":!0,"jx.cn":!0,"ln.cn":!0,"nm.cn":!0,"nx.cn":!0,"qh.cn":!0,"sc.cn":!0,"sd.cn":!0,"sh.cn":!0,"sn.cn":!0,"sx.cn":!0,"tj.cn":!0,"xj.cn":!0,"xz.cn":!0,"yn.cn":!0,"zj.cn":!0,"hk.cn":!0,"mo.cn":!0,"tw.cn":!0,co:!0,"arts.co":!0,"com.co":!0,"edu.co":!0,"firm.co":!0,"gov.co":!0,"info.co":!0,"int.co":!0,"mil.co":!0,"net.co":!0,"nom.co":!0,"org.co":!0,"rec.co":!0,"web.co":!0,com:!0,coop:!0,cr:!0,"ac.cr":!0,"co.cr":!0,"ed.cr":!0,"fi.cr":!0,"go.cr":!0,"or.cr":!0,"sa.cr":!0,cu:!0,"com.cu":!0,"edu.cu":!0,"org.cu":!0,"net.cu":!0,"gov.cu":!0,"inf.cu":!0,cv:!0,cx:!0,"gov.cx":!0,"*.cy":!0,cz:!0,de:!0,dj:!0,dk:!0,dm:!0,"com.dm":!0,"net.dm":!0,"org.dm":!0,"edu.dm":!0,"gov.dm":!0,"do":!0,"art.do":!0,"com.do":!0,"edu.do":!0,"gob.do":!0,"gov.do":!0,"mil.do":!0,"net.do":!0,"org.do":!0,"sld.do":!0,"web.do":!0,dz:!0,"com.dz":!0,"org.dz":!0,"net.dz":!0,"gov.dz":!0,"edu.dz":!0,"asso.dz":!0,"pol.dz":!0,"art.dz":!0,ec:!0,"com.ec":!0,"info.ec":!0,"net.ec":!0,"fin.ec":!0,"k12.ec":!0,"med.ec":!0,"pro.ec":!0,"org.ec":!0,"edu.ec":!0,"gov.ec":!0,"gob.ec":!0,"mil.ec":!0,edu:!0,ee:!0,"edu.ee":!0,"gov.ee":!0,"riik.ee":!0,"lib.ee":!0,"med.ee":!0,"com.ee":!0,"pri.ee":!0,"aip.ee":!0,"org.ee":!0,"fie.ee":!0,eg:!0,"com.eg":!0,"edu.eg":!0,"eun.eg":!0,"gov.eg":!0,"mil.eg":!0,"name.eg":!0,"net.eg":!0,"org.eg":!0,"sci.eg":!0,"*.er":!0,es:!0,"com.es":!0,"nom.es":!0,"org.es":!0,"gob.es":!0,"edu.es":!0,"*.et":!0,eu:!0,fi:!0,"aland.fi":!0,"*.fj":!0,"*.fk":!0,fm:!0,fo:!0,fr:!0,"com.fr":!0,"asso.fr":!0,"nom.fr":!0,"prd.fr":!0,"presse.fr":!0,"tm.fr":!0,"aeroport.fr":!0,"assedic.fr":!0,"avocat.fr":!0,"avoues.fr":!0,"cci.fr":!0,"chambagri.fr":!0,"chirurgiens-dentistes.fr":!0,"experts-comptables.fr":!0,"geometre-expert.fr":!0,"gouv.fr":!0,"greta.fr":!0,"huissier-justice.fr":!0,"medecin.fr":!0,"notaires.fr":!0,"pharmacien.fr":!0,"port.fr":!0,"veterinaire.fr":!0,ga:!0,gd:!0,ge:!0,"com.ge":!0,"edu.ge":!0,"gov.ge":!0,"org.ge":!0,"mil.ge":!0,"net.ge":!0,"pvt.ge":!0,gf:!0,gg:!0,"co.gg":!0,"org.gg":!0,"net.gg":!0,"sch.gg":!0,"gov.gg":!0,gh:!0,"com.gh":!0,"edu.gh":!0,"gov.gh":!0,"org.gh":!0,"mil.gh":!0,gi:!0,"com.gi":!0,"ltd.gi":!0,"gov.gi":!0,"mod.gi":!0,"edu.gi":!0,"org.gi":!0,gl:!0,gm:!0,"ac.gn":!0,"com.gn":!0,"edu.gn":!0,"gov.gn":!0,"org.gn":!0,"net.gn":!0,gov:!0,gp:!0,"com.gp":!0,"net.gp":!0,"mobi.gp":!0,"edu.gp":!0,"org.gp":!0,"asso.gp":!0,gq:!0,gr:!0,"com.gr":!0,"edu.gr":!0,"net.gr":!0,"org.gr":!0,"gov.gr":!0,gs:!0,"*.gt":!0,"www.gt":!1,"*.gu":!0,gw:!0,gy:!0,"co.gy":!0,"com.gy":!0,"net.gy":!0,hk:!0,"com.hk":!0,"edu.hk":!0,"gov.hk":!0,"idv.hk":!0,"net.hk":!0,"org.hk":!0,"xn--55qx5d.hk":!0,"xn--wcvs22d.hk":!0,"xn--lcvr32d.hk":!0,"xn--mxtq1m.hk":!0,"xn--gmqw5a.hk":!0,"xn--ciqpn.hk":!0,"xn--gmq050i.hk":!0,"xn--zf0avx.hk":!0,"xn--io0a7i.hk":!0,"xn--mk0axi.hk":!0,"xn--od0alg.hk":!0,"xn--od0aq3b.hk":!0,"xn--tn0ag.hk":!0,"xn--uc0atv.hk":!0,"xn--uc0ay4a.hk":!0,hm:!0,hn:!0,"com.hn":!0,"edu.hn":!0,"org.hn":!0,"net.hn":!0,"mil.hn":!0,"gob.hn":!0,hr:!0,"iz.hr":!0,"from.hr":!0,"name.hr":!0,"com.hr":!0,ht:!0,"com.ht":!0,"shop.ht":!0,"firm.ht":!0,"info.ht":!0,"adult.ht":!0,"net.ht":!0,"pro.ht":!0,"org.ht":!0,"med.ht":!0,"art.ht":!0,"coop.ht":!0,"pol.ht":!0,"asso.ht":!0,"edu.ht":!0,"rel.ht":!0,"gouv.ht":!0,"perso.ht":!0,hu:!0,"co.hu":!0,"info.hu":!0,"org.hu":!0,"priv.hu":!0,"sport.hu":!0,"tm.hu":!0,"2000.hu":!0,"agrar.hu":!0,"bolt.hu":!0,"casino.hu":!0,"city.hu":!0,"erotica.hu":!0,"erotika.hu":!0,"film.hu":!0,"forum.hu":!0,"games.hu":!0,"hotel.hu":!0,"ingatlan.hu":!0,"jogasz.hu":!0,"konyvelo.hu":!0,"lakas.hu":!0,"media.hu":!0,"news.hu":!0,"reklam.hu":!0,"sex.hu":!0,"shop.hu":!0,"suli.hu":!0,"szex.hu":!0,"tozsde.hu":!0,"utazas.hu":!0,"video.hu":!0,id:!0,"ac.id":!0,"co.id":!0,"go.id":!0,"mil.id":!0,"net.id":!0,"or.id":!0,"sch.id":!0,"web.id":!0,ie:!0,"gov.ie":!0,"*.il":!0,im:!0,"co.im":!0,"ltd.co.im":!0,"plc.co.im":!0,"net.im":!0,"gov.im":!0,"org.im":!0,"nic.im":!0,"ac.im":!0,"in":!0,"co.in":!0,"firm.in":!0,"net.in":!0,"org.in":!0,"gen.in":!0,"ind.in":!0,"nic.in":!0,"ac.in":!0,"edu.in":!0,"res.in":!0,"gov.in":!0,"mil.in":!0,info:!0,"int":!0,"eu.int":!0,io:!0,"com.io":!0,iq:!0,"gov.iq":!0,"edu.iq":!0,"mil.iq":!0,"com.iq":!0,"org.iq":!0,"net.iq":!0,ir:!0,"ac.ir":!0,"co.ir":!0,"gov.ir":!0,"id.ir":!0,"net.ir":!0,"org.ir":!0,"sch.ir":!0,"xn--mgba3a4f16a.ir":!0,"xn--mgba3a4fra.ir":!0,is:!0,"net.is":!0,"com.is":!0,"edu.is":!0,"gov.is":!0,"org.is":!0,"int.is":!0,it:!0,"gov.it":!0,"edu.it":!0,"agrigento.it":!0,"ag.it":!0,"alessandria.it":!0,"al.it":!0,"ancona.it":!0,"an.it":!0,"aosta.it":!0,"aoste.it":!0,"ao.it":!0,"arezzo.it":!0,"ar.it":!0,"ascoli-piceno.it":!0,"ascolipiceno.it":!0,"ap.it":!0,"asti.it":!0,"at.it":!0,"avellino.it":!0,"av.it":!0,"bari.it":!0,"ba.it":!0,"andria-barletta-trani.it":!0,"andriabarlettatrani.it":!0,"trani-barletta-andria.it":!0,"tranibarlettaandria.it":!0,"barletta-trani-andria.it":!0,"barlettatraniandria.it":!0,"andria-trani-barletta.it":!0,"andriatranibarletta.it":!0,"trani-andria-barletta.it":!0,"traniandriabarletta.it":!0,"bt.it":!0,"belluno.it":!0,"bl.it":!0,"benevento.it":!0,"bn.it":!0,"bergamo.it":!0,"bg.it":!0,"biella.it":!0,"bi.it":!0,"bologna.it":!0,"bo.it":!0,"bolzano.it":!0,"bozen.it":!0,"balsan.it":!0,"alto-adige.it":!0,"altoadige.it":!0,"suedtirol.it":!0,"bz.it":!0,"brescia.it":!0,"bs.it":!0,"brindisi.it":!0,"br.it":!0,"cagliari.it":!0,"ca.it":!0,"caltanissetta.it":!0,"cl.it":!0,"campobasso.it":!0,"cb.it":!0,"carboniaiglesias.it":!0,"carbonia-iglesias.it":!0,"iglesias-carbonia.it":!0,"iglesiascarbonia.it":!0,"ci.it":!0,"caserta.it":!0,"ce.it":!0,"catania.it":!0,"ct.it":!0,"catanzaro.it":!0,"cz.it":!0,"chieti.it":!0,"ch.it":!0,"como.it":!0,"co.it":!0,"cosenza.it":!0,"cs.it":!0,"cremona.it":!0,"cr.it":!0,"crotone.it":!0,"kr.it":!0,"cuneo.it":!0,"cn.it":!0,"dell-ogliastra.it":!0,"dellogliastra.it":!0,"ogliastra.it":!0,"og.it":!0,"enna.it":!0,"en.it":!0,"ferrara.it":!0,"fe.it":!0,"fermo.it":!0,"fm.it":!0,"firenze.it":!0,"florence.it":!0,"fi.it":!0,"foggia.it":!0,"fg.it":!0,"forli-cesena.it":!0,"forlicesena.it":!0,"cesena-forli.it":!0,"cesenaforli.it":!0,"fc.it":!0,"frosinone.it":!0,"fr.it":!0,"genova.it":!0,"genoa.it":!0,"ge.it":!0,"gorizia.it":!0,"go.it":!0,"grosseto.it":!0,"gr.it":!0,"imperia.it":!0,"im.it":!0,"isernia.it":!0,"is.it":!0,"laquila.it":!0,"aquila.it":!0,"aq.it":!0,"la-spezia.it":!0,"laspezia.it":!0,"sp.it":!0,"latina.it":!0,"lt.it":!0,"lecce.it":!0,"le.it":!0,"lecco.it":!0,"lc.it":!0,"livorno.it":!0,"li.it":!0,"lodi.it":!0,"lo.it":!0,"lucca.it":!0,"lu.it":!0,"macerata.it":!0,"mc.it":!0,"mantova.it":!0,"mn.it":!0,"massa-carrara.it":!0,"massacarrara.it":!0,"carrara-massa.it":!0,"carraramassa.it":!0,"ms.it":!0,"matera.it":!0,"mt.it":!0,"medio-campidano.it":!0,"mediocampidano.it":!0,"campidano-medio.it":!0,"campidanomedio.it":!0,"vs.it":!0,"messina.it":!0,"me.it":!0,"milano.it":!0,"milan.it":!0,"mi.it":!0,"modena.it":!0,"mo.it":!0,"monza.it":!0,"monza-brianza.it":!0,"monzabrianza.it":!0,"monzaebrianza.it":!0,"monzaedellabrianza.it":!0,"monza-e-della-brianza.it":!0,"mb.it":!0,"napoli.it":!0,"naples.it":!0,"na.it":!0,"novara.it":!0,"no.it":!0,"nuoro.it":!0,"nu.it":!0,"oristano.it":!0,"or.it":!0,"padova.it":!0,"padua.it":!0,"pd.it":!0,"palermo.it":!0,"pa.it":!0,"parma.it":!0,"pr.it":!0,"pavia.it":!0,"pv.it":!0,"perugia.it":!0,"pg.it":!0,"pescara.it":!0,"pe.it":!0,"pesaro-urbino.it":!0,"pesarourbino.it":!0,"urbino-pesaro.it":!0,"urbinopesaro.it":!0,"pu.it":!0,"piacenza.it":!0,"pc.it":!0,"pisa.it":!0,"pi.it":!0,"pistoia.it":!0,"pt.it":!0,"pordenone.it":!0,"pn.it":!0,"potenza.it":!0,"pz.it":!0,"prato.it":!0,"po.it":!0,"ragusa.it":!0,"rg.it":!0,"ravenna.it":!0,"ra.it":!0,"reggio-calabria.it":!0,"reggiocalabria.it":!0,"rc.it":!0,"reggio-emilia.it":!0,"reggioemilia.it":!0,"re.it":!0,"rieti.it":!0,"ri.it":!0,"rimini.it":!0,"rn.it":!0,"roma.it":!0,"rome.it":!0,"rm.it":!0,"rovigo.it":!0,"ro.it":!0,"salerno.it":!0,"sa.it":!0,"sassari.it":!0,"ss.it":!0,"savona.it":!0,"sv.it":!0,"siena.it":!0,"si.it":!0,"siracusa.it":!0,"sr.it":!0,"sondrio.it":!0,"so.it":!0,"taranto.it":!0,"ta.it":!0,"tempio-olbia.it":!0,"tempioolbia.it":!0,"olbia-tempio.it":!0,"olbiatempio.it":!0,"ot.it":!0,"teramo.it":!0,"te.it":!0,"terni.it":!0,"tr.it":!0,"torino.it":!0,"turin.it":!0,"to.it":!0,"trapani.it":!0,"tp.it":!0,"trento.it":!0,"trentino.it":!0,"tn.it":!0,"treviso.it":!0,"tv.it":!0,"trieste.it":!0,"ts.it":!0,"udine.it":!0,"ud.it":!0,"varese.it":!0,"va.it":!0,"venezia.it":!0,"venice.it":!0,"ve.it":!0,"verbania.it":!0,"vb.it":!0,"vercelli.it":!0,"vc.it":!0,"verona.it":!0,"vr.it":!0,"vibo-valentia.it":!0,"vibovalentia.it":!0,"vv.it":!0,"vicenza.it":!0,"vi.it":!0,"viterbo.it":!0,"vt.it":!0,je:!0,"co.je":!0,"org.je":!0,"net.je":!0,"sch.je":!0,"gov.je":!0,"*.jm":!0,jo:!0,"com.jo":!0,"org.jo":!0,"net.jo":!0,"edu.jo":!0,"sch.jo":!0,"gov.jo":!0,"mil.jo":!0,"name.jo":!0,jobs:!0,jp:!0,"ac.jp":!0,"ad.jp":!0,"co.jp":!0,"ed.jp":!0,"go.jp":!0,"gr.jp":!0,"lg.jp":!0,"ne.jp":!0,"or.jp":!0,"*.aichi.jp":!0,"*.akita.jp":!0,"*.aomori.jp":!0,"*.chiba.jp":!0,"*.ehime.jp":!0,"*.fukui.jp":!0,"*.fukuoka.jp":!0,"*.fukushima.jp":!0,"*.gifu.jp":!0,"*.gunma.jp":!0,"*.hiroshima.jp":!0,"*.hokkaido.jp":!0,"*.hyogo.jp":!0,"*.ibaraki.jp":!0,"*.ishikawa.jp":!0,"*.iwate.jp":!0,"*.kagawa.jp":!0,"*.kagoshima.jp":!0,"*.kanagawa.jp":!0,"*.kawasaki.jp":!0,"*.kitakyushu.jp":!0,"*.kobe.jp":!0,"*.kochi.jp":!0,"*.kumamoto.jp":!0,"*.kyoto.jp":!0,"*.mie.jp":!0,"*.miyagi.jp":!0,"*.miyazaki.jp":!0,"*.nagano.jp":!0,"*.nagasaki.jp":!0,"*.nagoya.jp":!0,"*.nara.jp":!0,"*.niigata.jp":!0,"*.oita.jp":!0,"*.okayama.jp":!0,"*.okinawa.jp":!0,"*.osaka.jp":!0,"*.saga.jp":!0,"*.saitama.jp":!0,"*.sapporo.jp":!0,"*.sendai.jp":!0,"*.shiga.jp":!0,"*.shimane.jp":!0,"*.shizuoka.jp":!0,"*.tochigi.jp":!0,"*.tokushima.jp":!0,"*.tokyo.jp":!0,"*.tottori.jp":!0,"*.toyama.jp":!0,"*.wakayama.jp":!0,"*.yamagata.jp":!0,"*.yamaguchi.jp":!0,"*.yamanashi.jp":!0,"*.yokohama.jp":!0,"metro.tokyo.jp":!1,"pref.aichi.jp":!1,"pref.akita.jp":!1,"pref.aomori.jp":!1,"pref.chiba.jp":!1,"pref.ehime.jp":!1,"pref.fukui.jp":!1,"pref.fukuoka.jp":!1,"pref.fukushima.jp":!1,"pref.gifu.jp":!1,"pref.gunma.jp":!1,"pref.hiroshima.jp":!1,"pref.hokkaido.jp":!1,"pref.hyogo.jp":!1,"pref.ibaraki.jp":!1,"pref.ishikawa.jp":!1,"pref.iwate.jp":!1,"pref.kagawa.jp":!1,"pref.kagoshima.jp":!1,"pref.kanagawa.jp":!1,"pref.kochi.jp":!1,"pref.kumamoto.jp":!1,"pref.kyoto.jp":!1,"pref.mie.jp":!1,"pref.miyagi.jp":!1,"pref.miyazaki.jp":!1,"pref.nagano.jp":!1,"pref.nagasaki.jp":!1,"pref.nara.jp":!1,"pref.niigata.jp":!1,"pref.oita.jp":!1,"pref.okayama.jp":!1,"pref.okinawa.jp":!1,"pref.osaka.jp":!1,"pref.saga.jp":!1,"pref.saitama.jp":!1,"pref.shiga.jp":!1,"pref.shimane.jp":!1,"pref.shizuoka.jp":!1,"pref.tochigi.jp":!1,"pref.tokushima.jp":!1,"pref.tottori.jp":!1,"pref.toyama.jp":!1,"pref.wakayama.jp":!1,"pref.yamagata.jp":!1,"pref.yamaguchi.jp":!1,"pref.yamanashi.jp":!1,"city.chiba.jp":!1,"city.fukuoka.jp":!1,"city.hiroshima.jp":!1,"city.kawasaki.jp":!1,"city.kitakyushu.jp":!1,"city.kobe.jp":!1,"city.kyoto.jp":!1,"city.nagoya.jp":!1,"city.niigata.jp":!1,"city.okayama.jp":!1,"city.osaka.jp":!1,"city.saitama.jp":!1,"city.sapporo.jp":!1,"city.sendai.jp":!1,"city.shizuoka.jp":!1,"city.yokohama.jp":!1,"*.ke":!0,kg:!0,"org.kg":!0,"net.kg":!0,"com.kg":!0,"edu.kg":!0,"gov.kg":!0,"mil.kg":!0,"*.kh":!0,ki:!0,"edu.ki":!0,"biz.ki":!0,"net.ki":!0,"org.ki":!0,"gov.ki":!0,"info.ki":!0,"com.ki":!0,km:!0,"org.km":!0,"nom.km":!0,"gov.km":!0,"prd.km":!0,"tm.km":!0,"edu.km":!0,"mil.km":!0,"ass.km":!0,"com.km":!0,"coop.km":!0,"asso.km":!0,"presse.km":!0,"medecin.km":!0,"notaires.km":!0,"pharmaciens.km":!0,"veterinaire.km":!0,"gouv.km":!0,kn:!0,"net.kn":!0,"org.kn":!0,"edu.kn":!0,"gov.kn":!0,"com.kp":!0,"edu.kp":!0,"gov.kp":!0,"org.kp":!0,"rep.kp":!0,"tra.kp":!0,kr:!0,"ac.kr":!0,"co.kr":!0,"es.kr":!0,"go.kr":!0,"hs.kr":!0,"kg.kr":!0,"mil.kr":!0,"ms.kr":!0,"ne.kr":!0,"or.kr":!0,"pe.kr":!0,"re.kr":!0,"sc.kr":!0,"busan.kr":!0,"chungbuk.kr":!0,"chungnam.kr":!0,"daegu.kr":!0,"daejeon.kr":!0,"gangwon.kr":!0,"gwangju.kr":!0,"gyeongbuk.kr":!0,"gyeonggi.kr":!0,"gyeongnam.kr":!0,"incheon.kr":!0,"jeju.kr":!0,"jeonbuk.kr":!0,"jeonnam.kr":!0,"seoul.kr":!0,"ulsan.kr":!0,"*.kw":!0,ky:!0,"edu.ky":!0,"gov.ky":!0,"com.ky":!0,"org.ky":!0,"net.ky":!0,kz:!0,"org.kz":!0,"edu.kz":!0,"net.kz":!0,"gov.kz":!0,"mil.kz":!0,"com.kz":!0,la:!0,"int.la":!0,"net.la":!0,"info.la":!0,"edu.la":!0,"gov.la":!0,"per.la":!0,"com.la":!0,"org.la":!0,"com.lb":!0,"edu.lb":!0,"gov.lb":!0,"net.lb":!0,"org.lb":!0,lc:!0,"com.lc":!0,"net.lc":!0,"co.lc":!0,"org.lc":!0,"edu.lc":!0,"gov.lc":!0,li:!0,lk:!0,"gov.lk":!0,"sch.lk":!0,"net.lk":!0,"int.lk":!0,"com.lk":!0,"org.lk":!0,"edu.lk":!0,"ngo.lk":!0,"soc.lk":!0,"web.lk":!0,"ltd.lk":!0,"assn.lk":!0,"grp.lk":!0,"hotel.lk":!0,"com.lr":!0,"edu.lr":!0,"gov.lr":!0,"org.lr":!0,"net.lr":!0,ls:!0,"co.ls":!0,"org.ls":!0,lt:!0,"gov.lt":!0,lu:!0,lv:!0,"com.lv":!0,"edu.lv":!0,"gov.lv":!0,"org.lv":!0,"mil.lv":!0,"id.lv":!0,"net.lv":!0,"asn.lv":!0,"conf.lv":!0,ly:!0,"com.ly":!0,"net.ly":!0,"gov.ly":!0,"plc.ly":!0,"edu.ly":!0,"sch.ly":!0,"med.ly":!0,"org.ly":!0,"id.ly":!0,ma:!0,"co.ma":!0,"net.ma":!0,"gov.ma":!0,"org.ma":!0,"ac.ma":!0,"press.ma":!0,mc:!0,"tm.mc":!0,"asso.mc":!0,md:!0,me:!0,"co.me":!0,"net.me":!0,"org.me":!0,"edu.me":!0,"ac.me":!0,"gov.me":!0,"its.me":!0,"priv.me":!0,mg:!0,"org.mg":!0,"nom.mg":!0,"gov.mg":!0,"prd.mg":!0,"tm.mg":!0,"edu.mg":!0,"mil.mg":!0,"com.mg":!0,mh:!0,mil:!0,mk:!0,"com.mk":!0,"org.mk":!0,"net.mk":!0,"edu.mk":!0,"gov.mk":!0,"inf.mk":!0,"name.mk":!0,ml:!0,"com.ml":!0,"edu.ml":!0,"gouv.ml":!0,"gov.ml":!0,"net.ml":!0,"org.ml":!0,"presse.ml":!0,"*.mm":!0,mn:!0,"gov.mn":!0,"edu.mn":!0,"org.mn":!0,mo:!0,"com.mo":!0,"net.mo":!0,"org.mo":!0,"edu.mo":!0,"gov.mo":!0,mobi:!0,mp:!0,mq:!0,mr:!0,"gov.mr":!0,ms:!0,"*.mt":!0,mu:!0,"com.mu":!0,"net.mu":!0,"org.mu":!0,"gov.mu":!0,"ac.mu":!0,"co.mu":!0,"or.mu":!0,museum:!0,"academy.museum":!0,"agriculture.museum":!0,"air.museum":!0,"airguard.museum":!0,"alabama.museum":!0,"alaska.museum":!0,"amber.museum":!0,"ambulance.museum":!0,"american.museum":!0,"americana.museum":!0,"americanantiques.museum":!0,"americanart.museum":!0,"amsterdam.museum":!0,"and.museum":!0,"annefrank.museum":!0,"anthro.museum":!0,"anthropology.museum":!0,"antiques.museum":!0,"aquarium.museum":!0,"arboretum.museum":!0,"archaeological.museum":!0,"archaeology.museum":!0,"architecture.museum":!0,"art.museum":!0,"artanddesign.museum":!0,"artcenter.museum":!0,"artdeco.museum":!0,"arteducation.museum":!0,"artgallery.museum":!0,"arts.museum":!0,"artsandcrafts.museum":!0,"asmatart.museum":!0,"assassination.museum":!0,"assisi.museum":!0,"association.museum":!0,"astronomy.museum":!0,"atlanta.museum":!0,"austin.museum":!0,"australia.museum":!0,"automotive.museum":!0,"aviation.museum":!0,"axis.museum":!0,"badajoz.museum":!0,"baghdad.museum":!0,"bahn.museum":!0,"bale.museum":!0,"baltimore.museum":!0,"barcelona.museum":!0,"baseball.museum":!0,"basel.museum":!0,"baths.museum":!0,"bauern.museum":!0,"beauxarts.museum":!0,"beeldengeluid.museum":!0,"bellevue.museum":!0,"bergbau.museum":!0,"berkeley.museum":!0,"berlin.museum":!0,"bern.museum":!0,"bible.museum":!0,"bilbao.museum":!0,"bill.museum":!0,"birdart.museum":!0,"birthplace.museum":!0,"bonn.museum":!0,"boston.museum":!0,"botanical.museum":!0,"botanicalgarden.museum":!0,"botanicgarden.museum":!0,"botany.museum":!0,"brandywinevalley.museum":!0,"brasil.museum":!0,"bristol.museum":!0,"british.museum":!0,"britishcolumbia.museum":!0,"broadcast.museum":!0,"brunel.museum":!0,"brussel.museum":!0,"brussels.museum":!0,"bruxelles.museum":!0,"building.museum":!0,"burghof.museum":!0,"bus.museum":!0,"bushey.museum":!0,"cadaques.museum":!0,"california.museum":!0,"cambridge.museum":!0,"can.museum":!0,"canada.museum":!0,"capebreton.museum":!0,"carrier.museum":!0,"cartoonart.museum":!0,"casadelamoneda.museum":!0,"castle.museum":!0,"castres.museum":!0,"celtic.museum":!0,"center.museum":!0,"chattanooga.museum":!0,"cheltenham.museum":!0,"chesapeakebay.museum":!0,"chicago.museum":!0,"children.museum":!0,"childrens.museum":!0,"childrensgarden.museum":!0,"chiropractic.museum":!0,"chocolate.museum":!0,"christiansburg.museum":!0,"cincinnati.museum":!0,"cinema.museum":!0,"circus.museum":!0,"civilisation.museum":!0,"civilization.museum":!0,"civilwar.museum":!0,"clinton.museum":!0,"clock.museum":!0,"coal.museum":!0,"coastaldefence.museum":!0,"cody.museum":!0,"coldwar.museum":!0,"collection.museum":!0,"colonialwilliamsburg.museum":!0,"coloradoplateau.museum":!0,"columbia.museum":!0,"columbus.museum":!0,"communication.museum":!0,"communications.museum":!0,"community.museum":!0,"computer.museum":!0,"computerhistory.museum":!0,"xn--comunicaes-v6a2o.museum":!0,"contemporary.museum":!0,"contemporaryart.museum":!0,"convent.museum":!0,"copenhagen.museum":!0,"corporation.museum":!0,"xn--correios-e-telecomunicaes-ghc29a.museum":!0,"corvette.museum":!0,"costume.museum":!0,"countryestate.museum":!0,"county.museum":!0,"crafts.museum":!0,"cranbrook.museum":!0,"creation.museum":!0,"cultural.museum":!0,"culturalcenter.museum":!0,"culture.museum":!0,"cyber.museum":!0,"cymru.museum":!0,"dali.museum":!0,"dallas.museum":!0,"database.museum":!0,"ddr.museum":!0,"decorativearts.museum":!0,"delaware.museum":!0,"delmenhorst.museum":!0,"denmark.museum":!0,"depot.museum":!0,"design.museum":!0,"detroit.museum":!0,"dinosaur.museum":!0,"discovery.museum":!0,"dolls.museum":!0,"donostia.museum":!0,"durham.museum":!0,"eastafrica.museum":!0,"eastcoast.museum":!0,"education.museum":!0,"educational.museum":!0,"egyptian.museum":!0,"eisenbahn.museum":!0,"elburg.museum":!0,"elvendrell.museum":!0,"embroidery.museum":!0,"encyclopedic.museum":!0,"england.museum":!0,"entomology.museum":!0,"environment.museum":!0,"environmentalconservation.museum":!0,"epilepsy.museum":!0,"essex.museum":!0,"estate.museum":!0,"ethnology.museum":!0,"exeter.museum":!0,"exhibition.museum":!0,"family.museum":!0,"farm.museum":!0,"farmequipment.museum":!0,"farmers.museum":!0,"farmstead.museum":!0,"field.museum":!0,"figueres.museum":!0,"filatelia.museum":!0,"film.museum":!0,"fineart.museum":!0,"finearts.museum":!0,"finland.museum":!0,"flanders.museum":!0,"florida.museum":!0,"force.museum":!0,"fortmissoula.museum":!0,"fortworth.museum":!0,"foundation.museum":!0,"francaise.museum":!0,"frankfurt.museum":!0,"franziskaner.museum":!0,"freemasonry.museum":!0,"freiburg.museum":!0,"fribourg.museum":!0,"frog.museum":!0,"fundacio.museum":!0,"furniture.museum":!0,"gallery.museum":!0,"garden.museum":!0,"gateway.museum":!0,"geelvinck.museum":!0,"gemological.museum":!0,"geology.museum":!0,"georgia.museum":!0,"giessen.museum":!0,"glas.museum":!0,"glass.museum":!0,"gorge.museum":!0,"grandrapids.museum":!0,"graz.museum":!0,"guernsey.museum":!0,"halloffame.museum":!0,"hamburg.museum":!0,"handson.museum":!0,"harvestcelebration.museum":!0,"hawaii.museum":!0,"health.museum":!0,"heimatunduhren.museum":!0,"hellas.museum":!0,"helsinki.museum":!0,"hembygdsforbund.museum":!0,"heritage.museum":!0,"histoire.museum":!0,"historical.museum":!0,"historicalsociety.museum":!0,"historichouses.museum":!0,"historisch.museum":!0,"historisches.museum":!0,"history.museum":!0,"historyofscience.museum":!0,"horology.museum":!0,"house.museum":!0,"humanities.museum":!0,"illustration.museum":!0,"imageandsound.museum":!0,"indian.museum":!0,"indiana.museum":!0,"indianapolis.museum":!0,"indianmarket.museum":!0,"intelligence.museum":!0,"interactive.museum":!0,"iraq.museum":!0,"iron.museum":!0,"isleofman.museum":!0,"jamison.museum":!0,"jefferson.museum":!0,"jerusalem.museum":!0,"jewelry.museum":!0,"jewish.museum":!0,"jewishart.museum":!0,"jfk.museum":!0,"journalism.museum":!0,"judaica.museum":!0,"judygarland.museum":!0,"juedisches.museum":!0,"juif.museum":!0,"karate.museum":!0,"karikatur.museum":!0,"kids.museum":!0,"koebenhavn.museum":!0,"koeln.museum":!0,"kunst.museum":!0,"kunstsammlung.museum":!0,"kunstunddesign.museum":!0,"labor.museum":!0,"labour.museum":!0,"lajolla.museum":!0,"lancashire.museum":!0,"landes.museum":!0,"lans.museum":!0,"xn--lns-qla.museum":!0,"larsson.museum":!0,"lewismiller.museum":!0,"lincoln.museum":!0,"linz.museum":!0,"living.museum":!0,"livinghistory.museum":!0,"localhistory.museum":!0,"london.museum":!0,"losangeles.museum":!0,"louvre.museum":!0,"loyalist.museum":!0,"lucerne.museum":!0,"luxembourg.museum":!0,"luzern.museum":!0,"mad.museum":!0,"madrid.museum":!0,"mallorca.museum":!0,"manchester.museum":!0,"mansion.museum":!0,"mansions.museum":!0,"manx.museum":!0,"marburg.museum":!0,"maritime.museum":!0,"maritimo.museum":!0,"maryland.museum":!0,"marylhurst.museum":!0,"media.museum":!0,"medical.museum":!0,"medizinhistorisches.museum":!0,"meeres.museum":!0,"memorial.museum":!0,"mesaverde.museum":!0,"michigan.museum":!0,"midatlantic.museum":!0,"military.museum":!0,"mill.museum":!0,"miners.museum":!0,"mining.museum":!0,"minnesota.museum":!0,"missile.museum":!0,"missoula.museum":!0,"modern.museum":!0,"moma.museum":!0,"money.museum":!0,"monmouth.museum":!0,"monticello.museum":!0,"montreal.museum":!0,"moscow.museum":!0,"motorcycle.museum":!0,"muenchen.museum":!0,"muenster.museum":!0,"mulhouse.museum":!0,"muncie.museum":!0,"museet.museum":!0,"museumcenter.museum":!0,"museumvereniging.museum":!0,"music.museum":!0,"national.museum":!0,"nationalfirearms.museum":!0,"nationalheritage.museum":!0,"nativeamerican.museum":!0,"naturalhistory.museum":!0,"naturalhistorymuseum.museum":!0,"naturalsciences.museum":!0,"nature.museum":!0,"naturhistorisches.museum":!0,"natuurwetenschappen.museum":!0,"naumburg.museum":!0,"naval.museum":!0,"nebraska.museum":!0,"neues.museum":!0,"newhampshire.museum":!0,"newjersey.museum":!0,"newmexico.museum":!0,"newport.museum":!0,"newspaper.museum":!0,"newyork.museum":!0,"niepce.museum":!0,"norfolk.museum":!0,"north.museum":!0,"nrw.museum":!0,"nuernberg.museum":!0,"nuremberg.museum":!0,"nyc.museum":!0,"nyny.museum":!0,"oceanographic.museum":!0,"oceanographique.museum":!0,"omaha.museum":!0,"online.museum":!0,"ontario.museum":!0,"openair.museum":!0,"oregon.museum":!0,"oregontrail.museum":!0,"otago.museum":!0,"oxford.museum":!0,"pacific.museum":!0,"paderborn.museum":!0,"palace.museum":!0,"paleo.museum":!0,"palmsprings.museum":!0,"panama.museum":!0,"paris.museum":!0,"pasadena.museum":!0,"pharmacy.museum":!0,"philadelphia.museum":!0,"philadelphiaarea.museum":!0,"philately.museum":!0,"phoenix.museum":!0,"photography.museum":!0,"pilots.museum":!0,"pittsburgh.museum":!0,"planetarium.museum":!0,"plantation.museum":!0,"plants.museum":!0,"plaza.museum":!0,"portal.museum":!0,"portland.museum":!0,"portlligat.museum":!0,"posts-and-telecommunications.museum":!0,"preservation.museum":!0,"presidio.museum":!0,"press.museum":!0,"project.museum":!0,"public.museum":!0,"pubol.museum":!0,"quebec.museum":!0,"railroad.museum":!0,"railway.museum":!0,"research.museum":!0,"resistance.museum":!0,"riodejaneiro.museum":!0,"rochester.museum":!0,"rockart.museum":!0,"roma.museum":!0,"russia.museum":!0,"saintlouis.museum":!0,"salem.museum":!0,"salvadordali.museum":!0,"salzburg.museum":!0,"sandiego.museum":!0,"sanfrancisco.museum":!0,"santabarbara.museum":!0,"santacruz.museum":!0,"santafe.museum":!0,"saskatchewan.museum":!0,"satx.museum":!0,"savannahga.museum":!0,"schlesisches.museum":!0,"schoenbrunn.museum":!0,"schokoladen.museum":!0,"school.museum":!0,"schweiz.museum":!0,"science.museum":!0,"scienceandhistory.museum":!0,"scienceandindustry.museum":!0,"sciencecenter.museum":!0,"sciencecenters.museum":!0,"science-fiction.museum":!0,"sciencehistory.museum":!0,"sciences.museum":!0,"sciencesnaturelles.museum":!0,"scotland.museum":!0,"seaport.museum":!0,"settlement.museum":!0,"settlers.museum":!0,"shell.museum":!0,"sherbrooke.museum":!0,"sibenik.museum":!0,"silk.museum":!0,"ski.museum":!0,"skole.museum":!0,"society.museum":!0,"sologne.museum":!0,"soundandvision.museum":!0,"southcarolina.museum":!0,"southwest.museum":!0,"space.museum":!0,"spy.museum":!0,"square.museum":!0,"stadt.museum":!0,"stalbans.museum":!0,"starnberg.museum":!0,"state.museum":!0,"stateofdelaware.museum":!0,"station.museum":!0,"steam.museum":!0,"steiermark.museum":!0,"stjohn.museum":!0,"stockholm.museum":!0,"stpetersburg.museum":!0,"stuttgart.museum":!0,"suisse.museum":!0,"surgeonshall.museum":!0,"surrey.museum":!0,"svizzera.museum":!0,"sweden.museum":!0,"sydney.museum":!0,"tank.museum":!0,"tcm.museum":!0,"technology.museum":!0,"telekommunikation.museum":!0,"television.museum":!0,"texas.museum":!0,"textile.museum":!0,"theater.museum":!0,"time.museum":!0,"timekeeping.museum":!0,"topology.museum":!0,"torino.museum":!0,"touch.museum":!0,"town.museum":!0,"transport.museum":!0,"tree.museum":!0,"trolley.museum":!0,"trust.museum":!0,"trustee.museum":!0,"uhren.museum":!0,"ulm.museum":!0,"undersea.museum":!0,"university.museum":!0,"usa.museum":!0,"usantiques.museum":!0,"usarts.museum":!0,"uscountryestate.museum":!0,"usculture.museum":!0,"usdecorativearts.museum":!0,"usgarden.museum":!0,"ushistory.museum":!0,"ushuaia.museum":!0,"uslivinghistory.museum":!0,"utah.museum":!0,"uvic.museum":!0,"valley.museum":!0,"vantaa.museum":!0,"versailles.museum":!0,"viking.museum":!0,"village.museum":!0,"virginia.museum":!0,"virtual.museum":!0,"virtuel.museum":!0,"vlaanderen.museum":!0,"volkenkunde.museum":!0,"wales.museum":!0,"wallonie.museum":!0,"war.museum":!0,"washingtondc.museum":!0,"watchandclock.museum":!0,"watch-and-clock.museum":!0,"western.museum":!0,"westfalen.museum":!0,"whaling.museum":!0,"wildlife.museum":!0,"williamsburg.museum":!0,"windmill.museum":!0,
"workshop.museum":!0,"york.museum":!0,"yorkshire.museum":!0,"yosemite.museum":!0,"youth.museum":!0,"zoological.museum":!0,"zoology.museum":!0,"xn--9dbhblg6di.museum":!0,"xn--h1aegh.museum":!0,mv:!0,"aero.mv":!0,"biz.mv":!0,"com.mv":!0,"coop.mv":!0,"edu.mv":!0,"gov.mv":!0,"info.mv":!0,"int.mv":!0,"mil.mv":!0,"museum.mv":!0,"name.mv":!0,"net.mv":!0,"org.mv":!0,"pro.mv":!0,mw:!0,"ac.mw":!0,"biz.mw":!0,"co.mw":!0,"com.mw":!0,"coop.mw":!0,"edu.mw":!0,"gov.mw":!0,"int.mw":!0,"museum.mw":!0,"net.mw":!0,"org.mw":!0,mx:!0,"com.mx":!0,"org.mx":!0,"gob.mx":!0,"edu.mx":!0,"net.mx":!0,my:!0,"com.my":!0,"net.my":!0,"org.my":!0,"gov.my":!0,"edu.my":!0,"mil.my":!0,"name.my":!0,"*.mz":!0,na:!0,"info.na":!0,"pro.na":!0,"name.na":!0,"school.na":!0,"or.na":!0,"dr.na":!0,"us.na":!0,"mx.na":!0,"ca.na":!0,"in.na":!0,"cc.na":!0,"tv.na":!0,"ws.na":!0,"mobi.na":!0,"co.na":!0,"com.na":!0,"org.na":!0,name:!0,nc:!0,"asso.nc":!0,ne:!0,net:!0,nf:!0,"com.nf":!0,"net.nf":!0,"per.nf":!0,"rec.nf":!0,"web.nf":!0,"arts.nf":!0,"firm.nf":!0,"info.nf":!0,"other.nf":!0,"store.nf":!0,"ac.ng":!0,"com.ng":!0,"edu.ng":!0,"gov.ng":!0,"net.ng":!0,"org.ng":!0,"*.ni":!0,nl:!0,"bv.nl":!0,no:!0,"fhs.no":!0,"vgs.no":!0,"fylkesbibl.no":!0,"folkebibl.no":!0,"museum.no":!0,"idrett.no":!0,"priv.no":!0,"mil.no":!0,"stat.no":!0,"dep.no":!0,"kommune.no":!0,"herad.no":!0,"aa.no":!0,"ah.no":!0,"bu.no":!0,"fm.no":!0,"hl.no":!0,"hm.no":!0,"jan-mayen.no":!0,"mr.no":!0,"nl.no":!0,"nt.no":!0,"of.no":!0,"ol.no":!0,"oslo.no":!0,"rl.no":!0,"sf.no":!0,"st.no":!0,"svalbard.no":!0,"tm.no":!0,"tr.no":!0,"va.no":!0,"vf.no":!0,"gs.aa.no":!0,"gs.ah.no":!0,"gs.bu.no":!0,"gs.fm.no":!0,"gs.hl.no":!0,"gs.hm.no":!0,"gs.jan-mayen.no":!0,"gs.mr.no":!0,"gs.nl.no":!0,"gs.nt.no":!0,"gs.of.no":!0,"gs.ol.no":!0,"gs.oslo.no":!0,"gs.rl.no":!0,"gs.sf.no":!0,"gs.st.no":!0,"gs.svalbard.no":!0,"gs.tm.no":!0,"gs.tr.no":!0,"gs.va.no":!0,"gs.vf.no":!0,"akrehamn.no":!0,"xn--krehamn-dxa.no":!0,"algard.no":!0,"xn--lgrd-poac.no":!0,"arna.no":!0,"brumunddal.no":!0,"bryne.no":!0,"bronnoysund.no":!0,"xn--brnnysund-m8ac.no":!0,"drobak.no":!0,"xn--drbak-wua.no":!0,"egersund.no":!0,"fetsund.no":!0,"floro.no":!0,"xn--flor-jra.no":!0,"fredrikstad.no":!0,"hokksund.no":!0,"honefoss.no":!0,"xn--hnefoss-q1a.no":!0,"jessheim.no":!0,"jorpeland.no":!0,"xn--jrpeland-54a.no":!0,"kirkenes.no":!0,"kopervik.no":!0,"krokstadelva.no":!0,"langevag.no":!0,"xn--langevg-jxa.no":!0,"leirvik.no":!0,"mjondalen.no":!0,"xn--mjndalen-64a.no":!0,"mo-i-rana.no":!0,"mosjoen.no":!0,"xn--mosjen-eya.no":!0,"nesoddtangen.no":!0,"orkanger.no":!0,"osoyro.no":!0,"xn--osyro-wua.no":!0,"raholt.no":!0,"xn--rholt-mra.no":!0,"sandnessjoen.no":!0,"xn--sandnessjen-ogb.no":!0,"skedsmokorset.no":!0,"slattum.no":!0,"spjelkavik.no":!0,"stathelle.no":!0,"stavern.no":!0,"stjordalshalsen.no":!0,"xn--stjrdalshalsen-sqb.no":!0,"tananger.no":!0,"tranby.no":!0,"vossevangen.no":!0,"afjord.no":!0,"xn--fjord-lra.no":!0,"agdenes.no":!0,"al.no":!0,"xn--l-1fa.no":!0,"alesund.no":!0,"xn--lesund-hua.no":!0,"alstahaug.no":!0,"alta.no":!0,"xn--lt-liac.no":!0,"alaheadju.no":!0,"xn--laheadju-7ya.no":!0,"alvdal.no":!0,"amli.no":!0,"xn--mli-tla.no":!0,"amot.no":!0,"xn--mot-tla.no":!0,"andebu.no":!0,"andoy.no":!0,"xn--andy-ira.no":!0,"andasuolo.no":!0,"ardal.no":!0,"xn--rdal-poa.no":!0,"aremark.no":!0,"arendal.no":!0,"xn--s-1fa.no":!0,"aseral.no":!0,"xn--seral-lra.no":!0,"asker.no":!0,"askim.no":!0,"askvoll.no":!0,"askoy.no":!0,"xn--asky-ira.no":!0,"asnes.no":!0,"xn--snes-poa.no":!0,"audnedaln.no":!0,"aukra.no":!0,"aure.no":!0,"aurland.no":!0,"aurskog-holand.no":!0,"xn--aurskog-hland-jnb.no":!0,"austevoll.no":!0,"austrheim.no":!0,"averoy.no":!0,"xn--avery-yua.no":!0,"balestrand.no":!0,"ballangen.no":!0,"balat.no":!0,"xn--blt-elab.no":!0,"balsfjord.no":!0,"bahccavuotna.no":!0,"xn--bhccavuotna-k7a.no":!0,"bamble.no":!0,"bardu.no":!0,"beardu.no":!0,"beiarn.no":!0,"bajddar.no":!0,"xn--bjddar-pta.no":!0,"baidar.no":!0,"xn--bidr-5nac.no":!0,"berg.no":!0,"bergen.no":!0,"berlevag.no":!0,"xn--berlevg-jxa.no":!0,"bearalvahki.no":!0,"xn--bearalvhki-y4a.no":!0,"bindal.no":!0,"birkenes.no":!0,"bjarkoy.no":!0,"xn--bjarky-fya.no":!0,"bjerkreim.no":!0,"bjugn.no":!0,"bodo.no":!0,"xn--bod-2na.no":!0,"badaddja.no":!0,"xn--bdddj-mrabd.no":!0,"budejju.no":!0,"bokn.no":!0,"bremanger.no":!0,"bronnoy.no":!0,"xn--brnny-wuac.no":!0,"bygland.no":!0,"bykle.no":!0,"barum.no":!0,"xn--brum-voa.no":!0,"bo.telemark.no":!0,"xn--b-5ga.telemark.no":!0,"bo.nordland.no":!0,"xn--b-5ga.nordland.no":!0,"bievat.no":!0,"xn--bievt-0qa.no":!0,"bomlo.no":!0,"xn--bmlo-gra.no":!0,"batsfjord.no":!0,"xn--btsfjord-9za.no":!0,"bahcavuotna.no":!0,"xn--bhcavuotna-s4a.no":!0,"dovre.no":!0,"drammen.no":!0,"drangedal.no":!0,"dyroy.no":!0,"xn--dyry-ira.no":!0,"donna.no":!0,"xn--dnna-gra.no":!0,"eid.no":!0,"eidfjord.no":!0,"eidsberg.no":!0,"eidskog.no":!0,"eidsvoll.no":!0,"eigersund.no":!0,"elverum.no":!0,"enebakk.no":!0,"engerdal.no":!0,"etne.no":!0,"etnedal.no":!0,"evenes.no":!0,"evenassi.no":!0,"xn--eveni-0qa01ga.no":!0,"evje-og-hornnes.no":!0,"farsund.no":!0,"fauske.no":!0,"fuossko.no":!0,"fuoisku.no":!0,"fedje.no":!0,"fet.no":!0,"finnoy.no":!0,"xn--finny-yua.no":!0,"fitjar.no":!0,"fjaler.no":!0,"fjell.no":!0,"flakstad.no":!0,"flatanger.no":!0,"flekkefjord.no":!0,"flesberg.no":!0,"flora.no":!0,"fla.no":!0,"xn--fl-zia.no":!0,"folldal.no":!0,"forsand.no":!0,"fosnes.no":!0,"frei.no":!0,"frogn.no":!0,"froland.no":!0,"frosta.no":!0,"frana.no":!0,"xn--frna-woa.no":!0,"froya.no":!0,"xn--frya-hra.no":!0,"fusa.no":!0,"fyresdal.no":!0,"forde.no":!0,"xn--frde-gra.no":!0,"gamvik.no":!0,"gangaviika.no":!0,"xn--ggaviika-8ya47h.no":!0,"gaular.no":!0,"gausdal.no":!0,"gildeskal.no":!0,"xn--gildeskl-g0a.no":!0,"giske.no":!0,"gjemnes.no":!0,"gjerdrum.no":!0,"gjerstad.no":!0,"gjesdal.no":!0,"gjovik.no":!0,"xn--gjvik-wua.no":!0,"gloppen.no":!0,"gol.no":!0,"gran.no":!0,"grane.no":!0,"granvin.no":!0,"gratangen.no":!0,"grimstad.no":!0,"grong.no":!0,"kraanghke.no":!0,"xn--kranghke-b0a.no":!0,"grue.no":!0,"gulen.no":!0,"hadsel.no":!0,"halden.no":!0,"halsa.no":!0,"hamar.no":!0,"hamaroy.no":!0,"habmer.no":!0,"xn--hbmer-xqa.no":!0,"hapmir.no":!0,"xn--hpmir-xqa.no":!0,"hammerfest.no":!0,"hammarfeasta.no":!0,"xn--hmmrfeasta-s4ac.no":!0,"haram.no":!0,"hareid.no":!0,"harstad.no":!0,"hasvik.no":!0,"aknoluokta.no":!0,"xn--koluokta-7ya57h.no":!0,"hattfjelldal.no":!0,"aarborte.no":!0,"haugesund.no":!0,"hemne.no":!0,"hemnes.no":!0,"hemsedal.no":!0,"heroy.more-og-romsdal.no":!0,"xn--hery-ira.xn--mre-og-romsdal-qqb.no":!0,"heroy.nordland.no":!0,"xn--hery-ira.nordland.no":!0,"hitra.no":!0,"hjartdal.no":!0,"hjelmeland.no":!0,"hobol.no":!0,"xn--hobl-ira.no":!0,"hof.no":!0,"hol.no":!0,"hole.no":!0,"holmestrand.no":!0,"holtalen.no":!0,"xn--holtlen-hxa.no":!0,"hornindal.no":!0,"horten.no":!0,"hurdal.no":!0,"hurum.no":!0,"hvaler.no":!0,"hyllestad.no":!0,"hagebostad.no":!0,"xn--hgebostad-g3a.no":!0,"hoyanger.no":!0,"xn--hyanger-q1a.no":!0,"hoylandet.no":!0,"xn--hylandet-54a.no":!0,"ha.no":!0,"xn--h-2fa.no":!0,"ibestad.no":!0,"inderoy.no":!0,"xn--indery-fya.no":!0,"iveland.no":!0,"jevnaker.no":!0,"jondal.no":!0,"jolster.no":!0,"xn--jlster-bya.no":!0,"karasjok.no":!0,"karasjohka.no":!0,"xn--krjohka-hwab49j.no":!0,"karlsoy.no":!0,"galsa.no":!0,"xn--gls-elac.no":!0,"karmoy.no":!0,"xn--karmy-yua.no":!0,"kautokeino.no":!0,"guovdageaidnu.no":!0,"klepp.no":!0,"klabu.no":!0,"xn--klbu-woa.no":!0,"kongsberg.no":!0,"kongsvinger.no":!0,"kragero.no":!0,"xn--krager-gya.no":!0,"kristiansand.no":!0,"kristiansund.no":!0,"krodsherad.no":!0,"xn--krdsherad-m8a.no":!0,"kvalsund.no":!0,"rahkkeravju.no":!0,"xn--rhkkervju-01af.no":!0,"kvam.no":!0,"kvinesdal.no":!0,"kvinnherad.no":!0,"kviteseid.no":!0,"kvitsoy.no":!0,"xn--kvitsy-fya.no":!0,"kvafjord.no":!0,"xn--kvfjord-nxa.no":!0,"giehtavuoatna.no":!0,"kvanangen.no":!0,"xn--kvnangen-k0a.no":!0,"navuotna.no":!0,"xn--nvuotna-hwa.no":!0,"kafjord.no":!0,"xn--kfjord-iua.no":!0,"gaivuotna.no":!0,"xn--givuotna-8ya.no":!0,"larvik.no":!0,"lavangen.no":!0,"lavagis.no":!0,"loabat.no":!0,"xn--loabt-0qa.no":!0,"lebesby.no":!0,"davvesiida.no":!0,"leikanger.no":!0,"leirfjord.no":!0,"leka.no":!0,"leksvik.no":!0,"lenvik.no":!0,"leangaviika.no":!0,"xn--leagaviika-52b.no":!0,"lesja.no":!0,"levanger.no":!0,"lier.no":!0,"lierne.no":!0,"lillehammer.no":!0,"lillesand.no":!0,"lindesnes.no":!0,"lindas.no":!0,"xn--linds-pra.no":!0,"lom.no":!0,"loppa.no":!0,"lahppi.no":!0,"xn--lhppi-xqa.no":!0,"lund.no":!0,"lunner.no":!0,"luroy.no":!0,"xn--lury-ira.no":!0,"luster.no":!0,"lyngdal.no":!0,"lyngen.no":!0,"ivgu.no":!0,"lardal.no":!0,"lerdal.no":!0,"xn--lrdal-sra.no":!0,"lodingen.no":!0,"xn--ldingen-q1a.no":!0,"lorenskog.no":!0,"xn--lrenskog-54a.no":!0,"loten.no":!0,"xn--lten-gra.no":!0,"malvik.no":!0,"masoy.no":!0,"xn--msy-ula0h.no":!0,"muosat.no":!0,"xn--muost-0qa.no":!0,"mandal.no":!0,"marker.no":!0,"marnardal.no":!0,"masfjorden.no":!0,"meland.no":!0,"meldal.no":!0,"melhus.no":!0,"meloy.no":!0,"xn--mely-ira.no":!0,"meraker.no":!0,"xn--merker-kua.no":!0,"moareke.no":!0,"xn--moreke-jua.no":!0,"midsund.no":!0,"midtre-gauldal.no":!0,"modalen.no":!0,"modum.no":!0,"molde.no":!0,"moskenes.no":!0,"moss.no":!0,"mosvik.no":!0,"malselv.no":!0,"xn--mlselv-iua.no":!0,"malatvuopmi.no":!0,"xn--mlatvuopmi-s4a.no":!0,"namdalseid.no":!0,"aejrie.no":!0,"namsos.no":!0,"namsskogan.no":!0,"naamesjevuemie.no":!0,"xn--nmesjevuemie-tcba.no":!0,"laakesvuemie.no":!0,"nannestad.no":!0,"narvik.no":!0,"narviika.no":!0,"naustdal.no":!0,"nedre-eiker.no":!0,"nes.akershus.no":!0,"nes.buskerud.no":!0,"nesna.no":!0,"nesodden.no":!0,"nesseby.no":!0,"unjarga.no":!0,"xn--unjrga-rta.no":!0,"nesset.no":!0,"nissedal.no":!0,"nittedal.no":!0,"nord-aurdal.no":!0,"nord-fron.no":!0,"nord-odal.no":!0,"norddal.no":!0,"nordkapp.no":!0,"davvenjarga.no":!0,"xn--davvenjrga-y4a.no":!0,"nordre-land.no":!0,"nordreisa.no":!0,"raisa.no":!0,"xn--risa-5na.no":!0,"nore-og-uvdal.no":!0,"notodden.no":!0,"naroy.no":!0,"xn--nry-yla5g.no":!0,"notteroy.no":!0,"xn--nttery-byae.no":!0,"odda.no":!0,"oksnes.no":!0,"xn--ksnes-uua.no":!0,"oppdal.no":!0,"oppegard.no":!0,"xn--oppegrd-ixa.no":!0,"orkdal.no":!0,"orland.no":!0,"xn--rland-uua.no":!0,"orskog.no":!0,"xn--rskog-uua.no":!0,"orsta.no":!0,"xn--rsta-fra.no":!0,"os.hedmark.no":!0,"os.hordaland.no":!0,"osen.no":!0,"osteroy.no":!0,"xn--ostery-fya.no":!0,"ostre-toten.no":!0,"xn--stre-toten-zcb.no":!0,"overhalla.no":!0,"ovre-eiker.no":!0,"xn--vre-eiker-k8a.no":!0,"oyer.no":!0,"xn--yer-zna.no":!0,"oygarden.no":!0,"xn--ygarden-p1a.no":!0,"oystre-slidre.no":!0,"xn--ystre-slidre-ujb.no":!0,"porsanger.no":!0,"porsangu.no":!0,"xn--porsgu-sta26f.no":!0,"porsgrunn.no":!0,"radoy.no":!0,"xn--rady-ira.no":!0,"rakkestad.no":!0,"rana.no":!0,"ruovat.no":!0,"randaberg.no":!0,"rauma.no":!0,"rendalen.no":!0,"rennebu.no":!0,"rennesoy.no":!0,"xn--rennesy-v1a.no":!0,"rindal.no":!0,"ringebu.no":!0,"ringerike.no":!0,"ringsaker.no":!0,"rissa.no":!0,"risor.no":!0,"xn--risr-ira.no":!0,"roan.no":!0,"rollag.no":!0,"rygge.no":!0,"ralingen.no":!0,"xn--rlingen-mxa.no":!0,"rodoy.no":!0,"xn--rdy-0nab.no":!0,"romskog.no":!0,"xn--rmskog-bya.no":!0,"roros.no":!0,"xn--rros-gra.no":!0,"rost.no":!0,"xn--rst-0na.no":!0,"royken.no":!0,"xn--ryken-vua.no":!0,"royrvik.no":!0,"xn--ryrvik-bya.no":!0,"rade.no":!0,"xn--rde-ula.no":!0,"salangen.no":!0,"siellak.no":!0,"saltdal.no":!0,"salat.no":!0,"xn--slt-elab.no":!0,"xn--slat-5na.no":!0,"samnanger.no":!0,"sande.more-og-romsdal.no":!0,"sande.xn--mre-og-romsdal-qqb.no":!0,"sande.vestfold.no":!0,"sandefjord.no":!0,"sandnes.no":!0,"sandoy.no":!0,"xn--sandy-yua.no":!0,"sarpsborg.no":!0,"sauda.no":!0,"sauherad.no":!0,"sel.no":!0,"selbu.no":!0,"selje.no":!0,"seljord.no":!0,"sigdal.no":!0,"siljan.no":!0,"sirdal.no":!0,"skaun.no":!0,"skedsmo.no":!0,"ski.no":!0,"skien.no":!0,"skiptvet.no":!0,"skjervoy.no":!0,"xn--skjervy-v1a.no":!0,"skierva.no":!0,"xn--skierv-uta.no":!0,"skjak.no":!0,"xn--skjk-soa.no":!0,"skodje.no":!0,"skanland.no":!0,"xn--sknland-fxa.no":!0,"skanit.no":!0,"xn--sknit-yqa.no":!0,"smola.no":!0,"xn--smla-hra.no":!0,"snillfjord.no":!0,"snasa.no":!0,"xn--snsa-roa.no":!0,"snoasa.no":!0,"snaase.no":!0,"xn--snase-nra.no":!0,"sogndal.no":!0,"sokndal.no":!0,"sola.no":!0,"solund.no":!0,"songdalen.no":!0,"sortland.no":!0,"spydeberg.no":!0,"stange.no":!0,"stavanger.no":!0,"steigen.no":!0,"steinkjer.no":!0,"stjordal.no":!0,"xn--stjrdal-s1a.no":!0,"stokke.no":!0,"stor-elvdal.no":!0,"stord.no":!0,"stordal.no":!0,"storfjord.no":!0,"omasvuotna.no":!0,"strand.no":!0,"stranda.no":!0,"stryn.no":!0,"sula.no":!0,"suldal.no":!0,"sund.no":!0,"sunndal.no":!0,"surnadal.no":!0,"sveio.no":!0,"svelvik.no":!0,"sykkylven.no":!0,"sogne.no":!0,"xn--sgne-gra.no":!0,"somna.no":!0,"xn--smna-gra.no":!0,"sondre-land.no":!0,"xn--sndre-land-0cb.no":!0,"sor-aurdal.no":!0,"xn--sr-aurdal-l8a.no":!0,"sor-fron.no":!0,"xn--sr-fron-q1a.no":!0,"sor-odal.no":!0,"xn--sr-odal-q1a.no":!0,"sor-varanger.no":!0,"xn--sr-varanger-ggb.no":!0,"matta-varjjat.no":!0,"xn--mtta-vrjjat-k7af.no":!0,"sorfold.no":!0,"xn--srfold-bya.no":!0,"sorreisa.no":!0,"xn--srreisa-q1a.no":!0,"sorum.no":!0,"xn--srum-gra.no":!0,"tana.no":!0,"deatnu.no":!0,"time.no":!0,"tingvoll.no":!0,"tinn.no":!0,"tjeldsund.no":!0,"dielddanuorri.no":!0,"tjome.no":!0,"xn--tjme-hra.no":!0,"tokke.no":!0,"tolga.no":!0,"torsken.no":!0,"tranoy.no":!0,"xn--trany-yua.no":!0,"tromso.no":!0,"xn--troms-zua.no":!0,"tromsa.no":!0,"romsa.no":!0,"trondheim.no":!0,"troandin.no":!0,"trysil.no":!0,"trana.no":!0,"xn--trna-woa.no":!0,"trogstad.no":!0,"xn--trgstad-r1a.no":!0,"tvedestrand.no":!0,"tydal.no":!0,"tynset.no":!0,"tysfjord.no":!0,"divtasvuodna.no":!0,"divttasvuotna.no":!0,"tysnes.no":!0,"tysvar.no":!0,"xn--tysvr-vra.no":!0,"tonsberg.no":!0,"xn--tnsberg-q1a.no":!0,"ullensaker.no":!0,"ullensvang.no":!0,"ulvik.no":!0,"utsira.no":!0,"vadso.no":!0,"xn--vads-jra.no":!0,"cahcesuolo.no":!0,"xn--hcesuolo-7ya35b.no":!0,"vaksdal.no":!0,"valle.no":!0,"vang.no":!0,"vanylven.no":!0,"vardo.no":!0,"xn--vard-jra.no":!0,"varggat.no":!0,"xn--vrggt-xqad.no":!0,"vefsn.no":!0,"vaapste.no":!0,"vega.no":!0,"vegarshei.no":!0,"xn--vegrshei-c0a.no":!0,"vennesla.no":!0,"verdal.no":!0,"verran.no":!0,"vestby.no":!0,"vestnes.no":!0,"vestre-slidre.no":!0,"vestre-toten.no":!0,"vestvagoy.no":!0,"xn--vestvgy-ixa6o.no":!0,"vevelstad.no":!0,"vik.no":!0,"vikna.no":!0,"vindafjord.no":!0,"volda.no":!0,"voss.no":!0,"varoy.no":!0,"xn--vry-yla5g.no":!0,"vagan.no":!0,"xn--vgan-qoa.no":!0,"voagat.no":!0,"vagsoy.no":!0,"xn--vgsy-qoa0j.no":!0,"vaga.no":!0,"xn--vg-yiab.no":!0,"valer.ostfold.no":!0,"xn--vler-qoa.xn--stfold-9xa.no":!0,"valer.hedmark.no":!0,"xn--vler-qoa.hedmark.no":!0,"*.np":!0,nr:!0,"biz.nr":!0,"info.nr":!0,"gov.nr":!0,"edu.nr":!0,"org.nr":!0,"net.nr":!0,"com.nr":!0,nu:!0,"*.nz":!0,"*.om":!0,"mediaphone.om":!1,"nawrastelecom.om":!1,"nawras.om":!1,"omanmobile.om":!1,"omanpost.om":!1,"omantel.om":!1,"rakpetroleum.om":!1,"siemens.om":!1,"songfest.om":!1,"statecouncil.om":!1,org:!0,pa:!0,"ac.pa":!0,"gob.pa":!0,"com.pa":!0,"org.pa":!0,"sld.pa":!0,"edu.pa":!0,"net.pa":!0,"ing.pa":!0,"abo.pa":!0,"med.pa":!0,"nom.pa":!0,pe:!0,"edu.pe":!0,"gob.pe":!0,"nom.pe":!0,"mil.pe":!0,"org.pe":!0,"com.pe":!0,"net.pe":!0,pf:!0,"com.pf":!0,"org.pf":!0,"edu.pf":!0,"*.pg":!0,ph:!0,"com.ph":!0,"net.ph":!0,"org.ph":!0,"gov.ph":!0,"edu.ph":!0,"ngo.ph":!0,"mil.ph":!0,"i.ph":!0,pk:!0,"com.pk":!0,"net.pk":!0,"edu.pk":!0,"org.pk":!0,"fam.pk":!0,"biz.pk":!0,"web.pk":!0,"gov.pk":!0,"gob.pk":!0,"gok.pk":!0,"gon.pk":!0,"gop.pk":!0,"gos.pk":!0,"info.pk":!0,pl:!0,"aid.pl":!0,"agro.pl":!0,"atm.pl":!0,"auto.pl":!0,"biz.pl":!0,"com.pl":!0,"edu.pl":!0,"gmina.pl":!0,"gsm.pl":!0,"info.pl":!0,"mail.pl":!0,"miasta.pl":!0,"media.pl":!0,"mil.pl":!0,"net.pl":!0,"nieruchomosci.pl":!0,"nom.pl":!0,"org.pl":!0,"pc.pl":!0,"powiat.pl":!0,"priv.pl":!0,"realestate.pl":!0,"rel.pl":!0,"sex.pl":!0,"shop.pl":!0,"sklep.pl":!0,"sos.pl":!0,"szkola.pl":!0,"targi.pl":!0,"tm.pl":!0,"tourism.pl":!0,"travel.pl":!0,"turystyka.pl":!0,"6bone.pl":!0,"art.pl":!0,"mbone.pl":!0,"gov.pl":!0,"uw.gov.pl":!0,"um.gov.pl":!0,"ug.gov.pl":!0,"upow.gov.pl":!0,"starostwo.gov.pl":!0,"so.gov.pl":!0,"sr.gov.pl":!0,"po.gov.pl":!0,"pa.gov.pl":!0,"ngo.pl":!0,"irc.pl":!0,"usenet.pl":!0,"augustow.pl":!0,"babia-gora.pl":!0,"bedzin.pl":!0,"beskidy.pl":!0,"bialowieza.pl":!0,"bialystok.pl":!0,"bielawa.pl":!0,"bieszczady.pl":!0,"boleslawiec.pl":!0,"bydgoszcz.pl":!0,"bytom.pl":!0,"cieszyn.pl":!0,"czeladz.pl":!0,"czest.pl":!0,"dlugoleka.pl":!0,"elblag.pl":!0,"elk.pl":!0,"glogow.pl":!0,"gniezno.pl":!0,"gorlice.pl":!0,"grajewo.pl":!0,"ilawa.pl":!0,"jaworzno.pl":!0,"jelenia-gora.pl":!0,"jgora.pl":!0,"kalisz.pl":!0,"kazimierz-dolny.pl":!0,"karpacz.pl":!0,"kartuzy.pl":!0,"kaszuby.pl":!0,"katowice.pl":!0,"kepno.pl":!0,"ketrzyn.pl":!0,"klodzko.pl":!0,"kobierzyce.pl":!0,"kolobrzeg.pl":!0,"konin.pl":!0,"konskowola.pl":!0,"kutno.pl":!0,"lapy.pl":!0,"lebork.pl":!0,"legnica.pl":!0,"lezajsk.pl":!0,"limanowa.pl":!0,"lomza.pl":!0,"lowicz.pl":!0,"lubin.pl":!0,"lukow.pl":!0,"malbork.pl":!0,"malopolska.pl":!0,"mazowsze.pl":!0,"mazury.pl":!0,"mielec.pl":!0,"mielno.pl":!0,"mragowo.pl":!0,"naklo.pl":!0,"nowaruda.pl":!0,"nysa.pl":!0,"olawa.pl":!0,"olecko.pl":!0,"olkusz.pl":!0,"olsztyn.pl":!0,"opoczno.pl":!0,"opole.pl":!0,"ostroda.pl":!0,"ostroleka.pl":!0,"ostrowiec.pl":!0,"ostrowwlkp.pl":!0,"pila.pl":!0,"pisz.pl":!0,"podhale.pl":!0,"podlasie.pl":!0,"polkowice.pl":!0,"pomorze.pl":!0,"pomorskie.pl":!0,"prochowice.pl":!0,"pruszkow.pl":!0,"przeworsk.pl":!0,"pulawy.pl":!0,"radom.pl":!0,"rawa-maz.pl":!0,"rybnik.pl":!0,"rzeszow.pl":!0,"sanok.pl":!0,"sejny.pl":!0,"siedlce.pl":!0,"slask.pl":!0,"slupsk.pl":!0,"sosnowiec.pl":!0,"stalowa-wola.pl":!0,"skoczow.pl":!0,"starachowice.pl":!0,"stargard.pl":!0,"suwalki.pl":!0,"swidnica.pl":!0,"swiebodzin.pl":!0,"swinoujscie.pl":!0,"szczecin.pl":!0,"szczytno.pl":!0,"tarnobrzeg.pl":!0,"tgory.pl":!0,"turek.pl":!0,"tychy.pl":!0,"ustka.pl":!0,"walbrzych.pl":!0,"warmia.pl":!0,"warszawa.pl":!0,"waw.pl":!0,"wegrow.pl":!0,"wielun.pl":!0,"wlocl.pl":!0,"wloclawek.pl":!0,"wodzislaw.pl":!0,"wolomin.pl":!0,"wroclaw.pl":!0,"zachpomor.pl":!0,"zagan.pl":!0,"zarow.pl":!0,"zgora.pl":!0,"zgorzelec.pl":!0,"gda.pl":!0,"gdansk.pl":!0,"gdynia.pl":!0,"med.pl":!0,"sopot.pl":!0,"gliwice.pl":!0,"krakow.pl":!0,"poznan.pl":!0,"wroc.pl":!0,"zakopane.pl":!0,pm:!0,pn:!0,"gov.pn":!0,"co.pn":!0,"org.pn":!0,"edu.pn":!0,"net.pn":!0,pr:!0,"com.pr":!0,"net.pr":!0,"org.pr":!0,"gov.pr":!0,"edu.pr":!0,"isla.pr":!0,"pro.pr":!0,"biz.pr":!0,"info.pr":!0,"name.pr":!0,"est.pr":!0,"prof.pr":!0,"ac.pr":!0,pro:!0,"aca.pro":!0,"bar.pro":!0,"cpa.pro":!0,"jur.pro":!0,"law.pro":!0,"med.pro":!0,"eng.pro":!0,ps:!0,"edu.ps":!0,"gov.ps":!0,"sec.ps":!0,"plo.ps":!0,"com.ps":!0,"org.ps":!0,"net.ps":!0,pt:!0,"net.pt":!0,"gov.pt":!0,"org.pt":!0,"edu.pt":!0,"int.pt":!0,"publ.pt":!0,"com.pt":!0,"nome.pt":!0,pw:!0,"co.pw":!0,"ne.pw":!0,"or.pw":!0,"ed.pw":!0,"go.pw":!0,"belau.pw":!0,"*.py":!0,qa:!0,"com.qa":!0,"edu.qa":!0,"gov.qa":!0,"mil.qa":!0,"name.qa":!0,"net.qa":!0,"org.qa":!0,"sch.qa":!0,re:!0,"com.re":!0,"asso.re":!0,"nom.re":!0,ro:!0,"com.ro":!0,"org.ro":!0,"tm.ro":!0,"nt.ro":!0,"nom.ro":!0,"info.ro":!0,"rec.ro":!0,"arts.ro":!0,"firm.ro":!0,"store.ro":!0,"www.ro":!0,rs:!0,"co.rs":!0,"org.rs":!0,"edu.rs":!0,"ac.rs":!0,"gov.rs":!0,"in.rs":!0,ru:!0,"ac.ru":!0,"com.ru":!0,"edu.ru":!0,"int.ru":!0,"net.ru":!0,"org.ru":!0,"pp.ru":!0,"adygeya.ru":!0,"altai.ru":!0,"amur.ru":!0,"arkhangelsk.ru":!0,"astrakhan.ru":!0,"bashkiria.ru":!0,"belgorod.ru":!0,"bir.ru":!0,"bryansk.ru":!0,"buryatia.ru":!0,"cbg.ru":!0,"chel.ru":!0,"chelyabinsk.ru":!0,"chita.ru":!0,"chukotka.ru":!0,"chuvashia.ru":!0,"dagestan.ru":!0,"dudinka.ru":!0,"e-burg.ru":!0,"grozny.ru":!0,"irkutsk.ru":!0,"ivanovo.ru":!0,"izhevsk.ru":!0,"jar.ru":!0,"joshkar-ola.ru":!0,"kalmykia.ru":!0,"kaluga.ru":!0,"kamchatka.ru":!0,"karelia.ru":!0,"kazan.ru":!0,"kchr.ru":!0,"kemerovo.ru":!0,"khabarovsk.ru":!0,"khakassia.ru":!0,"khv.ru":!0,"kirov.ru":!0,"koenig.ru":!0,"komi.ru":!0,"kostroma.ru":!0,"krasnoyarsk.ru":!0,"kuban.ru":!0,"kurgan.ru":!0,"kursk.ru":!0,"lipetsk.ru":!0,"magadan.ru":!0,"mari.ru":!0,"mari-el.ru":!0,"marine.ru":!0,"mordovia.ru":!0,"mosreg.ru":!0,"msk.ru":!0,"murmansk.ru":!0,"nalchik.ru":!0,"nnov.ru":!0,"nov.ru":!0,"novosibirsk.ru":!0,"nsk.ru":!0,"omsk.ru":!0,"orenburg.ru":!0,"oryol.ru":!0,"palana.ru":!0,"penza.ru":!0,"perm.ru":!0,"pskov.ru":!0,"ptz.ru":!0,"rnd.ru":!0,"ryazan.ru":!0,"sakhalin.ru":!0,"samara.ru":!0,"saratov.ru":!0,"simbirsk.ru":!0,"smolensk.ru":!0,"spb.ru":!0,"stavropol.ru":!0,"stv.ru":!0,"surgut.ru":!0,"tambov.ru":!0,"tatarstan.ru":!0,"tom.ru":!0,"tomsk.ru":!0,"tsaritsyn.ru":!0,"tsk.ru":!0,"tula.ru":!0,"tuva.ru":!0,"tver.ru":!0,"tyumen.ru":!0,"udm.ru":!0,"udmurtia.ru":!0,"ulan-ude.ru":!0,"vladikavkaz.ru":!0,"vladimir.ru":!0,"vladivostok.ru":!0,"volgograd.ru":!0,"vologda.ru":!0,"voronezh.ru":!0,"vrn.ru":!0,"vyatka.ru":!0,"yakutia.ru":!0,"yamal.ru":!0,"yaroslavl.ru":!0,"yekaterinburg.ru":!0,"yuzhno-sakhalinsk.ru":!0,"amursk.ru":!0,"baikal.ru":!0,"cmw.ru":!0,"fareast.ru":!0,"jamal.ru":!0,"kms.ru":!0,"k-uralsk.ru":!0,"kustanai.ru":!0,"kuzbass.ru":!0,"magnitka.ru":!0,"mytis.ru":!0,"nakhodka.ru":!0,"nkz.ru":!0,"norilsk.ru":!0,"oskol.ru":!0,"pyatigorsk.ru":!0,"rubtsovsk.ru":!0,"snz.ru":!0,"syzran.ru":!0,"vdonsk.ru":!0,"zgrad.ru":!0,"gov.ru":!0,"mil.ru":!0,"test.ru":!0,rw:!0,"gov.rw":!0,"net.rw":!0,"edu.rw":!0,"ac.rw":!0,"com.rw":!0,"co.rw":!0,"int.rw":!0,"mil.rw":!0,"gouv.rw":!0,sa:!0,"com.sa":!0,"net.sa":!0,"org.sa":!0,"gov.sa":!0,"med.sa":!0,"pub.sa":!0,"edu.sa":!0,"sch.sa":!0,sb:!0,"com.sb":!0,"edu.sb":!0,"gov.sb":!0,"net.sb":!0,"org.sb":!0,sc:!0,"com.sc":!0,"gov.sc":!0,"net.sc":!0,"org.sc":!0,"edu.sc":!0,sd:!0,"com.sd":!0,"net.sd":!0,"org.sd":!0,"edu.sd":!0,"med.sd":!0,"gov.sd":!0,"info.sd":!0,se:!0,"a.se":!0,"ac.se":!0,"b.se":!0,"bd.se":!0,"brand.se":!0,"c.se":!0,"d.se":!0,"e.se":!0,"f.se":!0,"fh.se":!0,"fhsk.se":!0,"fhv.se":!0,"g.se":!0,"h.se":!0,"i.se":!0,"k.se":!0,"komforb.se":!0,"kommunalforbund.se":!0,"komvux.se":!0,"l.se":!0,"lanbib.se":!0,"m.se":!0,"n.se":!0,"naturbruksgymn.se":!0,"o.se":!0,"org.se":!0,"p.se":!0,"parti.se":!0,"pp.se":!0,"press.se":!0,"r.se":!0,"s.se":!0,"sshn.se":!0,"t.se":!0,"tm.se":!0,"u.se":!0,"w.se":!0,"x.se":!0,"y.se":!0,"z.se":!0,sg:!0,"com.sg":!0,"net.sg":!0,"org.sg":!0,"gov.sg":!0,"edu.sg":!0,"per.sg":!0,sh:!0,si:!0,sk:!0,sl:!0,"com.sl":!0,"net.sl":!0,"edu.sl":!0,"gov.sl":!0,"org.sl":!0,sm:!0,sn:!0,"art.sn":!0,"com.sn":!0,"edu.sn":!0,"gouv.sn":!0,"org.sn":!0,"perso.sn":!0,"univ.sn":!0,so:!0,"com.so":!0,"net.so":!0,"org.so":!0,sr:!0,st:!0,"co.st":!0,"com.st":!0,"consulado.st":!0,"edu.st":!0,"embaixada.st":!0,"gov.st":!0,"mil.st":!0,"net.st":!0,"org.st":!0,"principe.st":!0,"saotome.st":!0,"store.st":!0,su:!0,"*.sv":!0,sy:!0,"edu.sy":!0,"gov.sy":!0,"net.sy":!0,"mil.sy":!0,"com.sy":!0,"org.sy":!0,sz:!0,"co.sz":!0,"ac.sz":!0,"org.sz":!0,tc:!0,td:!0,tel:!0,tf:!0,tg:!0,th:!0,"ac.th":!0,"co.th":!0,"go.th":!0,"in.th":!0,"mi.th":!0,"net.th":!0,"or.th":!0,tj:!0,"ac.tj":!0,"biz.tj":!0,"co.tj":!0,"com.tj":!0,"edu.tj":!0,"go.tj":!0,"gov.tj":!0,"int.tj":!0,"mil.tj":!0,"name.tj":!0,"net.tj":!0,"nic.tj":!0,"org.tj":!0,"test.tj":!0,"web.tj":!0,tk:!0,tl:!0,"gov.tl":!0,tm:!0,tn:!0,"com.tn":!0,"ens.tn":!0,"fin.tn":!0,"gov.tn":!0,"ind.tn":!0,"intl.tn":!0,"nat.tn":!0,"net.tn":!0,"org.tn":!0,"info.tn":!0,"perso.tn":!0,"tourism.tn":!0,"edunet.tn":!0,"rnrt.tn":!0,"rns.tn":!0,"rnu.tn":!0,"mincom.tn":!0,"agrinet.tn":!0,"defense.tn":!0,"turen.tn":!0,to:!0,"com.to":!0,"gov.to":!0,"net.to":!0,"org.to":!0,"edu.to":!0,"mil.to":!0,"*.tr":!0,"nic.tr":!1,"gov.nc.tr":!0,travel:!0,tt:!0,"co.tt":!0,"com.tt":!0,"org.tt":!0,"net.tt":!0,"biz.tt":!0,"info.tt":!0,"pro.tt":!0,"int.tt":!0,"coop.tt":!0,"jobs.tt":!0,"mobi.tt":!0,"travel.tt":!0,"museum.tt":!0,"aero.tt":!0,"name.tt":!0,"gov.tt":!0,"edu.tt":!0,tv:!0,tw:!0,"edu.tw":!0,"gov.tw":!0,"mil.tw":!0,"com.tw":!0,"net.tw":!0,"org.tw":!0,"idv.tw":!0,"game.tw":!0,"ebiz.tw":!0,"club.tw":!0,"xn--zf0ao64a.tw":!0,"xn--uc0atv.tw":!0,"xn--czrw28b.tw":!0,"ac.tz":!0,"co.tz":!0,"go.tz":!0,"mil.tz":!0,"ne.tz":!0,"or.tz":!0,"sc.tz":!0,ua:!0,"com.ua":!0,"edu.ua":!0,"gov.ua":!0,"in.ua":!0,"net.ua":!0,"org.ua":!0,"cherkassy.ua":!0,"chernigov.ua":!0,"chernovtsy.ua":!0,"ck.ua":!0,"cn.ua":!0,"crimea.ua":!0,"cv.ua":!0,"dn.ua":!0,"dnepropetrovsk.ua":!0,"donetsk.ua":!0,"dp.ua":!0,"if.ua":!0,"ivano-frankivsk.ua":!0,"kh.ua":!0,"kharkov.ua":!0,"kherson.ua":!0,"khmelnitskiy.ua":!0,"kiev.ua":!0,"kirovograd.ua":!0,"km.ua":!0,"kr.ua":!0,"ks.ua":!0,"kv.ua":!0,"lg.ua":!0,"lugansk.ua":!0,"lutsk.ua":!0,"lviv.ua":!0,"mk.ua":!0,"nikolaev.ua":!0,"od.ua":!0,"odessa.ua":!0,"pl.ua":!0,"poltava.ua":!0,"rovno.ua":!0,"rv.ua":!0,"sebastopol.ua":!0,"sumy.ua":!0,"te.ua":!0,"ternopil.ua":!0,"uzhgorod.ua":!0,"vinnica.ua":!0,"vn.ua":!0,"zaporizhzhe.ua":!0,"zp.ua":!0,"zhitomir.ua":!0,"zt.ua":!0,"co.ua":!0,"pp.ua":!0,ug:!0,"co.ug":!0,"ac.ug":!0,"sc.ug":!0,"go.ug":!0,"ne.ug":!0,"or.ug":!0,"*.uk":!0,"*.sch.uk":!0,"bl.uk":!1,"british-library.uk":!1,"icnet.uk":!1,"jet.uk":!1,"mod.uk":!1,"nel.uk":!1,"nhs.uk":!1,"nic.uk":!1,"nls.uk":!1,"national-library-scotland.uk":!1,"parliament.uk":!1,"police.uk":!1,us:!0,"dni.us":!0,"fed.us":!0,"isa.us":!0,"kids.us":!0,"nsn.us":!0,"ak.us":!0,"al.us":!0,"ar.us":!0,"as.us":!0,"az.us":!0,"ca.us":!0,"co.us":!0,"ct.us":!0,"dc.us":!0,"de.us":!0,"fl.us":!0,"ga.us":!0,"gu.us":!0,"hi.us":!0,"ia.us":!0,"id.us":!0,"il.us":!0,"in.us":!0,"ks.us":!0,"ky.us":!0,"la.us":!0,"ma.us":!0,"md.us":!0,"me.us":!0,"mi.us":!0,"mn.us":!0,"mo.us":!0,"ms.us":!0,"mt.us":!0,"nc.us":!0,"nd.us":!0,"ne.us":!0,"nh.us":!0,"nj.us":!0,"nm.us":!0,"nv.us":!0,"ny.us":!0,"oh.us":!0,"ok.us":!0,"or.us":!0,"pa.us":!0,"pr.us":!0,"ri.us":!0,"sc.us":!0,"sd.us":!0,"tn.us":!0,"tx.us":!0,"ut.us":!0,"vi.us":!0,"vt.us":!0,"va.us":!0,"wa.us":!0,"wi.us":!0,"wv.us":!0,"wy.us":!0,"k12.ak.us":!0,"k12.al.us":!0,"k12.ar.us":!0,"k12.as.us":!0,"k12.az.us":!0,"k12.ca.us":!0,"k12.co.us":!0,"k12.ct.us":!0,"k12.dc.us":!0,"k12.de.us":!0,"k12.fl.us":!0,"k12.ga.us":!0,"k12.gu.us":!0,"k12.ia.us":!0,"k12.id.us":!0,"k12.il.us":!0,"k12.in.us":!0,"k12.ks.us":!0,"k12.ky.us":!0,"k12.la.us":!0,"k12.ma.us":!0,"k12.md.us":!0,"k12.me.us":!0,"k12.mi.us":!0,"k12.mn.us":!0,"k12.mo.us":!0,"k12.ms.us":!0,"k12.mt.us":!0,"k12.nc.us":!0,"k12.nd.us":!0,"k12.ne.us":!0,"k12.nh.us":!0,"k12.nj.us":!0,"k12.nm.us":!0,"k12.nv.us":!0,"k12.ny.us":!0,"k12.oh.us":!0,"k12.ok.us":!0,"k12.or.us":!0,"k12.pa.us":!0,"k12.pr.us":!0,"k12.ri.us":!0,"k12.sc.us":!0,"k12.sd.us":!0,"k12.tn.us":!0,"k12.tx.us":!0,"k12.ut.us":!0,"k12.vi.us":!0,"k12.vt.us":!0,"k12.va.us":!0,"k12.wa.us":!0,"k12.wi.us":!0,"k12.wv.us":!0,"k12.wy.us":!0,"cc.ak.us":!0,"cc.al.us":!0,"cc.ar.us":!0,"cc.as.us":!0,"cc.az.us":!0,"cc.ca.us":!0,"cc.co.us":!0,"cc.ct.us":!0,"cc.dc.us":!0,"cc.de.us":!0,"cc.fl.us":!0,"cc.ga.us":!0,"cc.gu.us":!0,"cc.hi.us":!0,"cc.ia.us":!0,"cc.id.us":!0,"cc.il.us":!0,"cc.in.us":!0,"cc.ks.us":!0,"cc.ky.us":!0,"cc.la.us":!0,"cc.ma.us":!0,"cc.md.us":!0,"cc.me.us":!0,"cc.mi.us":!0,"cc.mn.us":!0,"cc.mo.us":!0,"cc.ms.us":!0,"cc.mt.us":!0,"cc.nc.us":!0,"cc.nd.us":!0,"cc.ne.us":!0,"cc.nh.us":!0,"cc.nj.us":!0,"cc.nm.us":!0,"cc.nv.us":!0,"cc.ny.us":!0,"cc.oh.us":!0,"cc.ok.us":!0,"cc.or.us":!0,"cc.pa.us":!0,"cc.pr.us":!0,"cc.ri.us":!0,"cc.sc.us":!0,"cc.sd.us":!0,"cc.tn.us":!0,"cc.tx.us":!0,"cc.ut.us":!0,"cc.vi.us":!0,"cc.vt.us":!0,"cc.va.us":!0,"cc.wa.us":!0,"cc.wi.us":!0,"cc.wv.us":!0,"cc.wy.us":!0,"lib.ak.us":!0,"lib.al.us":!0,"lib.ar.us":!0,"lib.as.us":!0,"lib.az.us":!0,"lib.ca.us":!0,"lib.co.us":!0,"lib.ct.us":!0,"lib.dc.us":!0,"lib.de.us":!0,"lib.fl.us":!0,"lib.ga.us":!0,"lib.gu.us":!0,"lib.hi.us":!0,"lib.ia.us":!0,"lib.id.us":!0,"lib.il.us":!0,"lib.in.us":!0,"lib.ks.us":!0,"lib.ky.us":!0,"lib.la.us":!0,"lib.ma.us":!0,"lib.md.us":!0,"lib.me.us":!0,"lib.mi.us":!0,"lib.mn.us":!0,"lib.mo.us":!0,"lib.ms.us":!0,"lib.mt.us":!0,"lib.nc.us":!0,"lib.nd.us":!0,"lib.ne.us":!0,"lib.nh.us":!0,"lib.nj.us":!0,"lib.nm.us":!0,"lib.nv.us":!0,"lib.ny.us":!0,"lib.oh.us":!0,"lib.ok.us":!0,"lib.or.us":!0,"lib.pa.us":!0,"lib.pr.us":!0,"lib.ri.us":!0,"lib.sc.us":!0,"lib.sd.us":!0,"lib.tn.us":!0,"lib.tx.us":!0,"lib.ut.us":!0,"lib.vi.us":!0,"lib.vt.us":!0,"lib.va.us":!0,"lib.wa.us":!0,"lib.wi.us":!0,"lib.wv.us":!0,"lib.wy.us":!0,"pvt.k12.ma.us":!0,"chtr.k12.ma.us":!0,"paroch.k12.ma.us":!0,"*.uy":!0,uz:!0,"com.uz":!0,"co.uz":!0,va:!0,vc:!0,"com.vc":!0,"net.vc":!0,"org.vc":!0,"gov.vc":!0,"mil.vc":!0,"edu.vc":!0,"*.ve":!0,vg:!0,vi:!0,"co.vi":!0,"com.vi":!0,"k12.vi":!0,"net.vi":!0,"org.vi":!0,vn:!0,"com.vn":!0,"net.vn":!0,"org.vn":!0,"edu.vn":!0,"gov.vn":!0,"int.vn":!0,"ac.vn":!0,"biz.vn":!0,"info.vn":!0,"name.vn":!0,"pro.vn":!0,"health.vn":!0,vu:!0,wf:!0,ws:!0,"com.ws":!0,"net.ws":!0,"org.ws":!0,"gov.ws":!0,"edu.ws":!0,yt:!0,"xn--mgbaam7a8h":!0,"xn--54b7fta0cc":!0,"xn--fiqs8s":!0,"xn--fiqz9s":!0,"xn--lgbbat1ad8j":!0,"xn--wgbh1c":!0,"xn--node":!0,"xn--j6w193g":!0,"xn--h2brj9c":!0,"xn--mgbbh1a71e":!0,"xn--fpcrj9c3d":!0,"xn--gecrj9c":!0,"xn--s9brj9c":!0,"xn--45brj9c":!0,"xn--xkc2dl3a5ee0h":!0,"xn--mgba3a4f16a":!0,"xn--mgba3a4fra":!0,"xn--mgbayh7gpa":!0,"xn--3e0b707e":!0,"xn--fzc2c9e2c":!0,"xn--xkc2al3hye2a":!0,"xn--mgbc0a9azcg":!0,"xn--mgb9awbf":!0,"xn--ygbi2ammx":!0,"xn--90a3ac":!0,"xn--p1ai":!0,"xn--wgbl6a":!0,"xn--mgberp4a5d4ar":!0,"xn--mgberp4a5d4a87g":!0,"xn--mgbqly7c0a67fbc":!0,"xn--mgbqly7cvafr":!0,"xn--ogbpf8fl":!0,"xn--mgbtf8fl":!0,"xn--yfro4i67o":!0,"xn--clchc0ea0b2g2a9gcd":!0,"xn--o3cw4h":!0,"xn--pgbs0dh":!0,"xn--kpry57d":!0,"xn--kprw13d":!0,"xn--nnx388a":!0,"xn--j1amh":!0,"xn--mgb2ddes":!0,xxx:!0,"*.ye":!0,"*.za":!0,"*.zm":!0,"*.zw":!0,"biz.at":!0,"info.at":!0,"priv.at":!0,"co.ca":!0,"ar.com":!0,"br.com":!0,"cn.com":!0,"de.com":!0,"eu.com":!0,"gb.com":!0,"gr.com":!0,"hu.com":!0,"jpn.com":!0,"kr.com":!0,"no.com":!0,"qc.com":!0,"ru.com":!0,"sa.com":!0,"se.com":!0,"uk.com":!0,"us.com":!0,"uy.com":!0,"za.com":!0,"gb.net":!0,"jp.net":!0,"se.net":!0,"uk.net":!0,"ae.org":!0,"us.org":!0,"com.de":!0,"operaunite.com":!0,"appspot.com":!0,"iki.fi":!0,"c.la":!0,"za.net":!0,"za.org":!0,"co.nl":!0,"co.no":!0,"co.pl":!0,"dyndns-at-home.com":!0,"dyndns-at-work.com":!0,"dyndns-blog.com":!0,"dyndns-free.com":!0,"dyndns-home.com":!0,"dyndns-ip.com":!0,"dyndns-mail.com":!0,"dyndns-office.com":!0,"dyndns-pics.com":!0,"dyndns-remote.com":!0,"dyndns-server.com":!0,"dyndns-web.com":!0,"dyndns-wiki.com":!0,"dyndns-work.com":!0,"dyndns.biz":!0,"dyndns.info":!0,"dyndns.org":!0,"dyndns.tv":!0,"at-band-camp.net":!0,"ath.cx":!0,"barrel-of-knowledge.info":!0,"barrell-of-knowledge.info":!0,"better-than.tv":!0,"blogdns.com":!0,"blogdns.net":!0,"blogdns.org":!0,"blogsite.org":!0,"boldlygoingnowhere.org":!0,"broke-it.net":!0,"buyshouses.net":!0,"cechire.com":!0,"dnsalias.com":!0,"dnsalias.net":!0,"dnsalias.org":!0,"dnsdojo.com":!0,"dnsdojo.net":!0,"dnsdojo.org":!0,"does-it.net":!0,"doesntexist.com":!0,"doesntexist.org":!0,"dontexist.com":!0,"dontexist.net":!0,"dontexist.org":!0,"doomdns.com":!0,"doomdns.org":!0,"dvrdns.org":!0,"dyn-o-saur.com":!0,"dynalias.com":!0,"dynalias.net":!0,"dynalias.org":!0,"dynathome.net":!0,"dyndns.ws":!0,"endofinternet.net":!0,"endofinternet.org":!0,"endoftheinternet.org":!0,"est-a-la-maison.com":!0,"est-a-la-masion.com":!0,"est-le-patron.com":!0,"est-mon-blogueur.com":!0,"for-better.biz":!0,"for-more.biz":!0,"for-our.info":!0,"for-some.biz":!0,"for-the.biz":!0,"forgot.her.name":!0,"forgot.his.name":!0,"from-ak.com":!0,"from-al.com":!0,"from-ar.com":!0,"from-az.net":!0,"from-ca.com":!0,"from-co.net":!0,"from-ct.com":!0,"from-dc.com":!0,"from-de.com":!0,"from-fl.com":!0,"from-ga.com":!0,"from-hi.com":!0,"from-ia.com":!0,"from-id.com":!0,"from-il.com":!0,"from-in.com":!0,"from-ks.com":!0,"from-ky.com":!0,"from-la.net":!0,"from-ma.com":!0,"from-md.com":!0,"from-me.org":!0,"from-mi.com":!0,"from-mn.com":!0,"from-mo.com":!0,"from-ms.com":!0,"from-mt.com":!0,"from-nc.com":!0,"from-nd.com":!0,"from-ne.com":!0,"from-nh.com":!0,"from-nj.com":!0,"from-nm.com":!0,"from-nv.com":!0,"from-ny.net":!0,"from-oh.com":!0,"from-ok.com":!0,"from-or.com":!0,"from-pa.com":!0,"from-pr.com":!0,"from-ri.com":!0,"from-sc.com":!0,"from-sd.com":!0,"from-tn.com":!0,"from-tx.com":!0,"from-ut.com":!0,"from-va.com":!0,"from-vt.com":!0,"from-wa.com":!0,
"from-wi.com":!0,"from-wv.com":!0,"from-wy.com":!0,"ftpaccess.cc":!0,"fuettertdasnetz.de":!0,"game-host.org":!0,"game-server.cc":!0,"getmyip.com":!0,"gets-it.net":!0,"go.dyndns.org":!0,"gotdns.com":!0,"gotdns.org":!0,"groks-the.info":!0,"groks-this.info":!0,"ham-radio-op.net":!0,"here-for-more.info":!0,"hobby-site.com":!0,"hobby-site.org":!0,"home.dyndns.org":!0,"homedns.org":!0,"homeftp.net":!0,"homeftp.org":!0,"homeip.net":!0,"homelinux.com":!0,"homelinux.net":!0,"homelinux.org":!0,"homeunix.com":!0,"homeunix.net":!0,"homeunix.org":!0,"iamallama.com":!0,"in-the-band.net":!0,"is-a-anarchist.com":!0,"is-a-blogger.com":!0,"is-a-bookkeeper.com":!0,"is-a-bruinsfan.org":!0,"is-a-bulls-fan.com":!0,"is-a-candidate.org":!0,"is-a-caterer.com":!0,"is-a-celticsfan.org":!0,"is-a-chef.com":!0,"is-a-chef.net":!0,"is-a-chef.org":!0,"is-a-conservative.com":!0,"is-a-cpa.com":!0,"is-a-cubicle-slave.com":!0,"is-a-democrat.com":!0,"is-a-designer.com":!0,"is-a-doctor.com":!0,"is-a-financialadvisor.com":!0,"is-a-geek.com":!0,"is-a-geek.net":!0,"is-a-geek.org":!0,"is-a-green.com":!0,"is-a-guru.com":!0,"is-a-hard-worker.com":!0,"is-a-hunter.com":!0,"is-a-knight.org":!0,"is-a-landscaper.com":!0,"is-a-lawyer.com":!0,"is-a-liberal.com":!0,"is-a-libertarian.com":!0,"is-a-linux-user.org":!0,"is-a-llama.com":!0,"is-a-musician.com":!0,"is-a-nascarfan.com":!0,"is-a-nurse.com":!0,"is-a-painter.com":!0,"is-a-patsfan.org":!0,"is-a-personaltrainer.com":!0,"is-a-photographer.com":!0,"is-a-player.com":!0,"is-a-republican.com":!0,"is-a-rockstar.com":!0,"is-a-socialist.com":!0,"is-a-soxfan.org":!0,"is-a-student.com":!0,"is-a-teacher.com":!0,"is-a-techie.com":!0,"is-a-therapist.com":!0,"is-an-accountant.com":!0,"is-an-actor.com":!0,"is-an-actress.com":!0,"is-an-anarchist.com":!0,"is-an-artist.com":!0,"is-an-engineer.com":!0,"is-an-entertainer.com":!0,"is-by.us":!0,"is-certified.com":!0,"is-found.org":!0,"is-gone.com":!0,"is-into-anime.com":!0,"is-into-cars.com":!0,"is-into-cartoons.com":!0,"is-into-games.com":!0,"is-leet.com":!0,"is-lost.org":!0,"is-not-certified.com":!0,"is-saved.org":!0,"is-slick.com":!0,"is-uberleet.com":!0,"is-very-bad.org":!0,"is-very-evil.org":!0,"is-very-good.org":!0,"is-very-nice.org":!0,"is-very-sweet.org":!0,"is-with-theband.com":!0,"isa-geek.com":!0,"isa-geek.net":!0,"isa-geek.org":!0,"isa-hockeynut.com":!0,"issmarterthanyou.com":!0,"isteingeek.de":!0,"istmein.de":!0,"kicks-ass.net":!0,"kicks-ass.org":!0,"knowsitall.info":!0,"land-4-sale.us":!0,"lebtimnetz.de":!0,"leitungsen.de":!0,"likes-pie.com":!0,"likescandy.com":!0,"merseine.nu":!0,"mine.nu":!0,"misconfused.org":!0,"mypets.ws":!0,"myphotos.cc":!0,"neat-url.com":!0,"office-on-the.net":!0,"on-the-web.tv":!0,"podzone.net":!0,"podzone.org":!0,"readmyblog.org":!0,"saves-the-whales.com":!0,"scrapper-site.net":!0,"scrapping.cc":!0,"selfip.biz":!0,"selfip.com":!0,"selfip.info":!0,"selfip.net":!0,"selfip.org":!0,"sells-for-less.com":!0,"sells-for-u.com":!0,"sells-it.net":!0,"sellsyourhome.org":!0,"servebbs.com":!0,"servebbs.net":!0,"servebbs.org":!0,"serveftp.net":!0,"serveftp.org":!0,"servegame.org":!0,"shacknet.nu":!0,"simple-url.com":!0,"space-to-rent.com":!0,"stuff-4-sale.org":!0,"stuff-4-sale.us":!0,"teaches-yoga.com":!0,"thruhere.net":!0,"traeumtgerade.de":!0,"webhop.biz":!0,"webhop.info":!0,"webhop.net":!0,"webhop.org":!0,"worse-than.tv":!0,"writesthisblog.com":!0});


},{}],325:[function(require,module,exports){
"use strict";function Store(){}exports.Store=Store,Store.prototype.synchronous=!1,Store.prototype.findCookie=function(){throw new Error("findCookie is not implemented")},Store.prototype.findCookies=function(){throw new Error("findCookies is not implemented")},Store.prototype.putCookie=function(){throw new Error("putCookie is not implemented")},Store.prototype.updateCookie=function(){throw new Error("updateCookie is not implemented")},Store.prototype.removeCookie=function(){throw new Error("removeCookie is not implemented")},Store.prototype.removeCookies=function(){throw new Error("removeCookies is not implemented")};


},{}],326:[function(require,module,exports){
(function (process,Buffer){
"use strict";function httpOverHttp(e){var t=new TunnelingAgent(e);return t.request=http.request,t}function httpsOverHttp(e){var t=new TunnelingAgent(e);return t.request=http.request,t.createSocket=createSecureSocket,t}function httpOverHttps(e){var t=new TunnelingAgent(e);return t.request=https.request,t}function httpsOverHttps(e){var t=new TunnelingAgent(e);return t.request=https.request,t.createSocket=createSecureSocket,t}function TunnelingAgent(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||http.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(e,r,n){for(var s=0,o=t.requests.length;o>s;++s){var u=t.requests[s];if(u.host===r&&u.port===n)return t.requests.splice(s,1),void u.request.onSocket(e)}e.destroy(),t.removeSocket(e)})}function createSecureSocket(e,t){var r=this;TunnelingAgent.prototype.createSocket.call(r,e,function(n){var s=tls.connect(0,mergeOptions({},r.options,{servername:e.host,socket:n}));t(s)})}function mergeOptions(e){for(var t=1,r=arguments.length;r>t;++t){var n=arguments[t];if("object"==typeof n)for(var s=Object.keys(n),o=0,u=s.length;u>o;++o){var i=s[o];void 0!==n[i]&&(e[i]=n[i])}}return e}var net=require("net"),tls=require("tls"),http=require("http"),https=require("https"),events=require("events"),assert=require("assert"),util=require("util");exports.httpOverHttp=httpOverHttp,exports.httpsOverHttp=httpsOverHttp,exports.httpOverHttps=httpOverHttps,exports.httpsOverHttps=httpsOverHttps,util.inherits(TunnelingAgent,events.EventEmitter),TunnelingAgent.prototype.addRequest=function(e,t){var r=this;return"string"==typeof t&&(t={host:t,port:arguments[2],path:arguments[3]}),r.sockets.length>=this.maxSockets?void r.requests.push({host:host,port:port,request:e}):void r.createSocket({host:t.host,port:t.port,request:e},function(n){function s(){r.emit("free",n,t.host,t.port)}function o(){r.removeSocket(),n.removeListener("free",s),n.removeListener("close",o),n.removeListener("agentRemove",o)}n.on("free",s),n.on("close",o),n.on("agentRemove",o),e.onSocket(n)})},TunnelingAgent.prototype.createSocket=function(e,t){function r(e){e.upgrade=!0}function n(e,t,r){process.nextTick(function(){s(e,t,r)})}function s(r,n,s){if(p.removeAllListeners(),n.removeAllListeners(),200===r.statusCode)assert.equal(s.length,0),debug("tunneling connection has established"),u.sockets[u.sockets.indexOf(i)]=n,t(n);else{debug("tunneling socket could not be established, statusCode=%d",r.statusCode);var o=new Error("tunneling socket could not be established, statusCode="+r.statusCode);o.code="ECONNRESET",e.request.emit("error",o),u.removeSocket(i)}}function o(t){p.removeAllListeners(),debug("tunneling socket could not be established, cause=%s\n",t.message,t.stack);var r=new Error("tunneling socket could not be established, cause="+t.message);r.code="ECONNRESET",e.request.emit("error",r),u.removeSocket(i)}var u=this,i={};u.sockets.push(i);var c=mergeOptions({},u.proxyOptions,{method:"CONNECT",path:e.host+":"+e.port,agent:!1});c.proxyAuth&&(c.headers=c.headers||{},c.headers["Proxy-Authorization"]="Basic "+new Buffer(c.proxyAuth).toString("base64")),debug("making CONNECT request");var p=u.request(c);p.useChunkedEncodingByDefault=!1,p.once("response",r),p.once("upgrade",n),p.once("connect",s),p.once("error",o),p.end()},TunnelingAgent.prototype.removeSocket=function(e){var t=this.sockets.indexOf(e);if(-1!==t){this.sockets.splice(t,1);var r=this.requests.shift();r&&this.createSocket(r,function(e){r.request.onSocket(e)})}};var debug;debug=process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments);"string"==typeof e[0]?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:function(){},exports.debug=debug;


}).call(this,require('_process'),require("buffer").Buffer)

},{"_process":164,"assert":2,"buffer":17,"events":156,"http":157,"https":161,"net":1,"tls":1,"util":184}],327:[function(require,module,exports){
(function (process,Buffer){
"use strict";function filterForNonReserved(e,t){var r={};for(var o in t){var n=-1===e.indexOf(o);n&&(r[o]=t[o])}return r}function filterOutReservedFunctions(e,t){var r={};for(var o in t){var n=!(-1===e.indexOf(o)),a="function"==typeof t[o];n&&a||(r[o]=t[o])}return r}function constructProxyHost(e){var t=e.portA,r=e.protocol,o=e.hostname+":";return o+=t?t:"https:"===r?"443":"80"}function constructProxyHeaderWhiteList(e,t){var r=t.reduce(function(e,t){return e[t.toLowerCase()]=!0,e},{});return Object.keys(e).filter(function(e){return r[e.toLowerCase()]}).reduce(function(t,r){return t[r]=e[r],t},{})}function getTunnelOption(e,t){return"undefined"!=typeof e.tunnel?e.tunnel:"undefined"!=typeof t.tunnel?t.tunnel:"https:"===e.uri.protocol?!0:void 0}function constructTunnelOptions(e){var t=e.proxy,r={proxy:{host:t.hostname,port:+t.port,proxyAuth:t.auth,headers:e.proxyHeaders},headers:e.headers,ca:e.ca,cert:e.cert,key:e.key,passphrase:e.passphrase,pfx:e.pfx,ciphers:e.ciphers,rejectUnauthorized:e.rejectUnauthorized,secureOptions:e.secureOptions,secureProtocol:e.secureProtocol};return r}function constructTunnelFnName(e,t){var r="https:"===e.protocol?"https":"http",o="https:"===t.protocol?"Https":"Http";return[r,o].join("Over")}function getTunnelFn(e){var t=e.uri,r=e.proxy,o=constructTunnelFnName(t,r);return tunnel[o]}function connectionErrorHandler(e){var t=this;t.res?t.res.request?t.res.request.emit("error",e):t.res.emit("error",e):t._httpMessage.emit("error",e)}function requestToJSON(){var e=this;return{uri:e.uri,method:e.method,headers:e.headers}}function responseToJSON(){var e=this;return{statusCode:e.statusCode,body:e.body,headers:e.headers,request:requestToJSON.call(e.request)}}function rfc3986(e){return e.replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function Request(e){var t=this;stream.Stream.call(t);var r=Object.keys(Request.prototype),o=filterForNonReserved(r,e);stream.Stream.call(t),util._extend(t,o),e=filterOutReservedFunctions(r,e),t.readable=!0,t.writable=!0,e.method&&(t.explicitMethod=!0),t.init(e)}function debug(){Request.debug&&console.error("REQUEST %s",util.format.apply(util,arguments))}var http=require("http"),https=require("https"),url=require("url"),util=require("util"),stream=require("stream"),qs=require("qs"),querystring=require("querystring"),zlib=require("zlib"),helpers=require("./lib/helpers"),bl=require("bl"),hawk=require("hawk"),aws=require("aws-sign2"),httpSignature=require("http-signature"),uuid=require("node-uuid"),mime=require("mime-types"),tunnel=require("tunnel-agent"),stringstream=require("stringstream"),caseless=require("caseless"),ForeverAgent=require("forever-agent"),FormData=require("form-data"),cookies=require("./lib/cookies"),copy=require("./lib/copy"),net=require("net"),CombinedStream=require("combined-stream"),isstream=require("isstream"),getProxyFromURI=require("./lib/getProxyFromURI"),Auth=require("./lib/auth").Auth,oauth=require("./lib/oauth"),safeStringify=helpers.safeStringify,md5=helpers.md5,isReadStream=helpers.isReadStream,toBase64=helpers.toBase64,defer=helpers.defer,globalCookieJar=cookies.jar(),globalPool={},isUrl=/^https?:/,defaultProxyHeaderWhiteList=["accept","accept-charset","accept-encoding","accept-language","accept-ranges","cache-control","content-encoding","content-language","content-length","content-location","content-md5","content-range","content-type","connection","date","expect","max-forwards","pragma","referer","te","transfer-encoding","user-agent","via"],defaultProxyHeaderExclusiveList=["proxy-authorization"];util.inherits(Request,stream.Stream),Request.debug=process.env.NODE_DEBUG&&/\brequest\b/.test(process.env.NODE_DEBUG),Request.prototype.setupTunnel=function(){var e=this;if("string"==typeof e.proxy&&(e.proxy=url.parse(e.proxy)),!e.proxy||!e.tunnel)return!1;e.proxyHeaderExclusiveList=e.proxyHeaderExclusiveList||[],e.proxyHeaderWhiteList=e.proxyHeaderWhiteList||defaultProxyHeaderWhiteList;var t=e.proxyHeaderExclusiveList.concat(defaultProxyHeaderExclusiveList),r=e.proxyHeaderWhiteList.concat(t);e.proxyHeaders=constructProxyHeaderWhiteList(e.headers,r),e.proxyHeaders.host=constructProxyHost(e.uri),t.forEach(e.removeHeader,e);var o=getTunnelFn(e),n=constructTunnelOptions(e);return e.agent=o(n),!0},Request.prototype.init=function(e){var t=this;if(e||(e={}),t.headers=t.headers?copy(t.headers):{},caseless.httpify(t,t.headers),t.method||(t.method=e.method||"GET"),t.localAddress=e.localAddress,t.qsLib||(t.qsLib=e.useQuerystring?querystring:qs),debug(e),t.pool||t.pool===!1||(t.pool=globalPool),t.dests=t.dests||[],t.__isRequestRequest=!0,!t._callback&&t.callback&&(t._callback=t.callback,t.callback=function(){t._callbackCalled||(t._callbackCalled=!0,t._callback.apply(t,arguments))},t.on("error",t.callback.bind()),t.on("complete",t.callback.bind(t,null))),!t.uri&&t.url&&(t.uri=t.url,delete t.url),!t.uri)return t.emit("error",new Error("options.uri is a required argument"));if("string"==typeof t.uri&&(t.uri=url.parse(t.uri)),"unix:"===t.uri.protocol)return t.emit("error",new Error("`unix://` URL scheme is no longer supported. Please use the format `http://unix:SOCKET:PATH`"));if("unix"===t.uri.host){var r=t.uri.path.split(":"),o=r[0],n=r[1];t.socketPath=o,t.uri.pathname=n,t.uri.path=n,t.uri.host=o,t.uri.hostname=o,t.uri.isUnix=!0}if(t.strictSSL===!1&&(t.rejectUnauthorized=!1),t.hasOwnProperty("proxy")||(t.proxy=getProxyFromURI(t.uri)),t.tunnel=getTunnelOption(t,e),t.proxy&&t.setupTunnel(),t.uri.pathname||(t.uri.pathname="/"),!(t.uri.host||t.uri.hostname&&t.uri.port||t.uri.isUnix)){var a=url.format(t.uri),s='Invalid URI "'+a+'"';return 0===Object.keys(e).length&&(s+=". This can be caused by a crappy redirection."),t.emit("error",new Error(s))}if(t._redirectsFollowed=t._redirectsFollowed||0,t.maxRedirects=void 0!==t.maxRedirects?t.maxRedirects:10,t.allowRedirect="function"==typeof t.followRedirect?t.followRedirect:function(){return!0},t.followRedirects=void 0!==t.followRedirect?!!t.followRedirect:!0,t.followAllRedirects=void 0!==t.followAllRedirects?t.followAllRedirects:!1,(t.followRedirects||t.followAllRedirects)&&(t.redirects=t.redirects||[]),t.setHost=!1,!t.hasHeader("host")){var i=t.originalHostHeaderName||"host";t.setHeader(i,t.uri.hostname),t.uri.port&&(80===t.uri.port&&"http:"===t.uri.protocol||443===t.uri.port&&"https:"===t.uri.protocol||t.setHeader(i,t.getHeader("host")+(":"+t.uri.port))),t.setHost=!0}if(t.jar(t._jar||e.jar),t.uri.port||("http:"===t.uri.protocol?t.uri.port=80:"https:"===t.uri.protocol&&(t.uri.port=443)),t.proxy&&!t.tunnel?(t.port=t.proxy.port,t.host=t.proxy.hostname):(t.port=t.uri.port,t.host=t.uri.hostname),e.form&&t.form(e.form),e.formData){var u=e.formData,d=t.form(),c=function(e,t){t.hasOwnProperty("value")&&t.hasOwnProperty("options")?d.append(e,t.value,t.options):d.append(e,t)};for(var p in u)if(u.hasOwnProperty(p)){var l=u[p];if(l instanceof Array)for(var h=0;h<l.length;h++)c(p,l[h]);else c(p,l)}}if(e.qs&&t.qs(e.qs),t.path=t.uri.path?t.uri.path:t.uri.pathname+(t.uri.search||""),0===t.path.length&&(t.path="/"),t._auth=new Auth,e.oauth&&t.oauth(e.oauth),e.aws&&t.aws(e.aws),e.hawk&&t.hawk(e.hawk),e.httpSignature&&t.httpSignature(e.httpSignature),e.auth&&(Object.prototype.hasOwnProperty.call(e.auth,"username")&&(e.auth.user=e.auth.username),Object.prototype.hasOwnProperty.call(e.auth,"password")&&(e.auth.pass=e.auth.password),t.auth(e.auth.user,e.auth.pass,e.auth.sendImmediately,e.auth.bearer)),t.gzip&&!t.hasHeader("accept-encoding")&&t.setHeader("accept-encoding","gzip"),t.uri.auth&&!t.hasHeader("authorization")){var f=t.uri.auth.split(":").map(function(e){return querystring.unescape(e)});t.auth(f[0],f.slice(1).join(":"),!0)}if(!t.tunnel&&t.proxy&&t.proxy.auth&&!t.hasHeader("proxy-authorization")){var g=t.proxy.auth.split(":").map(function(e){return querystring.unescape(e)}),m="Basic "+toBase64(g.join(":"));t.setHeader("proxy-authorization",m)}if(t.proxy&&!t.tunnel&&(t.path=t.uri.protocol+"//"+t.uri.host+t.path),e.json&&t.json(e.json),e.multipart&&(t.boundary=uuid(),t.multipart(e.multipart)),t.body){var y=0;if(Buffer.isBuffer(t.body))y=t.body.length;else if(Array.isArray(t.body))for(var b=0;b<t.body.length;b++)y+=t.body[b].length;else t.body=new Buffer(t.body),y=t.body.length;if(!y)throw new Error("Argument error, options.body.");t.hasHeader("content-length")||t.setHeader("content-length",y)}var v=t.proxy&&!t.tunnel?t.proxy.protocol:t.uri.protocol,q={"http:":http,"https:":https},H=t.httpModules||{};return t.httpModule=H[v]||q[v],t.httpModule?(e.ca&&(t.ca=e.ca),t.agent||(e.agentOptions&&(t.agentOptions=e.agentOptions),t.agentClass=e.agentClass?e.agentClass:e.forever?"http:"===v?ForeverAgent:ForeverAgent.SSL:t.httpModule.Agent),t.agent=t.pool===!1?!1:t.agent||t.getNewAgent(),t.on("pipe",function(e){if(t.ntick&&t._started)throw new Error("You cannot pipe to this stream after the outbound request has started.");if(t.src=e,isReadStream(e))t.hasHeader("content-type")||t.setHeader("content-type",mime.lookup(e.path));else{if(e.headers)for(var r in e.headers)t.hasHeader(r)||t.setHeader(r,e.headers[r]);t._json&&!t.hasHeader("content-type")&&t.setHeader("content-type","application/json"),e.method&&!t.explicitMethod&&(t.method=e.method)}}),void defer(function(){if(!t._aborted){var e=function(){t._form&&t._form.pipe(t),t._multipart&&t._multipart.pipe(t),t.body?(Array.isArray(t.body)?t.body.forEach(function(e){t.write(e)}):t.write(t.body),t.end()):t.requestBodyStream?(console.warn("options.requestBodyStream is deprecated, please pass the request object to stream.pipe."),t.requestBodyStream.pipe(t)):t.src||("GET"!==t.method&&"undefined"!=typeof t.method&&t.setHeader("content-length",0),t.end())};t._form&&!t.hasHeader("content-length")?(t.setHeader(t._form.getHeaders()),t._form.getLength(function(r,o){r||t.setHeader("content-length",o),e()})):e(),t.ntick=!0}})):t.emit("error",new Error("Invalid protocol: "+v))},Request.prototype._updateProtocol=function(){var e=this,t=e.uri.protocol;if("https:"===t||e.tunnel){if(e.proxy&&e.setupTunnel())return;switch(e.httpModule=https,e.agentClass){case ForeverAgent:e.agentClass=ForeverAgent.SSL;break;case http.Agent:e.agentClass=https.Agent;break;default:return}e.agent&&(e.agent=e.getNewAgent())}else{switch(e.httpModule=http,e.agentClass){case ForeverAgent.SSL:e.agentClass=ForeverAgent;break;case https.Agent:e.agentClass=http.Agent;break;default:return}e.agent&&(e.agent=null,e.agent=e.getNewAgent())}},Request.prototype.getNewAgent=function(){var e=this,t=e.agentClass,r={};if(e.agentOptions)for(var o in e.agentOptions)r[o]=e.agentOptions[o];e.ca&&(r.ca=e.ca),e.ciphers&&(r.ciphers=e.ciphers),e.secureProtocol&&(r.secureProtocol=e.secureProtocol),e.secureOptions&&(r.secureOptions=e.secureOptions),"undefined"!=typeof e.rejectUnauthorized&&(r.rejectUnauthorized=e.rejectUnauthorized),e.cert&&e.key&&(r.key=e.key,r.cert=e.cert),e.pfx&&(r.pfx=e.pfx),e.passphrase&&(r.passphrase=e.passphrase);var n="";t!==e.httpModule.Agent&&(n+=t.name);var a=e.proxy;"string"==typeof a&&(a=url.parse(a));var s=a&&"https:"===a.protocol||"https:"===this.uri.protocol;return s&&(r.ca&&(n&&(n+=":"),n+=r.ca),"undefined"!=typeof r.rejectUnauthorized&&(n&&(n+=":"),n+=r.rejectUnauthorized),r.cert&&(n&&(n+=":"),n+=r.cert.toString("ascii")+r.key.toString("ascii")),r.pfx&&(n&&(n+=":"),n+=r.pfx.toString("ascii")),r.ciphers&&(n&&(n+=":"),n+=r.ciphers),r.secureProtocol&&(n&&(n+=":"),n+=r.secureProtocol),r.secureOptions&&(n&&(n+=":"),n+=r.secureOptions)),e.pool===globalPool&&!n&&0===Object.keys(r).length&&e.httpModule.globalAgent?e.httpModule.globalAgent:(n=e.uri.protocol+n,e.pool[n]||(e.pool[n]=new t(r),e.pool.maxSockets&&(e.pool[n].maxSockets=e.pool.maxSockets)),e.pool[n])},Request.prototype.start=function(){var e=this;if(!e._aborted){e._started=!0,e.method=e.method||"GET",e.href=e.uri.href,e.src&&e.src.stat&&e.src.stat.size&&!e.hasHeader("content-length")&&e.setHeader("content-length",e.src.stat.size),e._aws&&e.aws(e._aws,!0);var t=copy(e);delete t.auth,debug("make request",e.uri.href),e.req=e.httpModule.request(t),e.timeout&&!e.timeoutTimer&&(e.timeoutTimer=setTimeout(function(){e.abort();var t=new Error("ETIMEDOUT");t.code="ETIMEDOUT",e.emit("error",t)},e.timeout),e.req.setTimeout&&e.req.setTimeout(e.timeout,function(){if(e.req){e.req.abort();var t=new Error("ESOCKETTIMEDOUT");t.code="ESOCKETTIMEDOUT",e.emit("error",t)}})),e.req.on("response",e.onRequestResponse.bind(e)),e.req.on("error",e.onRequestError.bind(e)),e.req.on("drain",function(){e.emit("drain")}),e.req.on("socket",function(t){e.emit("socket",t)}),e.on("end",function(){e.req.connection&&e.req.connection.removeListener("error",connectionErrorHandler)}),e.emit("request",e.req)}},Request.prototype.onRequestError=function(e){var t=this;if(!t._aborted){if(t.req&&t.req._reusedSocket&&"ECONNRESET"===e.code&&t.agent.addRequestNoreuse)return t.agent={addRequest:t.agent.addRequestNoreuse.bind(t.agent)},t.start(),void t.req.end();t.timeout&&t.timeoutTimer&&(clearTimeout(t.timeoutTimer),t.timeoutTimer=null),t.emit("error",e)}},Request.prototype.onRequestResponse=function(e){var t=this;if(debug("onRequestResponse",t.uri.href,e.statusCode,e.headers),e.on("end",function(){debug("response end",t.uri.href,e.statusCode,e.headers)}),e.connection&&-1===e.connection.listeners("error").indexOf(connectionErrorHandler)&&(e.connection.setMaxListeners(0),e.connection.once("error",connectionErrorHandler)),t._aborted)return debug("aborted",t.uri.href),void e.resume();if(t._paused?e.pause():e.resume&&e.resume(),t.response=e,e.request=t,e.toJSON=responseToJSON,t.httpModule===https&&t.strictSSL&&(!e.hasOwnProperty("client")||!e.client.authorized)){debug("strict ssl error",t.uri.href);var r=e.hasOwnProperty("client")?e.client.authorizationError:t.uri.href+" does not support SSL";return void t.emit("error",new Error("SSL Error: "+r))}t.originalHost=t.getHeader("host"),t.originalHostHeaderName||(t.originalHostHeaderName=t.hasHeader("host")),t.setHost&&t.removeHeader("host"),t.timeout&&t.timeoutTimer&&(clearTimeout(t.timeoutTimer),t.timeoutTimer=null);var o=t._jar&&t._jar.setCookie?t._jar:globalCookieJar,n=function(e){try{o.setCookie(e,t.uri.href,{ignoreError:!0})}catch(r){t.emit("error",r)}};if(e.caseless=caseless(e.headers),e.caseless.has("set-cookie")&&!t._disableCookies){var a=e.caseless.has("set-cookie");Array.isArray(e.headers[a])?e.headers[a].forEach(n):n(e.headers[a])}var s=null;if(e.statusCode>=300&&e.statusCode<400&&e.caseless.has("location")){var i=e.caseless.get("location");if(debug("redirect",i),t.followAllRedirects)s=i;else if(t.followRedirects)switch(t.method){case"PATCH":case"PUT":case"POST":case"DELETE":break;default:s=i}}else if(401===e.statusCode){var u=t._auth.response(t.method,t.uri.path,e.headers);u&&(t.setHeader("authorization",u),s=t.uri)}if(s&&t.allowRedirect.call(t,e)){if(debug("redirect to",s),t._paused&&e.resume(),t._redirectsFollowed>=t.maxRedirects)return void t.emit("error",new Error("Exceeded maxRedirects. Probably stuck in a redirect loop "+t.uri.href));t._redirectsFollowed+=1,isUrl.test(s)||(s=url.resolve(t.uri.href,s));var d=t.uri;return t.uri=url.parse(s),t.uri.protocol!==d.protocol&&t._updateProtocol(),t.redirects.push({statusCode:e.statusCode,redirectUri:s}),t.followAllRedirects&&401!==e.statusCode&&307!==e.statusCode&&(t.method="GET"),delete t.src,delete t.req,delete t.agent,delete t._started,401!==e.statusCode&&307!==e.statusCode&&(delete t.body,delete t._form,t.headers&&(t.removeHeader("host"),t.removeHeader("content-type"),t.removeHeader("content-length"),t.uri.hostname!==t.originalHost.split(":")[0]&&t.removeHeader("authorization"))),t.emit("redirect"),void t.init()}t._redirectsFollowed=t._redirectsFollowed||0,e.on("close",function(){t._ended||t.response.emit("end")}),e.on("end",function(){t._ended=!0});var c;if(t.gzip){var p=e.headers["content-encoding"]||"identity";p=p.trim().toLowerCase(),"gzip"===p?(c=zlib.createGunzip(),e.pipe(c)):("identity"!==p&&debug("ignoring unrecognized Content-Encoding "+p),c=e)}else c=e;if(t.encoding&&(0!==t.dests.length?console.error("Ignoring encoding parameter as this stream is being piped to another stream which makes the encoding option invalid."):c.setEncoding?c.setEncoding(t.encoding):c=c.pipe(stringstream(t.encoding))),t.emit("response",e),t.dests.forEach(function(e){t.pipeDest(e)}),c.on("data",function(e){t._destdata=!0,t.emit("data",e)}),c.on("end",function(e){t.emit("end",e)}),c.on("error",function(e){t.emit("error",e)}),c.on("close",function(){t.emit("close")}),t.callback){var l=bl(),h=[];t.on("data",function(e){Buffer.isBuffer(e)?l.append(e):h.push(e)}),t.on("end",function(){if(debug("end event",t.uri.href),t._aborted)return void debug("aborted",t.uri.href);if(l.length?(debug("has body",t.uri.href,l.length),e.body=null===t.encoding?l.slice():l.toString(t.encoding)):h.length&&("utf8"===t.encoding&&h[0].length>0&&"\ufeff"===h[0][0]&&(h[0]=h[0].substring(1)),e.body=h.join("")),t._json)try{e.body=JSON.parse(e.body,t._jsonReviver)}catch(r){}debug("emitting complete",t.uri.href),"undefined"!=typeof e.body||t._json||(e.body=null===t.encoding?new Buffer(0):""),t.emit("complete",e,e.body)})}else t.on("end",function(){return t._aborted?void debug("aborted",t.uri.href):void t.emit("complete",e)});debug("finish init function",t.uri.href)},Request.prototype.abort=function(){var e=this;e._aborted=!0,e.req?e.req.abort():e.response&&e.response.abort(),e.emit("abort")},Request.prototype.pipeDest=function(e){var t=this,r=t.response;if(e.headers&&!e.headersSent){if(r.caseless.has("content-type")){var o=r.caseless.has("content-type");e.setHeader?e.setHeader(o,r.headers[o]):e.headers[o]=r.headers[o]}if(r.caseless.has("content-length")){var n=r.caseless.has("content-length");e.setHeader?e.setHeader(n,r.headers[n]):e.headers[n]=r.headers[n]}}if(e.setHeader&&!e.headersSent){for(var a in r.headers)t.gzip&&"content-encoding"===a||e.setHeader(a,r.headers[a]);e.statusCode=r.statusCode}t.pipefilter&&t.pipefilter(r,e)},Request.prototype.qs=function(e,t){var r,o=this;r=!t&&o.uri.query?o.qsLib.parse(o.uri.query):{};for(var n in e)r[n]=e[n];if(""===o.qsLib.stringify(r))return o;var a=o.qsLib.stringify(r);return o.uri=url.parse(o.uri.href.split("?")[0]+"?"+rfc3986(a)),o.url=o.uri,o.path=o.uri.path,o},Request.prototype.form=function(e){var t=this;return e?(t.setHeader("content-type","application/x-www-form-urlencoded"),t.body="string"==typeof e?e.toString("utf8"):t.qsLib.stringify(e).toString("utf8"),t.body=rfc3986(t.body),t):(t._form=new FormData,t._form.on("error",function(e){e.message="form-data: "+e.message,t.emit("error",e),t.abort()}),t._form)},Request.prototype.multipart=function(e){function t(e){return o?s.append(e):s.push(new Buffer(e))}var r=this,o=!1,n=e.data||e;if(!n.forEach)throw new Error("Argument error, options.multipart.");"chunked"===r.getHeader("transfer-encoding")&&(o=!0),void 0!==e.chunked&&(o=e.chunked),o||n.forEach(function(e){if("undefined"==typeof e.body)throw new Error("Body attribute missing in multipart.");isstream(e.body)&&(o=!0)}),o&&!r.hasHeader("transfer-encoding")&&r.setHeader("transfer-encoding","chunked");var a=r.hasHeader("content-type");a&&-1!==r.headers[a].indexOf("multipart")?r.setHeader(a,r.headers[a].split(";")[0]+"; boundary="+r.boundary):r.setHeader("content-type","multipart/related; boundary="+r.boundary);var s=o?new CombinedStream:[];return r.preambleCRLF&&t("\r\n"),n.forEach(function(e){var o=e.body,n="--"+r.boundary+"\r\n";Object.keys(e).forEach(function(t){"body"!==t&&(n+=t+": "+e[t]+"\r\n")}),n+="\r\n",t(n),t(o),t("\r\n")}),t("--"+r.boundary+"--"),r.postambleCRLF&&t("\r\n"),r[o?"_multipart":"body"]=s,r},Request.prototype.json=function(e){var t=this;return t.hasHeader("accept")||t.setHeader("accept","application/json"),t._json=!0,"boolean"==typeof e?void 0!==t.body&&(t.body=/^application\/x-www-form-urlencoded\b/.test(t.getHeader("content-type"))?rfc3986(t.body):safeStringify(t.body),t.hasHeader("content-type")||t.setHeader("content-type","application/json")):(t.body=safeStringify(e),t.hasHeader("content-type")||t.setHeader("content-type","application/json")),"function"==typeof t.jsonReviver&&(t._jsonReviver=t.jsonReviver),t},Request.prototype.getHeader=function(e,t){var r,o,n,a=this;return t||(t=a.headers),Object.keys(t).forEach(function(a){a.length===e.length&&(o=new RegExp(e,"i"),n=a.match(o),n&&(r=t[a]))}),r};var getHeader=Request.prototype.getHeader;Request.prototype.auth=function(e,t,r,o){var n,a=this;return n=void 0!==o?a._auth.bearer(o,r):a._auth.basic(e,t,r),n&&a.setHeader("authorization",n),a},Request.prototype.aws=function(e,t){var r=this;if(!t)return r._aws=e,r;var o=new Date;r.setHeader("date",o.toUTCString());var n={key:e.key,secret:e.secret,verb:r.method.toUpperCase(),date:o,contentType:r.getHeader("content-type")||"",md5:r.getHeader("content-md5")||"",amazonHeaders:aws.canonicalizeHeaders(r.headers)},a=r.uri.path;return e.bucket&&a?n.resource="/"+e.bucket+a:e.bucket&&!a?n.resource="/"+e.bucket:!e.bucket&&a?n.resource=a:e.bucket||a||(n.resource="/"),n.resource=aws.canonicalizeResource(n.resource),r.setHeader("authorization",aws.authorization(n)),r},Request.prototype.httpSignature=function(e){var t=this;return httpSignature.signRequest({getHeader:function(e){return getHeader(e,t.headers)},setHeader:function(e,r){t.setHeader(e,r)},method:t.method,path:t.path},e),debug("httpSignature authorization",t.getHeader("authorization")),t},Request.prototype.hawk=function(e){var t=this;t.setHeader("Authorization",hawk.client.header(t.uri,t.method,e).field)},Request.prototype.oauth=function(e){var t=this,r=oauth.oauth({uri:t.uri,method:t.method,headers:t.headers,body:t.body,oauth:e,qsLib:t.qsLib});return"header"===r.transport?t.setHeader("Authorization",r.oauth):"query"===r.transport?t.path+=r.oauth:"body"===r.transport&&(t.body=r.oauth),t},Request.prototype.jar=function(e){var t,r=this;if(0===r._redirectsFollowed&&(r.originalCookieHeader=r.getHeader("cookie")),e){var o=e&&e.getCookieString?e:globalCookieJar,n=r.uri.href;o&&(t=o.getCookieString(n))}else t=!1,r._disableCookies=!0;return t&&t.length&&(r.originalCookieHeader?r.setHeader("cookie",r.originalCookieHeader+"; "+t):r.setHeader("cookie",t)),r._jar=e,r},Request.prototype.pipe=function(e,t){var r=this;if(r.response){if(r._destdata)throw new Error("You cannot pipe after data has been emitted from the response.");if(r._ended)throw new Error("You cannot pipe after the response has been ended.");return stream.Stream.prototype.pipe.call(r,e,t),r.pipeDest(e),e}return r.dests.push(e),stream.Stream.prototype.pipe.call(r,e,t),e},Request.prototype.write=function(){var e=this;return e._started||e.start(),e.req.write.apply(e.req,arguments)},Request.prototype.end=function(e){var t=this;e&&t.write(e),t._started||t.start(),t.req.end()},Request.prototype.pause=function(){var e=this;e.response?e.response.pause.apply(e.response,arguments):e._paused=!0},Request.prototype.resume=function(){var e=this;e.response?e.response.resume.apply(e.response,arguments):e._paused=!1},Request.prototype.destroy=function(){var e=this;e._ended?e.response&&e.response.destroy():e.end()},Request.defaultProxyHeaderWhiteList=defaultProxyHeaderWhiteList.slice(),Request.defaultProxyHeaderExclusiveList=defaultProxyHeaderExclusiveList.slice(),Request.prototype.toJSON=requestToJSON,module.exports=Request;


}).call(this,require('_process'),require("buffer").Buffer)

},{"./lib/auth":279,"./lib/cookies":280,"./lib/copy":281,"./lib/getProxyFromURI":282,"./lib/helpers":283,"./lib/oauth":284,"_process":164,"aws-sign2":285,"bl":286,"buffer":17,"caseless":287,"combined-stream":288,"forever-agent":290,"form-data":291,"hawk":293,"http":157,"http-signature":294,"https":161,"isstream":309,"mime-types":311,"net":1,"node-uuid":314,"qs":316,"querystring":168,"stream":180,"stringstream":321,"tunnel-agent":326,"url":182,"util":184,"zlib":16}],328:[function(require,module,exports){
"use strict";var _interopRequire=function(r){return r&&r.__esModule?r["default"]:r},_createClass=function(){function r(r,e){for(var t in e){var n=e[t];n.configurable=!0,n.value&&(n.writable=!0)}Object.defineProperties(r,e)}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),_get=function r(e,t,n){var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var o=Object.getPrototypeOf(e);return null===o?void 0:r(o,t,n)}if("value"in i&&i.writable)return i.value;var a=i.get;return void 0===a?void 0:a.call(n)},_inherits=function(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(r.__proto__=e)},_classCallCheck=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Transform=_interopRequire(require("readable-stream/transform")),isFunction=_interopRequire(require("lodash/lang/isFunction")),isUndefined=_interopRequire(require("lodash/lang/isUndefined")),assign=require("./utils").assign,Driver=function(r){function e(r,t){var n=void 0===arguments[2]?{}:arguments[2];if(_classCallCheck(this,e),n.objectMode=!0,_get(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,n),!isFunction(t))throw new Error("A transformer function is required for creating a driver");assign(this,{name:r,transformer:t})}return _inherits(e,r),_createClass(e,{_transform:{value:function(r,e,t){var n=this,i=n.name,o=n.transformer,a=n.logger,s=this.getCurrentEntry(),u=void 0;try{u=o(r,s,a)}catch(c){return t(new Error("Driver "+i+" threw error: "+c))}!isUndefined(u)&&this.push(u),t()}}}),e}(Transform);module.exports=Driver;


},{"./utils":339,"lodash/lang/isFunction":246,"lodash/lang/isUndefined":250,"readable-stream/transform":277}],329:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},findKey=_interopRequire(require("lodash/object/findKey")),Logger=_interopRequire(require("../logger")),consoleDriver=Logger.createDriver("console",function(e,r){var o=r.level,n=Logger.levelMap,i=findKey(n,function(e){return e===o}),t=i.toLowerCase();return"undefined"!=typeof console&&console[t](e),e});module.exports=consoleDriver;


},{"../logger":338,"lodash/object/findKey":253}],330:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},_createClass=function(){function e(e,r){for(var t in r){var i=r[t];i.configurable=!0,i.value&&(i.writable=!0)}Object.defineProperties(e,r)}return function(r,t,i){return t&&e(r.prototype,t),i&&e(r,i),r}}(),_get=function e(r,t,i){var n=Object.getOwnPropertyDescriptor(r,t);if(void 0===n){var o=Object.getPrototypeOf(r);return null===o?void 0:e(o,t,i)}if("value"in n&&n.writable)return n.value;var a=n.get;return void 0===a?void 0:a.call(i)},_inherits=function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(e.__proto__=r)},_classCallCheck=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")};Object.defineProperty(exports,"__esModule",{value:!0});var Transform=_interopRequire(require("readable-stream/transform")),fs=_interopRequire(require("fs")),path=_interopRequire(require("path")),Logger=_interopRequire(require("../logger")),assign=require("../utils").assign,FileDriver=function(e){function r(e){var t=void 0===arguments[1]?{}:arguments[1];_classCallCheck(this,r),t.objectMode=!0,_get(Object.getPrototypeOf(r.prototype),"constructor",this).call(this,t);var i="file",e=path.resolve(e),n=fs.createWriteStream(e,{encoding:"utf8"});assign(this,{name:i,file:n,path:e})}return _inherits(r,e),_createClass(r,{_transform:{value:function(e,r,t){var i="\n";this.file.write(e+i),this.push(e),t()}}}),r}(Transform),fileDriver=function(e){return new FileDriver(e)};exports.FileDriver=FileDriver,exports["default"]=fileDriver;


},{"../logger":338,"../utils":339,"fs":undefined,"path":undefined,"readable-stream/transform":277}],331:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},Logger=_interopRequire(require("../logger")),defaultPredicate=function(e,r,t){var i=r.level;return i>=t.getLevel()},filterDriver=function(){var e=void 0===arguments[0]?defaultPredicate:arguments[0];return Logger.createDriver("filter",function(r,t,i){return e(r,t,i)?r:void 0})};module.exports=filterDriver;


},{"../logger":338}],332:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},findKey=_interopRequire(require("lodash/object/findKey")),template=_interopRequire(require("lodash/string/template")),colors=_interopRequire(require("colors")),Logger=_interopRequire(require("../logger")),assign=require("../utils").assign,stripColors=colors.stripColors,setTheme=colors.setTheme,themes={trace:"green",debug:"grey",info:"blue",warn:"yellow",error:"red"},defaultFormat=["[${ timestamp.grey }]","${ level.bold.levelColor.bgBlack }","${ logger.underline }","${ message.levelColor }"].join(" "),formatDriver=function(){var e=void 0===arguments[0]?defaultFormat:arguments[0],r=void 0===arguments[1]?!0:arguments[1];return Logger.createDriver("format",function(o,t){var i=t.level,l=t.name,s=t.timestamp,n=Logger.levelMap,a=findKey(n,function(e){return e===i}),u=a.toLowerCase(),m=themes[u],g={timestamp:s+"",level:a,logger:l,message:o.join(" ")},d=void 0;return setTheme(assign({levelColor:m},themes)),d=template(e)(g),r?d:stripColors(d)})};module.exports=formatDriver;


},{"../logger":338,"../utils":339,"colors":191,"lodash/object/findKey":253,"lodash/string/template":260}],333:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e};Object.defineProperty(exports,"__esModule",{value:!0});var _=require("../"),logger=_.logger,Logger=_.Logger,assign=require("../utils").assign,filter=_interopRequire(require("./filter")),format=_interopRequire(require("./format")),console=_interopRequire(require("./console")),restore=_interopRequire(require("./restore")),remote=_interopRequire(require("./remote")),file=_interopRequire(require("./file")),localStorage=_interopRequire(require("./localStorage"));assign(Logger.drivers,{filter:filter,format:format,console:console,restore:restore,remote:remote,file:file,localStorage:localStorage}),exports.logger=logger,exports.Logger=Logger,exports["default"]=logger;


},{"../":337,"../utils":339,"./console":329,"./file":330,"./filter":331,"./format":332,"./localStorage":334,"./remote":335,"./restore":336}],334:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},findKey=_interopRequire(require("lodash/object/findKey")),Logger=_interopRequire(require("../logger")),_utils=require("../utils"),assign=_utils.assign,store=_utils.store,DEFAULT_LOG_KEY="__LOG_DRIVER_KEY__",localStorageDriver=function(){var e=void 0===arguments[0]?DEFAULT_LOG_KEY:arguments[0],r=void 0===arguments[1]?r:arguments[1];return function(){return Logger.createDriver("localstorage",function(t,i){var o=i.level,n=i.name,a=i.timestamp,s=Logger.levelMap,u=findKey(s,function(e){return e===o}),l=u.toLowerCase(),g={timestamp:a,level:l,logger:n,message:t.join(" ")};return r.enabled&&r.set(e,r.get(e)?r.get(e).concat([g]):[g]),t})}()};assign(localStorageDriver,{DEFAULT_LOG_KEY:DEFAULT_LOG_KEY}),module.exports=localStorageDriver;


},{"../logger":338,"../utils":339,"lodash/object/findKey":253}],335:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},PassThrough=_interopRequire(require("readable-stream/passthrough")),request=_interopRequire(require("request")),defaults=_interopRequire(require("lodash/object/defaults")),Logger=_interopRequire(require("../logger")),_utils=require("../utils"),assign=_utils.assign,batch=_utils.batch,remoteDriver=function(){var e=void 0===arguments[0]?{}:arguments[0],r=void 0===arguments[1]?50:arguments[1];e=defaults(e,{method:"post",json:!0});var t=new PassThrough({objectMode:!0}),u=batch(t,r);return u.on("data",function(r){var t=assign({body:r},e);request(t)}),u};module.exports=remoteDriver;


},{"../logger":338,"../utils":339,"lodash/object/defaults":252,"readable-stream/passthrough":276,"request":278}],336:[function(require,module,exports){
"use strict";var _interopRequire=function(r){return r&&r.__esModule?r["default"]:r},Logger=_interopRequire(require("../logger")),restoreDriver=Logger.createDriver("restore",function(r,e){var o=e.rawLog;return o});module.exports=restoreDriver;


},{"../logger":338}],337:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e};Object.defineProperty(exports,"__esModule",{value:!0});var Logger=_interopRequire(require("./logger")),filter=_interopRequire(require("./drivers/filter")),format=_interopRequire(require("./drivers/format")),console=_interopRequire(require("./drivers/console")),restore=_interopRequire(require("./drivers/restore")),logger=new Logger;logger.pipe(filter()).pipe(format()).pipe(console).pipe(restore),exports.logger=logger,exports.Logger=Logger,exports["default"]=logger;


},{"./drivers/console":329,"./drivers/filter":331,"./drivers/format":332,"./drivers/restore":336,"./logger":338}],338:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e},_applyConstructor=function(e,t){var r=Object.create(e.prototype),n=e.apply(r,t);return null==n||"object"!=typeof n&&"function"!=typeof n?r:n},_createClass=function(){function e(e,t){for(var r in t){var n=t[r];n.configurable=!0,n.value&&(n.writable=!0)}Object.defineProperties(e,t)}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_get=function e(t,r,n){var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o&&o.writable)return o.value;var u=o.get;return void 0===u?void 0:u.call(n)},_inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},PassThrough=_interopRequire(require("readable-stream/passthrough")),invert=_interopRequire(require("lodash/object/invert")),mapValues=_interopRequire(require("lodash/object/mapValues")),cloneDeep=_interopRequire(require("lodash/lang/cloneDeep")),Driver=_interopRequire(require("./driver")),_utils=require("./utils"),uuid=_utils.uuid,assign=_utils.assign,isBrowser=_utils.isBrowser,isNode=_utils.isNode,store=_utils.store,CLIENT_LOG_ID="__LOG_DRIVER_CLIENT_ID__",CLIENT_ID_CACHE=void 0,Logger=function(e){function t(){var e=this,r=void 0===arguments[0]?"log":arguments[0],n=void 0===arguments[1]?{}:arguments[1];_classCallCheck(this,t),n.objectMode=!0,_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n);var o=t.levelMap,i=uuid(),u=isBrowser()?store?store.get(CLIENT_LOG_ID)||store.set(CLIENT_LOG_ID,i):CLIENT_ID_CACHE||function(e){return CLIENT_ID_CACHE=e}(i):null;assign(this,{name:r,clientId:u}),this.setLevel(t.TRACE);for(var a in o)!function(t){e[t.toLowerCase()]=function(){for(var r,n=arguments.length,i=Array(n),u=0;n>u;u++)i[u]=arguments[u];return(r=e).log.apply(r,[o[t]].concat(i))}}(a)}return _inherits(t,e),_createClass(t,{logger:{get:function(){return this}},setLevel:{value:function(e){return this._level=e,this}},getLevel:{value:function(){return this._level}},getCurrentEntry:{value:function(){return cloneDeep(this._currentEntry)}},log:{value:function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;t>n;n++)r[n-1]=arguments[n];var o=new Date,i=this,u=i.name,a=i.clientId,s={timestamp:o,name:u,clientId:a,level:e,rawLog:r};return this._currentEntry=s,this.write(r),this}},pipe:{value:function(e){var r=function(e,t){var n=t.pipe;t.on("pipe",function(e){assign(t,{logger:e.logger,getCurrentEntry:e.getCurrentEntry.bind(e)})}),t.pipe=function(e){return r(t,e),n.call(t,e)}};return r(this,e),_get(Object.getPrototypeOf(t.prototype),"pipe",this).call(this,e)}}},{levelMap:{get:function(){var e=invert(["TRACE","DEBUG","INFO","WARN","ERROR","SILENT"]);return mapValues(e,function(e){return+e})}},createDriver:{value:function(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];return _applyConstructor(Driver,t)}}}),t}(PassThrough);assign(Logger,Logger.levelMap),module.exports=Logger;


},{"./driver":328,"./utils":339,"lodash/lang/cloneDeep":242,"lodash/object/invert":254,"lodash/object/mapValues":257,"readable-stream/passthrough":276}],339:[function(require,module,exports){
"use strict";var _interopRequire=function(e){return e&&e.__esModule?e["default"]:e};Object.defineProperty(exports,"__esModule",{value:!0});var PassThrough=_interopRequire(require("readable-stream/passthrough")),assign=Object.assign,isNode=function(){return!("undefined"==typeof module||!module.exports)},isBrowser=function(){return!(isNode()||"undefined"==typeof window)},localStorage="undefined"!=typeof window&&window.localStorage,store=localStorage&&{enabled:!!localStorage,get:function(e){return JSON.parse(localStorage.getItem(e))},set:function(e,t){return localStorage.setItem(e,JSON.stringify(t))||t}},uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,r="x"===e?t:3&t|8;return r.toString(16)})},batch=function(e,t){var r=new PassThrough({objectMode:!0}),o=[];return e.on("data",function(e){o.push(e),o.length%t||(r.write(o),o=[])}),r};exports.isNode=isNode,exports.isBrowser=isBrowser,exports.localStorage=localStorage,exports.store=store,exports.uuid=uuid,exports.batch=batch,exports.assign=assign;


},{"readable-stream/passthrough":276}]},{},[333])


//# sourceMappingURL=logdriver.drivers.js.map