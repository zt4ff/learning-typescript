# Object Pooling
JavaScript memory is managed by a system known as garbage collection. Unlike some programming languages where you have to manage your memory resources yourself, JavaScript Garbage Collector (GC) does that. 
The GC constantly cleaning any memory allocation that is not in use or has no reference to itself. The GC does this at is's time and it trying to do, it takes it's own time too.

In a case where you have a large number of objects been temporarily created and deleted, your GC would have to keep up with deleting and you can therefore have a less-performant application

This is mostly common in Game Development or particles animation on the web

The code in `index.js` is my attempt create a code block on my understanding on object pool and improving the reusable code block overtime