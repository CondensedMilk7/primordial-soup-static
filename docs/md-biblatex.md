> original documentation from the library which
> this project uses https://github.com/arothuis/markdown-it-biblatex

## Biblatex Citation Guide

### Basic citation

```markdown
A bibliography [@Cohen-1963] is only produced for
the items cited [@Susskind-Hrabovsky-2014].

[bibliography]
```

Results in:

```html
<p>
  A bibliography (Cohen, 1963) is only produced for the items cited (Susskind
  &#38; Hrabovsky, 2014).
</p>
<div class="bibliography">
  <h2 class="bibliography-title">Bibliography</h2>
  <div class="bibliography-contents">
    <div class="csl-entry">
      Cohen, P. J. (1963). The independence of the continuum hypothesis.
      <i>Proceedings of the National Academy of Sciences</i>, <i>50</i>(6),
      1143–1148.
    </div>
    <div class="csl-entry">
      Susskind, L., &#38; Hrabovsky, G. (2014).
      <i>Classical mechanics: the theoretical minimum</i>. New York, NY: Penguin
      Random House.
    </div>
  </div>
</div>
```

### Prefix

We can add a prefix to a citation,
by wrapping it in curly braces:

```markdown
[@Cohen-1963{see}]
```

Results in:

```html
<p>(see Cohen, 1963)</p>
```

### Locator

If you want to specify a specific location within a certain
citation, you can use the locator mark (`#`):

```markdown
[@Cohen-1963#p. 3]

[@Cohen-1963#p. 3{see}]
```

Result:

```html
<p>(Cohen, 1963, p. 3)</p>
<p>(see Cohen, 1963, p. 3)</p>
```

### Different citation modes

Through citeproc, we support several
[citation forms](https://citeproc-js.readthedocs.io/en/latest/running.html#special-citation-forms).
In this plugin, we use special marks in front
of the @-sign:

- **author only(`!`):** render only the author of the item or its title if there is none
- **suppress author(`-`):** render the citation omitting the author, or its title if there is none
- **composite(`~`):** a combination of author only and suppress author, typically used for in-line citations

This is illustrated as follows:

```markdown
### Regular

A regular citation: [@Cohen-1963]

### Author only

A citation with the author only: [!@Cohen-1963]

### Suppress author

A citation with the author suppressed: [-@Cohen-1963]

### Composite

A composite citation: [~@Cohen-1963]
```

This produces the following HTML, when processing
citations using an en-US locale and the APA style:

```html
<h3>Regular</h3>
<p>A regular citation: (Cohen, 1963)</p>
<h3>Author only</h3>
<p>A citation with the author only: Cohen</p>
<h3>Suppress author</h3>
<p>A citation with the author suppressed: (1963)</p>
<h3>Composite</h3>
<p>A composite citation: Cohen (1963)</p>
```

### Multiple items in a single citation

It is possible to reference multiple sources in a single
citation, by using a semicolon (`;`):

```markdown
[@Cohen-1963; @Susskind-Hrabovsky-2014].
```

This outputs the following:

```html
<p>(Cohen, 1963; Susskind &#38; Hrabovsky, 2014).</p>
```
