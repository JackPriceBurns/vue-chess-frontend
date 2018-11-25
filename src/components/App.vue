<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">VUE Chess</a>

                <button class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <router-link class="nav-item" active-class="active" tag="li" to="/" exact>
                            <a class="nav-link">Home</a>
                        </router-link>

                        <!--<router-link class="nav-item" active-class="active" tag="li" to="/game">-->
                            <!--<a class="nav-link">Game</a>-->
                        <!--</router-link>-->
                    </ul>
                </div>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        //
    };
</script>

<style scoped>

</style>