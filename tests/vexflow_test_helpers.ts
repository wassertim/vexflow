/**
 * VexFlow Test Support Library
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

/* eslint max-classes-per-file: "off" */
import { IStaveOptions } from '../src/types/stave';

import Vex, { Factory, Renderer } from '../src/index';
import { QUnit } from './qunit';

declare function $(...args);

declare let global;

// Mock out the QUnit stuff for generating svg images,
// since we don't really care about the assertions.

if (!global.QUnit) {
  global.QUnit = QUnit;
  QUnit.assertions = {
    ok: () => true,
    equal: () => true,
    deepEqual: () => true,
    expect: () => true,
    throws: () => true,
    notOk: () => true,
    notEqual: () => true,
    notDeepEqual: () => true,
    strictEqual: () => true,
    notStrictEqual: () => true,
  };

  QUnit.module = (name) => {
    QUnit.current_module = name;
  };

  QUnit.test = (name, func) => {
    QUnit.current_test = name;
    global.process.stdout.write(' \u001B[0G' + QUnit.current_module + ' :: ' + name + '\u001B[0K');
    func(QUnit.assertions);
  };
  global.test = QUnit.test;
  global.ok = QUnit.assertions.ok;
  global.equal = QUnit.assertions.equal;
  global.deepEqual = QUnit.assertions.deepEqual;
  global.expect = QUnit.assertions.expect;
  global.throws = QUnit.assertions.throws;
  global.notOk = QUnit.assertions.notOk;
  global.notEqual = QUnit.assertions.notEqual;
  global.notDeepEqual = QUnit.assertions.notDeepEqual;
  global.strictEqual = QUnit.assertions.strictEqual;
  global.notStrictEqual = QUnit.assertions.notStrictEqual;
}

const VF: any = Vex.Flow;

const Test = {
  ID: 0,
  testRootSelector: '#vexflow_testoutput',
  // Test Options.
  RUN_CANVAS_TESTS: true,
  RUN_SVG_TESTS: true,
  RUN_RAPHAEL_TESTS: false,
  RUN_NODE_TESTS: false,

  // Where images are stored for NodeJS tests.
  NODE_IMAGEDIR: 'images',

  // Default font properties for tests.
  Font: { size: 10 },
  fs: {} as any,

  // Returns a unique ID for a test.
  genID: function(prefix) {
    return prefix + Test.ID++;
  },

  genTitle: function(type, assert, name) {
    return assert.test.module.name + ' (' + type + '): ' + name;
  },

  // Run `func` inside a QUnit test for each of the enabled
  // rendering backends.
  runTests: function(name, func, params?) {
    if (Test.RUN_CANVAS_TESTS) {
      Test.runCanvasTest(name, func, params);
    }
    if (Test.RUN_SVG_TESTS) {
      Test.runSVGTest(name, func, params);
    }
    if (Test.RUN_RAPHAEL_TESTS) {
      Test.runRaphaelTest(name, func, params);
    }
    if (Test.RUN_NODE_TESTS) {
      Test.runNodeTest(name, func, params);
    }
  },

  // Run `func` inside a QUnit test for each of the enabled
  // rendering backends. These are for interactivity tests, and
  // currently only work with the SVG backend.
  runUITests: function(name, func, params) {
    if (Test.RUN_SVG_TESTS) {
      Test.runSVGTest(name, func, params);
    }
  },

  createTestCanvas: function(testId, testName) {
    const testContainer = $('<div></div>').addClass('testcanvas');

    testContainer.append(
      $('<div></div>')
        .addClass('name')
        .text(testName)
    );

    testContainer.append(
      $('<canvas></canvas>')
        .addClass('vex-tabdiv')
        .attr('id', testId)
        .addClass('name')
        .text(name)
    );

    $(Test.testRootSelector).append(testContainer);
  },

  createTestSVG: function(testId, testName) {
    const testContainer = $('<div></div>').addClass('testcanvas');

    testContainer.append(
      $('<div></div>')
        .addClass('name')
        .text(testName)
    );

    testContainer.append(
      $('<div></div>')
        .addClass('vex-tabdiv')
        .attr('id', testId)
    );

    $(Test.testRootSelector).append(testContainer);
  },

  resizeCanvas: function(elementId, width, height) {
    $('#' + elementId).width(width);
    $('#' + elementId).attr('width', width);
    $('#' + elementId).attr('height', height);
  },

  makeFactory: function(options, width?: number, height?: number) {
    return new Factory({
      renderer: {
        elementId: options.elementId,
        backend: options.backend,
        width: width || 450,
        height: height || 140,
      },
    } as IStaveOptions);
  },

  runCanvasTest: function(name, func, params) {
    QUnit.test(name, function(assert) {
      const elementId = Test.genID('canvas_');
      const title = Test.genTitle('Canvas', assert, name);

      Test.createTestCanvas(elementId, title);

      const testOptions = {
        backend: Renderer.Backends.CANVAS,
        elementId: elementId,
        params: params,
        assert: assert,
      };

      func(testOptions, Renderer.getCanvasContext);
    });
  },

  runRaphaelTest: function(name, func, params) {
    QUnit.test(name, function(assert) {
      const elementId = Test.genID('raphael_');
      const title = Test.genTitle('Raphael', assert, name);

      Test.createTestSVG(elementId, title);

      const testOptions = {
        elementId: elementId,
        backend: VF.Renderer.Backends.RAPHAEL,
        params: params,
        assert: assert,
      };

      func(testOptions, VF.Renderer.getRaphaelContext);
    });
  },

  runSVGTest: function(name, func, params?) {
    if (!Test.RUN_SVG_TESTS) return;

    const fontStacks = {
      Bravura: [VF.Fonts.Bravura, VF.Fonts.Gonville, VF.Fonts.Custom],
      Gonville: [VF.Fonts.Gonville, VF.Fonts.Bravura, VF.Fonts.Custom],
      Petaluma: [VF.Fonts.Petaluma, VF.Fonts.Gonville, VF.Fonts.Custom],
    };

    const testFunc = (fontName) => (assert) => {
      const defaultFontStack = VF.DEFAULT_FONT_STACK;
      VF.DEFAULT_FONT_STACK = fontStacks[fontName];
      const elementId = Test.genID('svg_' + fontName);
      const title = Test.genTitle('SVG ' + fontName, assert, name);

      Test.createTestSVG(elementId, title);

      const testOptions = {
        elementId: elementId,
        backend: VF.Renderer.Backends.SVG,
        params: params,
        assert: assert,
      };

      func(testOptions, VF.Renderer.getSVGContext);
      VF.DEFAULT_FONT_STACK = defaultFontStack;
    };

    QUnit.test(name, testFunc('Bravura'));
    QUnit.test(name, testFunc('Gonville'));
    QUnit.test(name, testFunc('Petaluma'));
  },

  runNodeTest: function(name, func, params) {
    // Allows `name` to be used inside file names.
    function sanitizeName(name) {
      return name.replace(/[^a-zA-Z0-9]/g, '_');
    }

    QUnit.test(name, function(assert) {
      const elementId = Test.genID('nodecanvas_');
      const canvas = document.createElement('canvas');
      canvas.setAttribute('id', elementId);
      document.body.appendChild(canvas);

      const testOptions = {
        elementId: elementId,
        backend: VF.Renderer.Backends.CANVAS,
        params: params,
        assert: assert,
      };

      func(testOptions, VF.Renderer.getCanvasContext);

      if (VF.Renderer.lastContext !== null) {
        const moduleName = sanitizeName(QUnit.current_module);
        const testName = sanitizeName(QUnit.current_test);
        const fileName = `${Test.NODE_IMAGEDIR}/${moduleName}.${testName}.png`;

        const imageData = canvas.toDataURL().split(';base64,').pop();
        const image = Buffer.from(imageData, 'base64');

        Test.fs.writeFileSync(fileName, image, { encoding: 'base64' });
      }
    });
  },

  plotNoteWidth: VF.Note.plotMetrics,
  plotLegendForNoteWidth: function(ctx, x, y) {
    ctx.save();
    ctx.setFont('Arial', 8, '');

    const spacing = 12;
    let lastY = y;

    function legend(color, text) {
      ctx.beginPath();
      ctx.setStrokeStyle(color);
      ctx.setFillStyle(color);
      ctx.setLineWidth(10);
      ctx.moveTo(x, lastY - 4);
      ctx.lineTo(x + 10, lastY - 4);
      ctx.stroke();

      ctx.setFillStyle('black');
      ctx.fillText(text, x + 15, lastY);
      lastY += spacing;
    }

    legend('green', 'Note + Flag');
    legend('red', 'Modifiers');
    legend('#999', 'Displaced Head');
    legend('#DDD', 'Formatter Shift');

    ctx.restore();
  }
};

export default Test;
