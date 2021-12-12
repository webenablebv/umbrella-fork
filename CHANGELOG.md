CHANGELOG
=========

4.0
---

* Change minimun Symfony requirments to `Symfony` version `5.4`
* Remove `Hyper` theme, use `AdminKit` theme (Free version with MIT licence)
* Remove js library `select2.js`, replaced by `Tom Select`.
* `Choice2Type` replaced by `UmbrellaChoiceType` (same behaviour)
* `Entity2Type` replaced by `UmbrellaEntityType` (same behaviour)
* Add ColumnType `RadioColumnType` (same as `CheckboxColumnType` but with radio button)
* Rewrite some javascript components using `JQuery` on vanilla Js
* Fix all deprections on `Symfony` 5.4 (i.e. type method returning non-`void` type)
* DataTable : option `class` replaced by `table-class`, add options `class` and `toolbar_class` to specify css class of table container and toolbar