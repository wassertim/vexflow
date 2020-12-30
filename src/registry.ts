// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// @author Mohit Cheppudira
//
// ## Description
//
// This file implements a registry for VexFlow elements. It allows users
// to track, query, and manage some subset of generated elements, and
// dynamically get and set attributes.
//
// There are two ways to regiser with a registry:
//
// 1) Explicitly call `element.register(registry)`, or,
// 2) Call `Registry.enableDefaultRegistry(registry)` when ready, and all future
//    elements will automatically register with it.
//
// Once an element is registered, selected attributes are tracked and indexed by
// the registry. This allows fast look up of elements by attributes like id, type,
// and class.
import {Element} from "./element";
import {IRegistryIndex, IRegistryUpdate} from "./types/registry";
import {MakeException} from "./runtimeerror";

// export const X = Vex.MakeException('RegistryError');
const X = MakeException('RegistryError');

function setIndexValue(index: IRegistryIndex, name: string, value: string, id: string, elem: Element) {
  if (!index[name][value]) index[name][value] = {};
  index[name][value][id] = elem;
}

export class Registry {
  static defaultRegistry: Registry;

  static get INDEXES(): string[] {
    return ['type'];
  }

  private index: IRegistryIndex;

  constructor() {
    this.clear();
  }

  // If you call `enableDefaultRegistry`, any new elements will auto-register with
  // the provided registry as soon as they're constructed.
  static enableDefaultRegistry(registry: Registry): void {
    Registry.defaultRegistry = registry;
  }

  static getDefaultRegistry(): Registry {
    return Registry.defaultRegistry;
  }

  static disableDefaultRegistry(): void {
    Registry.defaultRegistry = null;
  }

  clear(): this {
    // Indexes are represented as maps of maps (of maps). This allows
    // for both multi-labeling (e.g., an element can have multiple classes)
    // and efficient lookup.
    this.index = {
      id: {},
      type: {},
      class: {},
    };
    return this;
  }

  // Updates the indexes for element 'id'. If an element's attribute changes
  // from A -> B, make sure to remove the element from A.
  updateIndex({id, name, value, oldValue}: IRegistryUpdate): void {
    const elem = this.getElementById(id);
    if (oldValue !== null && this.index[name][oldValue]) {
      delete this.index[name][oldValue][id];
    }
    if (value !== null) {
      setIndexValue(this.index, name, value, elem.getAttribute('id'), elem);
    }
  }

  // Register element `elem` with this registry. This adds the element to its index and watches
  // it for attribute changes.
  register(elem: Element, id?: string): this {
    id = id || elem.getAttribute('id');

    if (!id) {
      throw new X('Can\'t add element without `id` attribute to registry', elem);
    }

    // Manually add id to index, then update other indexes.
    elem.setAttribute('id', id);
    setIndexValue(this.index, 'id', id, id, elem);
    Registry.INDEXES.forEach(name => {
      this.updateIndex({id, name, value: elem.getAttribute(name), oldValue: null});
    });
    elem.onRegister(this);
    return this;
  }

  getElementById(id: string): Element {
    return this.index.id[id] ? this.index.id[id][id] : null;
  }

  getElementsByAttribute(attrName: string, value: string): Element[] {
    const index = this.index[attrName];
    if (index && index[value]) {
      return Object.keys(index[value]).map(i => index[value][i]);
    } else {
      return [];
    }
  }

  getElementsByType(type: string): Element[] {
    return this.getElementsByAttribute('type', type);
  }

  getElementsByClass(className: string): Element[] {
    return this.getElementsByAttribute('class', className);
  }

  // This is called by the element when an attribute value changes. If an indexed
  // attribute changes, then update the local index.
  onUpdate({id, name, value, oldValue}: IRegistryUpdate): this {
    function includes(array: string[], value: string) {
      return array.filter(x => x === value).length > 0;
    }

    if (!includes(Registry.INDEXES.concat(['id', 'class']), name)) return this;
    this.updateIndex({id, name, value, oldValue});
    return this;
  }
}

Registry.defaultRegistry = null;
