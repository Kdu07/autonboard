export type BookableResourceModel = {
  location: {
    building: string | null;
    level: number | null;
  };
  details: {
    amenityTitlePrimary: string | null;
    amenityTitleSecondary: string | null;
    amenityTypePrimary: string | null;
    amenityTypeSecondary: string | null;
    capacityPrimary: number | null;
    capacitySecondary: number | null;
    descriptionPrimary: string | null;
    descriptionSecondary: string | null;
  };
  rates: {
    hourlyRatePrimary: number | null;
    hourlyRateSecondary: number | null;
    halfDayRatePrimary: number | null;
    halfDayRateSecondary: number | null;
    fullDayRatePrimary: number | null;
    fullDayRateSecondary: number | null;
    outOfHoursHourlyRatePrimary: number | null;
    outOfHoursHourlyRateSecondary: number | null;
    weekendHourlyRatePrimary: number | null;
    weekendHourlyRateSecondary: number | null;
    startOfBusinessHoursPrimary: string | null;
    startOfBusinessHoursSecondary: string | null;
    endOfBusinessHoursPrimary: string | null;
    endOfBusinessHoursSecondary: string | null;
    halfDayDurationHoursPrimary: number | null;
    halfDayDurationHoursSecondary: number | null;
    paymentMethodsPrimary: string | null;
    paymentMethodsSecondary: string | null;
  };
  configurations: {
    roomConfigurationPrimary: string | null;
    roomConfigurationSecondary: string | null;
    featuresPrimary: string | null;
    featuresSecondary: string | null;
    sharedFacilitiesPrimary: string | null;
    sharedFacilitiesSecondary: string | null;
  };
  availability: {
    startDateEndDatePrimary: string | null;
    startDateEndDateSecondary: string | null;
    prepTimeBeforePrimary: string | null;
    prepTimeBeforeSecondary: string | null;
    prepTimeAfterPrimary: string | null;
    prepTimeAfterSecondary: string | null;
    minimumNoticeBeforeBookingPrimary: string | null;
    minimumNoticeBeforeBookingSecondary: string | null;
    maximumTimeBeforeBookingPrimary: string | null;
    maximumTimeBeforeBookingSecondary: string | null;
    slotTypePrimary: string | null;
    slotTypeSecondary: string | null;
    daysAvailablePrimary: string | null;
    daysAvailableSecondary: string | null;
    availableFromTimePrimary: string | null;
    availableFromTimeSecondary: string | null;
    availableToTimePrimary: string | null;
    availableToTimeSecondary: string | null;
    minimumBookingLengthPrimary: string | null;
    minimumBookingLengthSecondary: string | null;
    maximumBookingLengthPrimary: string | null;
    maximumBookingLengthSecondary: string | null;
  };
  extras: {
    addOnsPrimary: string | null;
    addOnsSecondary: string | null;
    requiredInformationPrimary: string | null;
    requiredInformationSecondary: string | null;
  };
  permissions: {
    approvalRequiredForBookingsPrimary: string | null;
    approvalRequiredForBookingsSecondary: string | null;
    inviteVisitorsToBookingsPrimary: string | null;
    inviteVisitorsToBookingsSecondary: string | null;
    whoCanBookThisResourcePrimary: string | null;
    whoCanBookThisResourceSecondary: string | null;
    differentRateAudiencePrimary: string | null;
    differentRateAudienceSecondary: string | null;
  };
  additionalSettings: {
    recurringBookingsAllowedPrimary: string | null;
    recurringBookingsAllowedSecondary: string | null;
    dependentResourcesPrimary: string | null;
    dependentResourcesSecondary: string | null;
  };
  cancellationPermissions: {
    noticeRequiredForCancellationPrimary: string | null;
    noticeRequiredForCancellationSecondary: string | null;
    cancellationPolicyPrimary: string | null;
    cancellationPolicySecondary: string | null;
  };
};
