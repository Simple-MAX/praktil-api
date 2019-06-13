<template>
    <div class="col-md-6">
        <div class="data-table">
            <h2>Populäraste Annonserna</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Annons</th>
                    <th>Företag</th>
                    <th>Klick</th>
                </tr>

                <tfoot>
                <tr>
                    <td colspan="4"><a type="button" id="showMore">Visa
                        mer</a></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
    module.exports = { // This is important, I got errors when using `export default`
        data () {
            return {
                who: "World"
            }
        },
        mounted () {
            axios.get('http://jsonplaceholder.typicode.com/posts').then((res) => {
                console.log(res);
            }).catch(error => console.log(error))
        }
    }
</script>

<style scoped>
    .cruel {
        color: green;
    }
</style>