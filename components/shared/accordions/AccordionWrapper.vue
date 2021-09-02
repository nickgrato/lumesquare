// Template
<template>
    <div class="accordion-wrapper" :id="ids">
        <slot></slot>
    </div>
</template>

// JS
<script>

const Emit = {
    SectionClicked : 'sectionClicked'
}

export default {
    name: 'AccordionWrapper',
    computed: {},
    props: {
        text: String,
        ids: String
    },
    methods: {

    },
    created() {
        this.$on(Emit.SectionClicked,function(uniqueId){
            // loop through all the slot children
            this.$slots.default.forEach(vnode => {
                // check if child is a component
                if (vnode.componentInstance) {
                    // make sure we close all but current section.
                    if(vnode.componentInstance._uid != uniqueId){
                        vnode.componentInstance.setNotActive();
                    }
                }
            })
        })

    }
};
</script>

// SCSS
<style lang="scss" scoped>
    .accordion-wrapper{
        // manage the width with an external html continer.
        width: 100%;
        border-top:1px solid #E7E1E6;
    }
</style>
