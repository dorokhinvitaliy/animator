class Scroller {

    constructor(options) {
        this.slides = options.slides;
        this.scroll_offset = window.pageYOffset;
        this.startInstance();
    }

    static toInterval(from, to, val) {
        let min = Math.min(from, to);
        let max = Math.max(from, to);

        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }

        return val;

    }

    static animate({ el, from, to, prop, pattern, duration, success }) {

        setTimeout(success, duration);

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // вычисление текущего состояния анимации
            let progress = timeFraction;

            let res = (to - from) * progress + from;

            el.css(prop, pattern.replace("{val}", res))



            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }

    startInstance() {
        let slide_id = -1;

        let inst = this;

        $(".slide").each(function () {
            slide_id += 1;
            let el = $(this);
            el.data("slide_id", slide_id);
            inst.slides[slide_id].transitions.forEach(function (item, index, array) {
                el.find(item.el).css(item.prop, item.pattern.replace("{val}", item.from));
            });
            if (inst.slides[slide_id].animations != undefined) {
                inst.slides[slide_id].animations.forEach(function (item, index, array) {
                    el.find(item.el).css(item.prop, item.pattern.replace("{val}", item.from));
                });
            }
        });

        $(document).on("scroll", function (e) {
            let dir;
            if (inst.scroll_offset > window.pageYOffset) {
                inst.scroll_offset = window.pageYOffset;
                dir = "up";
            } else if (inst.scroll_offset < window.pageYOffset) {
                inst.scroll_offset = window.pageYOffset;
                dir = "down";
            }


            $(".slide").each(function () {
                if (inst.slides[$(this).data("slide_id")].duration != undefined) {
                    $(this).parent().height(inst.slides[$(this).data("slide_id")].duration * 100 + "vh");
                }
                if ($(this)[0].getBoundingClientRect().y == 0) {
                    $(".slide").not($(this)).removeClass('active');
                    $(this).addClass("active");
                } else {
                    /*$(this).removeClass("active");*/
                }
            });

            if ($(".slide.active").length != 0) {

                eval(inst.slides[($(".slide.active").data("slide_id"))].script($(".slide.active"), ((window.pageYOffset - ($(".slide.active").parent()).offset().top) / ($(".slide.active").parent().height() - window.innerHeight)), dir));

                let transition_transform_els = [];

                $(".slide.active").find("*").each(function () {
                    $(this).data("transform", "");
                });
                let is_sticky = (inst.slides[($(".slide.active").data("slide_id"))].sticky == undefined || inst.slides[($(".slide.active").data("slide_id"))].sticky == true) ? true : false;
                if (inst.slides[($(".slide.active").data("slide_id"))].animations != undefined) {
                    let per = ((window.pageYOffset - ($(".slide.active").parent()).offset().top) / ($(".slide.active").parent().height() - (is_sticky ? window.innerHeight : 0)));
                    
                    inst.slides[($(".slide.active").data("slide_id"))].animations.forEach(function (item, index, array) {
                        if ($(".slide.active").find(item.el).data("animations") == undefined) $(".slide.active").find(item.el).data("animations", {});
                        let anims = $(".slide.active").find(item.el).data("animations");
                        let animating;
                        let animated;
                        if (anims[index + ""] != undefined) {
                            animating = anims[index + ""].animating;
                            animated = anims[index + ""].animated;
                        } else {
                            anims[index + ""] = { animating: false, animated: false };
                            animating = anims[index + ""].animating;
                            animated = anims[index + ""].animated;
                        }
                        if (dir == "down" && per >= item.frame && !animating && !animated) {



                            let find_sibl = function () {
                                for (let key in inst.slides[($(".slide.active").data("slide_id"))].animations) {

                                    let a = inst.slides[($(".slide.active").data("slide_id"))].animations[key];

                                    if (a.el == item.el && a.prop == item.prop && a.frame > item.frame && a.frame <= per) return true;

                                }

                                return false;
                            };


                            if (!find_sibl()) {
                                anims[index + ""].animating = true;
                                Scroller.animate({
                                    el: $(".slide.active").find(item.el), prop: item.prop, pattern: item.pattern, from: item.from, to: item.to, duration: item.duration, success: function () {
                                        anims[index + ""].animating = false;
                                        anims[index + ""].animated = true;
                                    }
                                });
                                if (item.el == ".flex-area-left") console.log("sibl has not founded");
                            } else {
                                if (item.el == ".flex-area-left") console.log("sibl has founded");
                            }
                        } else if (dir == "up" && per <= item.frame && !animating && animated) {

                            let find_sibl = function () {
                                for (let key in inst.slides[($(".slide.active").data("slide_id"))].animations) {

                                    let a = inst.slides[($(".slide.active").data("slide_id"))].animations[key];

                                    if (a.el == item.el && a.prop == item.prop && a.frame > item.frame && a.frame <= per) return true;

                                }

                                return false;
                            };

                            if (!find_sibl()) {
                                anims[index + ""].animating = true;
                                Scroller.animate({
                                    el: $(".slide.active").find(item.el), prop: item.prop, pattern: item.pattern, from: item.to, to: item.from, duration: item.duration, success: function () {
                                        anims[index + ""].animating = false;
                                        anims[index + ""].animated = false;
                                    }
                                });
                            }
                        } else {
                            if (item.el == ".flex-area-left" && item.frame < per) console.log("direction:" + dir, ";per:" + per, ";frame:" + item.frame, item.prop, animating, animated);
                        }
                        $(".slide.active").find(item.el).data("animations", anims);
                    });
                }
                inst.slides[($(".slide.active").data("slide_id"))].transitions.forEach(function (item, index, array) {



                    /* animate from 0.5 scale to 1 */

                    let from = item.from;

                    let to = item.to;
                    let is_sticky = (inst.slides[($(".slide.active").data("slide_id"))].sticky == undefined || inst.slides[($(".slide.active").data("slide_id"))].sticky == true) ? true : false;
                    if (!is_sticky) {
                        $(".slide.active").css("position", "relative");
                    }
                    let per = (window.pageYOffset - ($(".slide.active").parent()).offset().top) / ($(".slide.active").parent().height() - (is_sticky ? window.innerHeight : 0));

                    /*let s = (to-from)*per;*/


                    /**/

                    let phase;

                    if (item.phase != undefined) {
                        phase = item.phase
                    } else {
                        phase = { start: 0, stop: 1 };
                    }



                    let s = (to - from) * ((per - phase.start) / (phase.stop - phase.start));

                    /**/


                    let res;

                    if ((per - phase.start) / (phase.stop - phase.start) > 1) {
                        res = to;
                    } else if ((per - phase.start) / (phase.stop - phase.start) < 0) {
                        res = from;
                    } else {
                        res = from + s;
                    }

                    /*
                    inst.slides[($(".slide.active").data("slide_id"))].transitions.filter(function(it, i, array){
                        let phase_start = it.phase == undefined ? 0 : it.phase.start;
                        let phase_stop = it.phase == undefined ? 0 : it.phase.stop;
                        if(it.prop=="transform" && (phase_start < per) && (phase_stop > per))
                    });*/

                    if (item.prop == "transform") {
                        /*let phase_start = it.phase == undefined ? 0 : it.phase.start;
                        let phase_stop = it.phase == undefined ? 1 : it.phase.stop;*/
                        let has_siblings = false;
                        let phase_start = item.phase == undefined ? 0 : item.phase.start;
                        let phase_stop = item.phase == undefined ? 1 : item.phase.stop;
                        if (!transition_transform_els.includes(item.el)) transition_transform_els.push(item.el);
                        if (!(phase_start <= Scroller.toInterval(0, 1, per) && phase_stop >= Scroller.toInterval(0, 1, per))) {
                            let find_sibl = inst.slides[($(".slide.active").data("slide_id"))].transitions.find(function (el, i, arr) {
                                let el_phase_start = el.phase == undefined ? 0 : el.phase.start;
                                let el_phase_stop = el.phase == undefined ? 1 : el.phase.stop;
                                if (el.el == item.el && el.prop == "transform" && el.pattern.slice(0, el.pattern.indexOf("(")) == (item.pattern.slice(0, item.pattern.indexOf("("))) && el_phase_start <= Scroller.toInterval(0, 1, per) && el_phase_stop >= Scroller.toInterval(0, 1, per)) return true;
                            });
                            if (find_sibl != undefined) {
                                has_siblings = true;
                            }

                        }
                        if (!has_siblings) $(".slide.active").find(item.el).data(item.prop, ($(".slide.active").find(item.el).data("transform") + " " + item.pattern.replace("{val}", res)));

                    } else {
                        $(".slide.active").find(item.el).css(item.prop, item.pattern.replace("{val}", res));
                    }



                    /**/

                });

                /**/
                transition_transform_els.forEach(function (it, i, arr) {
                    $(".slide.active").find(it).css("transform", $(".slide.active").find(it).data("transform"));
                });


                /**/

            }
        });
    }


}
