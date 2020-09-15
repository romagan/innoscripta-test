<template>
    <div v-if="isShown"
         :class="[`modal`, strModalVisibleClass, strModalUniqueClass]">
        <div class="modal__overlay">
            <div class="modal__wrapper" ref="overlay">
                <div class="modal__body">
                    <button class="btn btn_close modal__close" type="button" @click="hideModal">
                        <slot name="close"></slot>
                    </button>
                    <div class="modal__header">
                        <h2 class="modal__title">{{ title }}</h2>
                    </div>
                    <div class="modal__content">
                        <template v-if="strComponentName">
                            <component
                                :is="strComponentName"
                                :params="obComponentParams"
                                @hideModal="hideModal"
                            ></component>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        components: {},
        props: {},
        data() {
            return {
                isLockedByOtherPopup: false
            }
        },
        computed: {
            strComponentName() {
                return this.$store.state.modal.componentName;
            },
            title() {
                return this.$store.state.modal.title;
            },
            obComponentParams() {
                return this.$store.state.modal.params;
            },
            isShown() {
                return this.$store.state.modal.status;
            },
            strModalVisibleClass() {
                if (this.isShown) {
                    return `modal_visible`;
                }
                return ``;
            },
            strModalUniqueClass() {
                if (this.isShown) {
                    return `modal_${this.strComponentName.toLowerCase()}`;
                }
                return ``;
            }
        },
        watch: {
            isShown: function (isShown) {
                if (isShown) {
                    this.$nextTick(function () {
                        const body = document.querySelector(`body`);

                        if (body.classList.contains(`body_locked`)) {
                            this.isLockedByOtherPopup = true;
                        } else {
                            const scrollbarWidth = this.calculateScrollbarWidth();
                            body.classList.add(`body_locked`);
                            body.style.marginRight = scrollbarWidth + `px`;
                        }

                        this.$refs.overlay.addEventListener('click', this.hideModalByOuterCLick);
                        document.addEventListener('keydown', this.hideModalByEsc);
                    });
                } else {
                    if (!this.isLockedByOtherPopup) {
                        const body = document.querySelector(`body`);

                        body.classList.remove(`body_locked`);
                        body.style.marginRight = ``;
                        this.$refs.overlay.removeEventListener('click', this.hideModalByOuterCLick);
                        document.removeEventListener('keydown', this.hideModalByEsc);
                    }  
                }
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            hideModal() {
                this.$store.dispatch('modal/hideModal');
            },
            hideModalByOuterCLick(evt) {
                evt.target == this.$refs.overlay ? this.hideModal() : false;
            },
            hideModalByEsc(evt) {
                const escKeyCode = 27;

                evt.keyCode === escKeyCode ? this.hideModal() : false;
            },
            calculateScrollbarWidth() {
                let div = document.createElement('div');

                div.style.overflowY = 'scroll';
                div.style.width = '50px';
                div.style.height = '50px';

                document.body.append(div);
                let scrollWidth = div.offsetWidth - div.clientWidth;

                div.remove();

                return scrollWidth;
            }
        }
    }
</script>

<style lang="scss">
$unit: 8px;
$speed: 0.4s;
$color-icons: gray;

.modal {
    z-index: 9998;
    position: relative;

    display: none;
}

.modal_visible{
    display: block;
}

.modal__overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    overflow-y: scroll;
    background-color: rgba(0,0,0,0.3);
    transition: opacity 0.3s ease;
}

.modal {
    overflow: visible;
    
    &_kit {
        .modal__body {
            padding: 3*$unit;

            @media(min-width: 768px) {
                max-width: 96*$unit;
                padding: 5*$unit;
            }

            @media(min-width: 1280px) {
                max-width: 148*$unit;
                padding: 7*$unit 15*$unit;
            }
        }

        .modal__title {
            margin: 0;
        }

        .modal__close.btn {
            top: 3.25*$unit;

            @media(min-width: 768px) {
                top: 5.75*$unit;
            }

            @media(min-width: 1280px) {
                top: 8.6*$unit;
            }
        }
    }
}

.modal__body,
.modal__wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
}

.modal__wrapper {
    height: 100%;
    padding: 10vh 0;
}

.modal__overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: rgba(36,36,36,.4);
    transition: opacity .3s ease;
}

.modal__body {
    max-width: 40*$unit;
    margin: 0 auto;
    padding: 7*$unit 3*$unit;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .1);
    transition: all .3s ease-in;


    @media(min-width: 768px) {
        max-width: 86*$unit;
        padding: 8*$unit 11*$unit;
    }

    @media(min-width: 1920px) {
        max-width: 79*$unit;
        padding: 10*$unit 13*$unit;
    }

}


.modal__close.btn {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 3*$unit;
    right: 3*$unit;
    font-size: 0;

    &:after,
    &:before {
        content: "";
        position: absolute;
        width: 16px;
        height: 2px;
        right: 0;
        background-color: rgba(60, 60, 60, .26);
        transition: $speed;
    }

    &:hover {

        &:after,
        &:before {
            background-color: $color-icons;
        }
    }

    &:before {
        transform: rotate(45deg);
    }

    &:after {
        transform: rotate(-45deg);
    }

    @media(min-width: 768px) {
        top: 4*$unit;
        right: 4*$unit;
    }
}

.modal_auth .modal__header .modal__title {
    margin: 0;
}

</style>
