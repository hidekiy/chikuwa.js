(function () {
	'use strict';

	module('tag creation');

	test('tag(div#hoge)', function () {
		var div = $.tag('div#hoge');
		strictEqual(div.get(0).tagName, 'DIV', 'tag name is ok');
		strictEqual(div.get(0).id, 'hoge', 'id is ok');
	});

	test('tag(div.hoge)', function () {
		var div = $.tag('div.hoge');
		strictEqual(div.get(0).tagName, 'DIV', 'tag name is ok');
		strictEqual(div.get(0).className, 'hoge', 'className is ok');
	});

	test('tag(div.foo.bar)', function () {
		var div = $.tag('div.foo.bar');
		strictEqual(div.get(0).tagName, 'DIV', 'tag name is ok');
		strictEqual(div.get(0).className, 'foo bar', 'className is ok');
	});

	test("tag(div.foo#bar)", function () {
		var div = $.tag('div.foo#bar');
		strictEqual(div.get(0).tagName, 'DIV', 'tag name is ok');
		strictEqual(div.get(0).id, 'bar', 'id is ok');
		strictEqual(div.get(0).className, 'foo', 'className is ok');
	});

	test('tag(div#bar.foo)', function () {
		var div = $.tag('div#bar.foo');
		strictEqual(div.get(0).tagName, 'DIV', 'tag name is ok');
		strictEqual(div.get(0).id, 'bar', 'id is ok');
		strictEqual(div.get(0).className, 'foo', 'className is ok');
	});

	['click', 'touchstart', 'touchend', 'touchmove', 'over', 'out', 'tap', 'tapout'].forEach(function (name) {
		module('event: ' + name);

		test('simple fn', function () {
			var div = $.tag('div');

			expect(2);
			div[name].call(div, function (e) {
				ok(true, 'event fired');
				strictEqual(e.type, name, 'type is ok');
			});
			div[name].call(div);
		});

		test('simple with on/trigger', function () {
			var div = $.tag('div');

			expect(2);
			div[name].call(div, function (e) {
				ok(true, 'event fired');
				strictEqual(e.type, name, 'type is ok');
			});
			div.trigger(name);
		});

		test('multiple handler with fn', function () {
			var div = $.tag('div');
			var counter = 0;

			expect(2);
			div[name].call(div, function () {
				strictEqual(++counter, 1, 'order=first ok');
			});
			div[name].call(div, function () {
				strictEqual(++counter, 2, 'order=second ok');
			});
			div[name].call(div);
		});

		test('multiple handler with on/trigger', function () {
			var div = $.tag('div');
			var counter = 0;

			expect(2);
			div.on(name, function () {
				strictEqual(++counter, 1, 'order=first ok');
			}).on(name, function () {
				strictEqual(++counter, 2, 'order=second ok');
			}).trigger(name);
		});
	});


	module('over and out');

	test('over invoked by touchstart', function () {
		var div = $.tag('div');
		var counter = 0;
		var os_touch = 	$.os.touch;

		$.os.touch = true;
		expect(2);
		div.over(function () {
			strictEqual(++counter, 1, 'order=first ok');
		});
		div.over(function () {
			strictEqual(++counter, 2, 'order=second ok');
		});
		div.trigger('touchstart');
		$.os.touch = os_touch;
	});

	test('multiple out', function () {
		var div = $.tag('div');

		expect(3);
		div.over(function () {
			ok(true, 'event fired');
		});
		div.trigger('over');

		var counter = 0;
		div.out(function () {
			strictEqual(++counter, 1, 'order=first ok');
		});
		div.out(function () {
			strictEqual(++counter, 2, 'order=second ok');
		});
		div.trigger('out');
	});

}());
