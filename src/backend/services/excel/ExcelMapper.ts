import { BookableResourceModel } from '../../models/BookableResourceModel';
import { ParsedExcel } from './types';

export class ExcelMapper {
  map(data: ParsedExcel): BookableResourceModel {
    return {
      location: {
        building: this.asString(this.getValue(data, 'location', 'building', 0)),
        level: this.asNumber(this.getValue(data, 'location', 'level', 0)),
      },

      details: {
        amenityTitlePrimary: this.asString(this.getValue(data, 'details', 'amenity_title', 0)),
        amenityTitleSecondary: this.asString(this.getValue(data, 'details', 'amenity_title', 1)),
        amenityTypePrimary: this.asString(this.getValue(data, 'details', 'amenity_type', 0)),
        amenityTypeSecondary: this.asString(this.getValue(data, 'details', 'amenity_type', 1)),
        capacityPrimary: this.asNumber(this.getValue(data, 'details', 'capacity', 0)),
        capacitySecondary: this.asNumber(this.getValue(data, 'details', 'capacity', 1)),
        descriptionPrimary: this.asString(this.getValue(data, 'details', 'description', 0)),
        descriptionSecondary: this.asString(this.getValue(data, 'details', 'description', 1)),
      },

      rates: {
        hourlyRatePrimary: this.asNumber(this.getValue(data, 'rates', 'hourly_rate', 0)),
        hourlyRateSecondary: this.asNumber(this.getValue(data, 'rates', 'hourly_rate', 1)),
        halfDayRatePrimary: this.asNumber(this.getValue(data, 'rates', 'half_day_rate', 0)),
        halfDayRateSecondary: this.asNumber(this.getValue(data, 'rates', 'half_day_rate', 1)),
        fullDayRatePrimary: this.asNumber(this.getValue(data, 'rates', 'full_day_rate', 0)),
        fullDayRateSecondary: this.asNumber(this.getValue(data, 'rates', 'full_day_rate', 1)),
        outOfHoursHourlyRatePrimary: this.asNumber(this.getValue(data, 'rates', 'out_of_hours_hourly_rate', 0)),
        outOfHoursHourlyRateSecondary: this.asNumber(this.getValue(data, 'rates', 'out_of_hours_hourly_rate', 1)),
        weekendHourlyRatePrimary: this.asNumber(this.getValue(data, 'rates', 'weekend_hourly_rate', 0)),
        weekendHourlyRateSecondary: this.asNumber(this.getValue(data, 'rates', 'weekend_hourly_rate', 1)),
        startOfBusinessHoursPrimary: this.asString(this.getValue(data, 'rates', 'start_of_business_hours', 0)),
        startOfBusinessHoursSecondary: this.asString(this.getValue(data, 'rates', 'start_of_business_hours', 1)),
        endOfBusinessHoursPrimary: this.asString(this.getValue(data, 'rates', 'end_of_business_hours', 0)),
        endOfBusinessHoursSecondary: this.asString(this.getValue(data, 'rates', 'end_of_business_hours', 1)),
        halfDayDurationHoursPrimary: this.asNumber(this.getValue(data, 'rates', 'half_day_duration_hours', 0)),
        halfDayDurationHoursSecondary: this.asNumber(this.getValue(data, 'rates', 'half_day_duration_hours', 1)),
        paymentMethodsPrimary: this.asString(this.getValue(data, 'rates', 'payment_methods', 0)),
        paymentMethodsSecondary: this.asString(this.getValue(data, 'rates', 'payment_methods', 1)),
      },

      configurations: {
        roomConfigurationPrimary: this.asString(this.getValue(data, 'configurations', 'room_configuration', 0)),
        roomConfigurationSecondary: this.asString(this.getValue(data, 'configurations', 'room_configuration', 1)),
        featuresPrimary: this.asString(this.getValue(data, 'configurations', 'features', 0)),
        featuresSecondary: this.asString(this.getValue(data, 'configurations', 'features', 1)),
        sharedFacilitiesPrimary: this.asString(this.getValue(data, 'configurations', 'shared_facilities', 0)),
        sharedFacilitiesSecondary: this.asString(this.getValue(data, 'configurations', 'shared_facilities', 1)),
      },

      availability: {
        startDateEndDatePrimary: this.asString(this.getValue(data, 'availability', 'start_date_end_date_e_g_if_temporarily_available', 0)),
        startDateEndDateSecondary: this.asString(this.getValue(data, 'availability', 'start_date_end_date_e_g_if_temporarily_available', 1)),
        prepTimeBeforePrimary: this.asString(this.getValue(data, 'availability', 'prep_time_before_this_is_designed_to_give_the_property_team_to_set_up_the_resource_if_required_this_time_is_not_charged_to_bookers', 0)),
        prepTimeBeforeSecondary: this.asString(this.getValue(data, 'availability', 'prep_time_before_this_is_designed_to_give_the_property_team_to_set_up_the_resource_if_required_this_time_is_not_charged_to_bookers', 1)),
        prepTimeAfterPrimary: this.asString(this.getValue(data, 'availability', 'prep_time_after_this_is_designed_to_give_the_property_team_time_to_clear_the_resource_if_required_this_time_is_not_charged_to_bookers', 0)),
        prepTimeAfterSecondary: this.asString(this.getValue(data, 'availability', 'prep_time_after_this_is_designed_to_give_the_property_team_time_to_clear_the_resource_if_required_this_time_is_not_charged_to_bookers', 1)),
        minimumNoticeBeforeBookingPrimary: this.asString(this.getValue(data, 'availability', 'minimum_notice_before_booking', 0)),
        minimumNoticeBeforeBookingSecondary: this.asString(this.getValue(data, 'availability', 'minimum_notice_before_booking', 1)),
        maximumTimeBeforeBookingPrimary: this.asString(this.getValue(data, 'availability', 'maximum_time_before_booking', 0)),
        maximumTimeBeforeBookingSecondary: this.asString(this.getValue(data, 'availability', 'maximum_time_before_booking', 1)),
        slotTypePrimary: this.asString(this.getValue(data, 'availability', 'slots_or_flexible_slots_have_a_defined_start_and_end_time_flexible_booking_allows_users_to_choose_the_start_end_time_for_their_booking', 0)),
        slotTypeSecondary: this.asString(this.getValue(data, 'availability', 'slots_or_flexible_slots_have_a_defined_start_and_end_time_flexible_booking_allows_users_to_choose_the_start_end_time_for_their_booking', 1)),
        daysAvailablePrimary: this.asString(this.getValue(data, 'availability', 'days_available', 0)),
        daysAvailableSecondary: this.asString(this.getValue(data, 'availability', 'days_available', 1)),
        availableFromTimePrimary: this.asString(this.getValue(data, 'availability', 'available_from_time', 0)),
        availableFromTimeSecondary: this.asString(this.getValue(data, 'availability', 'available_from_time', 1)),
        availableToTimePrimary: this.asString(this.getValue(data, 'availability', 'available_to_time', 0)),
        availableToTimeSecondary: this.asString(this.getValue(data, 'availability', 'available_to_time', 1)),
        minimumBookingLengthPrimary: this.asString(this.getValue(data, 'availability', 'minimum_booking_length', 0)),
        minimumBookingLengthSecondary: this.asString(this.getValue(data, 'availability', 'minimum_booking_length', 1)),
        maximumBookingLengthPrimary: this.asString(this.getValue(data, 'availability', 'maximum_booking_length', 0)),
        maximumBookingLengthSecondary: this.asString(this.getValue(data, 'availability', 'maximum_booking_length', 1)),
      },

      extras: {
        addOnsPrimary: this.asString(this.getValue(data, 'extras', 'add_ons', 0)),
        addOnsSecondary: this.asString(this.getValue(data, 'extras', 'add_ons', 1)),
        requiredInformationPrimary: this.asString(this.getValue(data, 'extras', 'required_information', 0)),
        requiredInformationSecondary: this.asString(this.getValue(data, 'extras', 'required_information', 1)),
      },

      permissions: {
        approvalRequiredForBookingsPrimary: this.asString(this.getValue(data, 'permissions', 'approval_required_for_bookings', 0)),
        approvalRequiredForBookingsSecondary: this.asString(this.getValue(data, 'permissions', 'approval_required_for_bookings', 1)),
        inviteVisitorsToBookingsPrimary: this.asString(this.getValue(data, 'permissions', 'invite_visitors_to_bookings', 0)),
        inviteVisitorsToBookingsSecondary: this.asString(this.getValue(data, 'permissions', 'invite_visitors_to_bookings', 1)),
        whoCanBookThisResourcePrimary: this.asString(this.getValue(data, 'permissions', 'who_can_book_this_resource', 0)),
        whoCanBookThisResourceSecondary: this.asString(this.getValue(data, 'permissions', 'who_can_book_this_resource', 1)),
        differentRateAudiencePrimary: this.asString(this.getValue(data, 'permissions', 'is_there_a_different_rate_for_one_or_more_audience', 0)),
        differentRateAudienceSecondary: this.asString(this.getValue(data, 'permissions', 'is_there_a_different_rate_for_one_or_more_audience', 1)),
      },

      additionalSettings: {
        recurringBookingsAllowedPrimary: this.asString(this.getValue(data, 'additional_settings', 'are_recurring_bookings_allowed_this_is_only_available_if_automatic_approval_is_enabled', 0)),
        recurringBookingsAllowedSecondary: this.asString(this.getValue(data, 'additional_settings', 'are_recurring_bookings_allowed_this_is_only_available_if_automatic_approval_is_enabled', 1)),
        dependentResourcesPrimary: this.asString(this.getValue(data, 'additional_settings', 'is_this_resource_dependent_on_other_resources', 0)),
        dependentResourcesSecondary: this.asString(this.getValue(data, 'additional_settings', 'is_this_resource_dependent_on_other_resources', 1)),
      },

      cancellationPermissions: {
        noticeRequiredForCancellationPrimary: this.asString(this.getValue(data, 'cancellation_permissions', 'notice_required_for_cancellation', 0)),
        noticeRequiredForCancellationSecondary: this.asString(this.getValue(data, 'cancellation_permissions', 'notice_required_for_cancellation', 1)),
        cancellationPolicyPrimary: this.asString(this.getValue(data, 'cancellation_permissions', 'cancellation_policy_chargeable_fees', 0)),
        cancellationPolicySecondary: this.asString(this.getValue(data, 'cancellation_permissions', 'cancellation_policy_chargeable_fees', 1)),
      },
    };
  }

  private getValue(
    data: ParsedExcel,
    section: string,
    field: string,
    index: number
  ): unknown {
    return data[section]?.[field]?.[index] ?? null;
  }

  private asString(value: unknown): string | null {
    if (value === null || value === undefined) return null;

    const parsed = String(value).trim();
    return parsed.length === 0 ? null : parsed;
  }

  private asNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null;

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === 'string') {
      const cleaned = value
        .trim()
        .replace(/[^\d,.-]/g, '')
        .replace(',', '.');

      if (!cleaned) return null;

      const parsed = Number(cleaned);
      return Number.isNaN(parsed) ? null : parsed;
    }

    return null;
  }
}
