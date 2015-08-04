/*** generated file from workspaces/osi/tools/generator/source.ecmascript.oscript + workspaces/desktop/desktop.dictionary  **/
/*** Copyright: Refeus (2013) **/
/*** WARNING: do not change the structure of this file.  **/
/*** WARNING: Update the generator instead and regen all javascript files  **/

/** \brief no title
    no description
  */
function Z3988(){
  // Members
    //INIT
    var self = this;
    //CODE
    
}

/** \brief Encode Instance
    _private function to recursively encode object trees
  */
Z3988.prototype._encodeInstance = function (   /*STRING*/ prefix , /*JSObject*/ context_object){
  //INIT
  var self = this;
  //START
  var encoded_context_object = '';
  //CODE
  if ( typeof context_object !== 'object'
    || typeof prefix !== 'string'
    ){
    throw {message: 'invalid argument'};
  }
  Object.keys(context_object).forEach(function(context_object_key){
    var context_object_value = context_object[context_object_key];
    if ( typeof context_object_value === 'undefined' ){
      return; // continue
    }
    if ( context_object_value === null ){
      return; // continue
    }
    if ( encoded_context_object !== '' ){
      encoded_context_object+= '&';
    }
    if ( typeof context_object_value === 'object' ){
      encoded_context_object+= self._encodeInstance(prefix + '.' + context_object_key,context_object_value);
    } else {
      encoded_context_object+= context_object_key;
      encoded_context_object+= '=';
      encoded_context_object+= encodeURIComponent(context_object_value);
    }
  });
  //TERM
  return encoded_context_object;
};

/** \brief no title
    no description
  */
Z3988.prototype.attach = function (){
  //INIT
  var self = this;
  //CODE
  
};

/** \brief Encode Context Object
    to create context objects for embedding them into spans the object has to be encoded so other readers are able to read the information.
  */
Z3988.prototype.encode = function (   /*JSObject*/ context_object){
  //INIT
  var self = this;
  //START
  var encoded_context_object = 'ctx_ver=Z39.88-2004';
  //CODE
  if ( typeof context_object !== 'object' ){
    throw {message: 'invalid argument'};
  }
  if ( typeof context_object.ctx_ver === 'undefined' ){
    context_object.ctx_ver = 'Z39.88-2004';
  }
  if ( typeof context_object.rft_val_fmt === 'undefined' ){
    context_object.rft_val_fmt = 'info:ofi/fmt:kev:mtx:ctx';
  }
  Object.keys(context_object).forEach(function(context_object_key){
    var context_object_value = context_object[context_object_key];
    if ( typeof context_object_value === 'undefined' ){
      return; // continue
    }
    if ( context_object_value === null ){
      return; // continue
    }
    encoded_context_object+= '&amp;';
    if ( typeof context_object_value === 'object' ){
      encoded_context_object+= self._encodeInstance(context_object_key,context_object_value);
    } else {
      encoded_context_object+= context_object_key;
      encoded_context_object+= '=';
      encoded_context_object+= encodeURIComponent(context_object_value);
    }
  });
  //TERM
  return encoded_context_object;
};

/** \brief Parse Document
    extracts all context objects from spans with the Z3988 class and returns the objects in an array. When no context objects are found, the length of the array is 0
  */
Z3988.prototype.parseDocument = function (   /*DOMObject*/ dom_object){
  //INIT
  var self = this;
  //START
  var spans = dom_object.evaluate("//span[contains(@class,'Z3988')]", dom_object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var context_object_array = [];
  //CODE
  spans.forEach(function(span){
    var context_object = self.parseElement(span);
    context_object_array.push(context_object);
  });
  //TERM
  return context_object_array;
};

/** \brief Parse Element
    extracts the context object from the title attribute of the given dom-node and returns the object. when no context object is found the function throws an exception
  */
Z3988.prototype.parseElement = function (   /*DOMNode*/ dom_node){
  //INIT
  var self = this;
  //START
  var context_object = {};
  var class_names = '';
  var title = '';
  //CODE
  if ( dom_node.nodeType !== 1 ){
    throw {message: 'dom_node is not of ELEMENT type'};
  }
  if ( !dom_node.hasAttributes() ){
    throw {message: 'dom_node has no attributes, class and title required'};
  }
  dom_node.attributes.forEach(function(dom_node_attribute){
    if ( dom_node_attribute.name === 'class' ){
      class_names = dom_node_attribute.value;
    } else  if ( dom_node_attribute.name === 'title' ){
      title = dom_node_attribute.value;
    }
  });
  if ( class_names.indexOf('Z3988') < 0
    || title === ''
    ){
    throw {message: 'dom_node has no attributes, class with Z3988 and title required'};
  }
  //TERM
  return self.parseString(title);
};

/** \brief Parse String
    extracts the context object from a string and returns the object. when the string does not contain a context object the function throws an exception
  */
Z3988.prototype.parseString = function (   /*STRING*/ data){
  //INIT
  var self = this;
  //START
  var context_object = {};
  //CODE
  if ( typeof data !== 'string' ){
    throw {message: 'invalid argument'};
  }
  if ( data.indexOf('ctx_ver=Z39.88') < 0 ){
    throw {message: 'data is not a valid Z3988 string'};
  }
  var components = data.split('&amp;');
  components.forEach(function(component){
    var kev = compontent.split('=');
    var key = kev.splice(0,1);
    var value = kev.join('=');
    value = decodeURIComponent(value);
    if ( key.indexOf('.') > 0 ){
      var key_components = key.split('.');
      var key_pointer = context_object;
      var key_part = '';
      while ( key_components.length ){
        key_part = key_components.shift();
        if ( typeof key_pointer[key_part] !== 'object' ){
          key_pointer[key_part] = {};
        }
        key_pointer = key_pointer[key_part];
      }
      if ( key_part !== '' ){
        key_pointer[key_part] = value;
      }
    } else {
      context_object[key] = value;
    }
  });
  //TERM
  return context_object;
};