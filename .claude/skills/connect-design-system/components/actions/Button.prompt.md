The Connect button — four sizes, seven hierarchies, five icon modes, four states.

```jsx
<Button size="lg" hierarchy="primary" icon="leading" iconNode={<Icon name="plus" size={20} />}>
  Nueva unidad
</Button>
```

- `size`: sm · md · lg · xl (padding 8/14 → 12/20, radius always 8px)
- `hierarchy`: primary · secondary color · secondary gray · tertiary color · tertiary gray · link color · link gray
- `icon`: false · leading · trailing · dot · only
- `state`: pass it only to freeze a specimen; otherwise hover/focus are live.

Primary is the literal `#7F56D9` from the source file. Never stack two primaries in one action group.
