"use client";

import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import countries, { phoneCodeOptions } from "@/lib/utils/countries";

export const ContactSimpleForm = () => {
    const [selectedCountryPhone, setSelectedCountryPhone] = useState("US");

    return (
        <section className="py-12 sm:py-16 lg:py-24">
            <div className="mx-auto flex w-full max-w-container flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-8">
                <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="text-sm font-semibold md:text-md">Contact us</span>
                    <h2 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-display-lg">Get in touch</h2>
                    <p className="mt-4 max-w-xl text-base text-tertiary sm:text-lg md:mt-6 md:text-xl">
                        We&apos;d love to hear from you. Please fill out this form.
                    </p>
                </div>

                <Form
                    className="flex w-full flex-1 flex-col gap-8 lg:max-w-xl"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                            <Input isRequired size="lg" name="firstName" label="First name" placeholder="First name" wrapperClassName="flex-1" />
                            <Input isRequired size="lg" name="lastName" label="Last name" placeholder="Last name" wrapperClassName="flex-1" />
                        </div>
                        <Input isRequired size="lg" name="email" label="Email" type="email" placeholder="you@company.com" />
                        <InputGroup
                            size="lg"
                            name="phone"
                            label="Phone number"
                            leadingAddon={
                                <NativeSelect
                                    aria-label="Country code"
                                    className="shrink-0"
                                    value={selectedCountryPhone}
                                    onChange={(value) => setSelectedCountryPhone(value.currentTarget.value)}
                                    selectClassName="w-28 sm:w-32"
                                    options={phoneCodeOptions.map((item) => ({
                                        label: item.label as string,
                                        value: item.id as string,
                                    }))}
                                />
                            }
                        >
                            <InputBase
                                type="tel"
                                placeholder={countries.find((country) => country.code === selectedCountryPhone)?.phoneMask?.replaceAll("#", "0")}
                            />
                        </InputGroup>
                        <TextArea isRequired label="Message" placeholder="Leave us a message..." rows={5} />
                        <Checkbox
                            name="privacy"
                            size="md"
                            hint={
                                <>
                                    You agree to our friendly{" "}
                                    <a
                                        href="/privacy-policy"
                                        className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        privacy policy.
                                    </a>
                                </>
                            }
                        />
                    </div>

                    <Button type="submit" size="xl" className="w-full md:w-auto">
                        Send message
                    </Button>
                </Form>
            </div>
        </section>
    );
};
