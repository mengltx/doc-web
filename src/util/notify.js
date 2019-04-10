export function success(message) {
    const h = this.$createElement;

    this.$notify({
        message: h('i', { style: 'color: teal' }, message)
    });
}