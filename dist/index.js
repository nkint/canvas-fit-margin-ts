(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = getSize

function getSize(element) {
  // Handle cases where the element is not already
  // attached to the DOM by briefly appending it
  // to document.body, and removing it again later.
  if (element === window || element === document.body) {
    return [window.innerWidth, window.innerHeight]
  }

  if (!element.parentNode) {
    var temporary = true
    document.body.appendChild(element)
  }

  var bounds = element.getBoundingClientRect()
  var styles = getComputedStyle(element)
  var height = (bounds.height|0)
    + parse(styles.getPropertyValue('margin-top'))
    + parse(styles.getPropertyValue('margin-bottom'))
  var width  = (bounds.width|0)
    + parse(styles.getPropertyValue('margin-left'))
    + parse(styles.getPropertyValue('margin-right'))

  if (temporary) {
    document.body.removeChild(element)
  }

  return [width, height]
}

function parse(prop) {
  return parseFloat(prop) || 0
}

},{}],2:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var getSize = require("element-size");
var defaultOptions = {
    parent: null,
    margin: 0,
    scale: 1
};
function fit(canvas, options) {
    // TODO: object assign could be optimized
    var opts = __assign({}, defaultOptions, options);
    var margin = opts.margin, scale = opts.scale, parent = opts.parent;
    canvas.style.position = canvas.style.position || 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.margin = margin + "px";
    function resize() {
        var isSVG = canvas.nodeName.toUpperCase() === 'SVG';
        var p = parent || canvas.parentNode;
        var width, height;
        if (p && p !== document.body) {
            var psize = getSize(p);
            width = psize[0] | 0;
            height = psize[1] | 0;
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        width -= margin * 2;
        height -= margin * 2;
        if (isSVG) {
            canvas.setAttribute('width', width * scale + 'px');
            canvas.setAttribute('height', height * scale + 'px');
        }
        else {
            canvas.width = width * scale;
            canvas.height = height * scale;
        }
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        return resize;
    }
    return resize();
}
exports.fit = fit;

},{"element-size":1}]},{},[2]);
