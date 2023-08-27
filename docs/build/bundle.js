
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    /**
     * List of attributes that should always be set through the attr method,
     * because updating them through the property setter doesn't work reliably.
     * In the example of `width`/`height`, the problem is that the setter only
     * accepts numeric values, but the attribute can also be set to a string like `50%`.
     * If this list becomes too big, rethink this approach.
     */
    const always_set_through_set_attribute = ['width', 'height'];
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_custom_element_data_map(node, data_map) {
        Object.keys(data_map).forEach((key) => {
            set_custom_element_data(node, key, data_map[key]);
        });
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function set_dynamic_element_data(tag) {
        return (/-/.test(tag)) ? set_custom_element_data_map : set_attributes;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

    /** regex of all html void element names */
    const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    function is_void(name) {
        return void_element_names.test(name) || name.toLowerCase() === '!doctype';
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function validate_dynamic_element(tag) {
        const is_string = typeof tag === 'string';
        if (tag && !is_string) {
            throw new Error('<svelte:element> expects "this" attribute to be a string.');
        }
    }
    function validate_void_dynamic_element(tag) {
        if (tag && is_void(tag)) {
            console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    // Function for forwarding DOM events to the component's declaration
    // Adapted from rgossiaux/svelte-headlessui which is modified from hperrin/svelte-material-ui
    function createEventForwarder(component, exclude = []) {
        // This is our pseudo $on function. It is defined on component mount.
        let $on;
        // This is a list of events bound before mount.
        let events = [];
        // Monkeypatch SvelteComponent.$on with our own forward-compatible version
        component.$on = (eventType, callback) => {
            let destructor = () => { };
            if (exclude.includes(eventType)) {
                // Bail out of the event forwarding and run the normal Svelte $on() code
                const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            if ($on) {
                destructor = $on(eventType, callback); // The event was bound programmatically.
            }
            else {
                events.push([eventType, callback]); // The event was bound before mount by Svelte.
            }
            return () => destructor();
        };
        return (node) => {
            const destructors = [];
            const forwardDestructors = {};
            const forward = (e) => bubble(component, e);
            // This function is responsible for listening and forwarding
            // all bound events.
            $on = (eventType, callback) => {
                let handler = callback;
                // DOM addEventListener options argument.
                let options = false;
                // Listen for the event directly, with the given options.
                const off = listen(node, eventType, handler, options);
                const destructor = () => {
                    off();
                    const idx = destructors.indexOf(destructor);
                    if (idx > -1) {
                        destructors.splice(idx, 1);
                    }
                };
                destructors.push(destructor);
                // Forward the event from Svelte.
                if (!(eventType in forwardDestructors)) {
                    forwardDestructors[eventType] = listen(node, eventType, forward);
                }
                return destructor;
            };
            // Listen to all the events added before mount.
            for (const event of events) {
                $on(event[0], event[1]);
            }
            return {
                destroy: () => {
                    // Remove all event listeners.
                    for (const destructor of destructors) {
                        destructor();
                    }
                    // Remove all event forwarders.
                    for (let entry of Object.entries(forwardDestructors)) {
                        entry[1]();
                    }
                }
            };
        };
    }

    /* node_modules\fluent-svelte\Button\Button.svelte generated by Svelte v3.59.2 */
    const file$1 = "node_modules\\fluent-svelte\\Button\\Button.svelte";

    // (26:0) <svelte:element  this={href && !disabled ? "a" : "button"}  use:forwardEvents  bind:this={element}  role={href && !disabled ? "button" : undefined}  href={href && !disabled ? href : undefined}  class="button style-{variant} {className}"  class:disabled  {...$$restProps} >
    function create_dynamic_element(ctx) {
    	let svelte_element;
    	let svelte_element_role_value;
    	let svelte_element_href_value;
    	let svelte_element_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	let svelte_element_levels = [
    		{
    			role: svelte_element_role_value = /*href*/ ctx[2] && !/*disabled*/ ctx[3]
    			? "button"
    			: undefined
    		},
    		{
    			href: svelte_element_href_value = /*href*/ ctx[2] && !/*disabled*/ ctx[3]
    			? /*href*/ ctx[2]
    			: undefined
    		},
    		{
    			class: svelte_element_class_value = "button style-" + /*variant*/ ctx[1] + " " + /*className*/ ctx[4]
    		},
    		/*$$restProps*/ ctx[6]
    	];

    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button");
    			if (default_slot) default_slot.c();
    			set_dynamic_element_data(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button")(svelte_element, svelte_element_data);
    			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[3]);
    			toggle_class(svelte_element, "svelte-1ulhukx", true);
    			add_location(svelte_element, file$1, 25, 0, 1065);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);

    			if (default_slot) {
    				default_slot.m(svelte_element, null);
    			}

    			/*svelte_element_binding*/ ctx[9](svelte_element);
    			current = true;

    			if (!mounted) {
    				dispose = action_destroyer(/*forwardEvents*/ ctx[5].call(null, svelte_element));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
    						null
    					);
    				}
    			}

    			set_dynamic_element_data(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button")(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
    				(!current || dirty & /*href, disabled*/ 12 && svelte_element_role_value !== (svelte_element_role_value = /*href*/ ctx[2] && !/*disabled*/ ctx[3]
    				? "button"
    				: undefined)) && { role: svelte_element_role_value },
    				(!current || dirty & /*href, disabled*/ 12 && svelte_element_href_value !== (svelte_element_href_value = /*href*/ ctx[2] && !/*disabled*/ ctx[3]
    				? /*href*/ ctx[2]
    				: undefined)) && { href: svelte_element_href_value },
    				(!current || dirty & /*variant, className*/ 18 && svelte_element_class_value !== (svelte_element_class_value = "button style-" + /*variant*/ ctx[1] + " " + /*className*/ ctx[4])) && { class: svelte_element_class_value },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));

    			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[3]);
    			toggle_class(svelte_element, "svelte-1ulhukx", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			if (default_slot) default_slot.d(detaching);
    			/*svelte_element_binding*/ ctx[9](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element.name,
    		type: "child_dynamic_element",
    		source: "(26:0) <svelte:element  this={href && !disabled ? \\\"a\\\" : \\\"button\\\"}  use:forwardEvents  bind:this={element}  role={href && !disabled ? \\\"button\\\" : undefined}  href={href && !disabled ? href : undefined}  class=\\\"button style-{variant} {className}\\\"  class:disabled  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let previous_tag = /*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button";
    	let svelte_element_anchor;
    	let current;
    	validate_dynamic_element(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button");
    	validate_void_dynamic_element(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button");
    	let svelte_element = (/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button") && create_dynamic_element(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    			svelte_element_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			insert_dev(target, svelte_element_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button") {
    				if (!previous_tag) {
    					svelte_element = create_dynamic_element(ctx);
    					previous_tag = /*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button";
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else if (safe_not_equal(previous_tag, /*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button")) {
    					svelte_element.d(1);
    					validate_dynamic_element(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button");
    					validate_void_dynamic_element(/*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button");
    					svelte_element = create_dynamic_element(ctx);
    					previous_tag = /*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button";
    					svelte_element.c();
    					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
    				} else {
    					svelte_element.p(ctx, dirty);
    				}
    			} else if (previous_tag) {
    				svelte_element.d(1);
    				svelte_element = null;
    				previous_tag = /*href*/ ctx[2] && !/*disabled*/ ctx[3] ? "a" : "button";
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelte_element);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelte_element);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element_anchor);
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const omit_props_names = ["variant","href","disabled","class","element"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { variant = "standard" } = $$props;
    	let { href = "" } = $$props;
    	let { disabled = false } = $$props;
    	let { class: className = "" } = $$props;
    	let { element = null } = $$props;
    	const forwardEvents = createEventForwarder(get_current_component());

    	function svelte_element_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('variant' in $$new_props) $$invalidate(1, variant = $$new_props.variant);
    		if ('href' in $$new_props) $$invalidate(2, href = $$new_props.href);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('class' in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		createEventForwarder,
    		variant,
    		href,
    		disabled,
    		className,
    		element,
    		forwardEvents
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('variant' in $$props) $$invalidate(1, variant = $$new_props.variant);
    		if ('href' in $$props) $$invalidate(2, href = $$new_props.href);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('className' in $$props) $$invalidate(4, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		element,
    		variant,
    		href,
    		disabled,
    		className,
    		forwardEvents,
    		$$restProps,
    		$$scope,
    		slots,
    		svelte_element_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			variant: 1,
    			href: 2,
    			disabled: 3,
    			class: 4,
    			element: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get variant() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    // (23:3) <Button variant="accent" class="navbar-selection" href="ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini">
    function create_default_slot_2(ctx) {
    	let svg;
    	let path;
    	let t;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t = text("\t\t\t\t\n\t\t\t\tGet in Microsoft Store");
    			attr_dev(path, "d", "M8 3.75V6H2.75a.75.75 0 0 0-.75.75v11.5A2.75 2.75 0 0 0 4.75 21h14.5A2.75 2.75 0 0 0 22 18.25V6.75a.75.75 0 0 0-.75-.75H16V3.75A1.75 1.75 0 0 0 14.25 2h-4.5A1.75 1.75 0 0 0 8 3.75Zm1.75-.25h4.5a.25.25 0 0 1 .25.25V6h-5V3.75a.25.25 0 0 1 .25-.25ZM8 13V9.5h3.5V13H8Zm0 4.5V14h3.5v3.5H8Zm8-4.5h-3.5V9.5H16V13Zm-3.5 4.5V14H16v3.5h-3.5Z");
    			add_location(path, file, 23, 78, 1874);
    			attr_dev(svg, "class", "icon  svelte-yli5t9");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file, 23, 4, 1800);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(23:3) <Button variant=\\\"accent\\\" class=\\\"navbar-selection\\\" href=\\\"ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:5) <Button href="ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini" style="width:125px;" variant="accent">
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Download");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(39:5) <Button href=\\\"ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini\\\" style=\\\"width:125px;\\\" variant=\\\"accent\\\">",
    		ctx
    	});

    	return block;
    }

    // (40:5) <Button href="https://github.com/Xcube-Studio/Natsurainko.FluentLauncher" style="width:125px;">
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Source");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(40:5) <Button href=\\\"https://github.com/Xcube-Studio/Natsurainko.FluentLauncher\\\" style=\\\"width:125px;\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let header;
    	let div0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let span0;
    	let t2;
    	let span1;
    	let t4;
    	let nav;
    	let a1;
    	let svg0;
    	let path0;
    	let t5;
    	let t6;
    	let a2;
    	let svg1;
    	let path1;
    	let t7;
    	let t8;
    	let button0;
    	let t9;
    	let main;
    	let section;
    	let div3;
    	let div2;
    	let h2;
    	let t11;
    	let p0;
    	let t13;
    	let div1;
    	let button1;
    	let t14;
    	let button2;
    	let t15;
    	let div4;
    	let img1;
    	let img1_src_value;
    	let t16;
    	let footer;
    	let div8;
    	let div5;
    	let a3;
    	let img2;
    	let img2_src_value;
    	let t17;
    	let span2;
    	let t19;
    	let p1;
    	let t21;
    	let div6;
    	let p2;
    	let t23;
    	let a4;
    	let t25;
    	let a5;
    	let t27;
    	let div7;
    	let p3;
    	let t29;
    	let a6;
    	let t31;
    	let a7;
    	let current;

    	button0 = new Button({
    			props: {
    				variant: "accent",
    				class: "navbar-selection",
    				href: "ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				href: "ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini",
    				style: "width:125px;",
    				variant: "accent",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				href: "https://github.com/Xcube-Studio/Natsurainko.FluentLauncher",
    				style: "width:125px;",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = "Fluent Launcher";
    			t2 = space();
    			span1 = element("span");
    			span1.textContent = "Preview";
    			t4 = space();
    			nav = element("nav");
    			a1 = element("a");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t5 = text("\n\t\t\t\tSource");
    			t6 = space();
    			a2 = element("a");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t7 = text("\t\t\t\tXcube Studio");
    			t8 = space();
    			create_component(button0.$$.fragment);
    			t9 = space();
    			main = element("main");
    			section = element("section");
    			div3 = element("div");
    			div2 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Fluent Launcher";
    			t11 = space();
    			p0 = element("p");
    			p0.textContent = "Natsurainko.FluentLauncher A Minecraft launcher designed for Windows 11";
    			t13 = space();
    			div1 = element("div");
    			create_component(button1.$$.fragment);
    			t14 = space();
    			create_component(button2.$$.fragment);
    			t15 = space();
    			div4 = element("div");
    			img1 = element("img");
    			t16 = space();
    			footer = element("footer");
    			div8 = element("div");
    			div5 = element("div");
    			a3 = element("a");
    			img2 = element("img");
    			t17 = space();
    			span2 = element("span");
    			span2.textContent = "Fluent Launcher";
    			t19 = space();
    			p1 = element("p");
    			p1.textContent = "Copyright © Xcube Studio 2022 - 2023";
    			t21 = space();
    			div6 = element("div");
    			p2 = element("p");
    			p2.textContent = "Pages";
    			t23 = space();
    			a4 = element("a");
    			a4.textContent = "Home";
    			t25 = space();
    			a5 = element("a");
    			a5.textContent = "GitHub";
    			t27 = space();
    			div7 = element("div");
    			p3 = element("p");
    			p3.textContent = "Contribute to Fluent Launcher";
    			t29 = space();
    			a6 = element("a");
    			a6.textContent = "Give Feedback";
    			t31 = space();
    			a7 = element("a");
    			a7.textContent = "\"Localization Poroject\"";
    			attr_dev(img0, "alt", "Fluent Launcher");
    			attr_dev(img0, "class", "logo-icon svelte-yli5t9");
    			if (!src_url_equal(img0.src, img0_src_value = "./app-icon.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "width", "20");
    			attr_dev(img0, "height", "20");
    			add_location(img0, file, 8, 3, 186);
    			attr_dev(span0, "class", "logo-title svelte-yli5t9");
    			add_location(span0, file, 9, 3, 279);
    			attr_dev(span1, "class", "text-block type-caption svelte-zxj483");
    			set_style(span1, "color", "var(--fds-text-secondary)");
    			add_location(span1, file, 12, 3, 340);
    			attr_dev(a0, "class", "logo svelte-yli5t9");
    			attr_dev(a0, "href", "/");
    			add_location(a0, file, 7, 2, 157);
    			set_style(path0, "fill", "var(--fds-text-primary)");
    			attr_dev(path0, "d", "m8.086 18.611 5.996-14.004a1 1 0 0 1 1.878.677l-.04.11-5.996 14.004a1 1 0 0 1-1.878-.677l.04-.11 5.996-14.004L8.086 18.61Zm-5.793-7.318 4-4a1 1 0 0 1 1.497 1.32l-.083.094L4.414 12l3.293 3.293a1 1 0 0 1-1.32 1.498l-.094-.084-4-4a1 1 0 0 1-.083-1.32l.083-.094 4-4-4 4Zm14-4.001a1 1 0 0 1 1.32-.083l.093.083 4.001 4.001a1 1 0 0 1 .083 1.32l-.083.095-4.001 3.995a1 1 0 0 1-1.497-1.32l.084-.095L19.584 12l-3.293-3.294a1 1 0 0 1 0-1.414Z");
    			add_location(path0, file, 16, 77, 639);
    			attr_dev(svg0, "class", "icon svelte-yli5t9");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg0, file, 16, 4, 566);
    			attr_dev(a1, "class", "navbar-selection svelte-yli5t9");
    			attr_dev(a1, "href", "https://github.com/Xcube-Studio/Natsurainko.FluentLauncher");
    			add_location(a1, file, 15, 3, 467);
    			set_style(path1, "fill", "var(--fds-text-primary)");
    			attr_dev(path1, "d", "M9 7a1 1 0 0 1 .117 1.993L9 9H7a3 3 0 0 0-.176 5.995L7 15h2a1 1 0 0 1 .117 1.993L9 17H7a5 5 0 0 1-.217-9.995L7 7h2Zm8 0a5 5 0 0 1 .217 9.995L17 17h-2a1 1 0 0 1-.117-1.993L15 15h2a3 3 0 0 0 .176-5.995L17 9h-2a1 1 0 0 1-.117-1.993L15 7h2ZM7 11h10a1 1 0 0 1 .117 1.993L17 13H7a1 1 0 0 1-.117-1.993L7 11h10H7Z");
    			add_location(path1, file, 20, 77, 1289);
    			attr_dev(svg1, "class", "icon svelte-yli5t9");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg1, file, 20, 4, 1216);
    			attr_dev(a2, "class", "navbar-selection svelte-yli5t9");
    			attr_dev(a2, "href", "https://xcubestudio.net/");
    			add_location(a2, file, 19, 3, 1151);
    			attr_dev(nav, "class", "svelte-yli5t9");
    			add_location(nav, file, 14, 2, 458);
    			attr_dev(div0, "class", "navbar-inner svelte-yli5t9");
    			add_location(div0, file, 6, 1, 128);
    			attr_dev(header, "class", "navbar Global svelte-yli5t9");
    			add_location(header, file, 5, 0, 96);
    			attr_dev(h2, "class", "hero-contents-title svelte-yli5t9");
    			add_location(h2, file, 33, 4, 2405);
    			set_style(p0, "margin", "-25px 0px 30px 0px");
    			set_style(p0, "color", "var(--fds-text-secondary)");
    			add_location(p0, file, 34, 4, 2462);
    			set_style(div1, "display", "inline-flex");
    			set_style(div1, "flex-wrap", "wrap");
    			set_style(div1, "gap", "10px");
    			add_location(div1, file, 37, 4, 2625);
    			attr_dev(div2, "class", "hero-contents svelte-yli5t9");
    			add_location(div2, file, 32, 3, 2373);
    			attr_dev(div3, "class", "page-section-inner svelte-yli5t9");
    			add_location(div3, file, 31, 2, 2337);
    			if (!src_url_equal(img1.src, img1_src_value = "./app.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "app-image svelte-yli5t9");
    			attr_dev(img1, "alt", "app");
    			set_style(img1, "display", "inline-block");
    			set_style(img1, "height", "auto");
    			set_style(img1, "width", "100%");
    			set_style(img1, "box-shadow", "var(--fds-dialog-shadow) ");
    			set_style(img1, "border", "1px solid var(--fds-surface-stroke-default)");
    			set_style(img1, "border-radius", "var(--fds-overlay-corner-radius)");
    			add_location(img1, file, 44, 5, 3071);
    			set_style(div4, "padding", "0px 0px 150px 0px");
    			set_style(div4, "display", "flex");
    			set_style(div4, "align-items", "center");
    			set_style(div4, "justify-content", "center");
    			add_location(div4, file, 43, 2, 2968);
    			attr_dev(section, "class", "hero-section svelte-yli5t9");
    			add_location(section, file, 30, 1, 2304);
    			add_location(main, file, 29, 0, 2296);
    			attr_dev(img2, "alt", "Fluent Launcher");
    			attr_dev(img2, "class", "logo-icon svelte-yli5t9");
    			set_style(img2, "width", "36px");
    			set_style(img2, "height", "36px");
    			if (!src_url_equal(img2.src, img2_src_value = "./app-icon.png")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 53, 4, 3542);
    			attr_dev(span2, "class", "logo-title svelte-yli5t9");
    			set_style(span2, "color", "var(--fds-text-secondary)");
    			add_location(span2, file, 54, 4, 3647);
    			attr_dev(a3, "class", "logo svelte-yli5t9");
    			attr_dev(a3, "href", "/");
    			add_location(a3, file, 52, 3, 3511);
    			set_style(p1, "color", "var(--fds-text-secondary)");
    			set_style(p1, "margin", "15px 0px 0px 0px");
    			add_location(p1, file, 58, 3, 3759);
    			attr_dev(div5, "class", "column svelte-yli5t9");
    			set_style(div5, "inline-size", "100%");
    			add_location(div5, file, 51, 2, 3460);
    			set_style(p2, "margin-left", "10px");
    			set_style(p2, "color", "var(--fds-text-secondary)");
    			attr_dev(p2, "data-svelte-h", "svelte-76m2vc");
    			add_location(p2, file, 61, 3, 3905);
    			attr_dev(a4, "class", "navbar-selection svelte-yli5t9");
    			set_style(a4, "color", "var(--fds-accent-text-primary)");
    			set_style(a4, "margin", "15px 0px 0px 0px");
    			set_style(a4, "inline-size", "fit-content");
    			attr_dev(a4, "href", "/");
    			add_location(a4, file, 62, 3, 4010);
    			attr_dev(a5, "class", "navbar-selection svelte-yli5t9");
    			set_style(a5, "color", "var(--fds-accent-text-primary)");
    			set_style(a5, "margin", "10px 0px 0px 0px");
    			set_style(a5, "inline-size", "fit-content");
    			attr_dev(a5, "href", "https://github.com/Xcube-Studio/Natsurainko.FluentLauncher");
    			add_location(a5, file, 65, 3, 4165);
    			attr_dev(div6, "class", "column svelte-yli5t9");
    			add_location(div6, file, 60, 2, 3881);
    			set_style(p3, "margin-left", "10px");
    			set_style(p3, "color", "var(--fds-text-secondary)");
    			attr_dev(p3, "data-svelte-h", "svelte-76m2vc");
    			add_location(p3, file, 70, 3, 4411);
    			attr_dev(a6, "class", "navbar-selection svelte-yli5t9");
    			set_style(a6, "color", "var(--fds-accent-text-primary)");
    			set_style(a6, "margin", "15px 0px 0px 0px");
    			set_style(a6, "inline-size", "fit-content");
    			attr_dev(a6, "href", "https://github.com/Xcube-Studio/Natsurainko.FluentLauncher/issues");
    			add_location(a6, file, 71, 3, 4541);
    			attr_dev(a7, "class", "navbar-selection svelte-yli5t9");
    			set_style(a7, "color", "var(--fds-accent-text-primary)");
    			set_style(a7, "margin", "10px 0px 0px 0px");
    			set_style(a7, "inline-size", "fit-content");
    			attr_dev(a7, "href", "https://github.com/Xcube-Studio/FluentLauncher.LocalizationPoroject");
    			add_location(a7, file, 74, 3, 4769);
    			attr_dev(div7, "class", "column svelte-yli5t9");
    			add_location(div7, file, 69, 2, 4387);
    			attr_dev(div8, "class", "page-footer-section-inner svelte-yli5t9");
    			add_location(div8, file, 50, 1, 3418);
    			set_style(footer, "background", "var(--fds-acrylic-background-default)");
    			add_location(footer, file, 49, 0, 3349);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img0);
    			append_dev(a0, t0);
    			append_dev(a0, span0);
    			append_dev(a0, t2);
    			append_dev(a0, span1);
    			append_dev(div0, t4);
    			append_dev(div0, nav);
    			append_dev(nav, a1);
    			append_dev(a1, svg0);
    			append_dev(svg0, path0);
    			append_dev(a1, t5);
    			append_dev(nav, t6);
    			append_dev(nav, a2);
    			append_dev(a2, svg1);
    			append_dev(svg1, path1);
    			append_dev(a2, t7);
    			append_dev(nav, t8);
    			mount_component(button0, nav, null);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, section);
    			append_dev(section, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h2);
    			append_dev(div2, t11);
    			append_dev(div2, p0);
    			append_dev(div2, t13);
    			append_dev(div2, div1);
    			mount_component(button1, div1, null);
    			append_dev(div1, t14);
    			mount_component(button2, div1, null);
    			append_dev(section, t15);
    			append_dev(section, div4);
    			append_dev(div4, img1);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div8);
    			append_dev(div8, div5);
    			append_dev(div5, a3);
    			append_dev(a3, img2);
    			append_dev(a3, t17);
    			append_dev(a3, span2);
    			append_dev(div5, t19);
    			append_dev(div5, p1);
    			append_dev(div8, t21);
    			append_dev(div8, div6);
    			append_dev(div6, p2);
    			append_dev(div6, t23);
    			append_dev(div6, a4);
    			append_dev(div6, t25);
    			append_dev(div6, a5);
    			append_dev(div8, t27);
    			append_dev(div8, div7);
    			append_dev(div7, p3);
    			append_dev(div7, t29);
    			append_dev(div7, a6);
    			append_dev(div7, t31);
    			append_dev(div7, a7);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(button0);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(main);
    			destroy_component(button1);
    			destroy_component(button2);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
