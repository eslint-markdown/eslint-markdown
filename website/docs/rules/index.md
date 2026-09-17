# Rules

All rules from `eslint-markdown`.

<!-- eslint-disable markdown/no-html -->

<!-- Auto-generated rule list start -->

<script setup>
import { data } from './index.data.js';
const { ruleMetas } = data;
</script>

| Emoji              | Description                                                                                                                                             |
| :----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| :white_check_mark: | Using [`recommended`](../get-started/configurations.md#recommended) config from `eslint-markdown` in a config file enables this rule.                   |
| :art:              | Using [`stylistic`](../get-started/configurations.md#stylistic) config from `eslint-markdown` in a config file enables this rule.                       |
| :wrench:           | Some problems reported by this rule are automatically fixable by `--fix` [CLI](https://eslint.org/docs/latest/use/command-line-interface#--fix) option. |
| :bulb:             | Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).    |
| :star:             | Rule is applicable to [CommonMark](https://commonmark.org/).                                                                                            |
| :star2:            | Rule is applicable to [GitHub Flavored Markdown](https://github.github.com/gfm/).                                                                       |

---

<div>
  <table>
    <thead>
      <tr>
        <th style="width: 11rem">Rules ({{ ruleMetas.length }})</th>
        <th>Description</th>
        <th class="table-narrow">✅</th>
        <th class="table-narrow">🎨</th>
        <th class="table-narrow">🔧</th>
        <th class="table-narrow">💡</th>
        <th class="table-narrow">⭐</th>
        <th class="table-narrow">🌟</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ruleMeta in ruleMetas" :key="ruleMeta.name">
        <td><a :href="ruleMeta.name"><code>{{ ruleMeta.name }}</code></a></td>
        <td>
          <!-- Backticks handling -->
          <template v-for="part in ruleMeta.description.split(/(`[^`]+`)/)">
            <code v-if="part.startsWith('`') && part.endsWith('`')">
              {{ part.slice(1, -1) }}
            </code>
            <template v-else>{{ part }}</template>
          </template>
        </td>
        <td class="table-narrow">{{ ruleMeta.recommended ? '✅' : '' }}</td>
        <td class="table-narrow">{{ ruleMeta.stylistic ? '🎨' : '' }}</td>
        <td class="table-narrow">{{ ruleMeta.fixable ? '🔧' : '' }}</td>
        <td class="table-narrow">{{ ruleMeta.suggestion ? '💡' : '' }}</td>
        <td class="table-narrow">{{ ruleMeta.commonmark ? '⭐' : '' }}</td>
        <td class="table-narrow">{{ ruleMeta.gfm ? '🌟' : '' }}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Auto-generated rule list end -->

<!-- eslint-enable markdown/no-html -->
