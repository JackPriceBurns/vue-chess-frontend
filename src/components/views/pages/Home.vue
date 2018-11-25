<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md"></div>

                <div class="col-md-3">
                    <div class="list-group">
                        <button class="list-group-item list-group-item-action" @click="startGame()">Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let socket = io.connect('http://localhost:4000/');

    export default {
        methods: {
            startGame() {
                socket.on('game-started', data => {
                    if (!data.gameId) {
                        return;
                    }

                    this.$router.push({name: 'game', params: {id: data.gameId}});
                });

                socket.emit('start-game', {test: 'this is a test'});
            }
        },
    };
</script>

<style scoped>

</style>