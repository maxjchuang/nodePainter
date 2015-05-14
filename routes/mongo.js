var mongo = require('mongodb').MongoClient,
    util = require('util'),
    config = require('./config.js');

var url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db;

exports.ObjectID = require('mongodb').ObjectID;

exports.find = function(collection, query, fields, callback) {
  mongo.connect(url, function(err, db) {
    // console.log('find:' + util.inspect(query));
    db.collection(collection).find(query, fields).toArray(function(err, docs) {
      // console.log('result:' + util.inspect(docs));
      db.close();
      callback(docs);
    });
  });
};


exports.insert = function(collection, doc, callback) {
  mongo.connect(url, function(err, db) {
    // console.log('insert:' + util.inspect(doc));
    db.collection(collection).insert(doc, function(err, docs) {
      // console.log('insert successed.');
      db.close();
      callback(docs);
    }); 
  });
};

exports.insertArray = function(collection, array, callback) {
  mongo.connect(url, function(err, db) {
    for(var i=0, len=array.length; i<len; i++) {
      callback(array[i]);
      db.collection(collection).insert(array[i], function(err, doc) {
      });
    }
    db.close();
  });
};

exports.update = function(collection, query, doc, callback) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).update(query, doc, {upsert: true, w: 1}, function(err, docs) {
      db.close();
      callback(docs);
    }); 
  });
};

exports.remove = function(collection, query, callback) {
  mongo.connect(url, function(err, db) {
    db.collection(collection).remove(query, function(err, docs) {
      db.close();
      callback(docs);
    }); 
  });
};

exports.drop = function(collection, callback) {
  mongo.connect(url, function(err, db) {
    console.log('drop data...');
    db.collection(collection).drop(function(err) {
      console.log('data droped.');
      db.close();
      callback();
    }); 
  });
};
