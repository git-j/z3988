# z3988
OpenURL Context Object Convention to Embed Bibliographic Metadata in HTML

COinS (ContextObjects in Spans) is a simple, ad hoc community specification for publishing OpenURL references in HTML.

Read More: http://ocoins.info/

## extract COinS information

COinS uses the class attribute of spans to identify context objects and embeds information about the context object into the title attribute. The context data is urlencoded key value pairs that describe the context object.

## content of a context object

a real specification about which attributes are supported for specific context objects is missing. The original documentation describes Books (http://ocoins.info/cobgbook.html) and JournalArticles (http://ocoins.info/cobg.html). 

# use of Z3988 library

The implementation of a Z3988 library is quiet simple but involves some error and plausibility checking. The extracted information may be used for multiple purposes.

## extracting context objects

The information of context objects may be read by the library and is processed into javascript objects

### extract all context objects of a document

extracts all context objects from spans with the Z3988 class and returns the objects in an array. When no context objects are found, the length of the array is 0

```
   var z3988 = new Z3988();
   var contextObjectArray = z3988.parseDocument(document);
   /**
    * contextObjectArray = [
    *   {
    *   // first context object
    *   },
    *   {
    *   // second context object
    *   }
    * ];
    */
```

### extract single context object of a element

extracts the context object from the title attribute of the given dom-node and returns the object. when no context object is found the function throws an exception

```
   var links = document.evaluate("//span[contains(@class,'Z3988')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var z3988 = new Z3988();
   var contextObject = z3988.parseElement(links[0]);
   /**
    * contextObject = {
    *   // first context object
    * };
    */
```

### extract single context object of a string

extracts the context object from a string and returns the object. when the string does not contain a context object the function throws an exception


```
   var z3988 = new Z3988();
   var contextObjectString = 'ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.issn=1045-4438';
   var contextObject = z3988.parseString(contextObjectString);
   /**
    * contextObject = {
    *   // context object
    * };
    */
```

## structure of a context object

a context object has a few definitions on which attributes should be available in the object. each context object has at least the context_version, the value_format set. any keys that contain a dot will result in an appropriate object hierarchy:

```
  var contextObject = {
    'ctx_ver': 'Z39.88-2004',
    'rft_val_fmt': 'info:ofi/fmt:kev:mtx:journal'
    'rft': {
      'issn': '1045-4438'
    }
  };
```

## creating context objects

to create context objects for embedding them into spans the object has to be encoded so other readers are able to read the information.

```
  var contextObject = {
    'ctx_ver': 'Z39.88-2004',
    'rft_val_fmt': 'info:ofi/fmt:kev:mtx:journal'
    'rft': {
      'issn': '1045-4438'
    }
  };
  var z3988 = new Z3988();
  var contextObjectString = z3988.encode(contextObject);
  // to attach the context object to a existing dom element
  var domElement = document.createElement('span');
  z3988.attach(contextObject,domElement);
  // the dom element is now <span class="Z3988" title="ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Ajournal&amp;rft.issn=1045-4438"></span>
```

# contribute

please use the issues and pull request features of github.

# license

MIT
