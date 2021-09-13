<script>
  let fields = ['Ваше имя']
  let callToAction = 'Подписать'
  let data = '{}'
  let template
  let code = ''
  let olFields
  let elements = []

  $: if (fields && callToAction) {
    data = JSON.stringify({ fields, callToAction }, null, 2)
  }
  $: if (template) {
    template.innerHTML = template.innerHTML.replace(
      '.immersive',
      '.immersive = ' + data
    )
  }

  const addField = () => {
    console.log('adding field')
    fields.push('')
  }

  const removeField = () => {
    console.log('removing field')
    fields.pop()
  }
</script>

<section class="p-2">
    <template name="widget" bind:this={template}>
        <div class="is-discoursio-widget" />
        <script>
            window.immersive
        </script>
        <script
            defer
            src="https://is-discoursio-widget.vercel.app/bundle.js"></script>
    </template>

    <form>
        <code>{@html code}</code>
        <div class="border border-gray-300 p-2">
            <label for="callButton">{'Надпись на кнопке:'}
                {#key callToAction}
                <input
                    name="callButton"
                    type="text"
                    value={callToAction}
                    placeholder="Надпись на кнопке" />
                {/key}
            </label>
        </div>
        <label for="fields">{'Поля ввода текста'}
            {#key fields}
            <fieldset name="fields" class="border border-gray-300 p-2">
                <input type="button" on:click={() => addField()} value="Добавить поле" />
                <input type="button" on:click={() => removeField()} value="Убрать поле" />
                <ol bind:this={olFields}>
                {#each fields as field, i}
                    <li class="p-1 field">
                        <input type="text" bind:this={elements[i]} value={fields[i]} />
                    </li>
                {/each}
                </ol>
            </fieldset>
            {/key}
        </label>
    </form>
</section>
<style>
  template {
    display: none;
  }
</style>
